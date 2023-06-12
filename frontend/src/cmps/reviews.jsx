// IMPORT {React.Fragment} from React
import subimage from'../assets/img/user.png'
import React,{useState} from 'react';
export function Reviews({ stay }) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    const [updatedReviews, setUpdatedReviews] = useState(stay.reviews);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const replacementImages=[
        subimage
    ]
    function handleImageError(index){
        const updatedReviewsCopy = [...updatedReviews]
        const replacementImage = replacementImages[Math.floor(Math.random() * replacementImages.length)]
        updatedReviewsCopy[index].by.imgUrl = replacementImage
        setUpdatedReviews(updatedReviewsCopy)
    }
    function getTxt(review) {
        const txt = (review.txt.length < 150) ? review.txt : getLongTxt(review)
        return txt
    }
    function getLongTxt(review) {
        return `${review.txt.substr(0, 150)}...`
    }
    function showReviews() {
        alert('under construction')
    }
    function getTime(timestamp){
        const date=new Date(timestamp)
        const month =months[date.getMonth()]
        const year = date.getFullYear()
        return `${month} ${year}`
    }

console.log(stay.reviews)
    return (<React.Fragment>
        {updatedReviews.slice(0, 6).map((review,index) => {
            return <div className="review">
                <img src={review.by.imgUrl} onError={()=>handleImageError(index)}  />
                <h4>{review.by.fullname}</h4>
                <br />
                <h5>{getTime(review.at)}</h5>
                <br />
                <p>
                    {getTxt(review)}
                </p>
                <br />
                {review.txt.length > 150 &&

                    <button onClick={()=> setIsModalOpen(true)}> <span className='show-more'>Show more</span><span className='show-more-arrow'><i class="fa-solid fa-angle-right"></i></span> </button>
                }
            </div>
        })}
         <button className="open-modal open-modal-reviews" onClick={() => setIsModalOpen(true)}>Show all {stay.reviews.length} reviews</button>
         {isModalOpen&&<div className="modal-background" onClick={() => setIsModalOpen(false)}></div>}


            {isModalOpen&&<div className="modal-container modal-reviews-container">
                <div className='close-button'>  <button onClick={() => setIsModalOpen(false)}> <i class="fa-solid fa-x"></i> </button></div>
                <div className="scroller">
                {/* className="modal-amenities" */}
                    <div className='modal-reviews' >
                        <h2> <i className="fa-sharp fa-solid fa-star"></i>{stay.rating} · {stay.reviews.length} reviews</h2>
                        <ul>
                            {updatedReviews.map(review =>
                                <div className=" review-li">
                                <li key={review}>
                                    <div className='review-details'>
                                      <img src={review.by.imgUrl}/>
                                      <div>
                                      <h4>{review.by.fullname}</h4>
                                      {getTime(review.at)}
                                      </div>
                                      </div>
                                        {/* <p> */}
                                            {review.txt}
                                        {/* </p> */}
                                    </li>
                                    {/* <hr className="hLine" /> */}
                                </div>
                                )}
                        </ul>
                    </div>
                </div>
            </div>
            }
    </React.Fragment>
    )
}