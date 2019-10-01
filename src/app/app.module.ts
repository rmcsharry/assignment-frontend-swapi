import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './interceptors';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';
import { PageTitleComponent } from './page-title/page-title.component';

import { initApp } from './init-app';
import { HttpClient } from '@angular/common/http';
import { reducers } from './store/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppInitEffects } from './store/effects/app-init.effects';
import { InitEffects } from './store/effects/init.effects';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    PageTitleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        // strictStateSerializability: true,
        // strictActionSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AppInitEffects, InitEffects]),
    StoreDevtoolsModule.instrument({
      name: 'RoocketLoop Star Wars',
      maxAge: 5
    }),
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   multi: true,
    //   deps: [HttpClient]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
