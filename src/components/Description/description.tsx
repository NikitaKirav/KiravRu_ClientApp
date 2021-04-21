import React, { Component } from "react";
import { HomeDescription, BlogDescription, ProjectsDescription } from './text-description';
import { Route } from 'react-router-dom';


export class Description extends Component {
    render() {
        return (
            <div>                
                <Route exact path='/' component={ HomeDescription } />
                <Route path='/blog' component={ BlogDescription } />
                <Route exact path='/projects' component={ProjectsDescription} />
            </div>
        );
    }
}
