import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponse, User } from "../interfaces/interfaces.auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get usuario() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  register( name:string, email:string, password:string) {

    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({status, token}) => {
          if (status) {
            localStorage.setItem("token", token!);
          }
        }),
        map((res) => res.status),
        catchError((err) => of(err.error.msg)),
      );
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap((res) => {
          if (res.status) {
            localStorage.setItem("token", res.token!);
          }
        }),
        map((res) => res.status),
        catchError((err) => of(err.error.msg)),
      );
  }

  validateToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set("token", localStorage.getItem("token") || "");

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem("token", res.token!);

          this._user = {
            name: res.name!,
            uid: res.uid!,
            email: res.email!
          };
          return res.status;
        }),
        catchError((err) => of(false)),
      );
  }

  logout() {
    localStorage.removeItem('token')
  }
}
