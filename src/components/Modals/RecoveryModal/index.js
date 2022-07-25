import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Fade, TextField, Button,
    InputAdornment, IconButton, CircularProgress
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const RecoveryModal = ({ open, handleClose, title, changePassword, loading }) => {

    const classes = useStyles()
    const [show, setShow] = useState(false)

    const initialFormState = { password: '', passwordConfirmation: '' }
    const validationSchema = yup.object().shape({
        password: yup.string().required('Senha é obrigatório!'),
        passwordConfirmation: yup.string()
            .test('As senhas correspondem', 'As senhas não correspondem!', function (value) {
                return this.parent.password === value
            })
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            changePassword(values.password)
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
                                            type='password'
                                            id="password"
                                            name="password"
                                            label='Digite uma nova senha'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <Grid direction='column' container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            variant='outlined'
                                            type={show ? 'text' : 'password'}
                                            id="passwordConfirmation"
                                            name="passwordConfirmation"
                                            label='Confirme a nova senha'
                                            value={formik.values.passwordConfirmation}
                                            onChange={formik.handleChange}
                                            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            color='default'
                                                            onClick={() => setShow(!show)}
                                                        >
                                                            {show ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
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
                            startIcon={!loading && <SaveIcon />}
                            color="primary"
                            variant="contained"
                            type='submit'
                            fullWidth
                        >{loading ? (
                            <CircularProgress color='inherit' size={24} />
                        ) : (
                            <span>Criar</span>
                        )
                            }
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default RecoveryModal

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
