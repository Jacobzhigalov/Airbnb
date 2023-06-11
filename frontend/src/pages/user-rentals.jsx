import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js'
import { userService } from '../services/user.service.js'
import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns';



export function UserRentals() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const filterOrdersByHostId = user._id

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedOrders = await loadOrders()

                const updatedOrders = loadedOrders.map(async (order) => {
                    const guest = await loadUser(order.buyerId)
                    const stay = await loadStay(order.stayId)
                    let updatedOrder = { ...order }
                    if (guest) {
                        updatedOrder = { ...updatedOrder, stayName: stay.name, guest: { fullname: guest.fullname, imgUrl: guest.imgUrl } }
                    }

                    if (stay) {
                        updatedOrder = { ...updatedOrder, stayName: stay.name }
                    }

                    return updatedOrder

                })

                const resolvedOrders = await Promise.all(updatedOrders)
                setOrders(resolvedOrders)
            } catch (error) {
                console.error('Error occurred while fetching data:', error)
            }
        }

        fetchData()
    }, [])



    async function loadOrders() {
        try {
            const orders = await orderService.query(filterOrdersByHostId)
            return orders
        }
        catch (err) {
            console.log('Cannot load orders', err)
            throw err
        }
    }

    async function loadStay(stayId) {
        try {
            const stay = await stayService.getById(stayId)
            return stay
        }
        catch (err) {
            console.log('Cannot load stay', err)
        }
    }

    async function loadUser(userId) {
        try {
            const user = await userService.getById(userId)
            return user
        }
        catch (err) {
            console.log('Cannot load user', err)
        }
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

    function checkAndDisplayOrderStatus(order) {
        let status = order.status
        if (order.checkout < Date.now()) {
            const updatedOrder = { ...order, status: 'Completed' }
            orderService.update(updatedOrder)
            return 'Completed'
        }
        return (status)
    }

    function formatDate(date) {
        let dateObj = date
        let formatString = 'dd/MM/yyyy'
        if(typeof date === 'number')
        dateObj = new Date(date)
         else
        if(date instanceof Date || typeof date === 'string')
        dateObj = parseISO(date)
        else 
        return 'Invalid date'
        
         return format(dateObj, formatString)
    }

    if (!orders) return <div>Loading...</div>

    if (orders.length > 0) return (

        <div className="user-rentals">
            <h1>My rentals</h1>

            <table className="usertrips-table">
                <thead>
                    <tr>
                        <th colSpan={2}>Guest</th>
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
                        return (
                            <tr key={order._id} >
                                <td><img src={order.guest.imgUrl} alt="" /></td>
                                <td>{order.guest.fullname}</td>
                                <td>{order.stayName}</td>
                                <td>{formatDate(order.info.checkin)}</td>
                                <td>{formatDate(order.info.checkout)}</td>
                                <td>{formatDate(order.createrAt)}</td>
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