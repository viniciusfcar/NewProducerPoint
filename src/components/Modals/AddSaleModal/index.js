import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Slide, TextField, Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const AddSaleModal = ({ open, handleClose, handleCreate, title, object }) => {

    const classes = useStyles()

    const initialFormState = { description: '', date: '' }
    const validationSchema = yup.object().shape({
        producer: yup.string().required('Produtor é obrigatório!'),
        product: yup.string().required('Produto é obrigatório!'),
        quantity: yup.string().required('Quantidade é obrigatória!'),
        city: yup.string().required('Cidade é obrigatória!'),
        parameter: yup.string().required('Unidade é obrigatória!'),
        valor: yup.string().required('Valor é obrigatória!'),
        date: yup.date().required('Data é obrigatória!')
    })

    useEffect(() => {
        formik.setFieldValue('object', object)
    }, [])

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleCreate(values)
        }
    })

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Slide direction='up' in={open}>
                <div className={classes.paper}>
                    <h2>{title}</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} spacing={2}>
                            <form onSubmit={formik.handleSubmit}  spacing={2}>

                                <Grid direction='column' container spacing={2}>
                                <Grid direction='row' container spacing={2} margin={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows='1'
                                                variant='outlined'
                                                id="producer"
                                                name="producer"
                                                label="Produtor"
                                                disabled={true}
                                                value={formik.values?.object?.producer?.name}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                required
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows='1'
                                                variant='outlined'
                                                id="product"
                                                name="product"
                                                label="Produto"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}/>

                                    <Grid direction='row' container spacing={2} margin={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows='1'
                                                variant='outlined'
                                                id="quantity"
                                                name="quantity"
                                                label="Quantidade"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                required
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows='1'
                                                variant='outlined'
                                                id="parameter"
                                                name="parameter"
                                                label="Unidade"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}/>
                                    <Grid direction='row' container spacing={2}>
                                        <Grid item xs={12} md={6}>   
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows='1'
                                                variant='outlined'
                                                id="valor"
                                                name="valor"
                                                label="Valor da venda"
                                                type="number"
                                                value={formik.values.valor}
                                                onChange={formik.handleChange}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows='1'
                                            variant='outlined'
                                            id="city"
                                            name="Cidade"
                                            label="Vendido para"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            onClick={formik.handleSubmit}
                            className={classes.yesButton}
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            Criar
                        </Button>
                    </div>
                </div>
            </Slide>
        </Modal>
    )
}

export default AddSaleModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 8,
    },
    yesButton: {
        color: '#fff',
        height: 40,
        width: '100%',
        fontSize: 16,
        borderRadius: 5,
        border: 'none',
        backgroundColor: '#007200',
        cursor: 'pointer',
        textTransform: 'uppercase',

        '&:hover': {
            background: '#005200'
        },

    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    }
}));
