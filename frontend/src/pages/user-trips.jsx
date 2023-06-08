import { orderService } from '../services/order.service.local'
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'



export function UserTrips() {
    const user = useSelector((storeState) => storeState.userModule.user)

    const [orders, setOrders] = useState([])
    console.log('hello from mytrips')

    useEffect(() => {
        // loadOrders()
        loadOrders()

    }, [])

    console.log(orders)

    async function loadOrders() {
        try {

            const orders = await orderService.query()
            setOrders(orders)
        }
        catch (err) {
            console.log('Cannot load stays', err)
            throw err
        }
    }

    return (
        <div>
            <header>My trips</header>
            <ul className='user-trips'>
                {orders.map(order =>

                    order.buyerId === user._id  &&

                    <li className='order-preview' key={order._id}>
                        <p>
                            {order.info.checkin}
                        </p>
                        <p>
                            {order.info.checkout}
                        </p>
                        <p>Status isAproved :{order.isApproved ? 'yes' : 'pending'}</p>


                    </li>

                )}
            </ul>





        </div>


    )
}