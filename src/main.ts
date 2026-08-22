// Ponto de entrada da aplicação Angular
// bootstrapApplication inicializa um componente standalone sem precisar de NgModule
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));
