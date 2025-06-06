import { PATH } from './config/constant';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { MailerComponent } from './components/mailer/mailer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { LoginStepperComponent } from './components/stepper/login-stepper/login-stepper.component';
import { ForgotStepperComponent } from './components/stepper/forgot-stepper/forgot-stepper.component';
import { RegisterStepperComponent } from './components/stepper/register-stepper/register-stepper.component';

const routes: Routes = [
  {
    path: PATH.APP, component: SidenavComponent,
    children: [
      { path: PATH.PAGE1, component: TableDataComponent },
      { path: PATH.PAGE2, component: Page2Component },
      { path: PATH.TABLE, component: TableDataComponent },
      { path: PATH.MAILER, component: MailerComponent },
      { path: PATH.SETTINGS, component: SettingsComponent },
    ],
  },
  {
    path: PATH.LOGIN,
    component: LoginStepperComponent,
    data: { login: true },
  },
  { path: PATH.REGISTER, component: RegisterStepperComponent },
  { path: PATH.FORGOT_PASSWORD, component: ForgotStepperComponent },
  { path: PATH.ALL, redirectTo: PATH.LOGIN },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
