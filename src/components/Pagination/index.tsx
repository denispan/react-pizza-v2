import React from "react";
import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";


type PaginationProps = {
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ( {onChangePage} ) => {

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={evt => onChangePage(evt.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
    />
  )
};

export default Pagination;
