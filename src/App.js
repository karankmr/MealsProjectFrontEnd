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
import EditableTable from "./components/admin/viewMealsForUser";

function App() {
    const [token,setToken]=useState();
    return (
        <Router>
            <div className="App">

                <Route exact path="/" render={(props) => <Login {...props} setToken={setToken} token={token}/>}/>

                <Route exact path="/editable" render={(props) => <EditableTable {...props} />}/>

                <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken} token={token}/>}/>

                <Route path="/signUp" component={SignUp}/>


                <ProtectedRoutes path='/adminView' component={AdminView}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path='/viewAllUsers' component={ViewAllUsers} token={reactLocalStorage.get('jwttoken')}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                <ProtectedRoutes path="/createMeals" component={CreateMeal}
                                 loggedIn={reactLocalStorage.get('isLoggedIn')} />

                {/*<Route exact path="/createMeals" render={(props) => <CreateMeal {...props} token={token}/>}/>*/}

                <Route exact path='/viewAllMeals' render={(props) => <ViewAllMeals {...props} token={token}/>}/>

                <Route exact path='/viewMealById/:id' render={(props) => <ViewMealsForUser {...props} token={token}/>}/>

            </div>

        </Router>

    );
}

export default App;
