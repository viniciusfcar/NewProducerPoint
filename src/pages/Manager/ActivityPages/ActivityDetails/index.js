import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProducersList from '../../../../components/ProducersList'

const ActivityDetails = () => {

    const { id } = useParams()

    const [producers, setProducers] = useState([])
    const [activity, setActivity] = useState([])

    useEffect(() => {
        const getActivity = async (id) => {
            const response = await api.getActivityById(id)
            setActivity(response.data)
        }
        getActivity(id)
    }, [])

    useEffect(() => {
        const getProducersByActivity = async (id) => {
            const response = await api.getProducersByActivity(id)
            setProducers(response.data)
        }
        getProducersByActivity(id)
    }, [])

    return (
        <ProducersList
            data={producers}
            title={`Todos da Categoria: ${activity?.label}`}
            isButton={false}
        />
    );
}

export default ActivityDetails
