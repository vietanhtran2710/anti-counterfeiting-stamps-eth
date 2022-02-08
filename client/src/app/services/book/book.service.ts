import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  createAccount(data) {
    return this.http.post(baseUrl, data)
  }

  getAllBook() {
    return this.http.get(`${baseUrl}`)
  }

  getBooksBySerialNumber(serialNumber) {
    return this.http.get(`${baseUrl}/${serialNumber}}`)
  }

  deleteBook(serialNumber) {
    return this.http.delete(`${baseUrl}/${serialNumber}`)
  }
}
