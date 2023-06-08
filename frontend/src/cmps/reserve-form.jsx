import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'react-date-range'
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'

import "react-datepicker/dist/react-datepicker.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { set } from "date-fns"
import { orderService } from '../services/order.service.local'
import { utilService } from '../services/util.service'

// import {filterBy} from '../store/stay.reducer'

export function ReserveForm({ stay }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [order, setOrder] = useState({})
    const filterBy = useSelector(state => state.stayModule.filterBy)
    // const [orderInfo, setOrderInfo] = useState({})
    console.log(order)
    console.log(filterBy)

    useEffect(() => {
        getOrder()
        console.log(order)
    }, [])
    // console.log(filterBy)

    let [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();

    async function getOrder() {
        const newOrder = orderService.getEmptyOrder()
        console.log(newOrder)


        newOrder.hostId = stay.host._id
        newOrder.stayId = stay._id
        newOrder.info.checkin = Date.now() + 1000 * 60 * 60 * 24 * 30
        newOrder.info.checkout = Date.now() + 1000 * 60 * 60 * 24 * 37
        newOrder._id = utilService.makeId()
        newOrder.info.price = getTotalPrice()
        newOrder.info.guests = 2

        // if (user._id) newOrder.buyerId = user._id || ''
        setOrder(newOrder)

        // catch (err) {
        //     console.log(err)
        // }

    }
    async function onRequestBook(ev) {
        ev.preventDefault()
        console.log(ev.target)
        console.log(order)
        await orderService.save(order)
        navigate(`/order/${order._id}`)
    }



    function getTotalPrice() {
        const numberOfNights = (order.info) ? orderService.getNights(order) : 7
        console.log(numberOfNights)

        return (stay.price * numberOfNights + 555)
    }

    // function handleChange({ target }) {
    //     let { value, name: field } = target
    //     setOrder(prevInfo => (
    //         { ...prevInfo, info: { ...prevInfo.info, [field]: value } }))
    //     console.log(order)
    // }

    // console.log(filterBy)
    console.log(stay)
    // console.log(order)

    // const { info :{ checkin, checkout }  } = order
    // console.log(checkin)
    // new Date(checkin).toISOString().slice(0, 10)

    if (!order.info) return 'loading'
    return (

        <form onSubmit={onRequestBook}>
            <div className="reserve-form">
                <div className="reserve-form-details">
                    <div ><span className="price">${stay.price}</span> night </div>
                    <div><h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{stay.rating}</span>  · <span className="reviews"> {stay.reviews.length}  reviews </span>
                    </h6></div>
                </div>
                <div className="reserve-form-checkin">
                    {/* {(selectedMenu === 'checkIn' || selectedMenu === 'checkOut' || selectedMenu === 'when') && (
                <React.Fragment>
                    <DateRangePicker
                        className="date-range-picker"
                        startDatePlaceholder="Check In"
                        endDatePlaceholder="Check Out"
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={[selectionRange]}
                        direction="horizontal"
                        minDate={new Date()}
                        rangeColors={['#f5f5f5']}
                        staticRanges={[]}
                        inputRanges={[]}
                        editableDateInputs={true}
                    />
                    
                </React.Fragment>
            )} */}
                    <div className="checkin">
                        <label htmlFor="">CHECK-IN</label>
                        {/* {console.log(order)} */}
                        <input
                            type="date"
                            placeholder="Add date"
                            name="date"
                            id="date"
                            // value={utilService.getDate(order.info.checkin)}
                            value={0}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="checkout">
                        <label htmlFor="">CHECKOUT</label>
                        <input
                            type="date"
                            placeholder="Add date"
                            name="dateout"
                            id="dateout"
                            // value={utilService.getDate(order.info.checkout)}
                            value={0}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="guests-form">
                        <label htmlFor="">GUESTS</label>
                        <input
                            type="number"
                            placeholder="1 adult"
                            name="guests"
                            id="guests"
                            // value={order.info.guests || '1 Adult'}
                            value={1}
                            // onChange={handleChange}
                        />

                    </div>
                </div>
                <button >Reserve</button>
                <p>You won't be charged yet</p>
                <div className="pay-for-nights"><span>${stay.price} x {orderService.getNights(order)} nights</span>${stay.price * orderService.getNights(order)}</div>
                <div className="fees"> <span>Airbnb service fee</span> $555</div>
                <hr className="h-line" />
                <div className="total"><span>Total</span> ${order.info.price}</div>
            </div>

        </form>

    )
}