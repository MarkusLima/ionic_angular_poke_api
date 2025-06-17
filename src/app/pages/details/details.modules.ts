import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList,
  IonLabel, IonBackButton, IonButtons, IonButton, IonLoading
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonItem, IonList, IonLabel, IonBackButton, IonButtons, IonButton, IonLoading
  ]
})
export class DetailsPageModules implements OnInit {

  pokemon: any;
  nextId: number | undefined;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.loadPokemonDetails(name);

    this.route.queryParams.subscribe(params => {
      this.nextId = parseInt(params['next']);
      console.log('Próximo ID:', this.nextId);
    });
  }

  loadPokemonDetails(name: string) {
    this.isLoading = true;
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do Pokémon:', err);
        this.isLoading = false;
      }
    });

    this.isLoading = false;
  }

  goToNextPokemon() {
    const id = this.nextId;

    if (id != null) {
      this.isLoading = true;
      this.pokemonService.getPokemonById(id).subscribe({
        next: (data) => {
          if (data?.name) {
            const next = id + 1;

            this.router.navigate(['/details', data.name], {
              queryParams: { next }
            });

            this.nextId = next;
          } else {
            console.error('Pokemon data or name is invalid');
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar Pokémon:', err);
          this.isLoading = false;
        }
      });

      this.isLoading = false;
    }
  }
}
