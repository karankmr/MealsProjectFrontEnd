import React, { useState} from 'react';
import './css/App.css';
import Login from "./components/login";
import {BrowserRouter as Router,Route} from "react-router-dom";
import SignUp from "./components/signUp";
import ViewAllMeals from "./components/viewAllMeals";
import CreateMeal from "./components/admin/create-meal";
import AdminView from "./components/admin/adminView";
import ViewAllUsers from "./components/admin/viewAllusers";
import ProtectedRoutes from "./components/protectedRoutes";
import ViewMealsForUser from "./components/admin/viewMealsForUser";
import {reactLocalStorage} from 'reactjs-localstorage';

function App() {
    const [token,setToken]=useState();
    return (
        <Router>
            <div className="App">

                <Route exact path="/" render={(props) => <Login {...props} setToken={setToken} token={token}/>}/>

                <Route path="/login" render={(props) => <Login {...props} setToken={setToken} token={token}/>}/>

                <Route path="/signUp" component={SignUp}/>

                <ProtectedRoutes path='/adminView' component={AdminView}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path='/viewAllUsers' component={ViewAllUsers} token={reactLocalStorage.get('jwttoken')}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path="/createMeals" component={CreateMeal}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path='/viewAllMeals' component={ViewAllMeals}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path='/viewMealById/:id' component={ViewMealsForUser}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />


            </div>

        </Router>

    );
}

export default App;
