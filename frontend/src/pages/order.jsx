import { orderService } from '../services/order.service.local'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { stayService } from '../services/stay.service.local'


export function Order() {
    const { orderId } = useParams()
    const [order, setOrder] = useState({})
    const [stay, setStay] = useState({})
    useEffect(() => {
        getOrder()
    }, [])
    useEffect(() => {
        if (order.info) {
            getStay();
        }
    }, [order]);

    async function getOrder() {
        try {
            const newOrder = await orderService.getById(orderId)
            setOrder(newOrder)
        }
        catch (err) {
            console.log(err)
        }
    }

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
        const checkout = new Date(order.info.checkout)
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
                        <p>{stay.rating}</p>
                    </div>
                </div>
                <hr />
                <div className="modal-cost">
                    <h3>Price details</h3>
                    <p>{stay.price} x {orderService.getNights(order)} </p>
                    <p>price</p>
                    <hr className='hLine' />
                </div>
                
                <p><span>total price</span><span>price</span></p>
            </div>

            <h1>Request to book</h1>
            <div className="order-summary">
                <h3>Your trip</h3>
                <div className="date"><h4>Dates</h4> <button>Edit</button> <span>{getDate()}</span></div>
                <div className="guest"><h4>Guests</h4> <button>Edit</button> <span>{getGuests()}</span></div>
            </div>
            

        </section>)
}