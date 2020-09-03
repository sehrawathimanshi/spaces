import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { SpaceListingComponent } from './space-listing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpaceServiceService } from '../service/space-service.service';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRoute } from '@angular/router';

describe('SpaceListingComponent', () => {
  let component: SpaceListingComponent;
  let fixture: ComponentFixture<SpaceListingComponent>;
  let spaceService: SpaceServiceService;
  let route: ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceListingComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { // Mock
            queryParams: of(
              {
                land_success: true
              }
            ),
            params: of(
              {
                land_success: false
              }
            )
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceListingComponent);
    component = fixture.componentInstance;
    spaceService = TestBed.inject(SpaceServiceService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('space list on getSpaceListing called', fakeAsync(() => {
    const spy = spyOn(spaceService, 'getSpaceListing')
      .withArgs({ limit: 100 }).and.returnValue(of([]));
    component.getSpaceListing({ limit: 100 });
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    fixture.destroy();
    flush();
  }));

});
