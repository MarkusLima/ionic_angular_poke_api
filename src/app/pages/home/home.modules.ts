import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonRow, IonCol, IonCard, IonCardHeader, IonButton, IonLoading
 } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, IonRow, IonCol, IonCard, IonCardHeader, IonButton, IonLoading
  ]
})
export class HomePageModules implements OnInit {

  pokemons: any[] = [];
  offset = 0;
  isLoading = false;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  async loadPokemons() {
    this.isLoading = true;
    this.pokemonService.getPokemons(this.offset).subscribe({
      next: async (res) => {
        const results = res.results;
        this.pokemons = await Promise.all(results.map(async (p: any) => {
          const details = await this.pokemonService.getPokemonDetails(p.name).toPromise();
          return { name: p.name, image: details.sprites.front_default, url: p.url };
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pokemons', err);
        this.isLoading = false;
      }
    });
  }

  goToNextDetails(name: string, url: string) {
    const next = this.getNextPokemonIdFromUrl(url);
    if (next) {
      this.router.navigate(['/details', name], {queryParams: { next: next }});
    } else {
      this.router.navigate(['/details', name]);
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }

  nextPage() {
    this.offset += 20;
    this.loadPokemons();
  }

  prevPage() {
    if (this.offset >= 20) {
      this.offset -= 20;
      this.loadPokemons();
    }
  }

  getNextPokemonIdFromUrl(url: string): number | undefined {
    const match = url.match(/\/pokemon\/(\d+)\//);
    if (match && match[1]) {
      return parseInt(match[1], 10) + 1;
    }
    return undefined;
  }
}
