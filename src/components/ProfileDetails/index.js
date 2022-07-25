import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import ReplyIcon from '@material-ui/icons/Reply'

import moment from 'moment'

import { Area } from './styles'

const ProfileDetails = ({ data }) => {

    const history = useHistory()
    const classes = useStyles()
    const birth = moment(data.birthDate).locale('pt-br').format('D/MM/yyyy')

    return (
        <>
            <Area>
                <div className='title--box'>
                    <h3>{data.name}</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Apelido</TableCell>
                                <TableCell className='title--table' align="left">Nascimento</TableCell>
                                <TableCell className='title--table' align="left">CPF</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{data.nickname}</TableCell>
                                <TableCell align="left">{birth}</TableCell>
                                <TableCell align="left">{data.cpf}</TableCell>

                            </TableRow>
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Telefone</TableCell>
                                <TableCell className='title--table' align="left">E-mail</TableCell>
                                <TableCell className='title--table' align="left">Perfil</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{data.phone}</TableCell>
                                <TableCell align="left">{data.email}</TableCell>
                                <TableCell align="left">{data.role == 0 ? 'Administrador(a)' : 'Técnico(a)'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container
                    direction="row-reverse"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >
                
                    <Grid item xs={12} md={8}>

                    </Grid>
                    
                    <Grid item xs={10} sm={4} md={2}>
                        <Link className={classes.link} to={`/admin-edit/${data.id}`}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                                className={classes.button}
                                size='small'
                            >
                                Editar
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
            </Area>
        </>
    );
}

export default ProfileDetails

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
