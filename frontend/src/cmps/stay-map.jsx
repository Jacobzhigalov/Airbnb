import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function StayMap({ stay }) {

    const locProps = {
        center: {
            // lat: stay.loc.lat,
            // lng: stay.loc.lng,
            lat:stay.loc.lat,
            lng:stay.loc.lng
        },
            zoom: 11
        }
    
console.log(stay.loc.lat)
console.log(stay.loc.lng)
    return (
        <section>
            <hr />
            <br />
            <h2>Where you'll be</h2>
            <br />
            <p>{stay.loc.city}, {stay.loc.country}</p>
            <br />
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCc8JY5MR4sn9w7GJN2r9Vo63ShUYCqEyo" }}
                    defaultCenter={locProps.center}
                    defaultZoom={locProps.zoom}
                >
                    {/* <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    /> */}
                </GoogleMapReact>
            </div>
        </section >
    )
}