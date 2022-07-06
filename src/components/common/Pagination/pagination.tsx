/** Absolute imports */
import React from 'react';
import qs from 'qs';

/** Styles */
import classes from './pagination.module.less';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

let Pagination: React.FC<PropsType> = ({totalCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil( totalCount / pageSize );
    let pages = [];

    let delta = 5;
    let left = currentPage - delta;
    let right = currentPage + delta + 1;

    pages = Array.from({length: pagesCount}, (v, k) => k + 1)
    .filter(i => i && i >= left && i < right);  

    const onClickPage = (pageIndex: number) => {
        //pushState(`?${qs.stringify({ ...query, page: pageIndex })}`);
        onPageChanged(pageIndex);
    }

    return <div className={classes.pages}>
        <ul className={classes.pagination}>
                {currentPage != 1 ? <li className={classes.pageItem} onClick={() => {onClickPage(currentPage-1)}}>
                    «</li> : ''}
                {pages.map(p => {
                    return <li key={p} className={ currentPage === p ? `${classes.pageItem} ${classes.selectedPage}` : classes.pageItem } onClick={() => { onPageChanged(p)}}>
                                      {p}
                            </li> 
                })}
                {currentPage != pagesCount ? <li className={classes.pageItem} onClick={() => {onPageChanged(currentPage+1)}}>
                    »</li> : ''}
        </ul>
    </div>
}

export default Pagination;