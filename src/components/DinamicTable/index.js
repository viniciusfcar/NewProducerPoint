import React, { useMemo, useState, useEffect } from 'react'
import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core'

import { Container } from './styles'



const DinamicTable = ( {array, title, collumnName, rowName, sumYear, summonth, unit } ) => {

    const classes = useStyles()
    const [yearsArray, setYearsArray] = useState([])

    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ' ]    

    const yearsSum = async (array) => {
        let newArray = []
        let months = []
        let year = ' '
        let month = ' '
        let sum = 0
        let sumMonth = 0
        let total = 0
        await array?.forEach(element => {

            if(element.date.substring(5,6) !==  month) {
                if(month !== ' ' ) {
                    months.push( {month: month, volume: sumMonth } )
                    sumMonth = 0
                }
                month = element.date.substring(4,2)
                sumMonth += element.volume;
            } else {
                sumMonth += element.volume;
            }

            if(element.date.substring(0,4) !==  year) {
                if(year !== ' ' ) {
                    newArray.push( {year: year, volume: sum, months: months } )
                    months = []
                    sum = 0
                }
                year = element.date.substring(0,4)
                month = element.date.substring(4,2)
                sum += element.volume;
            } else {
                sum += element.volume;
            }
            total += element.volume;
            

        });
        await months.push( {month: month, volume: sumMonth } )
        await newArray.push( {year: year, volume: sum, months: months } )
        await newArray.push( {year: 'Total Ano', volume: total } );
        console.log(newArray)
        setYearsArray(newArray)
    }

    useEffect(() => {
        yearsSum(array)
    }, [])

    return (
        < >
            {!!title ?
            <div className='title--box'>
                <h3>{title}</h3>
            </div>
            : ''
            }
            
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell className='title--table' align="left">{collumnName}</TableCell>
                            {yearsArray?.map(r =><>
                                <TableCell className='title--table' align="left">{r.year}</TableCell>
                                <TableCell align="left">{r.volume}</TableCell>
                            </>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell className='title--table' align="left">{rowName}</TableCell>
                            {yearsArray?.map(r =>
                            <TableCell align="left">
                                <TableBody>
                                <TableRow >
                                {r.months?.map(m =>
                                    <TableCell align="left">{months[m.month-1]}</TableCell>
                                )}
                                </TableRow>
                                <TableRow >
                                {r.months?.map(m =>
                                    <TableCell align="left">{m.volume}</TableCell>
                                )}
                                </TableRow>
                                </TableBody>
                            </TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default DinamicTable

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: '100%',
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none'
    }
}))