import React from 'react';
import {auth, provider} from "../config/Firebase.ts";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css";


// import { useAuthState } from 'react-firebase-hooks/auth';
// import { addDoc, collection } from 'firebase/firestore';
// import {db} from "../config/Firebase.ts";
import { Button } from '@chakra-ui/react';

const Login = () => {

  const navigate = useNavigate();
  // const PostRef = collection(db, "users");
  // const user = useAuthState(auth);

  const signInWithGoogle = async () =>{
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      navigate('/');
  }

  return (
    <>
    <div id='login'>

      <Button id="login-btn" colorScheme="facebook"  onClick={signInWithGoogle}>Sign in Google</Button>
    </div>
    </>
  )
}

export default Login