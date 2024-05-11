import axios from 'axios';
import Axios from 'axios-observable';
import { environment } from '../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService extends Axios {
  constructor() {
    super(
      axios.create({
        baseURL: environment.API_URL,
      })
    );
  }
}
