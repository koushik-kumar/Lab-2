import React from 'react';
import {Route} from 'react-router-dom';
import MainNavigation from "./MainNavigation/MainNavigation";
import dashboard from "./Dashboard/dashboard";
import coursesTray from "./MainNavigation/coursesTray";
import groupsTray from "./MainNavigation/groupsTray";
import helpTray from "./MainNavigation/helpTray";
import MainContent from "./MainContent/MainContent";
import MainContentSecondary from "./MainContentSecondary/MainContentSecondary";
import Login from "./Login/Login";

class Main extends React.Component {

    render(){
        return(
            <div>
                <Route path="/"  component={MainNavigation}/>
                <Route path="/login"  component={Login}/>
                <Route path="/dashboard"  component={dashboard}/>

                
                <Route path="/helpTray" component={helpTray}/>
                <Route path="/groupsTray" component={groupsTray}/>
                <Route path="/coursesTray" component={coursesTray}/>

                <Route path="/home" component={MainContent}/>
                <Route path="/secondary" component={MainContentSecondary}/>
            </div>
        )
    }
}

export default Main;