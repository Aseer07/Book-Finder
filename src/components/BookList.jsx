// /components/BookList.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <Row>
      {books.map((book) => (
        <Col sm={12} md={6} lg={4} key={book.key}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
