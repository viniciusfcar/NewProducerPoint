import React, { useState, useEffect } from 'react'

import api from '../../../../services/api'
import ProducersList from '../../../../components/ProducersList'

import { Area } from './styles'

const ProducerList = () => {

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const getProducers = async () => {
            const response = await api.getAllProducers()
            setProducers(response.data)
        }
        getProducers()
    }, [])

    return (
        <Area>
            <ProducersList
                data={producers}
                title={'Lista de Produtores'}
                isButton={true}
            />
        </Area>
    );
}

export default ProducerList