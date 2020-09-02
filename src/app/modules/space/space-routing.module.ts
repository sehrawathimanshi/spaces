import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpaceListingComponent } from './space-listing/space-listing.component';

const routes: Routes = [{
  path: '',
  component: SpaceListingComponent
} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule { }
