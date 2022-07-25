import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProfileEdit from '../../../../components/ProfileEdit'

const AdminEdit = () => {

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
        <ProfileEdit data={manager} />
    );
}

export default AdminEdit