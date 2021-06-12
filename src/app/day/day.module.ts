import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DayPageRoutingModule } from './day-routing.module';
import { DayPage } from './containers/day.page';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayPageRoutingModule
  ],
  declarations: [
    DayPage
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-*' } ],
})
export class DayPageModule {}
