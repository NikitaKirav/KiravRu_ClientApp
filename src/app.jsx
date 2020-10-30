import React, { useEffect } from 'react';
//import { Router, Route, hashHistory } from 'react-router';
import Blog from './components/Blog/blog.jsx';
import { Route, Redirect, useLocation } from 'react-router-dom';

import './app.less';
import TopMenu from './components/TopMenu/top-menu.jsx';
import Home from './components/Home/home.jsx';
import Messenger from './Projects/Messenger/messenger.jsx';  
import { connect } from 'react-redux';
//import ArticleContainer from './components/Blog/article-container.jsx';
import LoginContainer from './components/Account/login-container.jsx';
import { initializeApp } from './redux/app-main-reducer.js';
import Preloader from './components/common/Preloader/preloader.js';
import AdminPart from './components/AdminPart/admin-part.jsx';
import FileBrowseComponent from './components/AdminPart/FileBrowse/file-browse-component.jsx';
import RegisterContainer from './components/Account/register-container.jsx';
import Footer from './components/Footer/footer.jsx';
import Projects from './Projects/projects.jsx';
import ArtCanvasPage from './Projects/ArtCanvas/art-canvas-page.jsx';


const App = (props) => {

	const location = useLocation();

	useEffect(() => {
		props.initializeApp();
	},[]);   
	
	if (!props.initialized) {
		return <Preloader />
	}	

	const pathnameAdmin = /^\/adminBoard/;
	const pathnameImage = /^\/image\/filebrowse/;
	// If User enters to Admin part
	if(pathnameAdmin.test(location.pathname)){
		return <AdminPart />
	} else if(pathnameImage.test(location.pathname)) {
		return <FileBrowseComponent />
	}

	return (
		<div className="page">
			<TopMenu />			
			<div className="body-page">	
				<Route path='/blog' component={ Blog } />
				<Route exact path='/projects' render={ () => <Projects  /> } />
				<Route path='/projects/messenger' render={ () => <Messenger  /> } />
				<Route path='/projects/artcanvas' render={ () => <ArtCanvasPage  /> } />
				<Route exact path='/' component={ Home } />
				<Route path='/login' component={ LoginContainer } />
				<Route path='/register' component={ RegisterContainer } />
			</div>
			<Footer />	
		</div>			
	);
}

const mapStateToProps = (state) => ({
	initialized: state.appMain.initialized
});

export default connect(mapStateToProps,{initializeApp})(App);

