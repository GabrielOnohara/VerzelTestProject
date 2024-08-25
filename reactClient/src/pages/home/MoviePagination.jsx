import PropTypes from "prop-types";
import {
    Pagination,
  } from "react-bootstrap";

const MoviePagination = ({changePage, page, displayMoviesTotalPages}) => {
  return (
    <Pagination className="mx-auto my-3 py-3" data-bs-theme="dark">
      <Pagination.First onClick={() => changePage(1)} />
      <Pagination.Prev onClick={() => changePage(page - 1)} />
      <Pagination.Item active>{page}</Pagination.Item>
      {page + 1 < displayMoviesTotalPages && (
        <Pagination.Item onClick={() => changePage(page + 1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {page + 2 < displayMoviesTotalPages && (
        <Pagination.Item onClick={() => changePage(page + 2)}>
          {page + 2}
        </Pagination.Item>
      )}
      <Pagination.Ellipsis />
      {page + 9 < displayMoviesTotalPages && (
        <Pagination.Item onClick={() => changePage(page + 9)}>
          {page + 9}
        </Pagination.Item>
      )}
      {page + 1 < displayMoviesTotalPages && (
        <Pagination.Next onClick={() => changePage(page + 1)} />
      )}
      <Pagination.Last onClick={() => changePage(displayMoviesTotalPages)} />
    </Pagination>
  );
};

MoviePagination.propTypes = {
    changePage: PropTypes.function({
      page: PropTypes.number.isRequired
    }),
    page: PropTypes.number.isRequired,
    displayMoviesTotalPages: PropTypes.number.isRequired
  };

export default MoviePagination;
