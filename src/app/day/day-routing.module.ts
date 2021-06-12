import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayPage } from './containers/day.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':day',
        component: DayPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayPageRoutingModule {}
