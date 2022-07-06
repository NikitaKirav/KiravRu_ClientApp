/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

/** Components */
import Preloader from './components/common/Preloader/preloader';
import TopMenu from './components/TopMenu/top-menu';
import LeftMenu from './components/LeftMenu/left-menu';
import Footer from './components/Footer/footer';

/** Pages */
import LoginContainer from './pages/Account/Login/login-container';
import RegisterContainer from './pages/Account/Register/register-container';
import Home from './pages/Home/home';
import { ContactsPage } from './pages/Contacts/contacts-page';

/** Store */
import { initializeApp } from './redux/app-main-reducer';
import { AppStateType } from './redux/redux-store';
import store from './redux/redux-store';

/** Styles */
import './app.less';
import s from './app.module.less';


/** Lazy load */
const AdminPart = React.lazy(() => import('./components/AdminPart/admin-part'));
const FileBrowseComponent = React.lazy(() => import('./components/AdminPart/FileBrowse/file-browse-component'));
const ArtCanvasPage = React.lazy(() => import('./Projects/ArtCanvas/art-canvas-page'));
const Blog = React.lazy(() => import('./pages/Notes/notes'));
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
	const [navToggle, setNavToggle] = useState(false);

	useEffect(() => {
		props.initializeApp();
	},[]);  

	useEffect(() => {
		if(navToggle)
			document.body.style.overflow = "hidden";
		else
			document.body.style.overflow = "auto";
	},[navToggle]);
	
	if (!props.initialized) {
		return <Preloader />
	}	

	const pathnameAdmin = /^\/adminBoard/;
	const pathnameImage = /^\/image\/filebrowse/;

	// If User enters to Admin part
	if(pathnameAdmin.test(location.pathname)){
		return (
			<LazyLoadComponent component={<AdminPart />}/>
		);
	} else if(pathnameImage.test(location.pathname)) {
		return (
			<LazyLoadComponent component={<FileBrowseComponent />}/>
		);
	}

	const onClickNavToggle = () => {
		setNavToggle(prev => !prev);
	}

	return (
		<>
		<LeftMenu navToggle={navToggle} onClickNavToggle={onClickNavToggle}  />
		<div className={classNames(s.maskContent, navToggle ? s.maskActive : '')} onClick={onClickNavToggle}></div>

		<div className={classNames(s.page, navToggle ? s.leftMenuActive : '')}>
			<TopMenu navToggle={navToggle} />
			<div className={s.bodyPage}>
				<Routes>
					<Route path='/' element={ <Home /> } />
					<Route path='/notes/*' element={ <LazyLoadComponent component={<Blog  />}/> } />
					<Route path='/works/artcanvas' element={ <LazyLoadComponent component={<ArtCanvasPage  />}/> } />
					<Route path='/works/filebro' element={ <LazyLoadComponent component={<FileBro  />}/> } />
					<Route path='/works/letsdrink' element={ <LazyLoadComponent component={<LetsDrink  />}/> } />
					<Route path='/works/izmailovo' element={ <LazyLoadComponent component={<Izmailovo  />}/> } />
					<Route path='/works' element={ <LazyLoadComponent component={<Projects  />}/> } />				
					<Route path='/login' element={ <LoginContainer /> } />
					<Route path='/register' element={ <RegisterContainer /> } />
					<Route path='/contacts' element={ <ContactsPage /> } />
					<Route path='*' element={ () => <div>404 NOT FOUND</div> } />
				</Routes>	
			</div>
			<Footer />
		</div>	
		</>			
	);
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.appMain.initialized
});

const AppContainer = compose<React.ComponentType>(connect(mapStateToProps,{initializeApp}))(App);

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