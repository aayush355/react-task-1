import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [viewers, setViewers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let productArray = [];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let productCount = 20;
      let i = 0;
      let res;
      for (i = 0; i <= productCount; i++) {
        res = await axios.get('http://www.i2ce.in/reviews/' + i);
        productArray.push(res.data);
      }
      productArray.shift();
      setPosts(productArray[2].reviews);
      setProducts(productArray);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const changePosts = (id) => {
    setPosts(products[id - 1].reviews);
  }

  const changeViewer = (id) => {
    const fetchPosts = async () => {
      setLoading(true);
      let res;
      let query = 'http://www.i2ce.in/reviews/' + posts[0].product_id + '/'+id;
      res = await axios.get(query);
      console.log(query);
      console.log(res)
      setLoading(false);
    };
    fetchPosts();
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
      <Posts products={products} posts={currentPosts} viewers={viewers} loading={loading} changePosts={changePosts} changeViewer={changeViewer} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
