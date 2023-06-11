import { orderService } from '../services/order.service'
import { Link, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { loadUsers, signup, logout, login } from '../store/user.actions.js'
import { stayService } from '../services/stay.service'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'


import { setHeaderScales } from '../store/header.actions'


export function Order() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [credentials, setCredentials] = useState(
        userService.getEmptyCredentials()
    )
    const navigate = useNavigate();

    // const { orderId } = useParams()
    const [order, setOrder] = useState({})
    const [stay, setStay] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const headerScales = useSelector(state => state.headerModule.headerScales)
    const location=useLocation()
    useEffect(() => {
        setHeaderScales({ ...headerScales, width: 'wide' })
        const entries=searchParams.get('order')
        if(entries){
            setOrder(JSON.parse(entries))
            getStay()}
        // const order=JSON.parse(entries)
        // const params=new URLSearchParams(location.search)
        // const order=Object.fromEntries(params.entries())
        // console.log(order)
        // getOrder()
    }, [])
    useEffect(() => {
        if (order.info) {
            getStay();
        }
    }, [order]);
    // async function getOrder() {
    //     try {
    //         const newOrder = await orderService.getById(orderId)
    //         setOrder(newOrder)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    async function getStay() {
        try {
            const newStay = await stayService.getById(order.stayId)
            console.log(newStay)
            setStay(newStay)
        }
        catch (err) {
            console.log('Had issues in stay details', err)
            // showErrorMsg('Cannot load stay')
            // navigate('/stay')
        }
    }
    function getDate() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const checkin = new Date(order.info.checkin)
        console.log(checkin)
        const checkout = new Date(order.info.checkout)
        console.log(checkout)
        let orderDate
        if (checkin.getMonth() === checkout.getMonth()) {
            orderDate = `${(monthNames[checkin.getMonth()]).substring(0, 3)} ${checkin.getDate()} – ${checkout.getDate()}`
        }
        else {
            orderDate = `${(monthNames[checkin.getMonth()]).substring(0, 3)} ${checkin.getDate()} – ${(monthNames[checkout.getMonth()]).substring(0, 3)} ${checkout.getDate()}`
        }
        return orderDate
    }
    function getGuests() {
        let str=''
         str += (order.info.guests.adults === 1) ? "1 guest" : `${order.info.guests.adults+order.info.guests.children} guests`
         if (order.info.guests.infants) str+=`, ${order.info.guests.infants} infants`
         if (order.info.guests.pets) str+=`, ${order.info.guests.pets} pets`
        return str
    }
   async function saveOrder(){
     await    orderService.save(order)
     console.log('order saved')
    }
    function handleChange({ target }) {
        let { value, name: field } = target
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }
    function onSubmit(ev) {
        ev.preventDefault()
        // console.log(user)
        // console.log(user.username)
        // const username = user.username
        login(credentials)
        // navigate(`order/${order._id}`)
    }
    async function onReserve() {

        order.buyerId = user._id
        await orderService.save(order)
        console.log('order', order)
        setOrder(order)
        navigate('/stay')
    }
console.log(order)
    const { fullname, username, password } = credentials
    if (!order.info) return 'loading'
    if (!stay.imgUrls) return 'loading'

    return (
        <section className='order-page'>
            <div className='order-modal'>
                <div className='modal-details'>
                    <img src={stay.imgUrls[0]} />
                    <div className='info'>
                        <p className="type">{stay.type}</p>
                        <p className="name">{stay.name}</p>
                        <p className="rating"><i className="fa-sharp fa-solid fa-star"></i><span>{stay.rating}</span><span> ({stay.reviews.length} reviews)</span></p>
                    </div>
                </div>
                <hr className='hLine' />
                <div className="modal-cost">
                    <h3>Price details</h3>
                    <div className='price-details'>
                        <p>${stay.price} x {orderService.getNights(order)} nights </p>
                        <p>${stay.price * orderService.getNights(order)}</p>
                    </div>
                    <div className='fee-details'>
                        <p>Airbnb service fee </p>
                        <p>$555</p>
                    </div>
                    <hr className='hLine' />
                </div>
                <p className='total'><span>Total (USD)</span><span>${order.info.price}</span></p>
            </div>
            <h1>Request to book</h1>
            <div className="order-summary order-summary-div">
                <h3>Your trip</h3>
                <div className="date order-summary-div"><span><h4>Dates</h4>{getDate()} </span> <span><button>Edit</button></span></div>
                <div className="guest order-summary-div"><span><h4>Guests</h4>{getGuests()} </span> <span><button>Edit</button></span></div>
                <hr className='hLine' />
                {user &&
                    <button className="order-summary-button" onClick={onReserve} >Confirm</button>
                }
                {!user &&
                    <div className='login-reserve-container'>
                        <header>Please Log In</header>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label className='login-main-label'>UserName</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    // placeholder='Username'
                                    value={username}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label className='login-main-label'>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    // placeholder="Password"
                                    value={password}
                                    onChange={handleChange} />
                            </div>
                            <button>Log in</button>
                        </form>
                    </div>
                }
            </div>
        </section>)
}