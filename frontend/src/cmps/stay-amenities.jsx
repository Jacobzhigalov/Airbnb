
export function StayAmenities({ stay }) {


    return (
        <section>
            <h2>What this place offers</h2>
            <br />
            <ul className="amenities-list">
                    {stay.amenities.slice(0,10).map(amenity =>
                        <li className="amenity-preview" key={amenity}>
                            {amenity}
                        </li>)
                    }
                    </ul>
        </section>
    )
}