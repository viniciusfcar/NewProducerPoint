import React, { useState, useEffect } from 'react'
import { useHistory, useParams, } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Grid, TextField, Button, MenuItem, Select,
    Input, InputLabel, ListItemText, Checkbox,
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'
import SaveIcon from '@material-ui/icons/Save'

import api from '../../../../services/api'
import { RequestContext } from '../../../../contexts/RequestContext'
import { AuthContext } from '../../../../contexts/AuthContext'

import { paramiter } from '../../../../enums'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

import { Area } from './styles'

const SaleForm = () => {

    const history = useHistory()
    const [producer, setProducer] = useState()
    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    const { id } = useParams()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    const getProducer = async () => {
        const response = await api.getProducerById(id)
        setProducer(response.data)
    }

    useEffect(() => {
        getProducer()
    }, [])

    const initialFormState = {
        valor: '',
        quantity: '',
        date: '',
        city: '',
        parameter: '',
        producer: '',
        product: '',
    }

    const validationSchema = yup.object().shape({
        valor: yup.string().required('Valor é obrigatório!'),
        quantity: yup.string().required('Quantidade é obrigatória!'),
        date: yup.string().required('Data é obrigatória!'),
        city: yup.string().required('Cidade é obrigatória!'),
        parameter: yup.array().min(1, 'ERROR').required('Selecione pelo menos um produto!')
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: null, 
        onSubmit: async (values) => {

            const valor_correct = values.valor?.replace(",", ".")
            const city_correct = values.city?.toUpperCase()

            const response = await api.createSaleProducer(
                values.date,
                values.quantity,
                valor_correct,
                values.parameter,
                city_correct,
                producer.id,
                values.product,
            )
            console.log(response)
            if (response.ok) {
                setLottie(Success)
                setMessage('Venda cadastrada com sucesso!')
                handleOpenWarningModal()
                setTimeout(() => {
                    window.location.href = '/sales'
                }, 2500);
            } else {
                setLottie(Fail)
                setMessage(`Falha inesperada! Erro: ${response.status}`)
                handleOpenWarningModal()
            }
        }
    })

    return (
        <>
            <Area>
                <div className={classes.titleBox}>
                    <h3 className={classes.title}>Cadastrar Venda - {producer?.name}</h3>
                </div>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.formWrapper}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>                                
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="product"
                                            name="product"
                                            value={formik.values.product}
                                            onChange={formik.handleChange}
                                            label="Produto"
                                            error={formik.touched.product && Boolean(formik.errors.product)}
                                            helperText={formik.touched.product && formik.errors.product}
                                            select
                                            required
                                        >
                                            {producer?.products.map((i) => (
                                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="quantity"
                                            name="quantity"
                                            label="Quantidade"
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                            helperText={formik.touched.quantity && formik.errors.quantity}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="parameter"
                                            name="parameter"
                                            value={formik.values.parameter}
                                            onChange={formik.handleChange}
                                            label="Parâmetro"
                                            error={formik.touched.parameter && Boolean(formik.errors.parameter)}
                                            helperText={formik.touched.parameter && formik.errors.parameter}
                                            select
                                            required
                                        >
                                            {paramiter.map((i) =>
                                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="valor"
                                            name="valor"
                                            label="Valor"
                                            value={formik.values.valor}
                                            onChange={formik.handleChange}
                                            error={formik.touched.valor && Boolean(formik.errors.valor)}
                                            helperText={formik.touched.valor && formik.errors.valor}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="city"
                                            name="city"
                                            label="Cidade"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            helperText={formik.touched.city && formik.errors.city}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="date"
                                            name="date"
                                            label="Data da venda"
                                            type="date"
                                            value={formik.values.date}
                                            onChange={formik.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={formik.touched.date && Boolean(formik.errors.date)}
                                            helperText={formik.touched.date && formik.errors.date}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
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

                                    <Grid item xs={10}>
                                        <Button
                                            onClick={formik.handleSubmit}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            type="submit"
                                        >
                                            Cadastrar
                                        </Button>
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
            </Area>
        </ >
    );
}

export default SaleForm

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
    }

}));


