import {Livro} from "./livro";

export class Avaliacao {
  id!: number;
  nota!: number;
  titulo!: string;
  comentario!: string;
  livro!: Livro;
  livroTitulo!: string;
}
