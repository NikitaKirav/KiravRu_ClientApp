﻿import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation, withRouter } from 'react-router-dom';

import './app.less';
import s from './app.module.less';
import TopMenu from './components/TopMenu/top-menu';
import Home from './components/Home/home';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-main-reducer';
import Preloader from './components/common/Preloader/preloader';

import LoginContainer from './components/Account/login-container';
import RegisterContainer from './components/Account/register-container';
import Footer from './components/Footer/footer';
import { AppStateType } from './redux/redux-store';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

const AdminPart = React.lazy(() => import('./components/AdminPart/admin-part'));
const FileBrowseComponent = React.lazy(() => import('./components/AdminPart/FileBrowse/file-browse-component'));
const Messenger = React.lazy(() => import('./Projects/Messenger/messenger'));
const ArtCanvasPage = React.lazy(() => import('./Projects/ArtCanvas/art-canvas-page'));
const Blog = React.lazy(() => import('./components/Blog/blog'));
const Projects = React.lazy(() => import('./Projects/projects'));
const FileBro = React.lazy(() => import('./Projects/FileBro/file-bro'));
const LetsDrink = React.lazy(() => import('./Projects/LetsDrink/letsdrink'));
const Izmailovo = React.lazy(() => import('./Projects/Izmailovo/izmailovo'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void
}

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {

	const location = useLocation();

	useEffect(() => {
		props.initializeApp();
	},[]);  
	
	if (!props.initialized) {
		return <Preloader />
	}	

	const pathnameAdmin = /^\/adminBoard/;
	const pathnameImage = /^\/image\/filebrowse/;
	const pathnameMessenger = /^\/projects\/messenger/;
	// If User enters to Admin part
	if(pathnameAdmin.test(location.pathname)){
		return (
			<LazyLoadComponent component={<AdminPart />}/>
		);
	} else if(pathnameImage.test(location.pathname)) {
		return (
			<LazyLoadComponent component={<FileBrowseComponent />}/>
		);
	} else if(pathnameMessenger.test(location.pathname)) {
		return (
			<LazyLoadComponent component={<Messenger />}/>
		);
	}

	return (
		<div className={s.page}>
			<TopMenu />			
			<div className={s.bodyPage}>
				<Switch>
					<Route exact path='/' component={ Home } />
					<Route path='/blog' render={ () => <LazyLoadComponent component={<Blog  />}/> } />
					<Route path='/projects/artcanvas' render={ () => <LazyLoadComponent component={<ArtCanvasPage  />}/> } />
					<Route path='/projects/filebro' render={ () => <LazyLoadComponent component={<FileBro  />}/> } />
					<Route path='/projects/letsdrink' render={ () => <LazyLoadComponent component={<LetsDrink  />}/> } />
					<Route path='/projects/izmailovo' render={ () => <LazyLoadComponent component={<Izmailovo  />}/> } />
					<Route path='/projects' render={ () => <LazyLoadComponent component={<Projects  />}/> } />				
					<Route path='/login' component={ LoginContainer } />
					<Route path='/register' component={ RegisterContainer } />
					<Route path='*' render={ () => <div>404 NOT FOUND</div> } />
				</Switch>	
			</div>
			<Footer />	
		</div>			
	);
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.appMain.initialized
});

const AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps,{initializeApp}))(App);

const KiravRuApp: React.FC = () => {
	return (
	<BrowserRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>
	);
}

type LazyLoadComponentType = {
	component: JSX.Element
}

export const LazyLoadComponent: React.FC<LazyLoadComponentType> = ({component}) => {
    return (
        <React.Suspense fallback={<Preloader />}>
            {component}
        </React.Suspense>
    );
} 

export default KiravRuApp;