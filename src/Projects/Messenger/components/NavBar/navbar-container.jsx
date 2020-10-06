import { connect } from 'react-redux';
import { NavBar } from './navbar.jsx';


const mapStateToProps = (state) => {
    return {
        friends: state.sidebar.friends
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;