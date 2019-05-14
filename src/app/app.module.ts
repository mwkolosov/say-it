import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignComponent } from './components/sign/sign.component';
import { MainComponent } from './components/main/main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
// tslint:disable-next-line:max-line-length
import {MatIconRegistry, MatDatepickerModule, MatNativeDateModule, MatDrawer, matDrawerAnimations, MatSidenavModule, MatButtonToggleModule, MatSlideToggleModule, MatDialogModule} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {MatInputModule, MatMenu, MatMenuItem, MatMenuModule, MatButtonModule, MatSelectModule, MatTabsModule, MatCardModule, MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SayComponent } from './components/say/say.component';
import { SingleSayComponent } from './components/single-say/single-say.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { CreateSayComponent } from './components/create-say/create-say.component';
import { DialogProfileComponent } from './components/dialog-profile/dialog-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainComponent,
    SignComponent,
    SayComponent,
    SingleSayComponent,
    ProfileComponent,
    DashboardMenuComponent,
    CreateSayComponent,
    DialogProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [
    DialogProfileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
