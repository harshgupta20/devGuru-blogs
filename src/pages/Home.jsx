import React from 'react'
import { auth } from "../config/Firebase.ts"
import { useAuthState } from "react-firebase-hooks/auth";

import Feed from './Feed';
import "../style/Home.css";

const Home = () => {

  const [user] = useAuthState(auth);

  return (
    <>
      <div className="home">
        {/* <div>Home</div> */}
        {/* {user && <>
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} alt={user?.displayName} width="100" height="100" />
        </>} */}

        <div className="feed">
            <Feed/>
        </div>
      </div>
    </>
  )
}

export default Home