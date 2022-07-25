import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProducersList from '../../../../components/ProducersList'

const ProductDetails = () => {

    const { id } = useParams()

    const [producers, setProducers] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async (id) => {
            const response = await api.getProductById(id)
            setProduct(response.data)
        }
        getProduct(id)
    }, [])

    useEffect(() => {
        const getProducersByProduct = async (id) => {
            const response = await api.getProducersByProduct(id)
            setProducers(response.data)
        }
        getProducersByProduct(id)
    }, [])

    return (
        <ProducersList
            data={producers}
            title={`Produtores de ${product?.label}`}
            isButton={false}
        />
    );
}

export default ProductDetails
