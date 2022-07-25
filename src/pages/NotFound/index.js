import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import WarningModal from '../../components/Modals/WarningModal'
import Fail from '../../assets/lotties/fail.json'

const NotFound = () => {

    const history = useHistory()
    const [warningModal, setWarningModal] = useState(true)

    const handleCloseWarningModal = () => setWarningModal(false)

    setTimeout(() => {
        history.push('/home')
    }, 3000);

    return (
        <div>
            <WarningModal
                handleClose={handleCloseWarningModal}
                open={warningModal}
                message={'Está página ainda não está pronta ou não existe!'}
                lottie={Fail}
            />


        </div>
    );
}

export default NotFound