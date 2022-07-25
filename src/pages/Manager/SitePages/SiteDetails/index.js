import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'
import AddIcon from '@material-ui/icons/Add'
import * as BiIcons from "react-icons/bi"
import AssessmentIcon from '@material-ui/icons/Assessment'

import api from '../../../../services/api'
import moment from 'moment'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'
import AddModal from '../../../../components/Modals/AddSaleModal'
import EditActivityModal from '../../../../components/Modals/EditActivityModal'

import { Area } from './styles'

const SiteDetails = () => {

    const history = useHistory()
    const { id } = useParams()
    const [site, setSite] = useState({})
    const birth = moment(site.birthDate).locale('pt-br').format('D/MM/yyyy')
   
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const classes = useStyles()
    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)
    const handleOpenAddModal = () => setAddModal(true)
    const handleCloseAddModal = () => setAddModal(false)
    const handleCloseEditModal = () => setEditModal(false)
    const handleOpenEditModal = (value) => {
        setValue(value)
        setEditModal(true)
    } 

    const loadActivities = async () => {
        const response = await api.getAllActivities()
    }

    useEffect(() => {
        const getSite = async (id) => {
            const response = await api.getSiteById(id)
            setSite(response.data)
        }
        getSite(id)
    }, [])

    const currencyReal = (value)=> {
        return (value || 0 ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    const handleCreateActivity = async (values) => {
        const response = await api.createActivity(values.label)
        if (response.data) {
            handleCloseAddModal()
            setLottie(Success)
            setMessage('Atividade criada com sucesso!')
            handleOpenWarningModal()
            setValue(null)
        } else {
            handleCloseAddModal()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
            setValue(null)
        }
    }

    const handleUpdateActivity = async (values) => {
        const response = await api.updateActivity(value, values.label)

        if (response.data) {
            setLottie(Success)
            setMessage('Atividade atualizada com sucesso!')
            handleOpenWarningModal()
            handleCloseEditModal()
            setValue(null)
        } else {
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
            setValue(null)
        }
    }

    const handleDelete = (value) => {
        setValue(value)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteActivity(value)
        if (response.status === 200) {
            handleClose()
            const filtered = filteredSearch?.filter((i) => i.value !== value)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Atividade excluída com sucesso!')
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
        <>
            <Area>
                <div className='title--box'>
                    <h3>{site.name}</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">nome</TableCell>
                                <TableCell className='title--table' align="left">Proprietário</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{site?.name}</TableCell>
                                <TableCell align="left">{site?.producer?.name}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className='title--box'>
                    <h4>Chuvas Registradas</h4>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Data</TableCell>
                                <TableCell className='title--table' align="left">Volume</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        
                        {site?.rains?.map(r =>
                            <TableRow key={r.id}>
                                <TableCell align="left">{r.date}</TableCell>
                                <TableCell align="left">{r.volume}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Area>

            <Grid container
                direction="row-reverse"
                justify="space-around"
                alignItems="center"
                spacing={2}
            >
                
                <Grid item xs={12} md={8}>

                </Grid>
                
                <Grid item xs={10} sm={4} md={2}>
                    <Link className={classes.link} to={`/rain-list/${id}`}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<BiIcons.BiCloud />}
                            className={classes.button}
                            size='small'
                        >
                            Chuvas
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
                    title='Deseja realmente excluir este Sítio?'
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
            {addModal &&
                <AddModal
                    handleClose={handleCloseAddModal}
                    open={addModal}
                    handleCreate={handleCreateActivity}
                    title='Salvar Sítio?'
                    label='Detalhes'
                    labelButton='Salvar'
                    object={{site: site}}
                />
            }
            {editModal &&
                <EditActivityModal
                    handleClose={handleCloseEditModal}
                    open={editModal}
                    handleUpdate={handleUpdateActivity}
                    title='Alterar?'
                    label='Detalhes'
                    labelButton='Atualizar'
                    
                    id={value}
                />
            }
        </>
    );
}

export default SiteDetails

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    button: {
        margin: 2,
        backgroundColor: '#007200',
        width: "100%",
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: 2,
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
})
