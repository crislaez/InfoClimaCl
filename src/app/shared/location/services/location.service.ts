import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Location} from '../models';
const { Storage } = Plugins


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  readonly location = 'clLocation';

  constructor() { }


  getLocalLocation(): Observable<any>{
    return from(this.localLocations()).pipe(
      map(data => (data || null))
    )
  };

  createLocation(location: string): Observable<any>{
    return from(this.saveLocalLocations(location)).pipe(
      map(() => ({message:'localizacion guardada' }))
    )
  };

  deleteLocation(): Observable<any>{
    return from(this.deleteLocalLocations()).pipe(
      map(() => ({message:'localizacion guardada' }))
    )
  };

  async localLocations(){
    const locations = await Storage.get({key: this.location})
    return await JSON.parse(locations?.value)
  };

  async saveLocalLocations(location: string){
    await Storage.set({key: this.location, value: JSON.stringify(location)})
  };

  async deleteLocalLocations(){
    await Storage.remove({key: this.location})
  };


}
