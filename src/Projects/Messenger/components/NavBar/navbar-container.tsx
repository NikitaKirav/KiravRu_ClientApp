import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { NavBar } from './navbar';


const mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.sidebar.friends
    }
}


const NavBarContainer = connect(mapStateToProps, {})(NavBar);

export default NavBarContainer;