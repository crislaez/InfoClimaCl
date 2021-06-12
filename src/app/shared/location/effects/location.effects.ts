import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocationActions } from '../actions';
import { LocationService } from '../services/location.service';


@Injectable()
export class LocationEffects {

  loadLocation$ = createEffect( () =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocation, LocationActions.changeLocationSuccess),
      switchMap( () =>
        this._location.getLocalLocation().pipe(
          map( (location): any => LocationActions.saveLocation({ location: location || ''})),
          catchError( () => [LocationActions.saveLocation({ location: '' })]),
        )
      )
    )
  );

  changeLocation$ = createEffect( () =>
    this.actions$.pipe(
      ofType(LocationActions.changeLocation),
      switchMap( ({location}) =>
        this._location.createLocation(location).pipe(
          map( () => LocationActions.changeLocationSuccess({message:'success'})),
          catchError( (error) => [LocationActions.changeLocationFailure({ error })]),
        )
      )
    )
  );

  deleteLocation$ = createEffect( () =>
    this.actions$.pipe(
      ofType(LocationActions.deleteLocation),
      switchMap( ({}) =>
        this._location.deleteLocation().pipe(
          map( () => LocationActions.deleteLocationSuccess({message:'success'})),
          catchError( (error) => [LocationActions.deleteLocationFailure({ error })]),
        )
      )
    )
  );

  loadLocalLocationsInit$ = createEffect(() =>
    of(LocationActions.loadLocation())
  );

  constructor(
    private actions$: Actions,
    private _location: LocationService
  ){}
}
