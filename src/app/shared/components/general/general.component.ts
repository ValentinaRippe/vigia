import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {
  @Input() vehicle!: Vehicle

  ngOnInit(){
  }
}
