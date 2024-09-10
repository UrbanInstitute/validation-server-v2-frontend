import { apiService } from "./apiService";
import Config from "./config";
import Validators from "./validators";

class AuthService {
  private config: Config;
  private validators: Validators;
  private token: string | undefined | null;
  private userId: string | undefined | null;
  private email: string | undefined | null;

  constructor({
    config,
    validators,
  }: {
    config: Config;
    validators: Validators;
  }) {
    this.config = config;
    this.validators = validators;
  }

  private _validateStringField(field: string, value: string): void {
    if (typeof value !== "string" || !value.trim().length)
      throw new Error(`${field} is not valid`);
  }

  private _validateEmail(email: string): void {
    const validateEmail = this.validators.get("validateEmail");

    if (!validateEmail(email)) throw new Error(`${email} is not a valid email`);
  }

  private _userId(userId?: string): string | undefined | null {
    if (typeof userId !== "undefined") {
      sessionStorage.setItem("userId", userId);
      return;
    }

    return sessionStorage.getItem("userId");
  }

  private _token(token?: string): string | undefined | null {
    if (typeof token !== "undefined") {
      sessionStorage.setItem("token", token);
      return;
    }

    return sessionStorage.getItem("token");
  }

  private _email(email?: string): string | undefined | null {
    if (typeof email !== "undefined") {
      sessionStorage.setItem("email", email);
      return;
    }

    return sessionStorage.getItem("email");
  }

  isLoggedIn(): boolean {
    const res = !!(this._userId() && this._token() && this._email());
    return res;
  }

  register(name: string, email: string, password: string): Promise<boolean> {
    return Promise.resolve().then(() => {
      this._validateStringField("name", name);
      this._validateEmail(email);
      this._validateStringField("password", password);

      return fetch(`${this.config.get("API_URL")}/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 201) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        })
        .then((res) => res.json())
        .then(() => true);
    });
  }

  login(email: string, password: string): Promise<boolean> {
    const API_URL = this.config.get("API_URL");

    if (this.isLoggedIn()) return Promise.resolve().then(() => true);

    return Promise.resolve().then(() => {
      this._validateEmail(email);
      this._validateStringField("password", password);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      return fetch(`${API_URL}/users/login/`, {
        method: "POST",
        body: raw,
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }

          return res.json().then(({ non_field_errors }) => {
            throw new Error(non_field_errors[0]);
          });
        })
        .then((res) => {
          return res.json();
        })
        .then(({ token, user }) => {
          this._token(token);
          this._userId(user.id);
          this._email(email);

          return true;
        });
    });
  }

  logout(): Promise<void> {
    return Promise.resolve().then(() => {
      delete this.token;
      delete this.userId;
      delete this.email;

      sessionStorage.clear();
    });
  }

  user() {
    return { userId: this._userId(), email: this._email() };
  }

  retrieveUser() {
    apiService.budget
      .get()
      .catch((e: Error) =>
        e.message === "Unauthorized" ? this.logout() : console.error(e)
      );
    return { userId: this._userId(), email: this._email() };
  }
}

export default AuthService;
