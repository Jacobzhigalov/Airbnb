import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'react-date-range'
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'

import "react-datepicker/dist/react-datepicker.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { set } from "date-fns"
import { orderService } from '../services/order.service'
import { utilService } from '../services/util.service'

// import {filterBy} from '../store/stay.reducer'

export function ReserveForm({ stay }) {
    const [order, setOrder] = useState({})
    useEffect(() => {
        getOrder()
    }, [])
    const filterBy = useSelector(state => state.stayModule.filterBy)

    let [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();

    async function getOrder() {
        const newOrder = orderService.getEmptyOrder()
        console.log(newOrder)
        //  try {

        newOrder.hostId = stay.host._id
        newOrder.stayId = stay._id
        newOrder.info.checkin = Date.now() + 1000 * 60 * 60 * 24 * 30
        newOrder.info.checkout = Date.now() + 1000 * 60 * 60 * 24 * 37
        newOrder.info.price = getTotalPrice()
        newOrder._id=utilService.makeId()
        setOrder(newOrder)
        // }
        // catch (err) {
        //     console.log(err)
        // }

    }
    function onRequestBook(ev) {
        ev.preventDefault()
        console.log(ev.target)
        navigate('/order/')
    }

    function getNights() {
        if (!order.info) return
        return (-order.info.checkin + order.info.checkout) / (1000 * 60 * 60 * 24)
    }

    function getTotalPrice() {
        if (!order.info) return
        return (stay.price * getNights() + 555)
    }

    function handelChange({ target }) {

    }

    // console.log(filterBy)
    // console.log(stay)
    // console.log(order)
    if (!order.info) return 'loading'
    return (

        <form onSubmit={onRequestBook}>
            <div className="reserve-form">
                <div className="reserve-form-details">
                    <div ><span className="price">${stay.price}</span> night </div>
                    <div><h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{(stay.reviews.reduce((acc, review) => review.rate + acc, 0)) / stay.reviews.length}</span>  · <span className="reviews"> {stay.reviews.length}  reviews </span>
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
                            // type="date"
                            placeholder="Add date"
                            value={utilService.getDate(order.info.checkin)}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="checkout">
                        <label htmlFor="">CHECKOUT</label>
                        <input
                            // type="date"
                            placeholder="Add date"
                            value={utilService.getDate(order.info.checkout)}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="guests-form">
                        <label htmlFor="">GUESTS</label>
                        <input
                            placeholder="1 adult"
                            value={order.info.guests || '1 Adult'}
                        // onChange={handleChange}
                        />

                    </div>
                </div>
                <button >Reserve</button>
                <p>You won't be charged yet</p>
                <div className="pay-for-nights"><span>${stay.price} x {getNights()} nights</span>${stay.price * getNights()}</div>
                <div className="fees"> <span>Airbnb service fee</span> $555</div>
                <hr className="h-line" />
                <div className="total"><span>Total</span> ${order.info.price}</div>
            </div>

        </form>

    )
}