import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local.js"

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
        <h4>{stay.name}</h4>
        by {stay.host.fullname}
        <img src={stay.host.imgUrl} />
        <h6>{stay.amenities.map(amn=>`${amn}, `)}</h6>
        </section>
    )
}