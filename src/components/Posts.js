import React, { useState } from 'react';
import './Posts.css';
import Stars from './Stars';

const Posts = ({ products, posts, loading, changePosts, changeViewer }) => {
  const [showAll, setShowAll] = useState(false);
  const [viewerIds] = useState([1,2,3]);
  const [productIds] = useState([1,2,3]);
  const [buttonText, setButtonText] = useState('Show All Ratings');
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const toggleRatings = () => {
    if (!showAll) {
      setShowAll(true);
      setButtonText('Hide All Ratings')
    } else {
      setShowAll(false);
      setButtonText('Show All Ratings')
    }
  }
  const onSelectProduct = (e) => {
    changePosts(e.target.value)
  }
  const onSelectViewer = (e) => {
    changeViewer(e.target.value)
  }

  return (
    <div>
      <div className="row">
        <div className="col-6 selectProduct">
          <label htmlFor="sel1">Choose Product ID:&nbsp;&nbsp;</label>
          <select className="custom-select" onChange={onSelectProduct} id="select1">
            {productIds.map(product => (
              <option key={product}>{product}</option>
            ))}
          </select>
        </div>
        <div className="selectView col-6">
          <div className="float-right">
            <label htmlFor="sel1">Choose Viewer ID:&nbsp;&nbsp;</label>
            <select className="custom-select" onChange={onSelectViewer} id="select1">
              {viewerIds.map(viewer => (
                <option key={viewer}>{viewer}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ul className='list-group mb-4'>
        {posts.map(post => (
          <li key={post.user_id} className='list-group-item'>
            <h4>{post.title}</h4>
            <hr></hr>
            <p>{post.comment}</p>
            <p><b>Usefulness:</b>&nbsp;&nbsp;{post.usefulness}</p>
            {post.friend === true ? <p><b>Reviewer:</b>&nbsp;&nbsp;{post.reviewer.name}</p> : null}
            <p><Stars starsCount={post.ratings.Overall} ratingName={"Overall Rating:"} /></p>
            <p><button className='btn btn-outline-dark' onClick={toggleRatings} id={post.user_id}>{buttonText}</button></p>
            {showAll === true ?
              <ul id={post.user_id}>
                <li><Stars starsCount={post.ratings.delivery_time} ratingName={"Delivery Time:"} /></li>
                <li><Stars starsCount={post.ratings.discounts_and_offers} ratingName={"Discounts and Offers:"} /></li>
                <li><Stars starsCount={post.ratings.matches_description} ratingName={"Matches Description:"} /></li>
                <li><Stars starsCount={post.ratings.matches_photo} ratingName={"Matches Photo:"} /></li>
                <li><Stars starsCount={post.ratings.packaging} ratingName={"Packaging:"} /></li>
                <li><Stars starsCount={post.ratings.price} ratingName={"Price:"} /></li>
              </ul> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
