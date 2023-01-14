import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth } from "../config/Firebase.ts";
import { db } from "../config/Firebase.ts";
import { useAuthState } from 'react-firebase-hooks/auth';
import "../style/SinglePost.css";


const SinglePost = (props) => {

    const [user] = useAuthState(auth);
    const [likeCount, setLikeCount] = useState(0);

    // const [checkLikedUser, setCheckLikedUser] = useState(false);

    const userClickedLike = async () => {
        const likesRef = collection(db, "likes");
        const likesDoc = query(likesRef, where("postid", "==", props.id));
        const userLikePresent = query(likesRef, where("postid", "==", props.id), where("userLikedid", "==", user?.uid));

        const checkData = await getDocs(userLikePresent);


        if (checkData.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length == 0) {
            // Send Data of Like, Post and User
            await addDoc(likesRef, {
                post_creator: props.name,
                postid: props.id,
                userLikedid: user?.uid,
                user_liked_email: user?.email,
            });
            // console.log("data posted on firebase");

            const data = await getDocs(likesDoc);
            // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // console.log("Inside UserCLickedLike");

            setLikeCount(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length);
        } else {
            alert("You already liked it !!!");
        }
    }


    const postLikedData = async () => {
        const likesRef = collection(db, "likes");
        const likesDoc = query(likesRef, where("postid", "==", props.id));
        // const userLikePresent = query(likesRef, where("postid", "==", props.id), where("userLikedid", "==", user?.uid));


        const data = await getDocs(likesDoc);
        // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // console.log("Inside postLikedData Update");
        setLikeCount(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length);
    }

    useEffect(() => {
        postLikedData();
        // console.log("Inside UseEffect !!!");
    }, [userClickedLike]);


    return (
        <>
            <div style={{ width: "50%", backgroundColor: "white", margin:"10px auto 10px auto", borderRadius:"10px" }}>

                <Card className="single-post"
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Stack>
                        <CardBody>
                            <Heading size='md'>{props.title} <p style={{ fontSize: "10px", color: "black" }}>By {props.name}</p></Heading>
                            <Text id="sp-txt" py='2'>
                                {props.des}
                            </Text>
                        </CardBody>

                        <CardFooter>
                            {/* <Button className='sp-btn' fontSize="10px" variant='solid' colorScheme='blue'>
                                {props.id}
                            </Button>
                            <Button c fontSize="10px" variant='solid' colorScheme='red'>
                                {props.id}
                            </Button> */}
                            {user ? <Button className='sp-btn' onClick={userClickedLike} colorScheme="twitter">Like {likeCount}</Button> : <Button className='sp-btn' cursor="not-allowed" colorScheme="twitter">Like {likeCount}</Button>}
                            {/* <Button onClick={userClickedLike} colorScheme="twitter">Like {likeCount}</Button> */}
                        </CardFooter>
                    </Stack>
                </Card>

            </div>
        </>
    )
}

export default SinglePost