import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import "./LoginPage.css";
import FormInput from "../components/FormInput";


function LoginPage({ login }) {
    const { currentUser } = useContext(UserContext);
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    /** Handle form submit:
     * 
     * Calls login func prop and, if successful, redirects to /home and will display dashboard.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigateTo('/');
        } else {
            setFormErrors(result.errors);
        }
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    const loggedInView = (
        <div>
        <h3>It appears you've already logged in. Let's go to the <NavLink exact="true" to="/dashboard">Dashboard</NavLink></h3>
        </div>
    )

    // if (currentUser) {
    //     navigateTo('/dashboard', { replace: true });
    // }
    
    return (
        <>
        {currentUser
        ? loggedInView
        :   <div className="LoginPage">
                <h3 className="login-banner">Hi there! Please login to access your material.</h3>
                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <FormInput value={formData.username} type="text" name="Username" handleChange={handleChange}/>
                        <FormInput value={formData.password} type="password" name="Password" handleChange={handleChange}/>
                        <button
                            className="btn btn-primary"
                            onSubmit={handleSubmit}
                        >Login</button>
                    </form>
                </div>
            </div> }
        </>
    )
}

export default LoginPage;