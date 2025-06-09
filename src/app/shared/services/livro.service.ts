import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Livro} from "../models/livro";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = `/api/livros`;

  constructor(
    private http: HttpClient
  ) { }

  getLivros() {
    console.log("this.http", this.http);
    return this.http.get<Livro[]>(this.API);
  }

  postLivro(livro: Livro) {
    return this.http.post<Livro>(this.API, livro);
  }

  updateLivro(livroId: number, livro: Livro) {
    return this.http.put<Livro>(`${this.API}/${livroId}`, livro);
  }

  deleteLivro(livroId: number) {
    return this.http.delete<Livro>(`${this.API}/${livroId}`);
  }
}
