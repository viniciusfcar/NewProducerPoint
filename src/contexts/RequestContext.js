import React, { useState, useEffect, createContext } from 'react'

import api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [producers, setProducers] = useState([])
    const [products, setProducts] = useState([])
    const [activities, setActivities] = useState([])

    const loadProducers = async () => {
        const response = await api.getAllProducers()
        setProducers(response.data)
    }

    const loadProducts = async () => {
        const response = await api.getAllProducts()
        setProducts(response.data)
    }

    const loadActivities = async () => {
        const response = await api.getAllActivities()
        setActivities(response.data)
    }

    useEffect(() => {
        loadProducers()
        loadProducts()
        loadActivities()
    }, [])

    return (
        <RequestContext.Provider value={{
            producers, loadProducers,
            products, loadProducts,
            activities, loadActivities
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider
