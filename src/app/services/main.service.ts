import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  test = 0;

  constructor() { }

  static checkIsAuth() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (!token) {
        return resolve(false);
      }

      setTimeout(() => {
        // Simulation for token verifying on the server
        resolve(true);
      }, 3000);
    });
  }
}
