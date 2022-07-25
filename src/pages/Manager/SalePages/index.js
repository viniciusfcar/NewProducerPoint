import React, { useState, useEffect, useContext } from 'react'

import api from '../../../services/api'
import SalesList from '../../../components/SalesList'

import { Area } from './styles'

import {
    makeStyles, TableContainer, Paper
} from '@material-ui/core'

const SalePage = () => {

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
            <SalesList 
                data={producers}
                isButton={true}
                title={'Lista de Vendas'}
            />
        </Area>
    );
}

export default SalePage

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: "100%",
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: "100%",
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none'
    }
}))