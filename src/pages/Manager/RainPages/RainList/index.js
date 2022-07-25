import React, { useMemo, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, Checkbox, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Button, TextField, InputAdornment, FormControlLabel
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'

import WarningModal from '../../../../components/Modals/WarningModal'

import { Area } from './styles'

import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Label,
  Line,
  Cell,
  LabelList,
  Scatter 
} from 'recharts';

const RainList = () => {

    const AllYears = []

    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ' ] 
    
    const history = useHistory()
    const [sites, setSites] = useState([])
    const [yearsData, setYearsData] = useState([])
    const [chart, setChart] = useState(false)
    const [unico, setUnico] = useState(false)
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    const [startDate, setStartDate] = useState(new Date().getFullYear()+'-01')
    const [endDate, setEndDate] = useState(new Date().getFullYear()+'-'+(new Date().getMonth()+1))

    useMemo(() => {
        const lowerSearch = search.toLowerCase()
        setFilteredSearch(
            sites?.filter((i) => i.name  ===  null ? {} : i.name.toLowerCase().includes(lowerSearch))
        )
    }, [search, sites])

    const loadRainsByPereiod = async () => {
        setLottie(true)
        const response = await api.loadRainsByPereiod(startDate, endDate)
        let s = await sum(response.data)
        await setYearsData(await sumByPeriod(s))
        await setSites(s)
        setLottie(false)
    }

    const clearArray = async (array) => {
        var result = [];
        array.forEach(function(item) {
            if(result.indexOf(item) < 0) {
                result.push(item);
            }
        });
        result?.sort((a, b) => (a?.date > b?.date) ? 1 : -1)
        return result
    }

    const sumByPeriod = async (newsites) => {
        const labels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ' ] 
        
        
        let years = []
        await newsites?.forEach(async site => {
            await site?.rains?.sort((a, b) => (a?.date > b?.date) ? 1 : -1)
            await site?.rains?.forEach(async rain => {
                let y = rain?.date?.substring(0,4)
                if(years.indexOf(y) < 0) {
                    await years.push(y);
                }
            })
        })

        let allYears = []
        await years.forEach(async year => {
            let months = [] 
            for(let i=0; i<12; i++){
                let mes = i+1
                mes = mes<10 ? 0+''+mes : mes
                let monthText=`{"month" : "${mes}", "year": "${year}", "label": "${labels[i]}"` 
                await newsites?.forEach(async site => {
                    await site?.years?.forEach(async siteyear => {
                        await siteyear?.months?.forEach(async sitemonth => {
                            let y = sitemonth?.month?.substring(0,4)
                            let m = sitemonth?.month?.substring(5,7)
                            if(year == y && mes == m){
                                monthText+=`, "${site.name}": "${sitemonth.volume}"`
                            }
                        })
                    })
                })
                monthText+=`}`
                await months.push(await JSON.parse(monthText))
            }
            await allYears.push(
                { year: year, months: months }
            )
        })
        await setUnico(false)
        return allYears
    }

    const sum = async (newsites) => {
        //ordenar datas e somar
        let allMonths = []
        await newsites?.forEach(site => {
            
            site?.rains?.sort((a, b) => (a?.date > b?.date) ? 1 : -1)
            let years = []
            let months= []
            let year = ' '
            let month = ' '
            let sumYear = 0
            let sumMonth = 0
            site?.rains?.forEach(async rain => {

                if(rain?.date?.substring(0,7) !== month ){
                    if(month !== ' '){
                        months.push({ month : month, volume : sumMonth, site: site.name })
                        allMonths.push({ month : month, volume : sumMonth, site: site.name })
                        sumMonth = 0
                    }
                    month = rain?.date?.substring(0,7)
                }
                sumMonth += rain.volume

                if(rain?.date?.substring(0,4) !== year ){
                    if(year !== ' '){
                        years.push({ year : year, volume : sumYear, months: months })
                        months = []
                        sumYear = 0
                    }
                    year = rain?.date?.substring(0,4)
                }
                sumYear += rain.volume
                
            })

            if(year !== ' '){
                months.push({ month : month, volume : sumMonth, site: site.name })
                allMonths.push({ month : month, volume : sumMonth, site: site.name })
                sumMonth = 0

                years.push({ year : year, volume : sumYear, months: months })
                months = []
                sumYear = 0
            }
            site.years = years
        })
        return newsites
    }

    useEffect(() => {
        loadRainsByPereiod()
    }, [])

    let i = 0

    const colors = ['blue', 'yelow', 'red', 'green', 'gray', 'silver', 'orange', 'cean']

    return (
        
        <Area>
            <div className='title--box'>
                <h3>
                    Resumo de Chuvas
                    - de {startDate} à {endDate}
                </h3>
                <TextField
                    size='small'
                    color='secondary'
                    className={classes.margin}
                    placeholder='O que você procura?'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                />
            </div>
            <div style={{flexDirection: 'row'}}>
                <TextField
                    variant='outlined'
                    id="month"
                    name="month"
                    label="Data Início"
                    type="month"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}             
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant='outlined'
                    id="month"
                    name="month"
                    label="Data Fim"
                    type="month"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}    
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    variant='outlined' 
                    style={{width: '20%'}}
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    className={classes.button}
                    onClick={loadRainsByPereiod}
                >
                    Filtrar
                </Button>
                <FormControlLabel
                    control={<Checkbox
                    checked={chart}
                    onChange={()=> setChart(!chart)}
                    />}
                    label="Grático"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                    checked={unico}
                    disabled={!chart}
                    onChange={()=> setUnico(!unico)}
                    />}
                    label="Único"
                />
            </div>

            <TableContainer component={Paper}>
                {chart && unico ?
                yearsData?.map(year=>
                    <LineChart width={880} height={600} data={year?.months}>
                        <Label value="Pages of my website" offset={0} position="center" />
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="label">
                            <Label value={year.year} offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis type="number" domain={[0, 200]} >
                            <Label value='Volume em mm' angle={-90} offset={0} position="left" />
                        </YAxis>
                        {filteredSearch.map((site, index)=>
                            <Line dataKey={site.name} unit='mm' stroke={colors[index]} />
                        )}
                        <Tooltip/>
                        <Legend />                
                    </LineChart> 
                ) :
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title--table' align="center">Nome</TableCell>
                            <TableCell className='title--table' align="center">Chuvas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filteredSearch?.map((row) => (
                            <TableRow key={row.id}>

                                <TableCell component="th" scope="row">
                                    <Link className={classes.link} to={`/site-details/${row.id}`}>
                                        {row.name}
                                    </Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TableRow>
                                    {row?.years?.map( y => <>
                                        <TableCell className='title--table' align="left" key={y.year}>
                                            <TableRow>
                                                <TableCell className='title--table' align="center"> 
                                                    {y.year} = {y.volume}
                                                </TableCell>
                                            </TableRow>

                                            {chart ?
                                            <TableRow>
                                                <BarChart width={600} height={120} data={y.months}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month"/>
                                                    <YAxis />
                                                    <Tooltip/>
                                                    <Bar dataKey="volume" fill="#8884d8" />
                                                </BarChart>
                                            </TableRow>
                                            :
                                            <TableRow>
                                                <TableCell>    
                                                {y.months?.map(m =>
                                                <TableCell>    
                                                    <TableRow>
                                                        <TableCell className='title--table' align="center">
                                                            {months[m.month.substring(5,7)-1]}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            {m.volume}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableCell>
                                                )}
                                                </TableCell>
                                            </TableRow>
                                            }

                                        </TableCell>
                                        </>)}
                                    </TableRow>
                                </TableCell>
                               
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
                }
            </TableContainer>

            {(!filteredSearch || filteredSearch?.length === 0) &&
                <div className='emptylist'>
                    <h3>Nenhum dado relacionado</h3>
                </div>
            }



            <Grid container
                    direction="row-reverse"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >


                <Grid item xs={10} sm={4} md={2}>
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<ReplyIcon />}
                        className={classes.buttonBack}
                        onClick={() => history.goBack()}
                        size='small'
                    >
                        Voltar
                    </Button>
                </Grid>
                
            </Grid>

            {warningModal &&
                <WarningModal
                    handleClose={handleCloseWarningModal}
                    open={warningModal}
                    message={message}
                    lottie={lottie}
                />
            }
       </Area>
    );
}

export default RainList

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: '900',
        margin: '0px',
        padding: '0px',
        border: '0px',
    },
    margin: {
        margin: theme.spacing(0),
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: '100%',
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
}))