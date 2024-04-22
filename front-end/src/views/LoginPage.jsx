import React from "react";

import FormInput from "../components/FormInput";

function LoginPage() {


    return (
        <>
            <h3>Hi there! Please login to access your material.</h3>
            <div className="login-card">
                <form>
                    <FormInput type="text" name="Username" />
                    <FormInput type="password" name="Password" />
                </form>
            </div>
        </>
    )
}

export default LoginPage;