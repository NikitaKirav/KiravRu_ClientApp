import { experiments } from "webpack";
import { ResultCode, APIResponseType } from "../../api/project-messanger/api";
import { usersAPI } from "../../api/project-messanger/users-api";
import { follow, actions, unfollow } from "./users-reducer";

jest.mock('../../api/project-messanger/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCode.Success,
    message: '',
    errors: [],
    data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test('success follow thunk', async () => {
    const thunk = follow('1');

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, '1'));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess('1'));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, '1'));
});

test('success unfollow thunk', async () => {
    const thunk = unfollow('1');

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, '1'));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess('1'));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, '1'));
});