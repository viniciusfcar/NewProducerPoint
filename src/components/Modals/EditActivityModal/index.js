import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Fade, TextField
} from '@material-ui/core'

import api from '../../../services/api'

const EditActivityModal = ({ open, handleClose, handleUpdate, title, label, labelButton, id }) => {

    const classes = useStyles()
    const initialFormState = { label: '' }
    const validationSchema = yup.object().shape({
        label: yup.string().required('Nome é obrigatório'),
    })

    useEffect(() => {
        const getActivityById = async (id) => {
            const response = await api.getActivityById(id)
            formik.setFieldValue('label', response.data.label)
        }
        getActivityById(id)
    }, [])

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleUpdate(values)
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
            <Fade direction='up' in={open}>
                <div className={classes.paper}>
                    <h2>{title}</h2>
                    <Grid container >
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit}>

                                <Grid direction='column' container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="label"
                                            name="label"
                                            label={label}
                                            value={formik.values.label}
                                            onChange={formik.handleChange}
                                            error={formik.touched.label && Boolean(formik.errors.label)}
                                            helperText={formik.touched.label && formik.errors.label}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <button type='button' onClick={formik.handleSubmit} className={classes.yesButton}>{labelButton}</button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default EditActivityModal

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
        backgroundColor: '#049DCF',
        cursor: 'pointer',
        textTransform: 'uppercase',

        '&:hover': {
            background: '#016788'
        },

    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    }
}));
