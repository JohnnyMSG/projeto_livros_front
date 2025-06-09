import {Autor} from "./autor";
import {Genero} from "../enums/genero.enum";

export class Livro {
  id!: number;
  titulo!: string;
  autor!: Autor;
  nomeAutor!: string;
  genero!: Genero;
  sinopse!: string;
}
