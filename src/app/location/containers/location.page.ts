import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { LocationActions } from 'src/app/shared/location';
import { fromWeather, WeatherActions, WeatherService } from 'src/app/shared/weather';
import { ceroDate, checkObjectDate, getHour, matRoundNumber, meterToKilometer, sliceData, trackById, urlIcon } from '../../shared/shared/utils/utils';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-location',
  template: `
  <ion-content class="components-color" [fullscreen]="true">

    <ng-container *ngIf="(locationWeather$ | async) as locationWeather; else loader">
      <ng-container *ngIf="!(pending$ | async); else loader">
        <ng-container *ngIf="checkObjectDate(locationWeather); else noData">
        <div class="container">

          <!-- HEADER  -->
          <div class="header display-container-items fade-in-card" no-border>
            <ion-back-button class="display-container-center-center" (click)="back()" class="text-color" [text]="''"></ion-back-button>
            <h1 class="capital-letter text-color display-container-center-center">{{locationWeather?.city_name}}</h1>
            <div class="header-container-empty" ></div>
          </div>

          <!-- NOW WEATHER  -->
          <ion-card class="card fade-in-card" >
            <ion-card-header class="card-header">
              <h2 class="text-bod capital-letter text-color">{{ceroDate(locationWeather?.data)?.valid_date | date: 'EEEE'}}</h2>
            </ion-card-header>

            <ion-card-content class="display-container">
              <div class="width-max display-container">
                <div class="width-half display-container-center-center text-font-title">{{matRoundNumber(ceroDate(locationWeather?.data)?.temp)}} °C</div>
                <div class="width-half"> <img [src]="urlIcon(ceroDate(locationWeather?.data)?.weather?.icon)"></div>
              </div>
              <div class="width-half">
                <div>{{ceroDate(locationWeather?.data)?.weather?.description}}</div>
                <div>{{matRoundNumber(ceroDate(locationWeather?.data)?.min_temp)}}-{{matRoundNumber(ceroDate(locationWeather?.data)?.max_temp)}} °C</div>
              </div>
              <div class="width-half">
                <div>{{ceroDate(locationWeather?.data)?.valid_date | date: 'd MMMM y'}}</div>
                <div>{{nowHour()}}</div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- WEEK WEATHER  -->
          <ion-card class="card fade-in-card">
            <ion-card-content class="card-content">
              <div class="card-day-weather ion-activatable ripple-parent" *ngFor="let dayWeather of sliceData(locationWeather?.data);let i = index; trackBy: trackById" [routerLink]="['/day/'+(i+1)]">
                <div class="text-bod capital-letter div-margin-top width-max">{{dayWeather?.datetime | date: 'EEEE'}}</div>
                <div class="width-max"><img [src]="urlIcon(dayWeather?.weather?.icon)"></div>
                <div class="width-max">{{dayWeather?.weather?.description}}</div>
                <!-- <div>{{matRoundNumber(dayWeather?.temp)}} °C</div> -->
                <div>{{matRoundNumber(dayWeather?.min_temp)}}-{{matRoundNumber(dayWeather?.max_temp)}} °C</div>
                <ion-ripple-effect></ion-ripple-effect>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- DATA WEATHER  -->
          <ion-card class="card fade-in-card">
            <ion-card-content class="card-content">
              <div class="text-bod width-half">
                <div class="div-margin div-min-height div-min-height">Probavilidad de precipitación:</div>
                <div class="div-margin div-min-height div-min-height">Presion:</div>
                <div class="div-margin div-min-height div-min-height">Viento {{ceroDate(locationWeather?.data)?.wind_cdir_full}}:</div>
                <div class="div-margin div-min-height div-min-height">Humedad:</div>
                <div class="div-margin div-min-height div-min-height">Salida de la luna:</div>
                <div class="div-margin div-min-height div-min-height">Puesta de la luna:</div>
                <div class="div-margin div-min-height div-min-height">Salida del sol:</div>
                <div class="div-margin div-min-height">Puesta del sol:</div>
              </div>
              <div class="width-third">
                <div class="div-margin div-min-height div-min-height">{{matRoundNumber(ceroDate(locationWeather?.data)?.pop)}} %</div>
                <div class="div-margin div-min-height div-min-height">{{matRoundNumber(ceroDate(locationWeather?.data)?.pres)}} hPa</div>
                <div class="div-margin div-min-height div-min-height">{{meterToKilometer(ceroDate(locationWeather?.data)?.wind_spd)}} Km/h</div>
                <div class="div-margin div-min-height div-min-height">{{matRoundNumber(ceroDate(locationWeather?.data)?.rh)}} %</div>
                <div class="div-margin div-min-height div-min-height">{{getHour(ceroDate(locationWeather?.data)?.moonrise_ts)}}</div>
                <div class="div-margin div-min-height div-min-height">{{getHour(ceroDate(locationWeather?.data)?.moonset_ts)}}</div>
                <div class="div-margin div-min-height div-min-height">{{getHour(ceroDate(locationWeather?.data)?.sunrise_ts)}}</div>
                <div class="div-margin div-min-height div-min-height">{{getHour(ceroDate(locationWeather?.data)?.sunset_ts)}}</div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- <canvas #lineCanvas style="position: relative; height:20vh; width:40vw"></canvas> -->

        </div>
        </ng-container>
      </ng-container>
    </ng-container>

   <!-- REFRESH -->
   <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
   </ion-refresher>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <!-- HEADER  -->
        <div class="header display-container-items" no-border>
          <ion-back-button class="display-container-center-center" (click)="back()" class="text-color" [text]="''"></ion-back-button>
        </div>
        <span class="text-color">No hay datos</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner class="text-color"></ion-spinner>
    </ng-template>
  </ion-content>
  `,
  styleUrls: ['./location.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationPage {

  reload$ = new EventEmitter();
  checkObjectDate = checkObjectDate;
  matRoundNumber = matRoundNumber;
  ceroDate = ceroDate;
  trackById = trackById;
  sliceData = sliceData;
  urlIcon = urlIcon;
  meterToKilometer = meterToKilometer;
  getHour = getHour;
  pending$: Observable<boolean> = this.store.pipe(select(fromWeather.getPending))

  locationWeather$: Observable<any> = this.reload$.pipe(
    startWith(''),
    switchMap(() =>
      this.route.params.pipe(
        tap(({location}) => {
          this.store.dispatch(WeatherActions.loadWeather({location}))
          this.store.dispatch(LocationActions.changeLocation({location}))
        }),
        switchMap(() =>
          this.store.pipe(select(fromWeather.getWeather))
        ),
        map((locationWeather) => (locationWeather || {}))
      )
    )
  );


  constructor(private route: ActivatedRoute, private store: Store, private _weather: WeatherService, private router: Router) {
    // this.locationWeather$.subscribe(data => console.log(data))
  }


  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')
      event.target.complete();
    }, 500);
  }

  nowHour(): any{
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes().toString().split('')?.length === 1 ? '0'+now.getMinutes() : now.getMinutes()
    return hour+':'+minutes;
  }

  back(): void{
    this.store.dispatch(LocationActions.deleteLocation())
    this.router.navigate(['/home'])
  }


}
