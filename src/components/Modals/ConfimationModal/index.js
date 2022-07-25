import React from 'react'

import { makeStyles, Modal, Backdrop, Fade, Button } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

const ConfimationModal = ({ open, handleClose, title, doDelete }) => {

    const classes = useStyles();

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
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2>{title}</h2>
                    <div className={classes.buttons}>
                        <Button
                            onClick={doDelete}
                            className={classes.yesButton}
                            startIcon={<CheckCircleIcon />}
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            SIM
                        </Button>
                        <Button
                            onClick={handleClose}
                            className={classes.noButton}
                            startIcon={<CancelIcon />}
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            NÃO
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ConfimationModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 8,
    },
    yesButton: {
        backgroundColor: '#007200',
        marginRight: '2%',

        '&:hover': {
            background: '#005200'
        },
    },
    noButton: {
        backgroundColor: '#da1e37',

        '&:hover': {
            background: '#920000'
        },
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}));
