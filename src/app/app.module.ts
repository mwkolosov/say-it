import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {MatInputModule, MatMenu, MatMenuItem, MatMenuModule, MatButtonModule, MatSelectModule, MatTabsModule, MatCardModule, MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
