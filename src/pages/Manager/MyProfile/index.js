import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../services/api'

import ProfileDetails from '../../../components/ProfileDetails'

const MyProfile = () => {

    const { id } = useParams()
    const [profile, setProfile] = useState([])

    useEffect(() => {
        const getManager = async (id) => {
            const response = await api.getManagerById(id)
            setProfile(response.data)

        }
        getManager(id)
    }, [])

    return (
        <ProfileDetails data={profile} />
    );
}

export default MyProfile


