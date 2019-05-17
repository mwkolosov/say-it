import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SingleSayComponent } from './components/single-say/single-say.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  // {path: '', component: SignComponent},
  // {path: 'home', component: HomeComponent}
];

const guardRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'say/:id', component: SingleSayComponent},
  { path: 'user/:id', component: UserComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(guardRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
