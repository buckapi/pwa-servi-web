import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadStyleServiceService } from './services/load-style-service.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { PlaningComponent } from './components/planing/planing.component';
import { DomineComponent } from './components/domine/domine.component';
import { DeveloperwebComponent } from './components/developerweb/developerweb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ContactComponent,
    FaqComponent,
    PlaningComponent,
    DomineComponent,
    DeveloperwebComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newservices';
  constructor(

    public loadStyleService: LoadStyleServiceService,
    public scriptLoader: ScriptLoaderService,
    public global: GlobalService
  ){

  }
  ngOnInit(): void {
    this.theme();
  }
  theme() {
    this.loadStyleService.loadStyle('assets/css/bootstrap.min.css');
    this.loadStyleService.loadStyle('assets/css/all.min.css');
    this.loadStyleService.loadStyle('assets/css/animate.css');
    this.loadStyleService.loadStyle('assets/css/magnific-popup.css');
    this.loadStyleService.loadStyle('assets/css/meanmenu.css');
    this.loadStyleService.loadStyle('assets/css/swiper-bundle.min.css');
    this.loadStyleService.loadStyle('assets/css/nice-select.css');
    this.loadStyleService.loadStyle('assets/css/color.css');
    this.loadStyleService.loadStyle('assets/css/main.css');
    
    this.scriptLoader
      .loadScripts([
   
/*         'assets/js/viewport.jquery.js',
        'assets/js/bootstrap.bundle.min.js',
        'assets/js/jquery.nice-select.min.js',
        'assets/js/jquery.waypoints.js',
        'assets/js/jquery.counterup.min.js',
        'assets/js/swiper-bundle.min.js',
        'assets/js/jquery.meanmenu.min.js',
        'assets/js/jquery.magnific-popup.min.js',
        'assets/js/wow.min.js',
        'assets/js/main.js' */
      ])
      .then((data) => {
        console.log('Todos los scripts se han cargado correctamente', data);
      })
      .catch((error) => console.error('Error al cargar los scripts', error));
  }
}
