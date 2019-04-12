import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  // {path: '', component: SignComponent},
  // {path: 'home', component: HomeComponent}
];

const guardRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(guardRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
