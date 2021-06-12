import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './hone-routing.module';
import { HomePage } from './containers/home.page';
import { WeatherModule } from '../shared/weather/weather.module';
import { LocationSharedModule } from '../shared/location/location.module';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherModule,
    LocationSharedModule,
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
