import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://openlibrary.org/search.json";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (
    { title = "", category = "All", page = 1, itemsPerPage = 20 } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = { limit: itemsPerPage, page };

      if (title.trim()) {
        params.title = title;
      } else if (category !== "All") {
        params.subject = category;
      } else {
        params.title = "literature";
      }

      const response = await axios.get(API_URL, { params });
      console.log(response, "response from bookSlice");

      const totalResults = response.data.numFound || 0;
      const totalPages = Math.ceil(totalResults / itemsPerPage);

      return { books: response.data.docs, totalPages };
    } catch (error) {
      console.log(error);
      return rejectWithValue("Error fetching books. Please try again later.");
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
    totalPages: 1,
  },
  reducers: {
    clearBooks: (state) => {
      state.books = [];
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBooks } = booksSlice.actions;

export default booksSlice.reducer;
