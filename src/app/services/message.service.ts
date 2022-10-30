import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from '../moment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: String = '';

  constructor() { }

  add(message: String){
    this.message = message;
    
    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.message = '';
  }
}
