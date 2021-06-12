import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LocalLocationGuardsGuard } from'./shared/location/guards/local-location-guards.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [LocalLocationGuardsGuard]
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationModule)
  },
  {
    path: 'day',
    loadChildren: () => import('./day/day.module').then( m => m.DayPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
