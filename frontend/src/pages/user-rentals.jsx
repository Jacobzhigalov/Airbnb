import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js';
import { loadUser } from '../store/user.actions.js'
import React, { useEffect, useRef, useState, useMemo } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoggedinUser } from '../store/user.actions.js'
import { loadStays, setS } from '../store/stay.actions.js'
import { toDate } from 'date-fns';


export function UserRentals() {
    const user = useSelector((storeState) => storeState.userModule.user)
    // const guest = useSelector((storeState) => storeState.userModule.watchedUser)
    const [orders, setOrders] = useState([])
    const [filterOrdersByHostId, setFilterOrdersByHostId] = useState({host: user._id})
    const { stays } = useSelector(storeState => storeState.stayModule)

    const navigate = useNavigate()

    useEffect(() => {
        loadOrders()
        loadStays()

    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query(filterOrdersByHostId)
            setOrders(orders)
        }
        catch (err) {
            console.log('Cannot load orders', err)
            throw err
        }
    }

    async function getGuestName(order) {
        try {
             const guest = await loadUser(order.buyerId)
             console.log('load guest',guest)
             return guest
        }
        catch (err) {
            console.log('Cannot load guest', err)
        }
        
    }
    


    function onStayClick(order) {
        navigate(`/stay/${order.stayId}`)
    }

    function onAprove(order) {
        const updatedOrder = { ...order, isAproved: true, status: 'Approved' }
        orderService.update(updatedOrder)
        console.log('approve')
    }

    function onReject(order) {
        const updatedOrder = { ...order, isAproved: false, status: 'Rejected' }
        orderService.update(updatedOrder)
        console.log('reject')
    }

    function checkAndDisplayOrderStatus(order){
        let status = order.status
        if (order.checkout < Date.now()){
            const updatedOrder = { ...order, status: 'Completed' }
            orderService.update(updatedOrder)
            return 'Completed'
        }
        return (status) 
    }

    if (!orders || !stays) return <div>Loading...</div>

    if (orders.length > 0 && stays.length > 0) return (

        <div className="user-rentals">
            <h1>My rentals</h1>

            <table className="usertrips-table">
                <thead>
                    <tr>
                        <th>Guest</th>
                        <th>Stay</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Booked</th>
                        <th>Guests</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th colSpan={2}>Actions</th>
                    </tr> 
                </thead>
                <tbody>
                    {orders.map(order => {
                        const stay = stays.find(stay => stay._id === order.stayId)
                        return (
                            <tr key={order._id} /*onClick={() => onStayClick(order)}*/>
                                <td>{`${getGuestName(order)}`}</td>
                                <td>{stay.name}</td>
                                <td>{order.info.checkin}</td>
                                <td>{order.info.checkout}</td>
                                <td>{`${toDate(order.createrAt)}`}</td>
                                <td>{order.info.guests.adults}</td>
                                <td>{order.info.price}</td>
                                <td className={checkAndDisplayOrderStatus(order)}>{checkAndDisplayOrderStatus(order)}</td>
                                <td><button className="actions btn-approve" onClick={() => onAprove(order)}>Approve</button></td>
                                <td><button className="actions btn-reject" onClick={() => onReject(order)}>Reject</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    else return <div>You have no rentals yet</div>
}