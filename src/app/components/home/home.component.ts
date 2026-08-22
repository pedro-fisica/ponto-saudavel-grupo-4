import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { FeatureCardsComponent } from '../feature-cards/feature-cards.component';
import { FooterComponent } from '../footer/footer.component';

// Componente "página" que agrega todos os blocos da tela inicial
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, FeatureCardsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
