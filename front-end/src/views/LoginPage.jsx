import React from "react";

import "./LoginPage.css";
import FormInput from "../components/FormInput";

function LoginPage() {


    return (
        <div className="LoginPage">
            <h3 className="login-banner">Hi there! Please login to access your material.</h3>
            <div className="login-card">
                <form>
                    <FormInput type="text" name="Username" />
                    <FormInput type="password" name="Password" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;