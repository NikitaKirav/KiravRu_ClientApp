export function users(state = [], action) {
    switch(action.type){
        case 'USERS_FETCH_DATA_SUCCESS':
            return action.users;
        default:
            return state;
    }
}