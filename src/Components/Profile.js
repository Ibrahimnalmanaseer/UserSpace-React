import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import "../Styles/Profile.css";
import axios from "axios";
import Modal from "./Modal";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Info: {},
      modalShow:false
    };
  }


  handelClose=()=>{

    this.setState({
      modalShow:false
    })}

  handlebutton=()=>{

      this.setState({modalShow:true})
      
     } 


  updateInfo=(data)=>{

      this.setState({
        Info:data
    
      })
    
     }

  
  componentDidMount = () => {
    const { user } = this.props.auth0;

    const UserInfo = {
      Name: user.nickname,
      Email: user.email,
      Sector: "",
      AgreeToTerms: false,
    };
    axios
      .post(`https://blooming-woodland-26589.herokuapp.com/userinfo`, UserInfo)
      .then((result) => {
        
        this.setState({
          Info: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { user } = this.props.auth0;
    console.log("info",this.state.Info)
    return (
      <>

<Modal userInfo={this.state.Info} show={this.state.modalShow}  updateInfo={this.updateInfo} closeShow={this.handelClose} />
       

<div className="container1">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div class="card-body profile">
          <div class="profile-pic text-center">
            <img src={user.picture} alt="user"/></div>
          <h2 class="name">{this.state.Info.Name}</h2>
          <p class="email">{this.state.Info.Email}</p>
          <p class="sector">{this.state.Info.Sector}</p>
          <div class="agree-to-terms-container">
            <p class="terms-label">Agree to Terms</p>
            <p class="agree-to-terms-value">{this.state.Info.AgreeToTerms ? "Yes" : "Not Yet"}</p>
          </div>
          
          <button onClick={this.handlebutton} class="edit-button waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Edit</button>
        </div>
      </div>
    </div>
  </div>
</div>
      </>
    );
  }
}

export default withAuth0(Profile);
