import { Component } from '@angular/core';
import { PrincipalComponent } from "./componentes/principal/principal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PrincipalComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafioInChurch';
}
