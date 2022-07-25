import React, { useState, useContext, useEffect } from 'react'
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
import SearchIcon from '@material-ui/icons/Search'
import ReplyIcon from '@material-ui/icons/Reply'
import PersonIcon from '@material-ui/icons/Person';

import api from '../../../../services/api'
import { AuthContext } from '../../../../contexts/AuthContext'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'
import { Area } from './styles'

const UserManagement = () => {

    const { user } = useContext(AuthContext)
    const { role } = useParams()

    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
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

    useEffect(() => {
        const getAllManagers = async () => {
            const response = await api.getAllManagers()
            const data = response.data
            const lowerSearch = search.toLowerCase()
            setFilteredSearch(
                data?.filter((i) => i.name.toLowerCase().includes(lowerSearch))
            )
        }
        getAllManagers()
    }, [search])

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteManager(id)
        if (response.status === 200) {
            handleClose()
            const filtered = filteredSearch?.filter((i) => i.id !== id)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Usuário excluído com sucesso!')
            handleOpenWarningModal()
        } else {
            handleClose()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Area>
            <div className='title--box'>
                <h3>lista de usuários</h3>
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
                            <TableCell className='title--table' align="center">Nome</TableCell>
                            <TableCell className='title--table' align="center">Perfil</TableCell>
                            <TableCell className='title--table' align="center">E-mail</TableCell>
                            <TableCell className='title--table' align="center">Telefone</TableCell>
                            <TableCell className='title--table' align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        )?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={row.role === 0 ? 'Administrador' : 'Técnico'} arrow>
                                        <PersonIcon style={{
                                            color: row.role === 0 ? 'red' : 'green'
                                        }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>

                                        <Tooltip title='Detalhes' arrow>
                                            <Link className='link--table' to={`/admin-details/${row.id}`} >
                                                <IconButton className='button--detail'>
                                                    <AssessmentIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title='Editar' arrow>
                                            <Link className='link--table' to={`/admin-edit/${row.id}`} >
                                                <IconButton className='button--edit'>
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                        {row.id !== user?.id &&
                                            < Tooltip title='Excluir' arrow>
                                                <Link className='link--table' to='#' >
                                                    <IconButton className='button--delete' onClick={() => handleDelete(row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                        }
                                         {row.id === user?.id &&
                                            < Tooltip title='Excluir' arrow>
                                                <Link className='link--table' to='#' >
                                                    <IconButton disabled={true} className='button--delete-disabled' onClick={() => handleDelete(row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            {
                (!filteredSearch || filteredSearch?.length === 0) &&
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
                    {role == 0 &&                      
                        <Link className={classes.link} to='/admin-form'>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                className={classes.button}
                                size='small'
                            >
                                Usuário
                            </Button>
                        </Link>
                    }
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

            {
                open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir este usuário?'
                />
            }
            {
                warningModal &&
                <WarningModal
                    handleClose={handleCloseWarningModal}
                    open={warningModal}
                    message={message}
                    lottie={lottie}
                />
            }
        </Area >
    );
}

export default UserManagement

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
