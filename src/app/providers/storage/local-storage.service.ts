import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   *
   * @param key
   * @returns
   */
  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   *
   * @param key
   * @param value
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   *
   * @param key
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
