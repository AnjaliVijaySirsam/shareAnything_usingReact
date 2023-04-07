
import React from 'react'
import {useEffect} from 'react'
import jwt_decode from "jwt-decode"
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  function handleCallbackResponse(response){
    // console.log("encoded jwt"+ response.credential);
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    // localStorage.setItem('user', JSON.stringify(response.credential));
    localStorage.setItem('user',JSON.stringify(userObj));
    const { name, sub, picture} = userObj;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
}

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "152890797908-q5ir0kn1v0k434ln21rj73bb3qf988d7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signin"),
      { theme: "outline" , size: "large"}
    );

  },[])

  return (
    <div className="flex justify-start items-center flex-col h-screen">
    <div className=" relative w-full h-full">
       <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
       <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
       <div className="p-5">
            <img src={logo} width="130px" />
          </div>
          <div className="shadow-2xl">

            <div className="App">
              <div id='signin'></div>
            </div>


    </div>
    </div>
    </div>
    </div>
  )
}

export default Login