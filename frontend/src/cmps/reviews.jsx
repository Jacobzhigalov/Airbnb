// IMPORT {React.Fragment} from React
import React from 'react';
export function Reviews({stay}){

    return(<React.Fragment>
            {stay.reviews.map(review=>{
                return<div className="review">
                    
                     <h3><img src={review.by.imgUrl}/>{ review.by.fullname}</h3> <br/>
                     {review.txt}

                    </div>
            })}
            </React.Fragment>
    )
}