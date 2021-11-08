import React, {useEffect, useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames"
// let Paginator = ({totalUsersCount, currentPage, onPageChanged, pageSize}) => {
//     let pagesCount = Math.ceil(totalUsersCount / pageSize);
//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }
//     return <div>
//         {pages.map(p => {
//             return <span className={currentPage === p && styles.selectedPage}
//                          onClick={(e) => {
//                              onPageChanged(p);
//                          }}>{p}</span>
//         })}
//     </div>
// }
// export default Paginator;
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber:number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize,
                                          currentPage = 1,
                                          onPageChanged = x => x,
                                          portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
let portionCount = Math.ceil (pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);


    return <div className = {styles.paginator}>
            {portionNumber > 1 &&
                <button onClick = {() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map((p)=> {
                return <span className = { cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber)}
                             key={p}
                                 onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick = {() => {setPortionNumber(portionNumber +1)}}>NEXT</button>}
        </div>
        }

        export default Paginator;