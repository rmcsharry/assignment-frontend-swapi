import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './interceptors';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    PageTitleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forRoot({ app: null }),
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
