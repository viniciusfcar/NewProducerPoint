import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Grid, TextField, Button, MenuItem
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'
import SaveIcon from '@material-ui/icons/Save'

import api from '../../../../services/api'
import valid from '../../../../services/validations'
import { profiles } from '../../../../enums'

import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

const ProducerForm = () => {

    const history = useHistory()
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    const initialFormState = {
        name: '',
        nickname: '',
        birthDate: '',
        cpf: '',
        phone: '',
        email: '',
        role: ''
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        birthDate: yup.date().required('Data é obrigatória!'),
        cpf: yup.string().required('CPF é obrigatório!').test('cpf', 'CPF inválido', async value => await valid.validaCPF( value ) ),
        phone: yup.string().required('Telefone é obrigatório!'),
        email: yup.string().email('E-mail inválido!').required('E-mail é obrigatório!'),
        role: yup.string().required('Perfil é obrigatório!'),
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await api.createManager(values)

            if (response.data) {
                if (response.status >= 200 && response.status <= 299) {
                    setLottie(Success)
                    setMessage(`Usuário atualizado com sucesso!`)
                    handleOpenWarningModal()
                    setTimeout(() => {
                        window.location.href = `/admin-list/0`
                    }, 2500);
                } else {
                    setLottie(Fail)
                    setMessage(`Falha inesperada! Erro: ${response?.data?.message}`)
                    handleOpenWarningModal()
                };
            } else {
                setLottie(Fail)
                setMessage(`Falha inesperada! Erro: ${response.status}`)
                handleOpenWarningModal()
            }

        }
    })

    return (
        <>
            <div className={classes.titleBox}>
                <h3 className={classes.title}>Cadastrar Administrador/Técnico</h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="nickname"
                                        name="nickname"
                                        label="Apelido"
                                        value={formik.values.nickname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                                        helperText={formik.touched.nickname && formik.errors.nickname}
                                    />
                                </Grid>

                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="birthDate"
                                        name="birthDate"
                                        label="Nascimento"
                                        type="date"
                                        value={formik.values.birthDate}
                                        onChange={formik.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="cpf"
                                        name="cpf"
                                        label="CPF"
                                        value={formik.values.cpf}
                                        onChange={async (e) => formik.setFieldValue('cpf', await valid.cpfMask(e.target.value))}
                                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                        helperText={formik.touched.cpf && formik.errors.cpf}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="phone"
                                        name="phone"
                                        label="Telefone"
                                        value={formik.values.phone}
                                        onChange={async (e) => formik.setFieldValue('phone', await valid.phoneMask(e.target.value))}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="role"
                                        name="role"
                                        label="Perfil"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                        select
                                    >
                                        {profiles.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

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
                                            onClick={formik.handleSubmit}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            type="submit"
                                        >
                                            Salvar
                                        </Button>
                                    </Grid>

                                    <Grid item xs={10} sm={4} md={2}>
                                        <Button
                                            onClick={() => history.goBack()}
                                            className={classes.buttonBack}
                                            startIcon={<ReplyIcon />}
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Voltar
                                        </Button>
                                    </Grid>
                                    
                                </Grid>

                            </Grid>

                        </form>
                    </div>
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
        </ >
    );
}

export default ProducerForm

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),
    },
    button: {
        backgroundColor: '#070',

        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        backgroundColor: '#458CB8',

        '&:hover': {
            background: '#33617D'
        },
    },
    titleBox: {
        height: 50,
        backgroundColor: '#ccc',
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'space-between',
        display: 'flex'

    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase'
    },
    link: {
        textDecoration: 'none'
    }

}));


