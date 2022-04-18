import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './providers/storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.start();
  }

  start() {
    const token = this.localStorageService.getItem('token');
    if (!token) this.router.navigate(['login']);
    else this.router.navigate(['app/data']);
  }
}
