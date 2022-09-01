import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar';
import { NotesComponent } from './notes/notes';
import { InfopageComponent } from './infopage/Infopage';
import { environment } from 'src/environments/environment';
import { feature_extractionComponent } from './feature_extraction/feature_extraction';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Service } from './services/service';


const appRoutes: Routes = [
  { path: '', component: feature_extractionComponent },
  //{ path: 'info', component: InfopageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesComponent,
    InfopageComponent,
    feature_extractionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule, MatCardModule, MatButtonModule, MatInputModule
  ],
  providers: [CookieService, Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
