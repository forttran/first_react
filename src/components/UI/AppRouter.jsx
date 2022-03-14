import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import Error from "../../pages/Error";
import PostsIdPage from "../../pages/PostIdPage";
const AppRouter = ({}) => {
	return(
	  <Routes>
        <Route path="/about" element={<About/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/posts/:id" element={<PostsIdPage/>} />
        <Route path="*" element={<Error/>} />
      </Routes>	
	)
};

export default AppRouter;