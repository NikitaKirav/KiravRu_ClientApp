import articleReducer, { InitialStateType, actions } from "./article-reducer";


let state: InitialStateType;

beforeEach(()=> {
    state = {
        article: null,
        listCategories: null,
        listRoles: null
}});

test("", () => {
 //   const newState = articleReducer(state, actions.followSuccess(1))

 //   expect(newState.users[0].followed).toBeFalsy();
 //   expect(newState.users[1].followed).toBeTruthy();
});