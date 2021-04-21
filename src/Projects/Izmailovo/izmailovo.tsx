import React from 'react';
import s from './izmailovo.module.less';
import izmailovoImage_001 from '../../../assets/images/izmailovo_001.jpg';
import izmailovoImage_002 from '../../../assets/images/izmailovo_002.jpg';
import izmailovoImage_003 from '../../../assets/images/izmailovo_003.jpg';
import { NavLink } from 'react-router-dom';


const Izmailovo: React.FC = () => {

    return (
        <div className={s.izmailovo}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/projects">Projects</NavLink> / Izmailovo client-server application</li>
                </ol>
            </nav>
            <h1>Izmailovo client-server application</h1>
            <span><time className={s.blockTime}>NOVEMBER 20, 2019</time></span>
            <div className={s.contentText}>
                <p>This application was created for the biggest hotel of Russia. 
                    The main task was to create an application which would be installed on each computer of the hotel and each employee could only use their own modules.
                     If He/She doesn't have an access to some modules then they don't see them. For this purpose the system of authorization and authentication of users was added. 
                     Also, the task included the following points: </p>
                     <p>1) The application must be a Windows Desktop App. </p>
                     <p>2) The application must support different versions of Windows (<span className={s.textGreen}>Windows XP, 7, 10</span>). </p>
                     <p>3) Using existing databases (<span className={s.textRed}>MSSQL</span>) on different servers. </p>
                     <p>The App used the following technologies: server part (<span className={s.textRed}>ASP.NET WebApi</span>), 
                     client (<span className={s.textRed}>WPF MVVM</span>), database (<span className={s.textRed}>MS SQ</span>L) and git (<span className={s.textRed}>TFS Git</span>). 
                         It was a Fault-Tolerant Composite Project that had a strong isolation between the host and plug-ins. Also my work included: </p>
                     <p>- the system of authorization and identification of users</p>
                     <p>- opportunity to easy development of new plug-ins in the future</p>
                     <p>- automatically update the application on users ' computers after deployment on the server.</p>
                     <p>- virtualizing data </p>
                    <p>The App had different plug-ins such as Administration (gives Users different access to the application), 
                        shareholder register (controls payments to shareholders), minds (distributes shifts for maids) and e.t.c.
                    </p>
                <img src={izmailovoImage_001} className={s.izmailovoImg} title="izmailovoScreenShot" />
                <img src={izmailovoImage_002} className={s.izmailovoImg} title="izmailovoScreenShot" />
                <img src={izmailovoImage_003} className={s.izmailovoImg} title="izmailovoScreenShot" />
            </div>
        </div>
    );
}

export default Izmailovo;