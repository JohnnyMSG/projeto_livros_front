import {Component, NgModule, ViewChild} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxSpeedDialActionModule,
  DxTextAreaModule
} from "devextreme-angular";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {Livro} from "../../shared/models/livro";
import {LivroService} from "../../shared/services/livro.service";
import {Autor} from "../../shared/models/autor";
import {AutorService} from "../../shared/services/autor.service";
import {Genero} from "../../shared/enums/genero.enum";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'livros',
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss'
})
export class LivrosComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  livros: Livro[] = [];
  autores: Autor[] = [];
  generosList: string[] = [];
  value: Livro = new Livro();
  popupDeleteVisivel: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
  ) {
  }

  ngOnInit() {
    this.carregarLivros();
    this.carregarAutores();

    this.generosList = Object.keys(Genero);
  }

  carregarLivros() {
    console.log("carregando livros")
    this.livroService.getLivros().subscribe(dadosLivros => {
      console.log("dadosLivros", dadosLivros)
      this.livros = dadosLivros;
    })
  }

  carregarAutores() {
    this.autorService.getAutores().subscribe(dadosAutores => {
      this.autores = dadosAutores;
    })
  }

  deletarLivro(livro: Livro) {
    console.log(livro)
    this.livroService.deleteLivro(livro.id).subscribe(() => {
      console.log("Livro deletado com sucesso!");
      this.carregarLivros();
    });
  }

  onSavedLivro(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        this.livroService.postLivro(change.data).subscribe(() => {
          console.log("Livro criado com sucesso!");
          this.carregarLivros();
        })
      } else if (change.type == 'update') {
        this.livroService.updateLivro(change.data.id, change.data).subscribe(() => {
          console.log("Livro atualizado com sucesso!")
        });
      }
    }
  }

  // onSavedAvaliacao(e: any) {
  //   for (let change of e.changes) {
  //     if (change.type == 'update') {
  //       this.serviceItensNota.updateItemNota(change.data.id, change.data).subscribe(() => {
  //         console.log("Item da nota atualizado com sucesso!")
  //         this.carregarNotas();
  //       });
  //     }
  //   }
  // }

  addRow() {
    this.dataGrid.instance.addRow();
  }

  popupConfirmacaoDelete(evento: any) {
    evento.cancel = true;
    this.value = evento.data
    this.popupDeleteVisivel = true;
  }

  onPressDeletar() {
    this.deletarLivro(this.value);
    this.popupDeleteVisivel = false;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  editorOptions: EditorOptions = {
    valueChangeEvent: 'keyup'
  };

}

@NgModule({
  declarations: [
    LivrosComponent,
  ],
  imports: [
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxButtonModule,
    DxPopupModule,
    DxTextAreaModule
  ]
})
export class FornecedoresModule {
}
