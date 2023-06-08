import { orderService } from '../services/order.service.local'
import { Link, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { stayService } from '../services/stay.service.local'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.local'





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
    const location=useLocation()
    useEffect(() => {
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
        const str = (order.info.guests === 1) ? "1 guest" : `${order.info.guests} guests`
        return str
    }
    function checkUser() {
        let str
        if (order.buyerId) {
            str = 'userlogged'
        }
        else {
            str = 'NOUSER'
        }
        console.log(str)
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

    function onReserve() {
        order.buyerId = user._id
        orderService.save(order)
        console.log('order', order)
        setOrder(order)
        navigate('/stay')
    }

    const { fullname, username, password } = credentials

    if (!order.info) return 'loading'
    if (!stay.imgUrls) return 'loading'
    return (
        <section className='order-page'>

            <div className='order-modal'>
                <div className='modal-details'>
                    <img src={stay.imgUrls[0]} />
                    <div className='info'>
                        <p>{stay.type}</p>
                        <p>{stay.name}</p>
                        <p className="rating"><i className="fa-sharp fa-solid fa-star"></i>{stay.rating}({stay.reviews.length})</p>
                    </div>
                </div>
                <hr className='hLine' />
                <div className="modal-cost">
                    <h3>Price details</h3>
                    <div className='price-details'>
                        <p>${stay.price} x {orderService.getNights(order)}nights </p>
                        <p>${stay.price * orderService.getNights(order)}</p>
                    </div>
                    <div className='fee-details'>
                        <p>Airbnb service fee </p>
                        <p>$555</p>
                    </div>
                    <hr className='hLine' />
                </div>

                <p><span>Total (USD)</span><span>${order.info.price}</span></p>
            </div>

            <h1>Request to book</h1>
            <div className="order-summary">
                <h3>Your trip</h3>
                <div className="date"><span><h4>Dates</h4>{getDate()} </span> <span><button>Edit</button></span></div>
                <div className="guest"><span><h4>Guests</h4>{getGuests()} </span> <span><button>Edit</button></span></div>
                <hr className='hLine' />
            </div>

            <div>{checkUser()}</div>


        </section>)
}