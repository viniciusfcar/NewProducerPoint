import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as GiIcons from "react-icons/gi"
import * as RiIcons from "react-icons/ri"
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"

const size = 25

export const menu = [
    {
        title: 'Início',
        path: '/home',
        icon: <AiIcons.AiFillHome size={size} />,
    },
    {
        title: 'Produtor',
        path: '/producer-list',
        icon: <FaIcons.FaHatCowboy size={size} />,
    },
    {
        title: 'Produto',
        path: '/product-list',
        icon: <GiIcons.GiFruitBowl size={size} />,
    },
    {
        title: 'Atividade',
        path: '/activity-list',
        icon: <MdIcons.MdWork size={size} />,
    },
    {
        title: 'Vendas',
        path: '/sales',
        icon: <FaIcons.FaChartLine size={size} />,
    },
    {
        title: 'Tarefas',
        path: '/tasks',
        icon: <BiIcons.BiTask size={size} />,
    },
    {
        title: '´Sítios',
        path: '/site-list',
        icon: <BiIcons.BiStreetView size={size} />,
    },
    {
        title: 'Chuvas',
        path: '/rain-list',
        icon: <BiIcons.BiCloud size={size} />,
    },
]