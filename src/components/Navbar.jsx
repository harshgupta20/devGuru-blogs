import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/Firebase.ts';
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import "../style/Navbar.css";

import { Button } from "@chakra-ui/react"



// TRYING FOR USERS COLLECTION IN FIREBASE (TEMP)
// import { addDoc, collection } from 'firebase/firestore';
// import {db} from "../config/Firebase.ts";



const Navbar = () => {

  const [user] = useAuthState(auth);

  // const PostRef = collection(db, "users");

  const signOutUser = async () => {
    await signOut(auth);
  }

  // const doSomething = async () => {
  //   await addDoc(PostRef, {
  //     name: user?.displayName,
  //     email: user?.email
  //   });
  // }

  return (
    <>

      <div className="navbar">
        <div className="navbar-body">
          <h1><Link style={{fontSize:"30px"}} className='nav-link' to='/'>Dev Guru Blogs</Link></h1>

          <ul className="nav-ul">
            {
              user && <div className="nav-auth-data">
                <img className='nav-img' src={user?.photoURL || ""} alt="proPic" />
                <p className='nav-p' style={{color:'white'}}>{user?.displayName}</p>
              </div>
            }

            <li className="nav-li"> {user && <Link className='nav-link' style={{color:'black'}} to='/create-post'><Button>Create Post</Button></Link>} </li>
            <li className="nav-li">{!user ? <Link className='nav-link' to='/login'>Login</Link> : user && <Button onClick={signOutUser}>Logout</Button>}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar