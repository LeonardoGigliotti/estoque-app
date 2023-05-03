import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.page.html',
  styleUrls: ['./create-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateClientePage implements OnInit {

  nome = '';
  email = '';
  senha = '';
  confirmeSenha ='';

  constructor(private route: Router, private clientesService: ClientesService) { }

  ngOnInit() {
    if(this.senha === this.confirmeSenha){
      const cliente: Cliente ={
        nome: this.nome,
        email: this.email,
        senha: this.senha
      }
      this.clientesService.create(cliente).subscribe(dados =>{
        alert('Cliente inserção com sucesso: ' + dados.id)
        // navegação vem aqui
        this.route.navigateByUrl('/home');
      });

      //Nunca colocar a navegação fora... vai voltar sem saber a resposta
    } else {
      alert('Senhas não conferem')
    }
  }

}
