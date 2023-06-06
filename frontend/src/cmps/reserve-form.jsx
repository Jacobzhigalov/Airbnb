import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export function ReserveForm({ stay }) {
    let [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();

    function onRequestBook(ev) {
        ev.preventDefault()
        console.log(ev.target)
        navigate('/order')
    }
    function handelChange({ target }) {


    }

    return (
        <form  onSubmit={onRequestBook}>
            <div className="reserve-form">
                <div className="reserve-form-details">
                    <div ><span className="price">${stay.price}</span> night </div>
                    <div><h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{stay.rating}</span>  · <span className="reviews"> {stay.reviews.length}  reviews </span>
                        </h6></div>
                </div>
                <div className="reserve-form-checkin">
                    <div className="checkin">
                        <label htmlFor="">CHECK-IN</label>
                        <input
                            // type="date"
                            placeholder="Add date"
                        // value={}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="checkout">
                        <label htmlFor="">CHECKOUT</label>
                        <input
                            // type="date"
                            placeholder="Add date"
                        // value={}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="guests-form">
                        <label htmlFor="">GUESTS</label>
                        <input
                            placeholder="1 Adult"
                        // value={3}
                        // onChange={handleChange}
                        />

                    </div>
                </div>
                <button >Reserve</button>
                <p>You won't be charged yet</p>
                <div className="pay-for-nights"><span>${stay.price} x 3 nights</span>${stay.price*3}</div>
                <div className="fees"> <span>Airbnb service fee</span> $555</div>
                <hr className="h-line"/>
                <div className="total"><span>Total</span> $2559</div>
            </div>
           
        </form>
        
    )
}