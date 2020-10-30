import React, { Component } from "react";

import s from './text-description.module.less';

export class ProjectsDescription extends Component {
    render() {
        return (
            <div className={`${s.blog_description} ${s.line_dark_style}`} id="aboutProjects">
                <h1 className={s.headline}>My projects</h1>
                <p className={s.headline_text}>This is where I post announcements, tips and tricks, new and updated features, 
                fun roundups, new podcast episodes, and more.</p>
            </div>
        );
    }
}

export class BlogDescription extends Component {
    render() {
        return (
            <div className={`${s.blog_description} ${s.line_dark_style}`} id="aboutBlog">
                <h1 className={s.headline}>NikitaKirav's Blog</h1>
                <p className={s.headline_text}>This is where I post announcements, tips and tricks, new and updated features, 
                fun roundups, new podcast episodes, and more. There's an <a href="/feed/">RSS feed</a>.</p>
            </div>
        );
    }
}

export class HomeDescription extends Component {
    render() {
        return (
            <div className={s.line_dark_style} id="aboutMe">
                <div className={s.aboutme_description} >
                    <p className={s.headline_text}>
                        I'm a programmer and a little bit artist.
                        This site is my field for experimentations in programming and digital art.
                        I keep a lot of useful articles here which help me.
                        If you find something interesting here I'll be glad.
                    </p>
                    <p className={s.headline_text}>
                        P/s: the main part of articles will be available after registration on my site.
                    </p>
                </div>
            </div>
        );
    }
}