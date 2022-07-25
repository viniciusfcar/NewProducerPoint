import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Slide, TextField, Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const AddRainModal = ({ open, handleClose, handleCreate, title, site }) => {

    const classes = useStyles()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    let year = yesterday.getFullYear()
    let month = yesterday.getMonth()+1
    month = month < 10 ? '0'+month : month
    let day = yesterday.getDate()
    let yesterdayString = year+'-'+month+'-'+day
    const initialFormState = { volume: '', date: yesterdayString, site: site }
    const validationSchema = yup.object().shape({
        date: yup.date().required('Data é obrigatória!'),
        volume: yup.number().required('Volume é obrigatória!'),
    })

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
                    <h2>{title || 'Chuva'}</h2>
                    <Grid container >
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit}>

                                <Grid direction='column' container spacing={2}>

                                    <a
                                        fullWidth
                                        id="site"
                                        name="site"
                                        label="iD do Sítio"
                                        value={site.id}
                                        disabled
                                        visible={false}
                                    />

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nome do Sítio"
                                            value={site.name}
                                            disabled
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="date"
                                            name="date"
                                            label="Data da chuva"
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

                                    <Grid item xs={12}>
                                        <TextField
                                            inputRef={input => input && input.focus()}
                                            fullWidth
                                            multiline
                                            rows='1'
                                            variant='outlined'
                                            id="volume"
                                            name="volume"
                                            type="number"
                                            label="Volume em MLs"
                                            value={formik.values.volume}
                                            onChange={formik.handleChange}
                                            error={formik.touched.volume && Boolean(formik.errors.volume)}
                                            helperText={formik.touched.volume && formik.errors.volume}
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
                            Cadastrar
                        </Button>
                    </div>
                </div>
            </Slide>
        </Modal>
    )
}

export default AddRainModal

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
