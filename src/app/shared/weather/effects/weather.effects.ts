import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { WeatherActions } from '../actions';
import { WeatherService } from '../services/weather.service';


@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect( () =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      switchMap( ({location}) =>
        this._weather.getLocation(location).pipe(
          map( (resposne): any => WeatherActions.saveWeather({ weather: resposne || {}})),
          catchError( () => [WeatherActions.saveWeather({ weather: {} })]),
        )
      )
    )
  );

  loadSpanLocations$ = createEffect( () =>
    this.actions$.pipe(
      ofType(WeatherActions.loadSpanLocations),
      switchMap( () =>
        this._weather.getSpainLocations().pipe(
          map( (response): any => WeatherActions.saveSpanLocations({ locations: response})),
          catchError( () => [WeatherActions.saveSpanLocations({ locations: [] })]),
        )
      )
    )
  );

  loadSpanLocationsInit$ = createEffect(() =>
    of(WeatherActions.loadSpanLocations())
  );

  constructor(
    private actions$: Actions,
    private _weather: WeatherService,
    private location: Location
  ){}
}
