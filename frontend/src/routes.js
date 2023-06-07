import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import {Order} from './pages/order.jsx'
import { Login } from './pages/login-page.jsx'
import { Signup } from './pages/signup-page.jsx'
import { UserDetails } from './pages/user-details.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'stay',
        component: <StayIndex />,
        label: 'Stays'
    },
    {
        path: 'stay/:stayId',
        component: <StayDetails />,
        label: 'Stay Details'
    },
    {
        path: 'order/:orderId',
        component: <Order />,
        label: 'Order' 
    },
    {
        path: 'review',
        component: <ReviewIndex />,
        label: 'Reviews'
    },
    {
        path: 'chat',
        component: <ChatApp />,
        label: 'Chat'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    },
    {
        path: 'login',
        component: <Login />,
        label: 'Login'
    },
    {
        path: 'signup',
        component: <Signup />,
        label: 'Sign Up'
    },
    {
        path: 'user/:userId',
        component: <UserDetails/>,
        label: 'User Details' 
    }
]

export default routes