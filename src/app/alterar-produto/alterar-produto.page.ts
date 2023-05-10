import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../services/produtos.service';
import { Produto } from '../models/Produto.Model';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarProdutoPage implements OnInit {
  id = 0;
  titulo = '';
  descricao = '';
  preco = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private produtoService: ProdutosService) { }

  ngOnInit() {
  this.id = this.activatedRoute.snapshot.params['id'];

  this.produtosService.getOne(this.id).subscribe(retorno => {
    this.titulo = retorno.titulo as string;
    this.descricao = retorno.descricao ? retorno.descricao : '';
  })
  }


  salvar(){
    const produto: Produto = {
      titulo: this.titulo,
      descricao: this.descricao,
      preco: this.preco
    }
    this.produtoService.create(produto).subscribe(dados => {
      alert("Produto inserido com sucesso, id: " + dados.id)
      this.router.navigateByUrl('/lista-produtos');
  })
  }

}
