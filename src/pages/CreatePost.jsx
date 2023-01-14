import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from '@chakra-ui/react';

import { auth } from "../config/Firebase.ts"
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../config/Firebase.ts';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

// Modal Import
import "../style/CreatePost.css";
// import { async } from '@firebase/util';



const CreatePost = () => {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  // navigate initilise to use for redirection line-42 
  const navigate = useNavigate();

  // Get logged-in user data
  const [user] = useAuthState(auth);

  // define the path of the data being posted, Line-38 
  const PostRef = collection(db, "posts");
  const PostRef1 = collection(db, "users");


  // Submit the post function
  const onClickPostFunc = async () => {
    console.log(title);
    console.log(description);

    if(!title == ""){
      await addDoc(PostRef, {
        title: title,
        description: description,
        username: user?.email,
        id: user?.uid,
      });
      navigate("/feed");
    }else{
      alert("Fields can't be empty");
    }
  }


  const doSomething = async () => {
    // console.log(user.displayName);
    //   console.log(user.email);
    //   console.log("i think users mai add ho gya!");
    //     await addDoc(PostRef1, {
    //       name: user?.displayName,
    //       email: user?.email
    //     });
  
    await setDoc(doc(db, "hello/a/c", "my-id"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      email: "bhai kamal ho gya"
    });

    console.log("klkl");
  }
 




  // CHAKRA UI
  // CHECKING FOR EMPTY FORM AND RETALTED ISSUES
  const [input, setInput] = useState()
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ''

  return (
    <>
      <Flex id='cp-form-main' w="100vw" h="90vh" justifyContent="center" align="center">
        <Flex id="cp-form" w="50%" height="fit-content" align="center" justify="center" borderRadius="10px">

          <FormControl id="cp-form" isInvalid={isError} isRequired border="0" borderColor="grey" borderRadius="10px" padding="50px" onSubmit={() => onClickPostFunc}>

            {/* input title of post */}
            <FormLabel isRequired>Title

              <Input placeholder='Post Title...' onChange={e => setTitle(e.target.value)} />
            </FormLabel>

            {/* input decription of post */}
            <FormLabel>Description

            <Input placeholder='Post Description...' type='textarea' value={input} onChange={e => setDescription(e.target.value)} />
            </FormLabel>
            {!isError ? (
              <FormHelperText>
                Let's share something awesome !
              </FormHelperText>
            ) : (
              <FormErrorMessage>Description is required.</FormErrorMessage>
            )}
            <Button width={"100px"} colorScheme="linkedin" onClick={onClickPostFunc}>Post</Button>
          </FormControl>


        </Flex>
      </Flex>


      <Button onClick={doSomething} colorScheme="facebook">Trial</Button>
    </>
  )
}

export default CreatePost