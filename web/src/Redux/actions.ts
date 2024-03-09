import { Entity } from "../DTO/Entity";

export const SET_RESULTS = "SET_RESULTS" as const;
export const SET_ERROR = "SET_ERROR" as const;

interface SetResultsAction {
  type: string;
  payload: Entity[] | null;
  [key: string]: any;
}

interface SetErrorAction {
  type: string;
  payload: Error;
  [key: string]: any;
}

export type ActionTypes = SetResultsAction | SetErrorAction;

export const setResults = (results: Entity[] | null): SetResultsAction => ({
  type: SET_RESULTS,
  payload: results,
});

export const setError = (): SetErrorAction => ({ 
  type: SET_ERROR,
  payload: new Error("Error fetching data"),
});