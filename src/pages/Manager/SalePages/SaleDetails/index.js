import React, { useMemo, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, Button, TextField, InputAdornment
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import AssessmentIcon from '@material-ui/icons/Assessment'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import WorkIcon from '@material-ui/icons/Work'
import SearchIcon from '@material-ui/icons/Search'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'
import { Area } from './styles'

import moment from 'moment'

const SaleDetails = () => {

    const history = useHistory()    
    const { id } = useParams()

    const [idDel, setIdDel] = useState()
    const [open, setOpen] = useState(false)
    const [filteredSearch, setFilteredSearch] = useState([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    const [sales, setSales] = useState([])
    const [producer, setProducer] = useState()

    const getSales = async () => {
        const response = await api.getSalesByProducer(id)
        setSales(response)
    }
    
    const getProducer = async () => {
        const response = await api.getProducerById(id)
        setProducer(response)
    }

    useEffect(() => {
        getProducer()
        getSales()
    }, [])

    const handleDelete = (id) => {
        setIdDel(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteSale(idDel)
        if (response.status === 200) {
            handleClose()
            const filtered = filteredSearch?.filter((i) => i.id !== id)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Venda excluída com sucesso!')
            getSales()
            handleOpenWarningModal()
        } else {
            handleClose()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleChangePage = (event, newPage) => { setPage(newPage) }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Area>
            <div className='title--box'>
                <h3>Vendas - {producer?.data?.name}</h3>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title--table' align="center">Produto</TableCell>
                            <TableCell className='title--table' align="center">Quantidade</TableCell>
                            <TableCell className='title--table' align="center">Parâmetro</TableCell>
                            <TableCell className='title--table' align="center">Valor</TableCell>
                            <TableCell className='title--table' align="center">Cidade</TableCell>
                            <TableCell className='title--table' align="center">Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.product.label}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.parameter}</TableCell>
                                <TableCell align="center">{row.valor}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">{moment(row.date).locale('pt-br').format('DD/MM/yyyy')}</TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>
                                        <Tooltip title='Excluir' arrow>
                                            <Link className='link--table' to='#' >
                                                <IconButton className='button--delete' onClick={() => handleDelete(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

            </TableContainer>
            {(!sales || sales?.data?.length === 0) &&
                <div className='emptylist'>
                    <h3>Nenhuma venda relacionada</h3>
                </div>
            }

            <Grid container
                    direction="row-reverse"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >
                
                <Grid item xs={12} md={8}>
                    <TablePagination
                        labelRowsPerPage='Itens por página'
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={filteredSearch?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
                
                <Grid item xs={10} sm={4} md={2}>
                    <Link className={classes.link} to={`/sale-form/${id}`}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            className={classes.button}
                            size='small'
                        >
                            Venda
                        </Button>
                    </Link>
                </Grid>

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

            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir esta venda?'
                />
            }
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

export default SaleDetails

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
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
        textDecoration: 'none'
    }
}))
