import React, { useState, useEffect } from 'react'
import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete'
import ToggleButton from '@material-ui/lab/ToggleButton'
import moment from 'moment'

import api from '../../services/api'

import ConfimationModal from '../../components/Modals/ConfimationModal'
import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'

const TasksList = ({ data }) => {

    const classes = useStyles()
    const [tasks, setTasks] = useState(data)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')

    useEffect(() => {
        setTasks(data)
    }, [data])

    const handleChange = async (index, id) => {
        const newArray = [...data]
        newArray[index].status
            ? newArray[index].status = false
            : newArray[index].status = true

        const status = newArray[index].status ? false : true // Na api recebe invertido
        const response = await api.setStateTasks(id, status)
        if (response.data) {
            setTasks(newArray)
        } else {
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteTask(id)
        if (response.status === 200) {
            handleClose()
            const filtered = tasks?.filter((i) => i.id !== id)
            setTasks(filtered)
            setLottie(Success)
            setMessage('Tarefa excluída com sucesso!')
            handleOpenWarningModal()
        } else {
            handleClose()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Tarefa</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Data</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Exluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks?.map((i, k) => (
                            <TableRow key={k}>
                                <TableCell component="th" scope="row">
                                    <ToggleButton
                                        value='check'
                                        selected={i.status}
                                        onChange={() => handleChange(k, i.id)}
                                    >
                                        <CheckIcon color={i.status ? 'secondary' : 'disabled'} />
                                    </ToggleButton>
                                </TableCell>
                                <TableCell
                                    style={{ textDecorationLine: i.status ? 'line-through' : 'none' }}
                                    align="left">{i.description}
                                </TableCell>
                                <TableCell
                                    style={{ textDecorationLine: i.status ? 'line-through' : 'none' }}
                                    align="left">{moment(i.date).locale('pt-br').format('D/MM/yyyy')}
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => handleDelete(i.id)} color='secondary' aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {(!tasks || tasks?.length === 0) &&
                <div className={classes.emptylist}>
                    <h3>Sem tarefas no momento</h3>
                </div>
            }
            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir esta tarefa?'
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
        </>
    );
}

export default TasksList

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    emptylist: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#b00',
        opacity: 0.7
    }
});