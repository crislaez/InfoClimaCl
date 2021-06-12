import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWeather from './weather.reducer';

export const weatherKey = 'weather';

export interface State {
  [weatherKey]: fromWeather.State
}

export const reducer = fromWeather.reducer;

export const getWeatherState = createFeatureSelector<State, fromWeather.State>(weatherKey);


export const getLocations = createSelector(
  getWeatherState,
  fromWeather.getLocations
)

export const getWeather = createSelector(
  getWeatherState,
  fromWeather.getWeather
)

export const getPending = createSelector(
  getWeatherState,
  fromWeather.getPending
)

export const getDayWeather = (day: string) =>  createSelector(
  getWeather,
  (getWeatherDay) => getWeatherDay?.data?.[day]
)

