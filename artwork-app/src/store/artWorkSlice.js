import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchArtworksService,
  fetchArtworkDetailsService,
  searchArtWorks,
} from "./api";

export const fetchArtworks = createAsyncThunk(
  "artwork/fetchArtworks",
  async (params, { rejectWithValue }) => {
    try {
      let response = undefined;
      if (params.search) {
        response = await searchArtWorks(params);
      } else {
        response = await fetchArtworksService(params);
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArtWorkDetails = createAsyncThunk(
  "artwork/fetchArtWorkDetails",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchArtworkDetailsService(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const artworkSlice = createSlice({
  name: "artwork",
  initialState: {
    artWorks: [],
    selectedArtwork: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchTerm: "",
    categoryFilter: "",
    itemsPerPage: 10,
    selectedArtWorkDetails: null,
  },
  reducers: {
    selectArtwork(state, action) {
      state.selectedArtwork = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        const data = action.payload?.data?.map((e) => {
          const { id, title, thumbnail } = e;
          return {
            id,
            title,
            thumbnail,
          };
        });

        state.artWorks = data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.total_pages;
        state.loading = false;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchArtWorkDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtWorkDetails.fulfilled, (state, action) => {
        const data = action.payload?.data;

        const {
          title,
          artist_display,
          date_display,
          main_reference_number,
          thumbnail,
        } = data;
        state.selectedArtWorkDetails = {
          title,
          artist_display,
          date_display,
          main_reference_number,
          thumbnail,
        };

        state.loading = false;
      })
      .addCase(fetchArtWorkDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  selectArtwork,
  setSearchTerm,
  setCategoryFilter,
  setCurrentPage,
} = artworkSlice.actions;

export default artworkSlice.reducer;
