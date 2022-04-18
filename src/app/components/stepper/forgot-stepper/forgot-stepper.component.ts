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

@Component({
  selector: 'app-forgot-stepper',
  templateUrl: './forgot-stepper.component.html',
  styleUrls: ['./forgot-stepper.component.scss'],
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
export class ForgotStepperComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }
  gotoRegister() {
    this.router.navigate(['register']);
  }
}
