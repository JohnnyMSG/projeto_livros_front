import {Component, NgModule, ViewChild} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxSpeedDialActionModule, DxTextAreaModule
} from "devextreme-angular";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {Avaliacao} from "../../shared/models/avaliacao";
import {AvaliacaoService} from "../../shared/services/avaliacao.service";
import {Livro} from "../../shared/models/livro";
import {LivroService} from "../../shared/services/livro.service";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.scss'
})
export class AvaliacoesComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  avaliacoes: Avaliacao[] = [];
  livros: Livro[] = [];
  notas = [1, 2, 3, 4, 5]
  value: Avaliacao = new Avaliacao();
  popupDeleteVisivel: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;
  livroComAutorExistente: boolean = false;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private livroService: LivroService,
  ) {
  }

  ngOnInit() {
    this.carregarAvaliacoes();
    this.carregarLivros();
  }

  carregarAvaliacoes() {
    console.log("carregando autores")
    this.avaliacaoService.getAvaliacoes().subscribe(dadosAvaliacoes => {
      console.log("dadosAvaliacoes", dadosAvaliacoes)
      this.avaliacoes = dadosAvaliacoes;
    })
  }

  carregarLivros() {
    console.log("carregando livros")
    this.livroService.getLivros().subscribe(dadosLivros => {
      console.log("dadosLivros", dadosLivros)
      this.livros = dadosLivros;
    })
  }

  deletarAvaliacao(avaliacao: Avaliacao) {
    this.avaliacaoService.deleteAvaliacao(avaliacao.id).subscribe(() => {
      console.log("Avaliação deletada com sucesso!");
      this.carregarAvaliacoes();
    });
  }

  onSavedAvaliacao(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        this.avaliacaoService.postAvaliacao(change.data).subscribe(() => {
          console.log("Avaliação criada com sucesso!");
          this.carregarAvaliacoes();
        })
      } else if (change.type == 'update') {
        this.avaliacaoService.updateAvaliacao(change.data.id, change.data).subscribe(() => {
          console.log("Avaliação atualizada com sucesso!")
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
    this.deletarAvaliacao(this.value);
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
    AvaliacoesComponent,
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
