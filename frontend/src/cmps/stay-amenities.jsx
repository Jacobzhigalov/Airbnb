
export function StayAmenities({ stay }) {


    return (
        <section>
            <h2>What this place offers</h2>
            <ul className="amenities-list">
                    {stay.amenities.map(amenity =>
                        <li className="amenity-preview" key={amenity}>
                            {amenity}
                        </li>)
                    }
                    </ul>
        </section>
    )
}