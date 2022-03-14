import React from 'react';
import MyButton from './UI/button/MyButton';
import {useNavigate} from 'react-router-dom';
const PostItem = (props) => {
	const router = useNavigate()
	console.log(router);

	const deletePost = () =>{
		props.remove(props.post)
	}
	const openPost = () =>{
		router(`/posts/${props.post.id}`);
	}
	return(
		<div>
			<div className="post">
        		<div className="post__content">
          			<strong>{props.post.id}. {props.post.title}</strong>
          			<div>
            			{props.post.body}
          			</div>
        		</div>
        		<div className="post__btns">
        			<MyButton onClick={openPost}>открыть</MyButton>
          			<MyButton onClick={deletePost}>удалить</MyButton>
        		</div>
      		</div>
		</div>
	)
};

export default PostItem;