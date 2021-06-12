import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromLocation from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from './effects/location.effects';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromLocation.locationKey, fromLocation.reducer),
    EffectsModule.forFeature([LocationEffects])
  ]
})
export class LocationSharedModule {}
