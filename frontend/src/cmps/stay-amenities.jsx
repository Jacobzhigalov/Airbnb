import { utilService } from "../services/util.service.js"


export function StayAmenities({ stay }) {

    // console.log('hello',utilService.getIcon(stay.amenities[0]))

    return (
        <section>
            <h2>What this place offers</h2>
            <br />
            <ul className="amenities-list">
                {stay.amenities.slice(0, 10).map(amenity =>
                    <div>
                        <li className="amenity-preview" key={amenity}>
                            <img src={utilService.getIcon(amenity)} alt="smth" />
                            <p>
                                {amenity}
                            </p>
                        </li>
                    </div>
                )
                }

            </ul>
        </section>
    )
}