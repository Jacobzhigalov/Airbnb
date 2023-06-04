import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export function ReserveForm({stay}){
    let [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();

function onRequestBook(ev){
    ev.preventDefault()
    console.log(ev.target)
    navigate('/order')
}
function handelChange({target}){


}

    return(
        <form onSubmit={onRequestBook}>
        <div className="reserve-form">
        <div className="reserve-form-details">
            <div>${stay.price} night </div>
            <div>{stay.rating}</div>
        </div>
        <div className="reserve-form-checkin">
            <div className="checkin">
                <label htmlFor="">check-in</label>
                <input 
                type="date" 
                placeholder="Add date" 
                // value={}
                // onChange={handleChange}
                />
            </div>
            <div className="checkout">
                <label htmlFor="">check-out</label>
                <input 
                type="date" 
                placeholder="Add date" 
                // value={}
                // onChange={handleChange}
                />
            </div>
            <div className="guests-form">
                <label htmlFor="">Guests</label>
                <input 
                type="number" 
                placeholder="how many guests?"
                // value={3}
                // onChange={handleChange}
                />
                
            </div>
        </div>
        <button >Check availabilaty</button>
    </div>
    </form>
    )
}