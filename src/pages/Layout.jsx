import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useGetActivitiesQuery } from '../services/apiSlice'
import { setAcitvities } from '../services/activitiesSlice'
import { useDispatch } from 'react-redux'

const Layout = () => {

    const { data, error, isLoading, refetch } = useGetActivitiesQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAcitvities(data));
    }, [data]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout