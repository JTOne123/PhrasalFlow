import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Entity } from '../DTO/Entity';
import axios, { AxiosResponse } from 'axios';
import { Data } from '../DTO/Data';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface VerbState {
  data: Data | null,
  gridResults: Entity[] | null,
  status: LoadingStatus,
  error: string | undefined | null,
}

const initialState : VerbState = {
  data: null,
  gridResults: null,
  status: LoadingStatus.Idle,
  error: null,
}

export const fetchVerbs = createAsyncThunk('verbs/fetchVerbs', async () => {
  const response: AxiosResponse<Data> = await axios.get(`http://localhost:8080/uk.json`);
  return response.data;
});

export const testOne1 = createAsyncThunk(
  "verbSlice/testOne",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

export const verbSlice = createSlice({
  name: 'verb',
  initialState,
  reducers: {
    searchVerbsForGridResults: (state, searchTerm: PayloadAction<string>) => {
      state.gridResults = searchVerbByText(state, searchTerm.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVerbs.pending, (state, action) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchVerbs.fulfilled, (state: VerbState, action: PayloadAction<Data>) => {
        state.status = LoadingStatus.Succeeded;
        state.data = action.payload;
        state.gridResults = action.payload.Recipes;
      })
      .addCase(fetchVerbs.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message
      })
      .addCase(testOne1.pending, () => {

      })
      .addCase(testOne1.fulfilled,
        (state, action: PayloadAction<number>) => {

        }
      );
  },
});

export const { searchVerbsForGridResults } = verbSlice.actions;

export default verbSlice.reducer;

export const selectAllVerbs = (state: any) => {
  if (state.verbs === null) {
    return null;
  }

  return state.verbs;
};

export const selectVerbById = (state: any, verbId: number) =>
{
  if (state.data === null) {
    return null;
  }

  return state.data.Recipes.find((verb : Entity) => verb.Id === verbId);
}

export const searchVerbByText = (state: any, text: string) =>
{
  if (state.data === null) {
    return null;
  }

  let results: Entity[] = state.data.Recipes.filter((verb: Entity) => verb.Name.toLowerCase().includes(text.toLowerCase()));

  return results;
}