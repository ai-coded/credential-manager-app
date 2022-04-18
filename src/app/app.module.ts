import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MaterialModule } from './app.material.module';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './providers/auth/auth.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import {
  LoginStepperComponent,
  ResponseApiBottomSheet,
} from './components/stepper/login-stepper/login-stepper.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MailerComponent } from './components/mailer/mailer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingsComponent } from './components/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableDataDialog } from './components/table-data/table-dialog.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { UniversalAppInterceptor } from './providers/interceptor/universal.interceptor';
import { ForgotStepperComponent } from './components/stepper/forgot-stepper/forgot-stepper.component';
import { RegisterStepperComponent } from './components/stepper/register-stepper/register-stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    Page2Component,
    Page1Component,
    TableDataDialog,
    LoaderComponent,
    MailerComponent,
    SidenavComponent,
    SettingsComponent,
    TableDataComponent,
    LoginStepperComponent,
    ForgotStepperComponent,
    ResponseApiBottomSheet,
    RegisterStepperComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableExporterModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
