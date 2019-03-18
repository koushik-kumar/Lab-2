import React, { Component } from "react";
import "./logincss.css";
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {  Button, Form, FormGroup} from 'reactstrap';


export default class Login extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required="true" for this component
        this.state = {
            UserID : "",
            password : "",
            authFlag : false,
            modal: false,
            roleValue:'student',
            userIDValue:'',
            emailIDValue:'',
            firstNameValue:'',
            lastNameValue:'',
            genderValue:'male',
            passwordValue:'',
            profilePicValue:'',
            contactValue:'',
            aboutMeValue:'',
            cityValue:'',
            countryValue:'',
            companyValue:'',
            schoolValue:'',
            homeTownValue:'',
            languagesValue:'',
            color:'',

        }
        //Bind the handlers to this class
        this.UserIDChangeHandler = this.UserIDChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        // this.registerProfile = this.registerProfile.bind(this);
        this.toggle = this.toggle.bind(this); 
        this.createProfile = this.createProfile.bind(this);
        this.setGender = this.setGender.bind(this);
        this.setRole = this.setRole.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //loginID change handler to update state variable with the text entered by the user
    UserIDChangeHandler = (e) => {
        this.setState({
            UserID : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            UserID : this.state.UserID,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                // console.log("HERE-------:   "+response.json());
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                    localStorage.setItem('UserID',this.state.UserID);
                            console.log(localStorage.getItem('UserID'));
                }
            });
    }

    createProfile = (e) => {
        e.preventDefault();
        // console.log(
        //           this.state.roleValue+" \n "+
        //           this.state.userIDValue+" \n "+
        //           this.state.emailIDValue+" \n "+
        //           this.state.firstNameValue+" \n "+
        //           this.state.lastNameValue+" \n "+
        //           this.state.passwordValue+" \n "+
        //           this.state.contactValue+" \n "+
        //           this.state.aboutMeValue+" \n "+
        //           this.state.cityValue+" \n "+
        //           this.state.countryValue+" \n "+
        //           this.state.companyValue+" \n "+
        //           this.state.schoolValue+" \n "+
        //           this.state.homeTownValue+" \n "+
        //           this.state.genderValue+" \n "+
        //           this.state.languagesValue
        //       );

              const newUserData = {
                role : this.state.roleValue,
                first_name:this.state.firstNameValue,
                last_name:this.state.lastNameValue,
                email:this.state.emailIDValue,
                password:this.state.passwordValue,
                profilePicID:this.state.profilePicValue,
                phoneNo:this.state.contactValue,
                  aboutMe:this.state.aboutMeValue,
                  city:this.state.cityValue,
                  country:this.state.countryValue,
                  company:this.state.companyValue,
                  school:this.state.schoolValue,
                  homeTown:this.state.homeTownValue,
                  languages:this.state.languagesValue,
                  gender:this.state.genderValue,
                  userID:this.state.userIDValue
              }

              this.setState(prevState => ({
                modal: !prevState.modal
              }));


              axios.defaults.withCredentials = true;

              axios.post('http://localhost:3001/register',newUserData)
              .then(response => {
                console.log("Status Code : ",response.status);
                // console.log("HERE-------:   "+response.json());
                if(response.status === 200){
                    console.log("User Created");
                }
            });

    }

    toggle(e) {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        // const rand = '#'+Math.floor(Math.random()*16777215).toString(16);

        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value

        });
    }

    setGender(event){
        this.setState({genderValue:event.target.value});
    }

    setRole(event){
        this.setState({roleValue:event.target.value});
    }

    render() {
        let redirectVar = null;
        if(cookie.load('userID')){
            redirectVar = <Redirect to= "./../Dashboard/dashboard.js"/>
        }

        return (
            <div>
                {redirectVar}
                <div className="content login-container">
                    <div className="applogin-banner">
                        <div className="applogin-background"></div>
                        <div className="col-md-4 offset-md-4 applogin-container">
                            {/* <div class=""> */}
                                <h1>
                                    Connecting to
                                    {/* <div> */}
                                        <img className="applogin-app-logo"
                                            alt="LOGO HERE"
                                            style={{ display: "inline-block" }}
                                            src={require("../../images/fileStoreRecord.png")}
                                        />
                                    {/* </div> */}
                                    </h1>
                            {/* </div> */}
                            <div style={{fontSize: "13px",width:"100%",
                                    fontWeight: "900", position:"relative", textAlign:"center"}}>
                                    <p>Sign-in with your San Jose State University account to access SJSU Application Portal</p>

                            </div>
                        </div>
                        
                    </div>
                    <div className="FormAction col-md-4 offset-md-4 borde" >
                    {/* <h1>Hi</h1> */}
                    <div className="auth-header">
                    <img src={require("./../../images/fileStoreRecord2.jpg")} className="auth-org-logo" alt="San Jose State University"></img>
                    </div>
                    <div data-type="beacon-container" className="beacon-container"></div><br></br>
                    <div className="auth-content">
                        <div className="auth-content-inner">
                            <div className="primary-auth">
                                <form>
                                    <h2 className="FormHead" style={{fontWeight:"600", color:"#5e5e5e"}}>Sign In</h2>
                                    <div className="FormElements">
                                    <div className="form-group">
                                        <input type="text" onChange = {this.UserIDChangeHandler} className="form-control" style={{height:"50px"}} id="UserID" name="UserID" aria-describedby="SJSU ID" placeholder="SJSU ID Number"></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange = {this.passwordChangeHandler} className="form-control" style={{height:"50px"}} id="password" name="password" placeholder="Password"></input>
                                    </div>
                                    {/* <div class="form-check">
                                        <input type="checkbox" class="form-check-input form-control" id="exampleCheck1"></input>
                                        <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                    </div> */}
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick = {this.submitLogin}  style={{
                                            background: "linear-gradient(#007dc1, #0073b2)",
                                            borderColor: "#004b75",
                                            borderBottomColor: "#00456a",
                                            width:"100%",
                                            height:"50px",
                                            fontSize:"14px"
                                        }}>Submit</button>
                                </form>
                                <div className="auth-footer" >
                                <br></br>
                                <a href="#" onClick={this.toggle} color="#777">Register Here</a>
                                    {/* <a href="#" data-se="needhelp" color="#777" class="link help js-help">Need help signing in?</a>
                                    <ul class="help-links js-help-links list-unstyled" style={{display:"none"}} >
                                        <li className="listItems ">
                                            <a href="#" data-se="forgot-password" class="link js-forgot-password">Reset my password</a>
                                        </li>
                                        <li>
                                            <a href="#" data-se="help-link" class="link js-help-link" target="_blank">Help</a>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader ><h1>Register!</h1></ModalHeader>
                    <ModalBody>
                    <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <Input addon type="radio" aria-label="Student" defaultChecked onChange={event => this.setRole(event)} name="roleValue" value="student"></Input>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <i className="fas fa-graduation-cap" style={{ color: '#4c4a4a', fontSize:'15px'  }} title="Student">Student</i>

                                    <InputGroupAddon  addonType="append">
                                        <InputGroupText>
                                            <Input addon type="radio" aria-label="Professor" onChange={event => this.setRole(event)}  name="roleValue" value="professor"></Input>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <i className="fas fa-chalkboard-teacher" style={{ color: '#4c4a4a', fontSize:'15px' }} title="Professor" >Professor</i>

                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup>
                                    <InputGroupAddon  addonType="prepend">User  ID</InputGroupAddon>
                                    <Input name = "userIDValue" placeholder="" value={this.state.userIDValue} onChange={this.inputChangeHandler} required="true"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon  addonType="prepend">Email  ID</InputGroupAddon>
                                    <Input name = "emailIDValue" placeholder="" value={this.state.emailIDValue} onChange={this.inputChangeHandler} required="true"/>
                                </InputGroup>
                            </FormGroup>
                                <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend" >FirstName</InputGroupAddon>
                                    <Input name="firstNameValue" placeholder="" value={this.state.firstNameValue} onChange={this.inputChangeHandler} required="true"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend" >LastName</InputGroupAddon>
                                    <Input name="lastNameValue" placeholder="" value={this.state.lastNameValue} onChange={this.inputChangeHandler} required="true"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <Input addon type="radio" aria-label="Male" name="genderValue" defaultChecked onChange={event => this.setGender(event)}  value="male" />
                                        </InputGroupText>
                                        {/* <label for="Male">Male</label> */}
                                    </InputGroupAddon>
                                    <i className="fas fa-male" style={{ color: '#4c4a4a', fontSize:'15px'  }}>Male</i>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <Input addon type="radio" aria-label="Female" name="genderValue" onChange={event => this.setGender(event)}  value="female" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <i className="fa fa-female" style={{ color: '#4c4a4a', fontSize:'15px'  }} >Female</i>
                                    {/* <Input placeholder="Check it out" /> */}
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">Password</InputGroupAddon>
                                    <Input name="passwordValue" type="password" value={this.state.passwordValue} onChange={this.inputChangeHandler} placeholder="Password.."  required="true" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend"></InputGroupAddon>
                                    <Input name="profilePicValue"  type="file" value={this.state.profilePicValue} onChange={this.inputChangeHandler} placeholder="Profile Pic" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon  addonType="prepend">Contact  </InputGroupAddon>
                                    <Input name="contactValue" type="number" maxLength="10" value={this.state.contactValue} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">About Me</InputGroupAddon>
                                    <Input name="aboutMeValue" type="textarea" placeholder="" value={this.state.aboutMeValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">City</InputGroupAddon>
                                    <Input name="cityValue" placeholder="" value={this.state.cityValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">Country</InputGroupAddon>
                                    <Input name="countryValue" placeholder="" value={this.state.countryValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">Company</InputGroupAddon>
                                    <Input name="companyValue" placeholder="" value={this.state.companyValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">School</InputGroupAddon>
                                    <Input name="schoolValue" placeholder="" value={this.state.schoolValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">HomeTown</InputGroupAddon>
                                    <Input name="homeTownValue" placeholder="" value={this.state.homeTownValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon className="formInput" addonType="prepend">Languages</InputGroupAddon>
                                    <Input name="languagesValue" placeholder="" value={this.state.languagesValue} onChange={this.inputChangeHandler} />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createProfile}>Register</Button>{' '}
                        <Button type="reset" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                
            </div>
                                );
                              }
                            }
