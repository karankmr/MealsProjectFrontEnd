import React from "react";
import {Link} from "react-router-dom";


const AdminView=()=>{
return(
    <div>
        <Link to='/user/view'>
        <h3>View All Users</h3><br/>
        </Link>
        <Link to='/createMeals'>
        <h3>Create New Meal</h3>
        </Link>
        <h3>View All Meals</h3>
        <h3>View Meals Of User</h3>
    </div>

)
}
export default AdminView