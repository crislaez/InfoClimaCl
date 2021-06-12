import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPage } from './containers/location.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':location',
        component: LocationPage
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
