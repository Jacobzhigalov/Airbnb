import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js'
import { userService } from '../services/user.service.js'
import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format, parseISO, set } from 'date-fns';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import loader from '../assets/img/loader.gif';

import { Chart } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
import randomColor from 'randomcolor';
// import 'chartjs-adapter-date-fns';



export function UserRentals({ userStays }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const [statusChanged, setStatusChanged] = useState(false)
    const filterOrdersByHostId = { host: user._id }
    const [pieChartData, setPieChartData] = useState({})
    const pieChartOptions = {
        responsive: true,
    }
    const userStaysNames = userStays.map(stay => stay.name)

    

    console.log(orders)
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
                const bookings = resolvedOrders.reduce((acc, order) => {
                    const stayId = order.stayId;
                    acc[stayId] = (acc[stayId] || 0) + 1;
                    return acc;
                }, {})
    
                console.log('bookings', bookings)
    
                const chartData = {
                    labels: userStaysNames,
                    datasets: [
                        {
                            label: 'Bookings',
                            data: Object.values(bookings),
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                            hoverOffset: 4,
                        },
                    ],
                };
                
    
                setPieChartData(chartData)
            } catch (error) {
                console.error('Error occurred while fetching data:', error)
            }
        }

        fetchData()
        
        
    }, [userStays, statusChanged])



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
        setStatusChanged(!statusChanged)
        orderService.update(updatedOrder)
        
    }

    function onReject(order) {
        const updatedOrder = { ...order, isAproved: false, status: 'Rejected' }
        delete updatedOrder.guest
        delete updatedOrder.stayName
        setStatusChanged(!statusChanged)
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



    // Maps the stay IDs to their corresponding names
    // const stayNames = stayIds.map(stayId => {
    //   const stay = userStays.find(stay => stay._id === stayId)
    //   return stay ? stay.name : ''
    // });
    const backgroundColor = randomColor({ count: userStays.length })

    // const labels = stayNames
    // const data = stayIds.map(stayId => bookings[stayId] || 0)

    // const chartData = {
    //   labels: labels,
    //   datasets: [
    //     {
    //       label: 'Reservations/Listings',
    //       data: data,
    //       backgroundColor,
    //       hoverOffset: 4
    //     }
    //   ]
    // }

    // const data = {
    //     labels: ['Red', 'Blue', 'Yellow'],
    //     datasets: [
    //       {
    //         label: 'Reservations/Listings',
    //         data: [300, 50, 100],
    //         backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
    //         hoverOffset: 4
    //       }
    //     ]
    //   };



    if (!orders || !orders.length) return <img className="loader" src={loader} />

    if (orders.length > 0) return (

        <section className="user-rentals">
            <div className="charts">
                <div className="chart-container pie">
                    <Pie data={pieChartData} options={pieChartOptions} className="chart pie" />
                </div>
            </div>
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
                                    <TableCell align="center">{order.createrAt ? formatDate(order.createrAt) : formatDate(order.createdAt)}</TableCell>
                                    <TableCell align="center">{order.info.guests.adults}</TableCell>
                                    <TableCell align="center">{order.info.price}</TableCell>
                                    <TableCell align="center" className={checkAndDisplayOrderStatus(order)}>{checkAndDisplayOrderStatus(order)}</TableCell>
                                    <TableCell align="center">
                                        <div className="actions-container">
                                            <button variant="contained" className={`actions btn-approve ${order.status !== 'Pending' ? 'hidden' : ''}`} onClick={() => onAprove(order)}>Approve</button>
                                            <button variant="contained" className={`actions btn-reject ${order.status !== 'Pending' ? 'hidden' : ''} `} onClick={() => onReject(order)}>Reject</button>
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