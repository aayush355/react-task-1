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
  const [viewerId, setViewerId] = useState(1);
  const [productId, setProductId] = useState(1);
  let productArray = [];
  let [productsMap] = useState(new Map());

  useEffect(() => {
    const fetchPosts = async () => {
      //setLoading(true);
      let productCount = 20;
      let i = 0, j = 0;
      let res;
      for (i = 0; i <= productCount; i++) {
        res = await axios.get('http://www.i2ce.in/reviews/' + i);
        //productArray.push(res.data);
        let viewerMap = new Map();
        viewerMap.set(null, res.data)
        productsMap.set(res.data.reviews[0].product_id, viewerMap);
        for (j = 1; j <= 10; j++) {
          res = await axios.get('http://www.i2ce.in/reviews/' + i + '/' + j);
          //productArray.push(res.data);
          viewerMap.set(j, res.data)
          productsMap.set(res.data.reviews[0].product_id, viewerMap);
        }
      }
      productsMap.forEach(product => {
        productArray.push(product.get(viewerId))
      })
      setPosts(productsMap.get(productId).get(viewerId).reviews);
      setProducts(productArray);
      //setLoading(false);
    };
    fetchPosts();
  }, []);

  const changePosts = (productid) => {
    let id = parseInt(productid);
    setProductId(id)
    console.log(productsMap.get(id).get(viewerId).reviews);
    setPosts(productsMap.get(id).get(viewerId).reviews);
  }

  const changeViewer = (viewId) => {
    let id = parseInt(viewId);
    setViewerId(id)
    let productTemp = productsMap.get(productId);
    let viewersTemp = productTemp.get(id)
    let reviewsTemp = viewersTemp.reviews;
    setPosts(reviewsTemp);
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
      <Posts products={products} posts={currentPosts} loading={loading} changePosts={changePosts} changeViewer={changeViewer} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
