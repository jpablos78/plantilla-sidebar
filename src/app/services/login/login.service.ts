import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _iMenu: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _key: string = 'IntimodaFE2019$#'
  private _permisoValido: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _mensajePermiso: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _displayWaitPermiso: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  iServidor$: Observable<string>;

  url = '';
  urlMenu = '';
  urlMenuFavoritos = '';
  html = '';

  constructor(
    private http: HttpClient
  ) {

  }

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  login(postData: FormData) {
    this._loggedIn.next(true);
    return true;
  }

  // login(postData: FormData): Observable<any> {
  //   return this.http.post<any>(this.url, postData)
  //     .pipe(
  //       map(res => {
  //         this._loggedIn.next(true);
  //         return true;
  //         // if (res.success) {
  //         //   if (res.ok === 'S') {
  //         //     this._loggedIn.next(true);

  //         //     return true;
  //         //   } else {
  //         //     throw (res.mensaje);
  //         //   }
  //         // } else {
  //         //   throw (res.mensaje);
  //         // }
  //       })        
  //     )
  // }
}
