import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Autor} from "../models/autor";
import {Fornecedor} from "../models/fornecedor";
import {Avaliacao} from "../models/avaliacao";

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private readonly API = `/api/avaliacoes`;

  constructor(
    private http: HttpClient
  ) { }

  getAvaliacoes() {
    console.log("this.http", this.http);
    return this.http.get<Avaliacao[]>(this.API);
  }

  postAvaliacao(avaliacao: Avaliacao) {
    return this.http.post<Avaliacao>(this.API, avaliacao);
  }

  updateAvaliacao(avaliacaoId: number, avaliacao: Avaliacao) {
    return this.http.put<Avaliacao>(`${this.API}/${avaliacaoId}`, avaliacao);
  }

  deleteAvaliacao(avaliacaoId: number) {
    return this.http.delete<Avaliacao>(`${this.API}/${avaliacaoId}`);
  }
}
