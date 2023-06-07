import React from 'react'
import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'
import { setIsFilterShown } from './store/header.actions'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'

export function RootCmp() {
    const { isFilterShown } = useSelector(state => state.headerModule)
    function handleMainContentClick() {
        setIsFilterShown(false)
    }

    return (
        <React.Fragment>
            <div className={`header-background-screen ${isFilterShown ? '' : 'hidden'}`} ></div>
            <div className='main-layout main' >
                <AppHeader />
                <main className="main-content" >
                    <div className={`gray-screen ${isFilterShown ? '' : 'hidden'}`}></div>
                    <div className={`white-screen ${isFilterShown ? '' : 'hidden'}`} onClick={handleMainContentClick}></div>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route path="user/:id" element={<UserDetails />} />
                    </Routes>
                </main>
                <AppFooter />
            </div>
        </React.Fragment>
    )
}


