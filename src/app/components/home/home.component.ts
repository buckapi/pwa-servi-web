import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
constructor(
  public global: GlobalService,
  private viewportScroller: ViewportScroller

){}
}

