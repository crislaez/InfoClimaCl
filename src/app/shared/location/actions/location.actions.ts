import { createAction, props, union} from '@ngrx/store';

export const loadLocation = createAction('[Location] Load location');
export const saveLocation = createAction('[Location] Save location', props<{location: string}>());

export const changeLocation = createAction('[Location] Change locations', props<{location: string}>());
export const changeLocationFailure = createAction('[Location] Change location failure', props<{error: string}>());
export const changeLocationSuccess = createAction('[Location] Change locations success', props<{message: string}>());

export const deleteLocation = createAction('[Location] Delete locations');
export const deleteLocationFailure = createAction('[Location] Delete location failure', props<{error: string}>());
export const deleteLocationSuccess = createAction('[Location] Delete locations success', props<{message: string}>());

const all = union({
  loadLocation,
  saveLocation,
  changeLocation,
  changeLocationSuccess,
  changeLocationFailure,
  deleteLocation,
  deleteLocationSuccess,
  deleteLocationFailure
})

export type LocationActionsUnion = typeof all;
