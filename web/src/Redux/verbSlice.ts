import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios';
import { Data } from '../DTO/Data';
import { Entity } from '../DTO/Entity';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface VerbState {
  language: string | null,
  data: { [key: string]: Data } | null;
  gridResults: Entity[] | null,
  status: LoadingStatus,
  error: string | undefined | null,
}

const initialState : VerbState = {
  language: null,
  data: null,
  gridResults: null,
  status: LoadingStatus.Idle,
  error: null,
}

export interface FetchResult
{
  Data: Data,
  Language: string
}

const fetchFunc = async (language: string) => {
  const response: AxiosResponse<Data> = await axios.get(`/data/${language}.json`);
  const fetchResult: FetchResult = {Data: response.data, Language: language};
  return fetchResult;
}

export const fetchVerbs = createAsyncThunk<FetchResult, string>('verbs/fetchVerbs', async (language: string) => {
  return await fetchFunc(language);
});

export const changeLanguageVerbs = createAsyncThunk<FetchResult, string, AsyncThunkConfig>('verbs/changeLanguageVerbs', async (language, thunkAPI) => {
  const state: any = thunkAPI.getState();
  
  if (state.verbs.data !== null && state.verbs.data[language] !== undefined) {
    return {Data: state.verbs.data[language], Language: language};
  }

  return await fetchFunc(language);
});

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
      .addCase(fetchVerbs.fulfilled, (state: VerbState, action: PayloadAction<FetchResult>) => {
        state.status = LoadingStatus.Succeeded;
        state.language = action.payload.Language;
        state.data = state.data ?? {};
        state.data[state.language] = action.payload.Data;
        state.gridResults = state.data[state.language].Recipes;
      })
      .addCase(fetchVerbs.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message
      })
      .addCase(changeLanguageVerbs.pending, (state, action) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(changeLanguageVerbs.fulfilled, (state: VerbState, action: PayloadAction<FetchResult>) => {
        state.status = LoadingStatus.Succeeded;
        state.language = action.payload.Language;
        state.data = state.data ?? {};
        state.data[state.language] = action.payload.Data;
        state.gridResults = state.data[state.language].Recipes;
      })
      .addCase(changeLanguageVerbs.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message
      });
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

const selectVerbById = (state: any, verbId: number) =>
{
  if (state.data === null) {
    return null;
  }

  return state.data.Recipes.find((verb : Entity) => verb.Id === verbId);
}

const searchVerbByText = (state: any, text: string) =>
{
  if (state.data === null) {
    return null;
  }

  let results: Entity[] = state.data[state.language].Recipes.filter((verb: Entity) => 
    verb.Name?.toLowerCase().includes(text.toLowerCase()) || 
    verb.HeaderDescription?.toLowerCase().includes(text.toLowerCase()) ||
    verb.FooterDescription?.toLowerCase().includes(text.toLowerCase()) ||
    verb.RecipeInstructions?.some((ingredient: string) => ingredient.toLowerCase().includes(text.toLowerCase())));

  return results;
}