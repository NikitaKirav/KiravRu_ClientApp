import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import s from './pagination.module.less';
import useLocationState from '../../../packages/ui/hooks/location.js';
import qs from 'qs';

let Pagination = (props) => {
    const [{ query }, pushState] = useLocationState();
    let pagesCount = Math.ceil( props.totalCount / props.pageSize );
    let pages = [];

    let delta = 2;
    let left = props.currentPage - delta;
    let right = props.currentPage + delta + 1;

    pages = Array.from({length: pagesCount}, (v, k) => k + 1)
    .filter(i => i && i >= left && i < right);  

    const onPageChanged = (pageIndex) => {
        pushState(`?${qs.stringify({ ...query, page: pageIndex })}`);
        props.onPageChanged(pageIndex);
    }

    return <div className={s.pages}>
        <ul className={s.pagination}>
                {props.currentPage != 1 ? <li className={s.pageItem} onClick={() => {onPageChanged(props.currentPage-1)}}>
                    «</li> : ''}
                {pages.map(p => {
                    return <li key={p} className={ props.currentPage === p ? `${s.pageItem} ${s.selectedPage}` : s.pageItem } onClick={() => { onPageChanged(p)}}>
                                      {p}
                            </li> 
                })}
                {props.currentPage != pagesCount ? <li className={s.pageItem} onClick={() => {onPageChanged(props.currentPage+1)}}>
                    »</li> : ''}
        </ul>
    </div>
}

export default Pagination;