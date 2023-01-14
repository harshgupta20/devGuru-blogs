import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Footer from './components/Footer';

import { auth } from './config/Firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';

// Chakra UI IMPORT
import { ChakraProvider } from '@chakra-ui/react';
import Feed from './pages/Feed';
import { ClassNames } from '@emotion/react';

const App = () => {

  // Chnage Title on going away
  let docTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "Come Back :(";
  })
  window.addEventListener("focus", () => {
    document.title = docTitle;
  })

  const [user] = useAuthState(auth);

  return (

    <div style={{}}>
    {/* CHAKRA UI PROVIDER WRAPING */}
      <ChakraProvider>

        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path="/login" element={ !user && <Login/> : <Home />} /> */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/create-post" element={user ? <CreatePost /> : <Navigate to="/" />} />
            <Route path="/feed" element={user ? <Feed /> : <Navigate to="/" />} />
          </Routes>
        </Router>

      </ChakraProvider> 

      <Footer></Footer>
    </div>
  )
}

export default App