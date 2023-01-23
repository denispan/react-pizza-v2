import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { currentPage, categoryId, sort, order } = params;
    const filterByCategory = categoryId ? `category=${categoryId}` : '';
    const searchBySortProperty = categoryId ? `&sortBy=${sort.sortProperty}` : `sortBy=${sort.sortProperty}`;

    const response = await axios.get(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas?page=${currentPage}&limit=4&${filterByCategory}${searchBySortProperty}&order=${order}`)
    return response.data;
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(fetchPizzas.pending, (state) => {
    state.status = 'loading';
    state.items = [];
  })
  builder.addCase(fetchPizzas.fulfilled, (state, action) => {
    state.items = action.payload;
    state.status = 'success';
  })
  builder.addCase(fetchPizzas.rejected, (state, action) => {
    state.status = 'error';
    state.items = [];
  })
},
});

export const {setItems} = pizzasSlice.actions;
export default pizzasSlice.reducer;
