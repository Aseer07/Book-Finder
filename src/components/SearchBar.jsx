import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [isListening, setIsListening] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript); // Automatically triggers the search with voice input
    };

    recognition.start();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="search-form shadow-lg p-3 mb-5 rounded"
    >
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Find books by text or use voice search"
          aria-label="Search for books"
          value={query}
          onChange={handleChange}
          className="search-input rounded-pill"
        />
        <InputGroup.Text>
          <Button variant="primary" onClick={startListening}>
            <FaMicrophone color={isListening ? "red" : "white"} size={18} />
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="search-btn rounded-pill"
          >
            <FaSearch size={18} />
          </Button>
        </InputGroup.Text>
      </InputGroup>

      <Form.Group controlId="categorySelect" className="mt-2">
        <Form.Control
          as="select"
          value={category}
          onChange={handleCategorySelect}
          style={{ padding: 10, borderRadius: 15 }}
        >
          <option value="All">All Categories - Discover Every Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="trending">Trending</option>
          <option value="classic">Classic</option>
          <option value="kids">Kids</option>
          <option value="thrillers">Thrillers</option>
          <option value="Nonfiction">Nonfiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="art">Art</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
