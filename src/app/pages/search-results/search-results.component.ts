import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
   templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Captura o parâmetro 'query' da URL
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('query');
      if (this.searchQuery) {
        // Aqui você pode chamar um serviço para buscar os dados com base no searchQuery
        console.log('Buscando por:', this.searchQuery);
      }
    });
  }
}
