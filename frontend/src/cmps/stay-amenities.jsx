import { utilService } from "../services/util.service.js"
import React, { useState } from 'react';

export function StayAmenities({ stay }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    function showAmenities() {
        alert('under construction')
    }
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
                )}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Show all {stay.amenities.length} amenities</button>
            {<div className="modal-background">
                <div className="modal-amenities">
                    <button onClick={() => setIsModalOpen(false)}> close </button>
                    <h2>What this place offers</h2>
                    <ul>
                        {stay.amenities.map(amenity =>
                            <div>
                                <li key={amenity}>
                                    <img src={utilService.getIcon(amenity)} alt="smth" />
                                    <p>
                                        {amenity}
                                    </p>
                                    <hr className="hLine" />
                                </li>
                            </div>

                        )}
                    </ul>
                </div>
            </div>}
        </section >
    )
}