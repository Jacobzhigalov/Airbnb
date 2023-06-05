import { useEffect, useState } from 'react'
// import { labelService } from '../services/label.service.js'
import { stayService } from '../services/stay.service.local.js'
import { set } from 'date-fns'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 10,
        slidesToSlide: 7 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 6,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

export function LabelFilter({ onLabelChange }) {
    const [labels, setLabels] = useState([])

    useEffect(() => {
        const labels = stayService.getLabels()
        setLabels(labels)
        console.log(labels)
        // labelService.query()
        //     .then(labels => {
        //         setLabels(labels)
        //     })
        // eslint-disable-next-line
    }, [])


    return (
        // <div className="label-filter">
        //     {labels.map(label => (
        //         <div className='label-container' key={label.title} onClick={()=>onLabelChange(label.title)}>
        //             <img src={label.url} alt={label.title} />
        //             {/* <p>{label.title}</p> */}
        //             </div>
        //     ))}
        // </div>

        <div className='labels-fixed'>



            <Carousel
                swipeable={true}
                draggable={true}
                // showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                // infinite={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={1000}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item"
            >
                {/* <div className="label-filter"> */}
                {labels.map(label => (
                    <div className='label-container' key={label.title} >
                        <img src={label.url} alt={label.title} onClick={() => onLabelChange(label.title)}/>
                        <p>{label.title}</p>
                    </div>
                ))}
                {/* </div> */}
            </Carousel>
        </div>
    )
}
