

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import WelcomePage from './Components/WelcomePage';
import Profile from './Components/Profile';
import Header from './Components/Header';
import { withAuth0 } from '@auth0/auth0-react';
import{
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom"




class App extends React.Component{
  

  render(){

    const { isAuthenticated } = this.props.auth0;

    return(


      
      
      
      <Router>
      <Header/>
      <Routes>
      {isAuthenticated ?
        <Route exact path="/"
                element={<Profile/>  }>

          
        </Route> :
        
        <Route exact path="/"
                    element={<WelcomePage/>}         >

        
      </Route>   
  }

 
  </Routes>

</Router>

     
    )


  }
}

export default withAuth0(App);
