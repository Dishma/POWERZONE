import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Chamod
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Login from './components/Login';

import MemberList from './components/Member List/MemberList';
import EditMember from './components/Member List/EditMember';
import PostMember from './components/Member List/PostMember';

import WorkoutPlan from './components/Workout Plan/WorkoutPlan';
import EditPlan from './components/Workout Plan/EditPlan';


//Dishma
import Getstart from "./components/Getstart";

import CreateDriver from "./components/CreateDriver";
import EditDriver from "./components/EditDriver";
import Homedriver from "./components/Homedriver";

import Adminhome from "./components/Adminhome";


//Kavindu
import Topnav from './components/Supplements/Topnav';
import Supplements from "./components/Supplements/Supplements";
import EditSupplement from "./components/Supplements/EditSupplement";
import Orders from './components/Supplements/Orders';
import EditOrders from './components/Supplements/EditOrders';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        {/*Chamod*/}
        <Route path="/login" component={Login}></Route>
        
        <Route path="/memberlist" component={Header}></Route>
        <Route path="/memberlist" component={Navbar}></Route>
        <Route path="/memberlist" component={MemberList}></Route>
        <Route path="/memberlist" component={Footer}></Route>
        <Route path="/editmember" component={Header}></Route>
        <Route path="/editmember" component={Navbar}></Route>
        <Route path="/editmember/:id" component={EditMember}></Route>
        <Route path="/editmember" component={Footer}></Route>
        <Route path="/postmember" component={Header}></Route>
        <Route path="/postmember" component={Navbar}></Route>
        <Route path="/postmember/:id" component={PostMember}></Route>
        <Route path="/postmember" component={Footer}></Route>

        <Route path="/workoutplans" component={Header}></Route>
        <Route path="/workoutplans" component={Navbar}></Route>
        <Route path="/workoutplans" component={WorkoutPlan}></Route>
        <Route path="/workoutplans" component={Footer}></Route>
        <Route path="/editworkoutplan" component={Header}></Route>
        <Route path="/editworkoutplan" component={Navbar}></Route>
        <Route path="/editworkoutplan/:id" component={EditPlan}></Route>
        <Route path="/editworkoutplan" component={Footer}></Route>


        {/* Kavindu */}
        <Route path="/supplements" component={Header}></Route>
        <Route path="/supplements" component={Topnav}></Route>
        <Route path="/supplements" component={Supplements}></Route>
        <Route path="/supplements" component={Footer}/>        

        <Route path="/editsupplement" component={Header}></Route>
        <Route path="/editsupplement" component={Topnav}></Route>
        <Route path="/editsupplement/:id" component={EditSupplement}></Route>
        <Route path="/editsupplement" component={Footer}/>        

        <Route path="/orders" component={Header}></Route>
        <Route path="/orders" component={Topnav}></Route>   
        <Route path="/orders" component={Orders}></Route> 
        <Route path="/orders" component={Footer}></Route>

        <Route path="/editorder" component={Header}></Route>
        <Route path="/editorder" component={Topnav}></Route>   
        <Route path="/editorder/:id" component={EditOrders}></Route> 
        <Route path="/editorder" component={Footer}></Route>  


        {/*Dishma*/}
        <main className="page-body-content">
          <Route path="/" exact component={Getstart}></Route>

          <Route path="/homedriver" component={Header} />
          <Route path="/homedriver" exact component={Homedriver}></Route>
          <Route path="/homedriver" component={Footer} />
          <Route path="/adddriver" component={Header} />
          <Route path="/adddriver" component={CreateDriver}></Route>
          <Route path="/adddriver" component={Footer} />
          <Route path="/editdriver" component={Header} />
          <Route path="/editdriver/:id" component={EditDriver}></Route>
          <Route path="/editdriver" component={Footer} />

          <Route path="/adminhome" component={Header} />
          <Route path="/adminhome" component={Adminhome}></Route>
          <Route path="/adminhome" component={Footer} />
        </main>

        

      </BrowserRouter>
    )
  }
}