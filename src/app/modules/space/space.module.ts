import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpaceListingComponent } from './space-listing/space-listing.component';

@NgModule({
  declarations: [SpaceListingComponent],
  imports: [
    CommonModule,
    SpaceRoutingModule
    ]
})
export class SpaceModule { }
