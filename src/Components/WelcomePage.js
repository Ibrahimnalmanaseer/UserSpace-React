import React from 'react';
import "../Styles/WelcomePage.css";
import LoginButton from './LoginButton';

class WelcomePage extends React.Component{



    render(){


        return(
            <div class="welcome">
            <h1>Welcome to The User Space!</h1>
            <p>Thank you for visiting. We hope you find everything you need here.</p>
            <div className='headerbtn'>
            <LoginButton />
            </div>
          </div>
           

            
        )
    }



}


export default WelcomePage