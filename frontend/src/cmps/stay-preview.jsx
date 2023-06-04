

export function StayPreview({ stay }) {

    return (
        <div className="stay-preview">
            <img className="img-preview" src={stay.imgUrls[0]} alt="" />
            <div className="preview-info">
                <p className="preview-address">{stay.loc.city}, {stay.loc.country}</p>
                <p className="preview-rating"><i className="fa-sharp fa-solid fa-star"></i> <span>{(stay.reviews.reduce((acc, review) => review.rate + acc, 0)) / stay.reviews.length}</span></p>
                <p className="preview-name">{stay.name}</p>
                <p className="preview-date">{stay.dates}</p>
                <p className="preview-price">${stay.price.toLocaleString()}<span> night</span></p>
            </div>
        </div>
    )
}
