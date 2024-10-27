import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-planing',
  standalone: true,
  imports: [],
  templateUrl: './planing.component.html',
  styleUrl: './planing.component.css'
})
export class PlaningComponent {
constructor (
  public global: GlobalService
){}
}
