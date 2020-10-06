import {sendMessageCreator} from '../../../../redux/dialogs-reducer.js';
import { Dialogs } from './dialogs.jsx';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/with-auth-redirect.js';
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
 
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs);
