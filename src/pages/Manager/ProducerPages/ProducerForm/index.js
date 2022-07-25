import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, TextField, Button, MenuItem, Select,
    Input, InputLabel, ListItemText, Checkbox,
} from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'
import { RequestContext } from '../../../../contexts/RequestContext'
import { AuthContext } from '../../../../contexts/AuthContext'
import { periods, ufs } from '../../../../enums'
import { formatarCEP, phoneMask } from '../../../../components/Helpers'

import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

const ProducerEdit = () => {

    const history = useHistory()
    const { products, activities } = useContext(RequestContext)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    useEffect(() => {
        const getProducerById = async (id) => {
            const response = await api.getProducerById(id)
            const { data } = response

            formik.setFieldValue('name', data?.name)
            formik.setFieldValue('nickname', data?.nickname)
            formik.setFieldValue('birthDate', data?.birthDate)
            formik.setFieldValue('rg', data?.rg)
            formik.setFieldValue('cpf', data?.cpf)
            formik.setFieldValue('phone', data?.phone)
            formik.setFieldValue('email', data?.email)
            formik.setFieldValue('address.zipCode', data?.address?.zipCode)
            formik.setFieldValue('address.uf', data?.address?.uf)
            formik.setFieldValue('address.city', data?.address?.city)
            formik.setFieldValue('address.district', data?.address?.district)
            formik.setFieldValue('address.street', data?.address?.street)
            formik.setFieldValue('address.houseNumber', data?.address?.houseNumber)
            formik.setFieldValue('address.reference', data?.address?.reference)
            formik.setFieldValue('farmingActivity.activityName.value', data?.farmingActivity?.activityName?.value)
            formik.setFieldValue('farmingActivity.period', data?.farmingActivity?.period)
            formik.setFieldValue('farmingActivity.averageCash', data?.farmingActivity?.averageCash)
            formik.setFieldValue('farmingActivity.activityName2.value', data?.farmingActivity?.activityName2?.value)
            formik.setFieldValue('farmingActivity.period2', data?.farmingActivity?.period2)
            formik.setFieldValue('farmingActivity.averageCash2', data?.farmingActivity?.averageCash2)

            const productsList = () => {
                const newArray = []
                for (let i of data?.products) {
                    const values = Object.values(i)
                    newArray.push(values[1])
                }
                return newArray
            }

            const resultList = productsList()

            formik.setFieldValue('products', resultList)
        }
        if(!!id) {
            getProducerById(id)
        }
    }, [])

    const initialFormState = {
        name: '',
        nickname: '',
        birthDate: '',
        rg: '',
        cpf: '',
        phone: '',
        email: '',
        address: {
            zipCode: '',
            uf: '',
            city: '',
            district: '',
            street: '',
            houseNumber: '',
            reference: ''
        },
        farmingActivity: {
            activityName: {
                value: ''
            },
            averageCash: '',
            period: '',
            activityName2: {
                value: ''
            },
            averageCash2: '',
            period2: ''
        },
        products: [],
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        birthDate: yup.date().required('Data é obrigatória!'),
        rg: yup.string().required('RG é obrigatório!'),
        cpf: yup.string().required('CPF é obrigatório!'),
        email: yup.string().email('E-mail inválido!'),
        address: yup.object().shape({
            zipCode: yup.string().required('CEP é obrigatório!'),
            uf: yup.string().required('Estado é obrigatório!'),
            city: yup.string().required('Cidade é obrigatória!'),
            district: yup.string().required('Bairro é obrigatório!'),
            street: yup.string().required('Rua é obrigatória!'),
        }),
        farmingActivity: yup.object().shape({
            activityName: yup.object().shape({
                value: yup.string().required('Atividade é obrigatório!')
            }),
            period: yup.string().required('Período é obrigatório!'),

        }),
        products: yup.array().min(1, 'Selecione pelo menos um produto!')
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const productsList = () => {
                const newArray = []
                const productList = [...values.products]
                for (let i of products) {
                    const values = Object.values(i)
                    for (let j of productList) {
                        if (values[1] === j) {
                            const obj = { value: values[0] }
                            newArray.push(obj)
                        }
                    }
                }
                return newArray
            }

            if(values.farmingActivity.activityName2.value === "" || values.farmingActivity.activityName.value === values.farmingActivity.activityName2.value){
                values.farmingActivity.activityName2 = undefined
                values.farmingActivity.period2 = undefined
                values.farmingActivity.averageCash2 = undefined
            }
            
            const resultList = productsList()

            const response = !!id ? 
            await api.updateProducer(id, values, resultList, user?.id)
            :
            await api.createProducer(values, resultList, user?.id)
            

            if (response.data) {
                setLottie(Success)
                setMessage('Produtor atualizado com sucesso!')
                handleOpenWarningModal()
                setTimeout(() => {
                    window.location.href = '/producer-list'
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
            <div className={classes.titleBox}>
                <h3 className={classes.title}>
                    {!!id ? 'Editar' : 'Cadastrar'} Produtor
                </h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={6}>
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

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="rg"
                                        name="rg"
                                        label="RG"
                                        value={formik.values.rg}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rg && Boolean(formik.errors.rg)}
                                        helperText={formik.touched.rg && formik.errors.rg}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="cpf"
                                        name="cpf"
                                        label="CPF"
                                        value={formik.values.cpf}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                        helperText={formik.touched.cpf && formik.errors.cpf}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="phone"
                                        name="phone"
                                        label="Telefone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>

                                <Grid item xs={4}>
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
                                        id="zipCode"
                                        name="address.zipCode"
                                        label="CEP"
                                        value={formik.values.address.zipCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
                                        helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="uf"
                                        name="address.uf"
                                        value={formik.values.address.uf}
                                        onChange={formik.handleChange}
                                        label="Estado"
                                        error={formik.touched.address?.uf && Boolean(formik.errors.address?.uf)}
                                        helperText={formik.touched.address?.uf && formik.errors.address?.uf}
                                        select
                                        required
                                    >
                                        {ufs.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="city"
                                        name="address.city"
                                        label="Cidade"
                                        value={formik.values.address.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                                        helperText={formik.touched.address?.city && formik.errors.address?.city}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="district"
                                        name="address.district"
                                        label="Bairro"
                                        value={formik.values.address.district}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.district && Boolean(formik.errors.address?.district)}
                                        helperText={formik.touched.address?.district && formik.errors.address?.district}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="street"
                                        name="address.street"
                                        label="Rua"
                                        value={formik.values.address.street}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
                                        helperText={formik.touched.address?.street && formik.errors.address?.street}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="houseNumber"
                                        name="address.houseNumber"
                                        label="Nº"
                                        value={formik.values.address.houseNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.houseNumber && Boolean(formik.errors.address?.houseNumber)}
                                        helperText={formik.touched.address?.houseNumber && formik.errors.address?.houseNumber}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="reference"
                                        name="address.reference"
                                        label="Referência"
                                        value={formik.values.address.reference}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address?.reference && Boolean(formik.errors.address?.reference)}
                                        helperText={formik.touched.address?.reference && formik.errors.address?.reference}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="activityName"
                                        name="farmingActivity.activityName.value"
                                        label="Atividade Primária"
                                        value={formik.values.farmingActivity.activityName?.value}
                                        error={formik.touched.farmingActivity?.activityName?.value && Boolean(formik.errors.farmingActivity?.activityName?.value)}
                                        helperText={formik.touched.farmingActivity?.activityName?.value && formik.errors.farmingActivity?.activityName?.value}
                                        onChange={formik.handleChange}
                                        select
                                    >
                                        {activities.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="activityName2"
                                        name="farmingActivity.activityName2.value"
                                        label="Atividade Secundária"
                                        value={formik.values.farmingActivity.activityName2?.value}
                                        error={formik.touched.farmingActivity?.activityName2?.value && Boolean(formik.errors.farmingActivity?.activityName2?.value)}
                                        helperText={formik.touched.farmingActivity?.activityName2?.value && formik.errors.farmingActivity?.activityName2?.value}
                                        onChange={formik.handleChange}
                                        select
                                    >
                                        {activities.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="period"
                                        name="farmingActivity.period"
                                        label="Príodo"
                                        value={formik.values.farmingActivity?.period}
                                        onChange={formik.handleChange}
                                        error={formik.touched.farmingActivity?.period && Boolean(formik.errors.farmingActivity?.period)}
                                        helperText={formik.touched.farmingActivity?.period && formik.errors.farmingActivity?.period}
                                        select
                                    >
                                        {periods.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="averageCash"
                                        name="farmingActivity.averageCash"
                                        label="Renda"
                                        value={formik.values.farmingActivity?.averageCash}
                                        onChange={formik.handleChange}
                                        error={formik.touched.farmingActivity?.averageCash && Boolean(formik.errors.farmingActivity?.averageCash)}
                                        helperText={formik.touched.farmingActivity?.averageCash && formik.errors.farmingActivity?.averageCash}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Selecione pelo menos um produto</InputLabel>
                                    <Select
                                        id="products"
                                        name="products"
                                        label="Selecione os Produtos"
                                        multiple
                                        value={formik.values?.products}
                                        onChange={formik.handleChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        error={formik.touched?.products && Boolean(formik.errors?.products)}
                                        helperText={formik.touched?.products && formik.errors?.products}
                                        fullWidth
                                        required
                                    >
                                        {products?.map((i) => (
                                            <MenuItem key={i.value} value={i.label}>
                                                <Checkbox checked={formik.values?.products.indexOf(i.label) > -1} />
                                                <ListItemText primary={i.label} />
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            type="submit"
                                            size='small'
                                        >
                                            Salvar
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


                                <Grid item xs={12}>
                                    
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

export default ProducerEdit

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),

    },
    button: {
        backgroundColor: '#070',
        width: '100%',
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


