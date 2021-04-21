import usersReducer, { InitialStateType, actions } from "./users-reducer";


let state: InitialStateType;

beforeEach(()=> {
    state = {
    users: [
        {id: '0', name: 'Nikita0', followed: false,
        photos: { small: null, large: null}, status: "status0"},
        {id: '1', name: 'Nikita1', followed: false,
        photos: { small: null, large: null}, status: "status1"},
        {id: '2', name: 'Nikita2', followed: true,
        photos: { small: null, large: null}, status: "status2"},
        {id: '3', name: 'Nikita3', followed: true,
        photos: { small: null, large: null}, status: "status3"},
    ],
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
}});

test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccess('1'))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess('3'))

    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();
});