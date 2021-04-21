import React, { Component } from "react";
import { IconUserLoggedIn } from "../../svg-icons/user-login";

export class IconLogged extends Component {
    render () {
 
        const iconLoggedIn = () => { 
            <div className="dropbtn">
                <IconUserLoggedIn />
            </div>
        };

        const menuAdmin = (userName: string) => {
            <div id="myDropdown" className="dropdown-content">
                <label className="nameUser">{userName}</label>
                <a className="nav-link" href="/AdminBoard/Index">AdminBoard</a>
                <button type="submit" className="btn btn-link navbar-btn nav-link">Logout</button>
            </div>
        };

        const menuUser = (userName: string) => {
            <div id="myDropdown" className="dropdown-content">
            <label className="nameUser">{userName}</label>
            <button type="submit" className="btn btn-link navbar-btn nav-link">Logout</button>
        </div>
        };

        const blockIconMenu = () => {
            <li className="dropdown nav-item" id="userLogin"></li>
        }

        return (
            <div></div>
        );
    }


}