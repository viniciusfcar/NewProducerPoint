import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Slide, TextField, Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const AddModal = ({ open, handleClose, handleCreate, title, label, labelButton }) => {

    const classes = useStyles()

    const initialFormState = { label: '' }
    const validationSchema = yup.object().shape({
        label: yup.string().required('Nome é obrigatório'),
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
                        <Button
                            onClick={formik.handleSubmit}
                            className={classes.yesButton}
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            {labelButton}
                        </Button>
                    </div>
                </div>
            </Slide>
        </Modal>
    )
}

export default AddModal

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
        backgroundColor: '#007200',
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
