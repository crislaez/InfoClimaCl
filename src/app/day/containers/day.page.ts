import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { fromWeather } from 'src/app/shared/weather';
import { checkObjectDate, matRoundNumber, meterToKilometer, urlIcon, getHour } from '../../shared/shared/utils/utils';


@Component({
  selector: 'app-day',
  template: `
  <ion-content class="components-color" [fullscreen]="true">

    <ng-container *ngIf="(dayData$ | async) as dayData; else loader">
      <ng-container *ngIf="checkObjectDate(dayData); else noData">
      <div class="container">

        <!-- HEADER  -->
        <div class="header fade-in-card" no-border>
          <ion-back-button defaultHref="" class="text-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-color">{{dayData?.datetime | date: 'EEEE'}}</h1>
          <div class="header-container-empty" ></div>
        </div>

        <ion-card class="card fade-in-card">
          <ion-card-header class="card-header">
            <!-- <h2 class="text-color">{{matRoundNumber(dayData?.temp)}} °C</h2> -->
            <span> <img [src]="urlIcon(dayData?.weather?.icon)"></span>
          </ion-card-header>
          <ion-card-content class="display-container">
            <div class="width-half">
              <div>{{dayData?.weather?.description}}</div>
            </div>
            <div class="width-half">
              <div>{{matRoundNumber(dayData?.min_temp)}}-{{matRoundNumber(dayData?.max_temp)}} °C</div>
            </div>
          </ion-card-content>
        </ion-card>

         <!-- DATA WEATHER  -->
         <ion-card class="card fade-in-card">
          <ion-card-content class="card-content">
            <div class="text-bod width-half">
              <div class="div-margin div-min-height div-min-height">Probavilidad de precipitación:</div>
              <div class="div-margin div-min-height div-min-height">Presion:</div>
              <div class="div-margin div-min-height div-min-height">Viento {{dayData?.wind_cdir_full}}:</div>
              <div class="div-margin div-min-height div-min-height">Humedad:</div>
              <div class="div-margin div-min-height div-min-height">Salida de la luna:</div>
              <div class="div-margin div-min-height div-min-height">Puesta de la luna:</div>
              <div class="div-margin div-min-height div-min-height">Salida del sol:</div>
              <div class="div-margin div-min-height div-min-height">Puesta del sol:</div>
            </div>

            <div class="width-third">
              <div class="div-margin div-min-height div-min-height">{{matRoundNumber(dayData?.pop)}} %</div>
              <div class="div-margin div-min-height div-min-height">{{matRoundNumber(dayData?.pres)}} hPa</div>
              <div class="div-margin div-min-height div-min-height">{{meterToKilometer(dayData?.wind_spd)}} Km/h</div>
              <div class="div-margin div-min-height div-min-height">{{matRoundNumber(dayData?.rh)}} %</div>
              <div class="div-margin div-min-height div-min-height">{{getHour(dayData?.moonrise_ts)}}</div>
              <div class="div-margin div-min-height div-min-height">{{getHour(dayData?.moonset_ts)}}</div>
              <div class="div-margin div-min-height div-min-height">{{getHour(dayData?.sunrise_ts)}}</div>
              <div class="div-margin div-min-height div-min-height">{{getHour(dayData?.sunset_ts)}}</div>
            </div>
          </ion-card-content>
        </ion-card>

      </div>
      </ng-container>
    </ng-container>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <!-- HEADER  -->
        <div class="header fade-in-card" no-border>
          <ion-back-button defaultHref="" class="text-color" [text]="''"></ion-back-button>
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
  styleUrls: ['./day.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPage  {

  checkObjectDate = checkObjectDate;
  urlIcon = urlIcon;
  matRoundNumber = matRoundNumber;
  meterToKilometer = meterToKilometer;
  getHour = getHour;

  dayData$: Observable<any> = this.route.params.pipe(
    switchMap( ({day}) =>
      this.store.pipe(select(fromWeather.getDayWeather(day)),
        tap(data => {
          if(!data) this.router.navigate(['/home'])
        })
      )
    )
  )

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    // this.dayData$.subscribe(data => console.log(data))
   }



}
