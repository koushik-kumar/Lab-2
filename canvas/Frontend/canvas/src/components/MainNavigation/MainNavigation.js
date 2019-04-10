import React, { Component } from "react";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import AccountTray from './accountTray';
import axios from 'axios';

class MainNavigation extends Component {
  constructor() {
    super();

    this.state = {
      trayAccount: false,
      trayCourses: false,
      trayGroup:false,
      trayHelp:false
    };

    this.trayAccount = this.trayAccount.bind(this);
    this.trayCourses = this.trayCourses.bind(this);
    this.profileEditHandler = this.profileEditHandler.bind(this);
  }

  trayAccount(event) {
    event.preventDefault();
    if (this.state.trayAccount || this.state.trayCourses || this.state.trayGroup|| this.state.trayHelp) {
      console.log(this.state.trayAccount+" "+this.state.trayCourses+" "+this.state.trayGroup+" "+this.state.trayHelp);
      this.setState({
        trayAccount: false,
      trayCourses: false,
      trayGroup:false,
      trayHelp:false
      });
    }
else{
      this.setState(previousState => ({
        trayAccount: !previousState.trayAccount
      }));
    }
  }

  checkIfTrayOpen(event){
    if (this.state.trayAccount || this.state.trayCourses || this.state.trayGroup|| this.state.trayHelp) {
      console.log(this.state.trayAccount+" "+this.state.trayCourses+" "+this.state.trayGroup+" "+this.state.trayHelp);
      this.setState({
        trayAccount: false,
      trayCourses: false,
      trayGroup:false,
      trayHelp:false
      });
    }
  }

  trayCourses(event) {
    event.preventDefault();
    if (this.state.trayAccount || this.state.trayCourses || this.state.trayGroup|| this.state.trayHelp) {
      console.log(this.state.trayAccount+" "+this.state.trayCourses+" "+this.state.trayGroup+" "+this.state.trayHelp);
      this.setState({
        trayAccount: false,
      trayCourses: false,
      trayGroup:false,
      trayHelp:false
      });
    }
else{
      this.setState(previousState => ({
        trayCourses: !previousState.trayCourses
      }));
    }
  }

  profileEditHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/editProfile')
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response : "+response.body);
        }
      });
  }

  render() {
    let redirectVar = null;
        if (!localStorage.getItem('UserID')) {
            redirectVar = <Redirect to="/login" />
        }

    let renderSidebar = false;
        if (localStorage.getItem('UserID')){
          renderSidebar = true;
        }
    return (
      <div>
        {redirectVar}
        <div>
          {renderSidebar?
        <div className="" style={{position:"absolute"}}>
        <div className="sidebar" style={{ position: "absolute", zIndex: "3" }}>
          <div className="Navigation" elements>
            <div className="logomark_container">
              <img
                alt="LOGO HERE"
                className="Logo"
                src={require("../../images/SJSU University monogram_Web_Gold.png")}
              />
            </div>
            <ul class="list-group">
              <li class="list-group-item">
                <a href="" onClick={this.trayAccount}>
                  <div>
                    <img
                      className="profilePic"
                      src={require("../../images/profilePic.jpg")}
                    />
                  </div>
                  <div className="label">Account</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="fas fa-tachometer-alt fa-2x" />
                  </div>
                  <div className="label">Dashboard</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#" onClick={this.trayCourses}>
                  <div>
                    <i class="fas fa-book fa-2x" />
                  </div>
                  <div className="label">Courses</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="fas fa-user-friends" />
                  </div>
                  <div className="label">Groups</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="far fa-calendar-alt  fa-2x" />
                  </div>
                  <div className="label">Calendar</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="fas fa-inbox  fa-2x" />
                  </div>
                  <div className="label">Inbox</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="far fa-question-circle  fa-2x" />
                  </div>
                  <div className="label">Help</div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="#">
                  <div>
                    <i class="fas fa-book-reader  fa-2x" />
                  </div>
                  <div className="label">Library</div>
                </a>
              </li>
            </ul>
          </div>
          <div className="SecondNavigation">
            {/* <button className="toggle-btn"> */}
            <i class="fas fa-arrow-left fa-lg" />
            {/* </button> */}
          </div>
        </div>
        {this.state.trayAccount ? (
          <div
            className="trayAccount bord"
            style={{
              position: "absolute",
              zIndex: "2",
              marginLeft: "85px",
              backgroundColor: "white",
              width: "364px",
              height: "100vh"
            }}
          >
            <div>
              <a href="#" className="closeButton">
                <i
                  class="fas fa-times fa-lg"
                  style={{ color: "black", float: "right", padding: "15px" }}
                />
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                className="profilePicinTray-div"
                style={{ paddingTop: "10px", paddingLeft: "55px" }}
              >
                <img
                  className="profilePicinTray"
                  src={require("../../images/profilePic.jpg")}
                />
              </div>
              <div className="profileName">Koushik Kumar Kamala</div>
            </div>
            <div className="logout-div">
              <button className="logout-btn">Logout</button>
            </div>
            <hr style={{ paddingLeft: ".25em", paddingRight: ".25em" }} />
            <ul className="TrayList">
              <li>
                <a href="/profile" onClick={this.profileEditHandler}>
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Files</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>ePortFolios</span>
                </a>
              </li>
            </ul>
          </div>
        ) : null}

        {this.state.trayCourses ? (
          <div
            className="trayCourses bord"
            style={{
              position: "absolute",
              zIndex: "2",
              marginLeft: "85px",
              backgroundColor: "white",
              width: "364px",
              height: "100vh"
            }}
          >
            <div>
              <a href="#" className="closeButton">
                <i
                  class="fas fa-times fa-lg"
                  style={{ color: "black", float: "right", padding: "15px" }}
                />
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="Courses">Courses</div>
            </div>
            <hr style={{ paddingLeft: ".25em", paddingRight: ".25em" }} />
            <ul className="TrayList">
              <li>
                <a href="#" style={{ textDecoration: "underline" }}>
                  <span>
                    Computer Engineering Department, Graduate Admittees
                  </span>
                </a>
                <br />
                <span
                  className="TermName"
                  style={{
                    textAlign: "-webkit-match-parent",
                    fontSize: "12px",
                    color: "grey",
                    paddingTop: "5px",
                    textDecoration: "none"
                  }}
                >
                  Default Term
                </span>
              </li>
              {/* Here on remove below code and make generic tor etrieve form DB */}
              <li>
                <a href="#">
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Files</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>ePortFolios</span>
                </a>
              </li>
              <hr style={{ paddingLeft: ".25em", paddingRight: ".25em" }} />
              <li>
                <a href="#">
                  <span>All Courses</span>
                </a>
              </li>
            </ul>
            <br />
            <div
              style={{
                width: "90%",
                paddingLeft: "25px",
                fontSize: "0.9em",
                lineHeight: "1.7"
              }}
            >
              Welcome to your courses! To customize the list of courses, click
              on the "All Courses" link and star the courses to display.
            </div>
          </div>
        ) : null}

        {/* width: 90%;
    padding-left: 25px;
    font-size: .9em;
    line-height: 1.7; */}

        {/* // Code for Account tray */}
        {/* <div className='AccountTray'>
                <div className="CloseIcon-div"><a href="#" className="closeIcon"><i class="fas fa-times fa-lg"></i></a></div>
                <div>
                    <div className="profilePicinTray-div"><img className="profilePicinTray" src={require('../../images/profilePic.jpg')}></img></div>
                    <div className="profileName">Koushik Kumar Kamala</div>
                </div>
                <div className="logout-div"><button className="logout-btn">Logout</button></div>
                <hr></hr>
                <ul className="accountList">
                    <li>
                        <a href="#"><span>Profile</span></a>
                    </li>
                    <li>
                        <a href="#"><span>Settings</span></a>
                    </li>
                    <li>
                        <a href="#"><span>Notifications</span></a>
                    </li>
                    <li>
                        <a href="#"><span>Files</span></a>
                    </li>
                    <li>
                        <a href="#"><span>ePortFolios</span></a>
                    </li>
                </ul> 
            </div>*/}
      </div>
      : <div></div>}
      </div>
      </div>
    );
  }
}

export default MainNavigation;
