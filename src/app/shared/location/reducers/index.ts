import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLocation from './location.reducer';

export const locationKey = 'location';

export interface State {
  [locationKey]: fromLocation.State
}

export const reducer = fromLocation.reducer;

export const getLotacionState = createFeatureSelector<State, fromLocation.State>(locationKey);


export const getLocation = createSelector(
  getLotacionState,
  fromLocation.getLocation
)

export const getError = createSelector(
  getLotacionState,
  fromLocation.getError
)

export const getPending = createSelector(
  getLotacionState,
  fromLocation.getPending
)
