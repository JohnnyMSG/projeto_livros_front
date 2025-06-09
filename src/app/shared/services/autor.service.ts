import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Autor} from "../models/autor";
import {Fornecedor} from "../models/fornecedor";

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly API = `/api/autores`;

  constructor(
    private http: HttpClient
  ) { }

  getAutores() {
    console.log("this.http", this.http);
    return this.http.get<Autor[]>(this.API);
  }

  postAutor(autor: Autor) {
    return this.http.post<Autor>(this.API, autor);
  }

  updateAutor(autorId: number, autor: Autor) {
    return this.http.put<Autor>(`${this.API}/${autorId}`, autor);
  }

  deleteAutor(autorId: number) {
    return this.http.delete<Autor>(`${this.API}/${autorId}`);
  }
}
