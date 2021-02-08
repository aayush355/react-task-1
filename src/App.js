import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [viewerId, setViewerId] = useState(1);
  const [productId, setProductId] = useState(1);

  const fetchPosts = async () => {
    let res;
    res = await axios.get('http://www.i2ce.in/reviews/' + 1);
    setPosts(res.data.reviews);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchData = async (productid, viewerid) => {
    let res;
    res = await axios.get('http://www.i2ce.in/reviews/' + productid + '/' + viewerid);
    setPosts(res.data.reviews);
  }
  const changePosts = (productid) => {
    let id = parseInt(productid);
    setProductId(id)
    fetchData(id, viewerId);
  }
  const changeViewer = (viewId) => {
    let id = parseInt(viewId);
    setViewerId(id)
    fetchData(productId, id);
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Products</h1>
      <Posts posts={currentPosts} changePosts={changePosts} changeViewer={changeViewer} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
