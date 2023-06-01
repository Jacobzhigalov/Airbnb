import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { StayFilterHeader } from './stay-filter'
import { setFilterBy } from '../store/stay.actions.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const navigate = useNavigate();

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch(err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onSetFilter(filter) {
        setFilterBy(filter)
        console.log('filterBy', filterBy)
    }


    function onLogoClick(){
        navigate(`/stay`)
     }

    return (
        <header className="app-header">
            
            {/* <nav> */}
               <a href="/stay">GetStay</a>
                {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}

                {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                } */}
                
            {/* </nav> */}

            <StayFilterHeader filterBy={filterBy} onSetFilter={onSetFilter}  />
            {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        {/* <span className="score">{user.score?.toLocaleString()}</span> */}
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }

        </header>
    )
}