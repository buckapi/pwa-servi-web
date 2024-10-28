import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-developerweb',
  standalone: true,
  imports: [],
  templateUrl: './developerweb.component.html',
  styleUrl: './developerweb.component.css'
})
export class DeveloperwebComponent {
constructor (
  public global: GlobalService
){}
}
