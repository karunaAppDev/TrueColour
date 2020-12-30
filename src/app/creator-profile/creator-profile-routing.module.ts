import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorProfilePage } from './creator-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CreatorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatorProfilePageRoutingModule {}
