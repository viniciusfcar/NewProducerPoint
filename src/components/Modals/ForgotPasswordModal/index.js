import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Fade, TextField, Button, CircularProgress
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const ForgotPasswordModal = ({
    open, handleClose, title, label, sendEmail, loading
}) => {

    const classes = useStyles()

    const initialFormState = { email: '' }
    const validationSchema = yup.object().shape({
        email: yup.string().email('E-mail inválido!').required('E-mail é obrigatório!')
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            sendEmail(values.email)
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
                                            className={classes.input}
                                            autoFocus
                                            fullWidth
                                            variant='outlined'
                                            id="email"
                                            name="email"
                                            label={label}
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
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
                            startIcon={!loading && <SendIcon />}
                            color="primary"
                            variant="contained"
                            type='submit'
                            fullWidth
                        >{loading ? (
                            <CircularProgress color='inherit' size={24} />
                        ) : (
                            <span>Enviar</span>
                        )
                            }
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ForgotPasswordModal

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
        padding: theme.spacing(2, 5, 3),
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
    },
    input: {
        width: 250
    }
}));
