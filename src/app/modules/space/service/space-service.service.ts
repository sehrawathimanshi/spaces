import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceServiceService {

  constructor(private httpClient: HttpClient) { }

  public getSpaceListing(
    { ...filterOption }
  ): Observable<any> {
    return this.httpClient.get(Constants.API_URL, {params: filterOption});
  }
}
