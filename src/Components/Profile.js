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
      .post(`http://localhost:3002/userinfo`, UserInfo)
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
    <div className="col-md-8">
      <div className="card">
      <div class="card-body little-profile text-center">
  <div class="pro-img"><img src={user.picture} alt="user"/></div>
  <h4 class="m-b-0">{this.state.Info.Email}</h4>
  <h3 class="m-b-0">{this.state.Info.Name}</h3>
  <p>{this.state.Info.Sector}</p>
  <div class="agree-to-terms-container">
    <p>Agree to Terms:</p>
    <p class="agree-to-terms-value">{this.state.Info.AgreeToTerms ? "Yes" : "No"}</p>
  </div>
  <button onClick={this.handlebutton} class="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Edit</button>
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
