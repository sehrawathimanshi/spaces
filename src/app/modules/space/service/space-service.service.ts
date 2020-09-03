import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class SpaceServiceService {

  constructor(private httpClient: HttpClient) { }

  public getSpaceListing(
    { ...filterOption }
  ): Observable<any> {
    return this.httpClient.get(`
    https://api.spacexdata.com/v3/launches?limit=${filterOption.limit}&amp;launch_success=${filterOption.launch_success}&amp;land_success=${filterOption.land_success}&amp;launch_year=${filterOption.launch_year}`);
  }

}
