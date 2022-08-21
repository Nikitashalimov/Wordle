import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWords = createAsyncThunk(
	'words/fetchWords',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('https://my-json-server.typicode.com/Nikitashalimov/JSON/db');

			if (!response.ok) {
				throw new Error('Server Error!');
			}
			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

const wordsSlice = createSlice({
	name: 'words',
	initialState: {
		baseWords: null,
		baseIndex: null,
		status: null,
		error: null,
		secretWord: null,
		complexity: null,
		startState: null,
		startInputStyleState: null,
	},
	reducers: {
		addBaseIndex(state, action) {
			state.baseIndex = action.payload;
		},
		addSecretWord(state, action) {
			state.secretWord = action.payload;
		},
		addComplexity(state, action) {
			state.complexity = action.payload;
		},
		addStartState(state, action) {
			state.startState = action.payload;
		},
		addStartInputStyleState(state, action) {
			state.startInputStyleState = action.payload;
		},
	},
	extraReducers: {
		[fetchWords.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchWords.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.baseWords = action.payload.data;
		},
		[fetchWords.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
	},
})

export const { addBaseIndex, addSecretWord, addComplexity, addStartState, addStartInputStyleState } = wordsSlice.actions;

export default wordsSlice.reducer;