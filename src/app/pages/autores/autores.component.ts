import {Component, NgModule, ViewChild} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxSpeedDialActionModule, DxTextAreaModule
} from "devextreme-angular";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {Autor} from "../../shared/models/autor";
import {AutorService} from "../../shared/services/autor.service";
import {LivroService} from "../../shared/services/livro.service";
import {Livro} from "../../shared/models/livro";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'autores',
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.scss'
})
export class AutoresComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  autores: Autor[] = [];
  livros: Livro[] = [];
  value: Autor = new Autor();
  popupDeleteVisivel: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;
  livroComAutorExistente: boolean = false;

  constructor(
    private autorService: AutorService,
    private livroService: LivroService,
  ) {
  }

  ngOnInit() {
    this.carregarAutores();
  }

  carregarAutores() {
    console.log("carregando autores")
    this.autorService.getAutores().subscribe(dadosAutores => {
      console.log("dadosAutores", dadosAutores)
      this.autores = dadosAutores;
    })
  }

  carregarLivros() {
    this.livroService.getLivros().subscribe(dadosLivros => {
      this.livros = dadosLivros;
    })
  }

  deletarAutor(autor: Autor) {
    console.log(autor)
    for (let livro of this.livros) {
      if (autor.nome == livro.nomeAutor) {
        this.livroComAutorExistente = true
        return;
      }
    }
    this.autorService.deleteAutor(autor.id).subscribe(() => {
      console.log("Autor deletado com sucesso!");
      this.carregarAutores();
    });
  }

  onSavedAutor(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        this.autorService.postAutor(change.data).subscribe(() => {
          console.log("Autor criado com sucesso!");
          this.carregarAutores();
        })
      } else if (change.type == 'update') {
        this.autorService.updateAutor(change.data.id, change.data).subscribe(() => {
          console.log("Autor atualizado com sucesso!")
        });
      }
    }
  }

  addRow() {
    this.dataGrid.instance.addRow();
  }

  popupConfirmacaoDelete(evento: any) {
    evento.cancel = true;
    this.value = evento.data
    this.popupDeleteVisivel = true;
  }

  onPressDeletar() {
    this.deletarAutor(this.value);
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
    AutoresComponent,
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
