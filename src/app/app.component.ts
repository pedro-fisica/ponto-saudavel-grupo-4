import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

// standalone: true — este componente não pertence a nenhum NgModule
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `<app-home></app-home>`,
})
export class AppComponent {}
