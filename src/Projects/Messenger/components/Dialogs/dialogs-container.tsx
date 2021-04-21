import {actions} from '../../../../redux/project-messenger/dialogs-reducer';
import Dialogs from './dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/with-auth-redirect';
import { compose } from "redux";
import { AppStateType } from '../../../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage    
    }),
    withAuthRedirect
    )(Dialogs);
