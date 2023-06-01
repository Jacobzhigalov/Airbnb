

export function StayPreview({ stay }) {

    return (
        <div className="stay-preview">
            <img className="img-preview" src={stay.imgUrls[0]} alt="" />
            <div className="preview-info">
                <p className="preview-address">{stay.loc.city}, {stay.loc.country}</p>
                <p className="preview-rating">★4.9</p>
                <p className="preview-name">{stay.name}</p>
                <p className="preview-price">${stay.price.toLocaleString()}<span> night</span></p>
            </div>
        </div>
    )
}
