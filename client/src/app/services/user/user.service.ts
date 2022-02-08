import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createAccount(data) {
    return this.http.post(baseUrl, data)
  }

  getAllAccount() {
    return this.http.get(`${baseUrl}`)
  }

  getAccountsByRole(role) {
    return this.http.get(`${baseUrl}/role/${role}`)
  }

  deleteUser(address) {
    return this.http.delete(`${baseUrl}/${address}`)
  }
}
