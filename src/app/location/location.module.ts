import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationRoutingModule } from './location-routing.module';
import { LocationPage } from './containers/location.page';
import { WeatherModule } from '../shared/weather/weather.module';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { LocationSharedModule } from '../shared/location/location.module';
registerLocaleData(es);
// registerLocaleData(localeEs, 'es')

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherModule,
    LocationSharedModule,
    LocationRoutingModule
  ],
  declarations: [
    LocationPage
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-*' } ],
})
export class LocationModule {}
