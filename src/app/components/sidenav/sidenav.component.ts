import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MS } from '../../config/constant';
import { ApiService } from '../../providers/api/api.service';
import { LocalStorageService } from '../../providers/storage/local-storage.service';
import { IconService } from '../../providers/icon/Icon.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  appName: string = 'Credential Manager';
  numberCredentials: number;
  user: any;
  icons = ['logout', 'github', 'account', 'google', 'linkedin'];

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private apiService: ApiService<number>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private iconService: IconService
  ) {
    this.iconService.registerSvgIcons(this.icons);
  }

  ngOnInit(): void {
    this.countDocuments();
    this.user = JSON.parse(this.localStorageService.getItem('user'));
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  countDocuments(): void {
    this.apiService.readAll(MS.USER.COUNT).subscribe((d) => {
      this.numberCredentials = d;
      this.localStorageService.setItem(
        'numberCredentials',
        this.numberCredentials
      );
    });
  }

  gotoGithub() {
    window.open(
      'https://github.com/christianchiama/credential-manager-app/tree/main'
    );
  }
  gotoGoogle() {
    window.open('https://www.google.com');
  }
  gotoLinkedin() {
    window.open('https://www.linkedin.com/in/christian-chiama/');
  }
}
