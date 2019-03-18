import React, { Component } from 'react';
// import MainNavigation from '../MainNavigation/MainNavigation'
import axios from 'axios';
// import { SketchPicker } from 'react-color';
import { Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
// import './dashboardcss.css'
class Dashboard extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            UserID : '',
            courses: [],
            color:'000000',
            courseNumber : '',
            courseTerm:'',
            shorterCourseName:''
        }
    }


    componentDidMount(){
        // var colorChanger = Math.floor(Math.random()*16777215).toString(16);

        const data = {
            UserID : localStorage.getItem('UserID')
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/getCourses', data)
            .then((response) => {
                if(response.status === 200){
                    this.setState({
                        courses : (response.data) 
                    });
                    sessionStorage.setItem('courseCards', JSON.stringify(response.data));
                }
            });
    }


    render() {

        let details='';
        console.log("CHECKING THE ERROR HERE:"+this.state.courses);
        if (this.state.courses) {
            details = this.state.courses.map(course => {
                    this.state.color = course.cardColor;
                    this.state.courseNumber = course.CourseID;
                    this.state.courseTerm = (course.CourseTerm).toUpperCase().substr(0,1);
                    this.state.shorterCourseName = (course.CourseName).substr(0,18);

                return (
                    <Card className='col-md-3 mx-3' style={{ float: "left", height: "260px", width: "550px", marginTop: "20px", marginBottom: "10px", padding: "0"}}>
                        <div className="card cardColorBackground text-white pl-0 ml-0" style={{ backgroundColor: this.state.color, height: "150px", width: "236px", color: "white" }}>
                        </div>
                        <CardBody>
                            <u><a href={this.state.courseNumber} className="courselink" style={{ color: this.state.color,fontSize:"14px", fontWeight: "900", textDecorationColor: "#0055a2" }}>
                                <CardTitle style={{width: "105%"}}>{this.state.courseTerm}19:&nbsp;{course.CourseID}&nbsp;{this.state.shorterCourseName}</CardTitle>
                            </a></u>
                            <u><a href={this.state.courseNumber} className="courselink" style={{ color: "grey", fontWeight: "1000", fontSize:"14px", textDecorationColor: "#0055a2" }}>
                                <CardSubtitle>{this.state.courseTerm}19:&nbsp;{course.CourseID}&nbsp;{this.state.shorterCourseName}</CardSubtitle>
                            </a></u>
                            <div>
                            <a><i style={{color: "#737a82", padding:"20px 20px 10px 10px"}} class="fas fa-bullhorn fa-lg"></i></a>
                            <a><i style={{color: "#737a82", padding:"20px 20px 10px 10px"}} class="fas fa-clipboard-list fa-lg"></i></a>
                            <a><i style={{color: "#737a82", padding:"20px 20px 10px 10px"}} class="fas fa-comments fa-lg"></i></a>
                            <a><i style={{color: "#737a82", padding:"20px 20px 10px 10px"}} class="fas fa-folder fa-lg"></i></a>

                            </div>
                        </CardBody>

                    </Card>

                )
            })


        } else {
            return (
                <div className='col-md-9'> No Courses Registered</div>
            )
        }
        
        return (
            

            <div className="col col-sm-10" style={{position:"relative"}}>
                <div className="kkk col-md-10 offset-md-1" style={{position:"absolute", paddingLeft:"5px"}} >
                    <div className="col-md-12" style={{paddingTop:"10px"}} >
                        <span style={{fontSize:"1.8em"}} >Dashboard</span>
                        <i className="fas fa-ellipsis-v col-xs-1 Dashboard-Options" style ={{float:"right", fontSize:"38x", paddingTop:"15px"}} onClick={this.showOptions}></i> 
                    </div>
                        <hr width="97%"></hr>

                    <div>
                    </div>
                    <div className='col-md-12' >
                        {details}
                    </div>
                </div>
            </div>



                

                
           
        )
    }
}

export default Dashboard;