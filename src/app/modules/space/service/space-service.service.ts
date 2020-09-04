import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';

@Injectable()
export class SpaceServiceService {

  constructor(private httpClient: HttpClient) { }

  public getSpaceListing(
    { ...filterOption }
  ) {
    return this.httpClient.get(Constants.API_URL, {params: filterOption});
  }

}
