import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Modal, Backdrop, Grid, Slide, TextField, Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const AddTaskModal = ({ open, handleClose, handleCreate, title }) => {

    const classes = useStyles()

    const initialFormState = { description: '', date: '' }
    const validationSchema = yup.object().shape({
        description: yup.string().required('Descrição é obrigatória!'),
        date: yup.date().required('Data é obrigatória!')
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
                                            multiline
                                            rows='2'
                                            variant='outlined'
                                            id="description"
                                            name="description"
                                            label="Descrição da tarefa"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="date"
                                            name="date"
                                            label="Data da tarefa"
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

export default AddTaskModal

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
