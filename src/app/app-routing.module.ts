import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import { MainComponent } from './views/main/main.component';
import { DetailsComponent } from './views/details/details.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
