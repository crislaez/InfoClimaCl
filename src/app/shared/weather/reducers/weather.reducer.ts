import { createReducer, on  } from '@ngrx/store';
import { WeatherActions } from '../actions';
import { Weather } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  weather?: Weather;
  pending?: boolean;
  locations?: string[];
}

const initialState: State = {
  weather: {},
  pending: false,
  locations: []
}

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, (state) => ({...state, pending: true})),
  on(WeatherActions.saveWeather, (state, { weather }) => ({...state, weather, pending: false })),

  on(WeatherActions.loadSpanLocations, (state) => ({...state, pending: true})),
  on(WeatherActions.saveSpanLocations, (state, { locations }) => ({...state, locations, pending: false })),
);

export function reducer(state: State | undefined, action: WeatherActions.WeatherActionsUnion){
  return weatherReducer(state, action);
}

export const getLocations = (state: State) => state?.locations;

export const getWeather = (state: State) => state?.weather;

export const getPending = (state: State) => state?.pending;
