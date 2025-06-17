import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonButton, IonCol, IonRow, IonTitle, IonToolbar, IonHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent, CommonModule, IonButton, IonCol, IonRow, IonTitle, IonToolbar,
    IonHeader
  ],
})
export class HomePage {
  constructor(private router: Router) {}

  goHome(){
    this.router.navigate(['/home']);
  }
}
