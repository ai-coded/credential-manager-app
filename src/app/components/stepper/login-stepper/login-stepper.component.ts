import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../providers/api/api.service';
import { Token } from '../../../providers/api/interface';
import { MS } from '../../../config/constant';
import { LocalStorageService } from '../../../providers/storage/local-storage.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-login-stepper',
  templateUrl: './login-stepper.component.html',
  styleUrls: ['./login-stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.content, form', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class LoginStepperComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  isLinear = true;
  isLoaderShow = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  hideSpinner: boolean = false;
  token: Token;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService<any>,
    private _bottomSheet: MatBottomSheet,
    private localStorageService: LocalStorageService
  ) {
    setTimeout(() => {
      this.isLoaderShow = false;
    }, 3000);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ResponseApiBottomSheet);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  enableOrDisableEditing() {}

  login() {
    const user = {
      username: this.firstFormGroup.controls['firstCtrl'].value,
      password: this.secondFormGroup.controls['secondCtrl'].value,
      email: this.thirdFormGroup.controls['thirdCtrl'].value,
    };
    this.apiService.login(MS.LOGIN_API, user).subscribe(
      (d) => {
        if (d) {
          this.token = d.token;
          this.localStorageService.setItem('token', d.token);
          this.stringify(user);
          this.gotoApp();
        }
      },
      () => this.openBottomSheet()
    );
  }
  gotoApp() {
    this.router.navigate(['/app/data'], {
      queryParams: { returnUrl: this.token },
    });
  }
  gotoForgotPassword() {
    this.router.navigate(['/forgot']);
  }
  gotoRegister() {
    this.router.navigate(['/register']);
  }

  stringify(data: Object) {
    this.localStorageService.setItem('user', JSON.stringify(data));
  }
}

@Component({
  selector: 'app-response-api-bottom-sheet',
  templateUrl: 'response-api-bottom-sheet.html',
})
export class ResponseApiBottomSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ResponseApiBottomSheet>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  closeBottomSheet(): void {
    this._bottomSheetRef.dismiss(true);
  }
}
