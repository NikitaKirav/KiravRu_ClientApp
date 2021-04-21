import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import s from './users.module.less';
import { List, Avatar, Button, Skeleton, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userPhoto from '../../../../../assets/images/user_default.png';
import Paginator from '../Paginator/paginator';
import UsersSearchForm from './users-search-form';
import { FilterType, requestUsers, follow as userFollow, unfollow as userUnfollow } from '../../../../redux/project-messenger/users-reducer';
import queryString from 'querystring';
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../../../redux/project-messenger/users-selectors';
import reqwest from 'reqwest';
import { AppStateType } from '../../../../redux/redux-store';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

type PropsType = {

}

export const Users: React.FC<PropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
 
    const dispatch = useDispatch();
    const history = useHistory();

    type QueryParamsType = { term?: string; page?: string; friend?: string }

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

        let actualPage= currentPage;
        let actualFilter = filter;
        if(!!parsed.page) actualPage = Number(parsed.page);
        if(!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string};

        switch(parsed.friend) {
            case "null": 
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);

    useEffect(() => {
        setInitLoading(false);
        setData(users);
        setList(users);
    }, [users]);


    const onLoadMore = () => {
    setLoading(true);
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))));

    /*getData(res => {
        const dataResult = data.concat(res.results);
        console.log(dataResult);
        setData(dataResult);
        setList(dataResult);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));

    });*/
    };

    
    useEffect(() => {
        const query: QueryParamsType = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);
        history.push({
            pathname: '/projects/messenger/users',
            search: queryString.stringify(query)
        });

    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }

    const follow = (userId: string) => {
        dispatch(userFollow(userId));
    }

    const unfollow = (userId: string) => {
        dispatch(userUnfollow(userId));
    }

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;


    return (
        <div className={s.usersList}>
            {/*<UsersSearchForm onFilterChanged={onFilterChanged} />*/}
            <Divider className={s.dividerUser} plain>Users</Divider>
            {/*<Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />*/}
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                //loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                <List.Item>
                    {/*<Skeleton avatar title={false} loading={item.loading} active>*/}
                        <List.Item.Meta
                            avatar={
                                <Link to={`/projects/messenger/profile/${item.id}`}>
                                    {item.photos.small ? <Avatar size={64} src={item.photos.small} /> : <Avatar size={64} icon={<UserOutlined />} /> }
                                </Link>
                            }
                            title={<Link to={`/projects/messenger/profile/${item.id}`}>{item.name}</Link>}
                            description={isAuth && <div>
                                { item.followed ? 
                                <button className={s.followButton} disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                                    unfollow(item.id);                               
                                }}>Unfollow</button> :
                                <button className={s.followButton}  disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                                    follow(item.id);  
                                }}>Follow</button>}                                
                            </div>}
                        />
                   {/* </Skeleton>*/}
                </List.Item>
                 )}
                 />
        </div>
    );
}

