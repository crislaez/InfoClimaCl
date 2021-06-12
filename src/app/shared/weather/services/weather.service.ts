import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apiKey: string = this._coreConfig.getApiKey();

  spainLocations = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila',
  'Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real',
  'Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva',
  'Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia',
  'Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca',
  'Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo',
  'Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getLocation(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}city=${name}&key=${this.apiKey}`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getSpainLocations():  Observable<any>{
    return of(this.spainLocations)
  }


}
