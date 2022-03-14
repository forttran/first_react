import React, {useState, useMemo, useEffect} from 'react';
import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';
import PostService from '../API/PostService';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/pagination';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import {getPageCount, getPagesArray} from '../utils/pages';
import '../stules/App.css';
function Posts() {
  let [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal,setModal] = useState(false);  
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async()=>{
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount,limit))
  })

  console.log(totalPages);
  useEffect(() =>{fetchPosts()},[page]);


  const createPost = (newPost) =>{
    setPosts([...posts, {...newPost, id: Date.now()}]);
    setModal(false)
  }

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page =>{
    setPage(page)
  })
  return (
    <div className="App">
      <MyButton style={{marginTop:30}} onClick={() =>setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px 0'}}/>
      <PostFilter
        filter = {filter}
        setFilter = {setFilter}
      />
      {postError &&
        <h1>Возникла ошибка </h1>
      }
      {isPostsLoading
        ?<div style ={{display:'flex',justifyContent:'center'}}><Loader/></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="список постов "/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default Posts;