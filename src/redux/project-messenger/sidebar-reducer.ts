export type FriendType = {
    id: number
    name: string
}

let initialState = {
    friends: [
        {id: 1, name: 'Nikita' },
        {id: 2, name: 'Andrey' },
        {id: 3, name: 'Mihalych' },
    ] as Array<FriendType>
}

export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState): InitialStateType => {
    return state;
}

export default sidebarReducer;