import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js';
import { userService } from '../services/user.service.js';
import React, { useEffect, useRef, useState, useMemo } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoggedinUser } from '../store/user.actions.js'


export function UserRentals() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const [filterOrdersByHostId, setFilterOrdersByHostId] = useState({host: user._id})
    const { stays } = useSelector(storeState => storeState.stayModule)

    const navigate = useNavigate()

    useEffect(() => {
        loadOrders()
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

    function onStayClick(order) {
        navigate(`/stay/${order.stayId}`)
    }

    if (!orders || !stays) return <div>Loading...</div>

    if (orders.length > 0 && stays.length > 0) return (

        <div className="user-rentals">
            <h1>My rentals</h1>

            <table className='usertrips-table'>
                <thead>
                    <tr>
                        <th>Stay</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Guests</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const stay = stays.find(stay => stay._id === order.stayId)
                        return (
                            <tr key={order._id} onClick={() => onStayClick(order)}>
                                <td>{stay.name}</td>
                                <td>{order.startDate}</td>
                                <td>{order.endDate}</td>
                                <td>{order.guests}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    else return <div>You have no rentals yet</div>
}