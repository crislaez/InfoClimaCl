import { createAction, props, union} from '@ngrx/store';
import { Weather } from '../models';

export const loadWeather = createAction('[Weather] Load weather', props<{location: string}>());
export const saveWeather = createAction('[Weather] Save weather', props<{weather: Weather}>());

export const loadSpanLocations = createAction('[Weather] Load spain locations');
export const saveSpanLocations = createAction('[Weather] Save spain locations', props<{locations: string[]}>());


const all = union({
  loadWeather,
  saveWeather,
  loadSpanLocations,
  saveSpanLocations
})

export type WeatherActionsUnion = typeof all;
