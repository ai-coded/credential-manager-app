import { Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ApiService } from '../../../providers/api/api.service';
import { MS } from '../../../config/constant';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
@Component({
  selector: 'app-register-stepper',
  templateUrl: './register-stepper.component.html',
  styleUrls: ['./register-stepper.component.scss'],
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
          style({ opacity: 0, transform: 'translateX(200px)' }),
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
export class RegisterStepperComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  isLinear = true;
  checked = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService<any>
  ) {}

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
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
    });
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    const user = {
      firstName: this.firstFormGroup.controls['firstCtrl'].value.split(' ')[0],
      lastName: this.firstFormGroup.controls['firstCtrl'].value.split(' ')[1],
      username: this.secondFormGroup.controls['secondCtrl'].value,
      password: this.thirdFormGroup.controls['thirdCtrl'].value,
      email: this.fourthFormGroup.controls['fourthCtrl'].value,
    };
    this.apiService.create(`${MS.USER.BASE_URL}`, user).subscribe((d) => {
      console.log(d);
      this.gotoLogin();
    });
  }
}
