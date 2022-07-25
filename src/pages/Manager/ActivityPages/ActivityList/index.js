import React, { useState, useMemo, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, TextField, InputAdornment, Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'
import AddModal from '../../../../components/Modals/AddModal'
import EditActivityModal from '../../../../components/Modals/EditActivityModal'

import { Area } from './styles'

const ActivityList = () => {

    const history = useHistory()
    const [activities, setActivities] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

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
        setValue(value)
        setEditModal(true)
    }

    useMemo(() => {
        const lowerSearch = search?.toLowerCase()
        setFilteredSearch(
            activities?.filter((i) => i.label?.toLowerCase().includes(lowerSearch))
        )
    }, [search, activities])

    const loadActivities = async () => {
        const response = await api.getAllActivities()
        setActivities(response.data)
    }

    useEffect(() => {
        loadActivities()
    }, [])

    const handleCreateActivity = async (values) => {
        const response = await api.createActivity(values.label)
        if (response.data) {
            handleCloseAddModal()
            setLottie(Success)
            setMessage('Atividade criada com sucesso!')
            handleOpenWarningModal()
            loadActivities()
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
            loadActivities()
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
        <Area>
            <div className='title--box'>
                <h3>lista de atividades</h3>
                <TextField
                    size='small'
                    color='secondary'
                    className={classes.margin}
                    placeholder='Qual atividade procura?'
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
                            <TableCell className='title--table' align="left">Nome</TableCell>
                            <TableCell className='title--table' align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        )?.map((row) => (
                            <TableRow key={row.value}>
                                <TableCell component="th" scope="row">{row.value}</TableCell>
                                <TableCell scope="row">{row.label}</TableCell>
                                <TableCell align="center">
                                    <div className='button--group'>

                                        <Tooltip title='Detalhes' arrow>
                                            <Link className='link--table' to={`/activity-details/${row.value}`} >
                                                <IconButton className='button--detail' color='secondary' aria-label="delete">
                                                    <AssessmentIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title='Editar' arrow>
                                            <div className='link--table'>
                                                <IconButton onClick={() => handleOpenEditModal(row.value)} className='button--edit' color='secondary' aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                        </Tooltip>

                                        <Tooltip title='Excluir' arrow>
                                            <Link className='link--table' to='#' >
                                                <IconButton className='button--delete' onClick={() => handleDelete(row.value)} color='secondary' aria-label="delete">
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
                    <h3>Nenhuma atividade encontrada</h3>
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
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddModal}
                        size='small'
                    >
                        Atividade
                    </Button>
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
                    title='Deseja realmente excluir este produto?'
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
                    title='Criar atividade?'
                    label='Nome da atividade'
                    labelButton='Criar'
                />
            }
            {editModal &&
                <EditActivityModal
                    handleClose={handleCloseEditModal}
                    open={editModal}
                    handleUpdate={handleUpdateActivity}
                    title='Editar atividade?'
                    label='Nome da atividade'
                    labelButton='Atualizar'
                    id={value}
                />
            }
        </Area>
    );
}

export default ActivityList

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: "100%",
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: "100%",
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none'
    }
}))
