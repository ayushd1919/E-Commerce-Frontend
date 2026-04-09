import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/toast/toast.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FilterPanelComponent } from "./shared/filter-panel/filter-panel.component";
import { FooterComponent } from "./shared/footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, NavbarComponent, FilterPanelComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
