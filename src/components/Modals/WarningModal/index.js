import React from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import Lottie from 'react-lottie'

import Success from '../../../assets/lotties/success.json'

const WarningModal = ({ open, handleClose, message, lottie }) => {

    const classes = useStyles()

    setTimeout(() => {
        handleClose()
    }, lottie === Success ? 2000 : 5000);

    const lottieConfig = {
        loop: true,
        autoplay: true,
        animationData: lottie ? lottie : Success,
    }

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
                    <Lottie
                        options={lottieConfig}
                        height={50}
                        width={50} />
                    <h3>{message}</h3>
                </div>
            </Fade>
        </Modal>
    );
}

export default WarningModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

}));
