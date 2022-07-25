import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProfileDetails from '../../../../components/ProfileDetails'

const ProducerDetails = () => {

    const { id } = useParams()
    const [manager, setManager] = useState([])

    useEffect(() => {
        const getManagerById = async (id) => {
            const response = await api.getManagerById(id)
            setManager(response.data)
        }
        getManagerById(id)
    }, [])

    return (
        <ProfileDetails data={manager} />
    );
}

export default ProducerDetails