import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js'
import { userService } from '../services/user.service.js'
import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Chart from 'chart.js/auto';



export function UserRentals() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const filterOrdersByHostId = user._id

    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedOrders = await loadOrders(filterOrdersByHostId)

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



    async function loadOrders(filterOrdersByHostId) {
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
        delete updatedOrder.guest
        delete updatedOrder.stayName
        orderService.update(updatedOrder)
    }

    function onReject(order) {
        const updatedOrder = { ...order, isAproved: false, status: 'Rejected' }
        delete updatedOrder.guest
        delete updatedOrder.stayName
        orderService.update(updatedOrder)
    }

    function checkAndDisplayOrderStatus(order) {
        let status = order.status
        if (order.checkout < Date.now()) {
            const updatedOrder = { ...order, status: 'Completed' }
            delete updatedOrder.guest
            delete updatedOrder.stayName
            orderService.update(updatedOrder)
            return 'Completed'
        }
        if (!status) {
            const updatedOrder = { ...order, status: 'Pending' }
            delete updatedOrder.guest
            delete updatedOrder.stayName
            orderService.update(updatedOrder)
            return 'Pending'
        }
        return (status)
    }

    function formatDate(date) {
        let dateObj = date
        let formatString = 'dd/MM/yyyy'
        if (typeof date === 'number')
            dateObj = new Date(date)
        else
            if (date instanceof Date || typeof date === 'string')
                dateObj = parseISO(date)
            else
                return 'Invalid date'

        return format(dateObj, formatString)
    }



    if (!orders) return <div>Loading...</div>

    if (orders.length > 0) return (

        <section className="user-rentals">
            <div className="charts"></div>
            <div className="rentals">
                <h1>{`${orders.length} reservations`}</h1>
                <TableContainer component={Paper} className="rentals-table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Guest</TableCell>
                                <TableCell align="center">Stay</TableCell>
                                <TableCell align="center">Check in</TableCell>
                                <TableCell align="center">Check out</TableCell>
                                <TableCell align="center">Booked</TableCell>
                                <TableCell align="center">Guests</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order._id}
                                // sx={{ '&:td, &:th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <img src={order.guest.imgUrl} alt="guest-img" />
                                        <span>{order.guest.fullname}</span>
                                    </TableCell>
                                    <TableCell align="center">{order.stayName}</TableCell>
                                    <TableCell align="center">{formatDate(order.info.checkin)}</TableCell>
                                    <TableCell align="center">{formatDate(order.info.checkout)}</TableCell>
                                    <TableCell align="center">{formatDate(order.createrAt)}</TableCell>
                                    <TableCell align="center">{order.info.guests.adults}</TableCell>
                                    <TableCell align="center">{order.info.price}</TableCell>
                                    <TableCell align="center">{checkAndDisplayOrderStatus(order)}</TableCell>
                                    <TableCell align="center">
                                        <div className="actions-container">
                                            <button variant="contained" className="actions btn-approve" onClick={() => onAprove(order)}>Approve</button>
                                            <button variant="contained" className="actions btn-reject" onClick={() => onReject(order)}>Reject</button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>

    )
    else return <div>You have no rentals yet</div>

}


{/* <table className="rentals-table">
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            // console.log(order)
                            <tr key={order._id} >
                                <td><img src={order.guest.imgUrl} alt="" /><span>{order.guest.fullname}</span></td>
                                <td className="text-limit">{order.stayName}</td>
                                <td>{formatDate(order.info.checkin)}</td>
                                <td>{formatDate(order.info.checkout)}</td>
                                <td>{formatDate(order.createrAt)}</td>
                                <td>{order.info.guests.adults}</td>
                                <td>${order.info.price}</td>
                                <td className={checkAndDisplayOrderStatus(order)}>{checkAndDisplayOrderStatus(order)}</td>
                                <td><button className="actions btn-approve" onClick={() => onAprove(order)}>Approve</button>
                                <button className="actions btn-reject" onClick={() => onReject(order)}>Reject</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}