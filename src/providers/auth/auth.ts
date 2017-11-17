import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, Credentials, RegisterForm, LoginResult } from '../models';

@Injectable()
export class AuthProvider {
  authUser = new ReplaySubject<any>(1);
  private jwtTokenName = 'token';
  private token: string;
  public user: User;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: Storage,
    private readonly jwtHelper: JwtHelperService,
  ) {
    this.authUser.subscribe(jwt => {
      if (jwt) {
        this.httpClient.get('http://wc.cforce.me/user', {
          headers: new HttpHeaders().set('x-access-token', jwt),
        }).subscribe((user: User) => {
          this.token = jwt;
          this.user = user;
          console.log(this.user);
        })
      }
    });
  }

  getToken(): Promise<string> {
    return this.token ? Promise.resolve(this.token) : this.storage.get('token').then(token => {
      this.token = token;
      return Promise.resolve(token);
    });
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => { this.token = jwt; console.log(this.token); return jwt; });
  }

  checkLogin() {
    this.storage.get('token').then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.httpClient.get('http://wc.cforce.me/authenticate', {
          headers: new HttpHeaders().set('x-access-token', jwt),
        }).subscribe(() => this.authUser.next(jwt),
            (err) => this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });
  }

  public login(creds: Credentials): Observable<any> {
    if (!creds.email || !creds.password) {
      return Observable.throw('Please insert credentials');
    } else {
      return this.httpClient.post('http://wc.cforce.me/login', creds)
      .do((result: LoginResult) => {
        if (result.success) {
          
          return this.handleJwtResponse(result.token);
        }
        return result;
      });
    }
  }

  public register(form: RegisterForm): Observable<any> {
    if (!form.email || !form.password || !form.firstname || !form.lastname) {
      return Observable.throw('All feilds must be filled');
    } else {
      return this.httpClient.post('http://wc.cforce.me/register', form)
      .do((result: LoginResult) => {
        if (result.success) {
          return this.handleJwtResponse(result.token);
        }
        return result;
      });
    }
  }

  public addFavorite(dishId: string) {
    return this.httpClient.get(`http://wc.cforce.me/user/dish/${dishId}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    }).subscribe((user: User) => {
      this.user = user;
      console.log(this.user.favorites);
    });
  }

  public delFavorite(dishId: string) {
    return this.httpClient.delete(`http://wc.cforce.me/user/dish/${dishId}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    }).subscribe((user: User) => {
      this.user = user;
      console.log(this.user.favorites);
    });
  }

  // public getUserInfo(): User {
  //   return this.authUser;
  // }

  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }
}
