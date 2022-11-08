import React from "react";
import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";

function Pagination( {onChangePage} ) {
  console.log(styles.root)
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={evt => onChangePage(evt.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
};

export default Pagination;
