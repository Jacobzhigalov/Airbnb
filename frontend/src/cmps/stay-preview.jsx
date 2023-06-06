import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        // slidesToSlide: 7 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        // slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        // slidesToSlide: 1 // optional, default to 1.
    }
};
export function StayPreview({ stay, onStayClick }) {
    // console.log(stay.imgUrls[0])
    // console.log(stay)
    // console.log(stay)
    return (

        <div className="stay-preview">
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                infinite={false}
            >
                {/* {labels.map(label => (
                    <div className='label-container' key={label.title} onClick={() => onLabelChange(label.title)}>
                        <img src={label.url} alt={label.title} />
                        <p>{label.title}</p>
                    </div>
                ))} */}

                {stay.imgUrls.map(img => (
                    <div className="img-carousel-container" key={img}>
                        <img className="img-preview" src={img} alt="" onClick={onStayClick} />
                    </div>
                ))}
                {/* { <img className="img-preview" src={stay.imgUrls[0]} alt="" />} */}
            </Carousel>
            <div className="preview-info" onClick={onStayClick}>
                <p className="preview-address">{stay.loc.city}, {stay.loc.country}</p>
                <p className="preview-rating"><i className="fa-sharp fa-solid fa-star"></i>{stay.rating}</p>
                <p className="preview-name">{stay.name}</p>
                <p className="preview-date">{stay.dates}</p>
                <p className="preview-price">${stay.price.toLocaleString()}<span> night</span></p>
            </div>
        </div >
    )
}
