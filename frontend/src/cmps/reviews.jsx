// IMPORT {React.Fragment} from React
import React from 'react';
export function Reviews({ stay }) {
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

    return (<React.Fragment>
        {stay.reviews.map(review => {
            return <div className="review">
                <img src={review.by.imgUrl} />
                <h4>{review.by.fullname}</h4>
                <br />
                <h5>May 2013</h5>
                <br />
                <p>
                    {getTxt(review)}
                </p>
                <br />
                <button onClick={showReviews}>Show more &gt; </button>
            </div>
        })}
    </React.Fragment>
    )
}