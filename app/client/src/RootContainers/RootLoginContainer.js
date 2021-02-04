import React from 'react';

const title = "Login";

const loginButtons=
    <div className="ui container">
        <div className ="ui divider">
            <br/>
            <div class="ui container">
                <div className="ui buttons">
                    <button className="ui red button">Login</button>
                    <div className="or"></div>
                    <button className="ui blue button">Register</button>
                </div>
                <a href=""> Forgot Password?</a>
            </div>
        </div>
    </div>
;

const fields = 
    <div className ="ui stackable grid">
        <div className="fields">
            <div className="field">
                <lable>Email </lable>
                <div className="ui mini icon input">
                    <input type="text" placeholder="School Email" id="email-input"></input>
                </div> 
            </div>
        </div>
        <div className="fields">
            <div className="field">
            <lable>Password </lable>
                <div className="ui mini icon input">
                    <input type="password" placeholder="Password" id="user-password"></input>
                </div> 
            </div>
        </div>

    </div>
;

const loginModal =
    <form className="ui form">
        <div className="ui container">
        <img className="ui centered small image" src="assets/images/logo-color.svg"/>
            <div className="ui container">
                <div className="ui divider"></div>
                <br/>
                {fields}
            </div>
        </div>
        {loginButtons}
    </form>
;



export default () => { 
    return (
        <div className = "ui main container">
            <div className = "ui raised very padded text container segment">
                {loginModal}
            </div>
        </div>
    );   
};