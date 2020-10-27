import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  mainUrl = 'https://obank.itcomunity.com/';

  constructor(private httpClient: HttpClient) {}

  // get all Specialties
  getAllSpecialties() {
    return this.httpClient.get(`${this.mainUrl}api/specialties`);
  }
  // get all Specialties
  getAllSubSpecialties() {
    return this.httpClient.get(`${this.mainUrl}api/subSpecialties`);
  }
  // get all Prefix Titles
  getAllprefixTitles() {
    return this.httpClient.get(`${this.mainUrl}api/prefixTitles`);
  }
  // get all profissional Details
  getAllprofissionalDetails() {
    return this.httpClient.get(`${this.mainUrl}api/profissionalDetails`);
  }
}
