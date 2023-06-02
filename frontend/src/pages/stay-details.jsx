import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local.js"
import { Reviews } from "../cmps/reviews.jsx"
import { StayAmenities } from "../cmps/stay-amenities.jsx"
import { StayMap } from "../cmps/stay-map.jsx"

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
                setStay(stay)
            })
        // .catch((err) => {
        //     console.log('Had issues in stay details', err)
        //     showErrorMsg('Cannot load stay')
        //     navigate('/stay')
        // })
            //     setStay(stay)
            // })
        // .catch((err) => {
        //     console.log('Had issues in stay details', err)
        //     showErrorMsg('Cannot load stay')
        //     navigate('/stay')
        // })
    }
    function underConstruction() {
        alert('This button is under construction. We are sorry for the inconvenience. Please try again later')
    }
    console.log(stay)
    if (!stay) return <div>Loading...</div>
    return (
        <section className="stay-details">
            <header className="details-header">
                <h4>{stay.name}</h4>
                <div className="flex space-between">
                    <h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{(stay.reviews.reduce((acc, review) => review.rate + acc, 0)) / stay.reviews.length}</span>  · <span> {stay.reviews.length}  reviews </span> · <span>{stay.loc.country},{stay.loc.city}</span>
                    </h6>
                    <div>
                        <button onClick={underConstruction}><i class="fa-solid fa-arrow-up-from-bracket"></i> <sapn>share </sapn></button>
                        <button onClick={underConstruction}><i class="fa-regular fa-heart"></i> <sapn>save</sapn> </button>
                    </div>
                </div>
            </header>

            <div className="details-photo-gallery">
                {stay.imgUrls.map(imgUrl => {
                    return <img src={imgUrl}></img>
                })}
               
            </div>
            < div className="container">
                <div className="host-details">
                  <h4>  {stay.type} by {stay.host.fullname} </h4> <br />
                  {/* <img src={stay.host.imgUrl}/> */}
                  <img src="https://res.cloudinary.com/dtgdzulrf/image/upload/v1685694692/Stay.si/home0/person-donald-900x1080_cvrpzk.jpg"/> 
                  {/* <h6> {stay.capacity} Guests · ZZZZ bed-rooms · ZZZZ beds · ZZZZbath-rooms </h6> */}
                   <h6> {stay.capacity} Guests </h6>
                    <hr />
                    {stay.labels[0]}
                    <br />
                    {stay.labels[1]}
                </div>
                </div>
            <div className="home-details">
                {stay.summary}
            </div>
            <div className="calendare">this is calendare</div>
            <hr/>
            <div className="details-reviews"><Reviews stay={stay} /></div>
            <hr/>
            {/* <div className="map">here coms the map</div> */}
            {/* <div className="vital-info">last but not least here is the vital info</div> */}
            {/* <img src={stay.host.imgUrl} /> */}
            <StayAmenities stay={stay}/>
            <StayMap stay={stay} />
        </section>
    )
}