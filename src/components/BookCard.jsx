import React from "react";
import { Card } from "react-bootstrap";

const BookCard = ({ book }) => {
  const { title, author_name, cover_i, first_publish_year } = book;

  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
    : "https://via.placeholder.com/128x192";

  return (
    <Card className="book-card shadow-sm" style={{ marginBottom: 15 }}>
      <Card.Img variant="top" src={coverUrl} className="book-card-img" />
      <Card.Body className="book-card-body">
        <Card.Title className="book-card-title">{title}</Card.Title>
        <Card.Text className="book-card-text">
          <strong>Author:</strong> {author_name?.join(", ") || "Unknown"}
        </Card.Text>
        <Card.Text className="book-card-text">
          <strong>First Published:</strong> {first_publish_year || "N/A"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
