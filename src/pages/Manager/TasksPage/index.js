import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, makeStyles, Tabs, Tab, Typography, Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ReplyIcon from '@material-ui/icons/Reply'

import TasksList from '../../../components/TasksList'
import AddTaskModal from '../../../components/Modals/AddTaskModal'

import api from '../../../services/api'
import { AuthContext } from '../../../contexts/AuthContext'

import WarningModal from '../../../components/Modals/WarningModal'
import Fail from '../../../assets/lotties/fail.json'
import Success from '../../../assets/lotties/success.json'

const NavTabs = () => {

    const classes = useStyles()
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(0)
    const [addModal, setAddModal] = useState(false)
    const [todayTasks, setTodayTasks] = useState([])
    const [futureTasks, setFutureTasks] = useState([])

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')

    const handleOpenAddModal = () => setAddModal(true)
    const handleCloseAddModal = () => setAddModal(false)
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)
    const handleChange = (event, newValue) => setValue(newValue)

    const getTodayTasks = async () => {
        const response = await api.getAllTodayTasks()
        setTodayTasks(response.data)
    }

    const getFutureTasks = async () => {
        const response = await api.getAllFutureTasks()
        setFutureTasks(response.data)
    }

    useEffect(() => {
        getTodayTasks()
        getFutureTasks()
    }, [])

    const handleCreateTask = async (values) => {
        const response = await api.createTask(values.description, values.date, user?.id)
        if (response.data) {
            handleCloseAddModal()
            setLottie(Success)
            setMessage('Tarefa criada com sucesso!')
            handleOpenWarningModal()
            getTodayTasks()
            getFutureTasks()
        } else {
            handleCloseAddModal()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    return (
        <div className={classes.root}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
            >
                <LinkTab label="Tarefas de Hoje" {...a11yProps(0)} />
                <LinkTab label="Tarefas Futuras" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TasksList data={todayTasks} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TasksList data={futureTasks} />
            </TabPanel>

            <Grid container
                    direction="row-reverse"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >
                
                <Grid item xs={12} md={8}>

                </Grid>
                
                <Grid item xs={10} sm={4} md={2}>
                    <Button
                        style={{width: "100%"}}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddModal}
                        size='small'
                    >
                        Tarefa
                    </Button>
                </Grid>

                <Grid item xs={10} sm={4} md={2}>
                    <Button
                        style={{width: "100%"}}
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
            

            {addModal &&
                <AddTaskModal
                    handleClose={handleCloseAddModal}
                    open={addModal}
                    handleCreate={handleCreateTask}
                    title='Criar tarefa?'
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
        </div>
    );
}

export default NavTabs

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',

        '&:hover': {
            background: '#33617D'
        },
    },
}))

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}
