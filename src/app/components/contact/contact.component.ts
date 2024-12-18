import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
constructor(
  public global: GlobalService,
  @Inject(PLATFORM_ID) private platformId: Object
){}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}
