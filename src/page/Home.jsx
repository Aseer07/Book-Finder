import React, { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { fetchBooks, clearBooks } from "../redux/booksSlice";
import CardSkeleton from "../components/CardSkeleton";

let homeImg =
  "https://plus.unsplash.com/premium_photo-1703701579607-533aa80225fe?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
  const dispatch = useDispatch();
  const { books, status, error, totalPages } = useSelector(
    (state) => state.books
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleSearch = (query) => {
    setCurrentPage(1);
    dispatch(clearBooks());
    dispatch(fetchBooks({ title: query, page: 1, itemsPerPage }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalDisplayedPages = 5;
    const pages = [];

    const startPage = Math.max(
      1,
      currentPage - Math.floor(totalDisplayedPages / 2)
    );
    const endPage = Math.min(totalPages, startPage + totalDisplayedPages - 1);

    if (startPage > 1)
      pages.push(
        <Pagination.First key="first" onClick={() => handlePageChange(1)} />
      );
    if (currentPage > 1)
      pages.push(
        <Pagination.Prev
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages)
      pages.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
    if (endPage < totalPages)
      pages.push(
        <Pagination.Last
          key="last"
          onClick={() => handlePageChange(totalPages)}
        />
      );

    return pages;
  };

  return (
    <>
      <HeroSection
        image={homeImg}
        title="Find Your Book of Choice"
        description="Explore a wide variety of books from different genres, authors, and topics. Whether you're looking for fiction, non-fiction, or anything in between, discover your next great read here."
      />
      <Container>
        <SearchBar onSearch={handleSearch} />

        {status === "loading" && (
          <div className="book-skeleton-list">
            {[...Array(6)].map((_, idx) => (
              <CardSkeleton key={idx} /> // Show skeleton cards
            ))}
          </div>
        )}
        {error && <p>{error}</p>}

        {status === "succeeded" && books.length > 0 && (
          <BookList books={books} />
        )}

        {status === "succeeded" && books.length === 0 && (
          <div className="no-results">
            <p>
              No results found. Try a different keyword or explore another
              category!
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {status === "succeeded" && books.length > 0 && (
          <Pagination className="justify-content-center mt-3">
            {renderPagination()}
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default Home;
