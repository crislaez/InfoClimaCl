import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromWeather from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './effects/weather.effects';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromWeather.weatherKey, fromWeather.reducer),
    EffectsModule.forFeature([WeatherEffects])
  ]
})
export class WeatherModule {
}
