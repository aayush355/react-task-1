import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

const Stars = ({ starsCount, ratingName }) => {
    let [stars] = useState('');
    if (starsCount > 0) {
        let starString = '';
        let i = 0;
        for (i = 0; i < starsCount; i++) {
            starString += '<i class="fa fa-star"></i>';
        }
        stars = starString;
    }
    return (
        <span><b>{ratingName}</b>&nbsp;&nbsp;{ReactHtmlParser(stars)}&emsp;&emsp;</span>
    );
};

export default Stars;