import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  getJWTToken() {
    return this.localStorageService.getItem('token');
  }

  has(): boolean {
    return true;
  }
}
