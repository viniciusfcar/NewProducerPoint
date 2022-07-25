import React, { useMemo, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, Button, TextField, InputAdornment
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import * as BiIcons from "react-icons/bi"
import AssessmentIcon from '@material-ui/icons/Assessment'
import SearchIcon from '@material-ui/icons/Search'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'
import AddModal from '../../../../components/Modals/AddModal'
import EditSiteModal from '../../../../components/Modals/EditSiteModal'
import AddRainModal from '../../../../components/Modals/AddRainModal'

import { Area } from './styles'

const SiteList = () => {
    
    const history = useHistory()
    const [sites, setSites] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [actualSite, setActualSite] = useState({})
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [addRainModal, setAddRainModal] = useState(false)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
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
        setId(value)
        setEditModal(true)
    }
    const handleOpenAddRainModal = (site) => {
        setActualSite(site)
        setAddRainModal(true)
    }
    
    const handleCloseAddRainModal = () => setAddRainModal(false)

    useMemo(() => {
        const lowerSearch = search.toLowerCase()
        setFilteredSearch(
            sites?.filter((i) => i.name  ===  null ? {} : i.name.toLowerCase().includes(lowerSearch))
        )
    }, [search, sites])

    const loadSites = async () => {
        const response = await api.getAllSites()
        setSites(response.data)
    }

    useEffect(() => {
        loadSites()
    }, [])

    const handleCreateRain = async (values) => {
        console.log('marcador aqui')
        const response = await api.createRain(values.date, values.volume, values.site?.id )
        if (response.data) {
            handleCloseAddRainModal()
            setLottie(Success)
            setMessage('Chuva Adicionada com sucesso!')
            handleOpenWarningModal()
            loadSites()
            setId(null)
        } else {
            handleCloseAddRainModal()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
            setId(null)
        }
    }

    const handleCreateSite = async (values) => {
        const response = await api.createSite(values.label)
        if (response.data) {
            handleCloseAddModal()
            setLottie(Success)
            setMessage('Sítio criado com sucesso!')
            handleOpenWarningModal()
            loadSites()
            setId(null)
        } else {
            handleCloseAddModal()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
            setId(null)
        }
    }

    const handleUpdateSite = async (values) => {
        const response = await api.updateSite(id, values.name)

        if (response.data) {
            setLottie(Success)
            setMessage('Sítio atualizado com sucesso!')
            handleOpenWarningModal()
            handleCloseEditModal()
            loadSites()
            setId(null)
        } else {
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
            setId(null)
        }
    }

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteSite(id)
        
        if (response.status === 200) {
            handleClose()
            const filtered = filteredSearch?.filter((i) => i.id !== id)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Sítio excluído com sucesso!')
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
                <h3>Lista de Sítios</h3>
                <TextField
                    size='small'
                    color='secondary'
                    className={classes.margin}
                    placeholder='Quem você procura?'
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
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title--table' align="left">COD</TableCell>
                            <TableCell className='title--table' align="center">Nome</TableCell>
                            <TableCell className='title--table' align="center">Ultimo Registro</TableCell>
                            <TableCell className='title--table' align="center">Chuvas</TableCell>
                            <TableCell className='title--table' align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        )?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {
                                        row?.rains?.length > 0 ? 
                                        row?.rains[row?.rains?.length -1]?.date + " - "+ row?.rains[row?.rains?.length -1]?.volume+'ml'
                                        : 'Sem registros'
                                    }   
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <div className='button--group'>
                                    {row.rains?.length}
                                    <Tooltip title='Add Chuva' arrow>
                                        <div className='link--table'>
                                            <IconButton onClick={() => handleOpenAddRainModal(row)} className='button--add' color='warning' aria-label="add">
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    </Tooltip>

                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>

                                        <Tooltip title='Detalhes' arrow>
                                            <Link className='link--table' to={`/site-details/${row.id}`} >
                                                <IconButton className='button--detail'>
                                                    <AssessmentIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title='Editar' arrow>
                                            <div className='link--table'>
                                                <IconButton onClick={() => handleOpenEditModal(row.id)} className='button--edit' color='secondary' aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                        </Tooltip>

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
            {(!filteredSearch || filteredSearch?.length === 0) &&
                <div className='emptylist'>
                    <h3>Nenhum produtor relacionado</h3>
                </div>
            }

            <Grid container
                    direction="row-reverse"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >
                
                <Grid item xs={12} md={6}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddModal}
                        size='small'
                    >
                        Site
                    </Button>
                </Grid>

                <Grid item xs={10} sm={4} md={2}>
                    <Link className={classes.link} to={`/rain-list/${id}`}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<BiIcons.BiCloud />}
                            className={classes.buttonGo}
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
                    title='Deseja realmente excluir este produtor?'
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
                    handleCreate={handleCreateSite}
                    title='Cadastrar sítio?'
                    label='Nome do sítio'
                    labelButton='Cadastrar'
                />
            }
            {editModal &&
                <EditSiteModal
                    handleClose={handleCloseEditModal}
                    open={editModal}
                    handleUpdate={handleUpdateSite}
                    title='Editar sítio?'
                    label='Nome do sítio'
                    labelButton='Atualizar'
                    id={id}
                />
            }
            {addRainModal &&
                <AddRainModal
                    handleClose={handleCloseAddRainModal}
                    open={addRainModal}
                    handleCreate={handleCreateRain}
                    title='Cadastrar chuva?'
                    label='Volume em MLs'
                    labelButton='Cadastrar'
                    site={actualSite}
                />
            }
        </Area>
    );
}

export default SiteList

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
            background: '#33617D'
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

    buttonGo: {
        margin: theme.spacing(1),
        backgroundColor: '#222222',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    
    link: {
        textDecoration: 'none'
    }
}))