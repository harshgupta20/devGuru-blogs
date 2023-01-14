import React, { useEffect, useState } from 'react';

import SinglePost from '../components/SinglePost';
import {db} from "../config/Firebase.ts";
import { getDocs, collection } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';


const Feed = () => {
  const [postList, setPostList] = useState([]);
  const PostRef = collection(db, "posts");
  
  const getPosts = async () => {
    const postData =  await getDocs(PostRef);
    // console.log(postData.docs.map((data, key) => ({...data.data(), id: data.id})));
    setPostList(postData.docs.map((data, key) => ({...data.data(), id: data.id})));
  }

  useEffect(()=> {
    getPosts();
  },[])

  return (
    <>
    {
      postList.map((data, key) => {
        return <>
          <SinglePost key={key} title={data.title} des={data.description} name={data.username} id={data.id}/>
        </>
      })
    }
    </>
  )
}

export default Feed