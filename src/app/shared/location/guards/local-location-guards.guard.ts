import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { fromlocation } from '../../location';

@Injectable({
  providedIn: 'root'
})
export class LocalLocationGuardsGuard implements CanLoad {


  constructor(private router: Router, private store: Store){}


  canLoad(): Observable<boolean | UrlTree> {
    return this.store.pipe(select(fromlocation.getLocation),
    delay(1000),
    map((location) => !!location ? this.router.parseUrl('/location/'+location): true),
    take(1)
    )
  }

}
