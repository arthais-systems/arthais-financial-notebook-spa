import { Component, Renderer2 } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cadfin-spa';
  searchTerm: string = '';
  isAuthenticated = false;  // Estado de autenticação
  user = {
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    registration: '123456'
  };

  constructor(private router: Router, private renderer: Renderer2) {
    this.loadAuthenticationState(); // Carrega o estado de autenticação ao inicializar
  }

  // Função para carregar o estado de autenticação ao inicializar o componente
  loadAuthenticationState() {
    const storedAuth = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = storedAuth === 'true'; // Verifica se o usuário está autenticado
  }

  // Função para navegação e fechamento do menu em telas pequenas
  navigateAndClose(page: string) {
    this.router.navigate([`/${page}`]);

    // Fecha o menu se a tela for pequena (abaixo de lg)
    if (window.innerWidth < 992) {  
      const menuCollapse = document.getElementById('navbarSupportedContent');
      if (menuCollapse) {
        this.renderer.removeClass(menuCollapse, 'show'); // Fecha o menu
      }
    }
  }

  onSearch(searchTerm: string) {
    if (searchTerm && searchTerm.trim().length > 0) {
      this.router.navigate(['/search-results'], { queryParams: { query: searchTerm } });
    }
  }

  // Métodos de login/logout/troca de senha
  login() {
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true'); // Salva o estado de autenticação
    console.log('Usuário autenticado');
  }

  changePassword() {
    console.log('Trocar senha');
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // Remove o estado de autenticação
    console.log('Usuário deslogado');
    this.router.navigate(['/home']); // Redireciona após logout
  }
}
