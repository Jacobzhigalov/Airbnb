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
import { addDays } from 'date-fns';
// import {filterBy} from '../store/stay.reducer'

export function ReserveForm({ stay }) {

    const [dates, setDate] = useState([
        {
            startDate: addDays(new Date(), 30),
            endDate: addDays(new Date(), 37),
            key: 'selection'
        }
    ]);
    useEffect(() => {
        getOrder()
    }, [dates])

    const user = useSelector(storeState => storeState.userModule.user)
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

        console.log(dates)
        newOrder.hostId = stay.host._id
        newOrder.stayId = stay._id
        newOrder.info.checkin = dates[0].startDate
        newOrder.info.checkout = dates[0].endDate
        newOrder._id = utilService.makeId()
        newOrder.info.price = getTotalPrice()
        newOrder.buyerId = (user === null) ? '' : user._id
        setOrder(newOrder)

    }
    async function onRequestBook(ev) {
        ev.preventDefault()
        console.log(ev.target)
        console.log(order)

        const params = new URLSearchParams({order:JSON.stringify(order)})
       
        navigate(`/order?${params}`)
    }



    function getTotalPrice() {
        const numberOfNights = (order.info) ? orderService.getNights(order) : 7

        return (stay.price * numberOfNights + 555)
    }

    function handelChange({ target }) {

    }

    // console.log(filterBy)
    console.log(stay)
    // console.log(order)
    if (!order.info) return 'loading'
    return (

        <form onSubmit={onRequestBook}>
            <React.Fragment>
                <DateRangePicker
                    onChange={item => setDate([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={dates}
                    direction="horizontal"
                // className="date-range-picker"
                // startDatePlaceholder="Check In"
                // endDatePlaceholder="Check Out"
                // onChange={handleSelect}
                // showSelectionPreview={true}
                // moveRangeOnFirstSelection={false}
                // retainEndDateOnFirstSelection={false}
                // months={2}
                // ranges={[selectionRange]}
                // direction="horizontal"
                // minDate={new Date()}
                // rangeColors={['#f5f5f5']}
                // staticRanges={[]}
                // inputRanges={[]}
                // editableDateInputs={true}
                />

            </React.Fragment>
            <div className="reserve-form">
                <div className="reserve-form-details">
                    <div ><span className="price">${stay.price}</span> night </div>
                    <div><h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{stay.rating}</span>  · <span className="reviews"> {stay.reviews.length}  reviews </span>
                    </h6></div>
                </div>
                <div className="reserve-form-checkin">
                    {/* {(selectedMenu === 'checkIn' || selectedMenu === 'checkOut' || selectedMenu === 'when') && ( */}


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
                <div className="pay-for-nights"><span>${stay.price} x {orderService.getNights(order)} nights</span>${stay.price * orderService.getNights(order)}</div>
                <div className="fees"> <span>Airbnb service fee</span> $555</div>
                <hr className="h-line" />
                <div className="total"><span>Total</span> ${order.info.price}</div>
            </div>

        </form>

    )
}