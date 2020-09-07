import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SpaceServiceService } from '../service/space-service.service';
import { Constants } from '../../../config/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-space-listing',
  templateUrl: './space-listing.component.html',
  styleUrls: ['./space-listing.component.scss'],
})

export class SpaceListingComponent implements OnInit {
  public spaceListing;
  public defaultLimit = {
    limit: Constants.MAGIC_NUMBERS.TWENTY,
    launch_success: '',
    land_success: '',
    launch_year: ''
  };
  public options;
  public yearFilters = Constants.YEAR_FILTERS;
  constructor(
    private readonly spaceService: SpaceServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.checkQueryParams();
  }


  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params.limit) {
        this.defaultLimit = {
          ...this.defaultLimit,
          limit: params.limit,
          land_success: params.land_success,
          launch_success: params.launch_success,
          launch_year: params.launch_year
        };
        this.getSpaceListing(params);
      } else {
        this.getSpaceListing(this.defaultLimit);
      }
    });
  }

  changeQueryParams(params): Promise<boolean> {
    return this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
  }

  getDataByFilter(selectedFilter, value): void {
    this.defaultLimit[selectedFilter] = value;
    this.changeQueryParams(this.defaultLimit);
  }


  getSpaceListing(params): void {
    this.spaceService.getSpaceListing({ ...params }).subscribe((data) => {
      this.spaceListing = data;
    });
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
    Number(this.defaultLimit.limit) < Constants.MAGIC_NUMBERS.ONE_TWENTY &&
    Number(this.defaultLimit.limit) === this.spaceListing?.length) {
      const target = event.target;
      this.defaultLimit = {
        ...this.defaultLimit,
        limit: Number(this.defaultLimit.limit) + Constants.MAGIC_NUMBERS.TWENTY
      };
      this.changeQueryParams(this.defaultLimit);
    }
  }
}
