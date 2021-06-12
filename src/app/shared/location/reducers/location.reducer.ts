import { createReducer, on } from '@ngrx/store';
import { LocationActions } from '../actions';

interface Status {
  pending?: boolean;
  error?: string;
}

export interface State{
  location?: string;
  pending?: boolean;
  locationStatus?: Status
}

const initialState: State = {
  location: '',
  pending: false,
  locationStatus:{pending:false, error:''}
}

const weatherReducer = createReducer(
  initialState,
  on(LocationActions.loadLocation, (state) => ({...state, pending: true})),
  on(LocationActions.saveLocation, (state, { location }) => ({...state, location, pending: false })),

  on(LocationActions.changeLocation, (state) => ({...state, pending: true})),
  on(LocationActions.changeLocationFailure, (state, { error }) => ({...state, locationStatus:{error}, pending: false })),

  on(LocationActions.deleteLocation, (state) => ({...state, location:'', pending: false })),
  on(LocationActions.deleteLocationFailure, (state, { error }) => ({...state, locationStatus:{error}, pending: false })),
);

export function reducer(state: State | undefined, action: LocationActions.LocationActionsUnion){
  return weatherReducer(state, action);
}

export const getLocation = (state: State) => state?.location;
export const getError = (state: State) => state?.locationStatus?.error;
export const getPending = (state: State) => state?.pending;
