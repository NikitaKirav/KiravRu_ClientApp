import React from 'react';
import s from './about-page.module.less';
import { Divider } from 'antd';


export const AboutPage = () => {
    return (
        <div className={s.aboutPage}>
        <Divider className={s.divider} plain>About this project</Divider>
        <div className={s.text}>
        <p>Hey everyone! I want to present you my project. This is an example of a messenger. This project has educational purposes. You can view the source code on github.
            In this moment it has the following opportunities:</p>
            <p>1) Registration and login pages. You can register in system and see how it works. </p>
            <p>2) Profile page with a posts list. You can upload your avatar and edit its frames. 
                Edit status and user's information. You can add your post to any user's profile. Add likes or dislikes. </p>
            <p>3) User's list page. You can follow and unfollow any user.</p>
            <p>4) User's chat list. Here, you can find all your chats and follow to one.</p>

            <p>Project use the following technologies:</p>
            <p>- Frontend: React + Redux, TypeScript </p>
            <p>- Backend: NodeJS</p>
            <p>- Database: MongoDb</p>
            </div>
        </div>
    )
}