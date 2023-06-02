import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local.js"
import {Reviews} from "../cmps/reviews.jsx"

export function StayDetails() {
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    useEffect(() => {
        loadStay()
    }, [stayId])

    function loadStay() {
        
        stayService.getById(stayId)
            .then((stay) => {
                console.log(stay)
                setStay(stay)})
            // .catch((err) => {
            //     console.log('Had issues in stay details', err)
            //     showErrorMsg('Cannot load stay')
            //     navigate('/stay')
            // })
    }
console.log(stay)
    if (!stay) return <div>Loading...</div>
    return (
        <section>
            <header className="details-header">
                <h4>{stay.name}</h4>
                <div className="flex space-between">
               <h6> {stay.loc.country},{stay.loc.city}* reviews:{stay.reviews.length} * avrage rate:{(stay.reviews.reduce((acc,review)=>review.rate+acc,0))/stay.reviews.length}
               </h6>
               <h6 >save to favorites share</h6>
               </div>
            </header>

            <div className="details-photo-gallery">
            {stay.imgUrls.map(imgUrl=>{
            return<img src={imgUrl}></img>
            })}
            </div>

            <div className="host-details">those are the host details
            a{stay.type} by {stay.host.fullname} <br/>
            {stay.capacity} Guests, ZZZZ bed-rooms,ZZZZ beds, ZZZZbath-rooms
            <hr/>
            {stay.labels[0]}
            <br/>
            {stay.labels[1]}
            </div>

            <div className="home-details">
                {stay.summary}
                </div>
                <div className="calendare">this is calendare</div>
                <div className="details-reviews"><Reviews stay={stay}/></div>
                <div className="map">here coms the map</div>
                <div className="vital-info">last but not least here is the vital info</div>
        <img src={stay.host.imgUrl} />
        <h6>{stay.amenities.map(amn=>`${amn}, `)}</h6>
        </section>
    )
}