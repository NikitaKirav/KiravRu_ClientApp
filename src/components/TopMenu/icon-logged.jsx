import React, { Component } from "react";

export class IconLogged extends Component {
    render () {
 
        const iconLoggedIn = () => { 
            <div className="dropbtn">
                <IconUserLoggedIn />
            </div>
        };

        const menuAdmin = (userName) => {
            <div id="myDropdown" className="dropdown-content">
                <label className="nameUser">{userName}</label>
                <a className="nav-link" href="/AdminBoard/Index">AdminBoard</a>
                <button type="submit" className="btn btn-link navbar-btn nav-link">Logout</button>
            </div>
        };

        const menuUser = (userName) => {
            <div id="myDropdown" class="dropdown-content">
            <label class="nameUser">{userName}}</label>
            <button type="submit" class="btn btn-link navbar-btn nav-link">Logout</button>
        </div>
        };

        const blockIconMenu = () => {
            <li class="dropdown nav-item" id="userLogin"></li>
        }

        return (
            <div></div>
        );
    }


}