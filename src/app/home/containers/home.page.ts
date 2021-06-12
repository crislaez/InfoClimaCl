import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromlocation } from 'src/app/shared/location';
import { fromWeather } from 'src/app/shared/weather';

@Component({
  selector: 'app-home',
  template: `
  <ion-content class="ion-item-background" [fullscreen]="true">

    <!-- HEADER  -->
    <div class="header fade-in-card" no-border>
      <form (submit)="searchSubmit($event)">
        <ion-searchbar color="light" [formControl]="city"></ion-searchbar>
      </form>
    </div>

    <ng-container *ngIf="(locations$ | async) as locations; else loader">
      <ng-container *ngIf="locations?.length > 0; else noData">

        <ion-list class="ion-item-background fade-in-card">
          <ion-item class="ion-item-background text-color ion-activatable ripple-parent"
            *ngFor="let city of locations"
            [routerLink]="['/location/'+city]">
            <ion-label>{{city}}</ion-label>
            <ion-input></ion-input>
            <ion-ripple-effect type="unbounded"></ion-ripple-effect>
          </ion-item>
        </ion-list>

      </ng-container>
    </ng-container>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <div class="error-serve">
        <span class="text-color">Datos no encotrados</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner class="text-color"></ion-spinner>
    </ng-template>
  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnDestroy  {

  city = new FormControl('');
  locations$: Observable<string[]> = this.store.pipe(select(fromWeather.getLocations));
  existLocatio$ = this.store.pipe(select(fromlocation.getLocation),
    tap(location => this.router.navigate(['/location/'+location]))
  ).subscribe()


  constructor(private store: Store, private router: Router) {
    // this.existLocatio$.subscribe()
  }

  ngOnDestroy(): void{
    this.existLocatio$.unsubscribe();
  }

  searchSubmit(event: Event): void{
    event.preventDefault()
    this.router.navigate(['/location/'+this.city?.value])
    // console.log(this.city?.value)
  }

}
