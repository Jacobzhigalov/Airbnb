import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local.js"
import { Reviews } from "../cmps/reviews.jsx"
import { StayAmenities } from "../cmps/stay-amenities.jsx"
import { StayMap } from "../cmps/stay-map.jsx"
import { ReserveForm } from "../cmps/reserve-form.jsx"

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
        <section className="main-layout-stayDetails">

            <section className="stay-details">
                <header className="details-header">
                    <h4>{stay.name}</h4>
                    <div className="flex space-between">
                        <h6> <i className="fa-sharp fa-solid fa-star"></i> <span>{(stay.reviews.reduce((acc, review) => review.rate + acc, 0)) / stay.reviews.length}</span>  · <span> {stay.reviews.length}  reviews </span> · <span>{stay.loc.country},{stay.loc.city}</span>
                        </h6>
                        <div>
                            <button onClick={underConstruction}><i className="fa-solid fa-arrow-up-from-bracket"></i> <span>share </span></button>
                            <button onClick={underConstruction}><i className="fa-regular fa-heart"></i> <span>save</span> </button>
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
                        <h2>  {stay.type} by {stay.host.fullname} </h2> <br />
                        <img src="https://res.cloudinary.com/dtgdzulrf/image/upload/v1685694692/Stay.si/home0/person-donald-900x1080_cvrpzk.jpg" />
                        <h6> {stay.capacity} Guests </h6>
                        <hr />
                        <br />
                        <div className="stay-important">

                            <div className="important-info">

                                <svg className="first-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 18.266l-4.326-2.314-4.326 2.313.863-4.829-3.537-3.399 4.86-.671 2.14-4.415 2.14 4.415 4.86.671-3.537 3.4.863 4.829z" /></svg>
                                <div className="important-info-text">
                                    <h3>{stay.host.fullname} is SuperHost</h3>
                                    <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                </div>
                            </div>
                            <br />
                            <div className="important-info">

                                <svg className="second-svg" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 1c-4.418 0-8 3.582-8 8 0 .585.063 1.155.182 1.704l-8.182 7.296v5h6v-2h2v-2h2l3.066-2.556c.909.359 1.898.556 2.934.556 4.418 0 8-3.582 8-8s-3.582-8-8-8zm-6.362 17l3.244-2.703c.417.164 1.513.703 3.118.703 3.859 0 7-3.14 7-7s-3.141-7-7-7c-3.86 0-7 3.14-7 7 0 .853.139 1.398.283 2.062l-8.283 7.386v3.552h4v-2h2v-2h2.638zm.168-4l-.667-.745-7.139 6.402v1.343l7.806-7zm10.194-7c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm-1 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z" /></svg>
                                <div className="important-info-text">
                                    <h3>Great check-in experience</h3>
                                    <p>100% of recent guests gave the check-in process a 5-star rating.</p>
                                </div>
                            </div>
                            <br />
                            <div className="important-info">

                                <svg className="second-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                                <div className="important-info-text">
                                    <h3>Great Location</h3>
                                    <p>100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        {stay.summary}
                        <hr />
                        <br />
                        <StayAmenities stay={stay} />
                        {/* <hr /> */}
                        <br />
                    </div>
                    <ReserveForm stay={stay} />
                    {/* <div className="reserve-form">
                    <div className="reserve-form-details">
                        <div>${stay.price} night </div>
                        <div>{stay.rating}</div>
                    </div>
                    <div className="reserve-form-checkin">
                        <div className="checkin">
                            <label htmlFor="">check-in</label>
                            <input type="date" placeholder="Add date" />
                        </div>
                        <div className="checkout">
                            <label htmlFor="">check-out</label>
                            <input type="date" placeholder="Add date" />
                        </div>
                        <div className="guests-form">
                            <label htmlFor="">Guests</label>
                            <input type="number" />
                        </div>
                    </div>
                    <button onClick="onRequestBook()">Check availabilaty</button>
                </div> */}
                    {/* <StayAmenities stay={stay} /> */}
                    {/* <div className="home-details">
                    {stay.summary}
                    <hr />
                    <StayAmenities stay={stay} />
                    <hr />
                </div> */}
                </div>
                <br />
                <hr />
                <br />
                <div className="reviews-rating">
                {(stay.reviews.reduce((acc, review) => review.rate + acc, 0)) / stay.reviews.length} * {stay.reviews.length} reviews
                </div>
                <br />
                <div className="details-reviews">
                    <Reviews stay={stay} />
                </div>
                <StayMap stay={stay} />
            </section >
        </section>
    )
}