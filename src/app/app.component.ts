import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/toast/toast.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FilterPanelComponent } from "./shared/filter-panel/filter-panel.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, NavbarComponent, FilterPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
