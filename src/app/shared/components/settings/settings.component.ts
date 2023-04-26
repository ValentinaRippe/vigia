import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy, SimpleChange, SimpleChanges } from '@angular/core';
import { icon, Map, marker, tileLayer } from 'leaflet';
import {
  faPen,
  faTrash,
  faMapLocation,
} from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from '../../models/vehicles.model';
import { VehiclesService } from 'src/app/core/services/vehicles/vehicles.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnChanges {
  @Input() vehicle!: Vehicle;
  @Input() edit: boolean = false;
  @Input() geo: any

  icons = {
    faPen,
    faMapLocation,
    faTrash,
  };

  private map: any;

  isOpenEdit = false;
  isOpenMap = true;

  activeMap!: string;
  activeEdit!: string;

  constructor(private vehiclesSrv: VehiclesService) {}

  ngOnInit(): void {
    this.initMap();
    this.activeTab();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  //Menu
  openTab(tab: number) {
    if (tab === 1 && this.isOpenEdit === false) {
      this.isOpenEdit = true;
      this.isOpenMap = false;
      this.activeTab();
    }
    if (tab == 2) {
      this.isOpenMap = true;
      this.isOpenEdit = false;
      this.activeTab();
    }
  }

  activeTab() {
    this.activeMap = '';
    this.activeEdit = '';

    if (this.isOpenMap === true) {
      this.activeMap =
        'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
    } else {
      this.activeEdit =
        'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
    }
  }

  //Map
  initMap() {
    this.map = new Map('map').setView(this.geo, 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    let iconMarker = icon({
      iconUrl: './assets/images/marker-car.png',
      iconSize: [60, 80],
    });
    marker(this.geo, { icon: iconMarker }).addTo(this.map);
  }

  removeClicked() {
    this.vehiclesSrv.deleteVehicles(this.vehicle.id).subscribe((res) => {
      console.log(res);
    });
  }
}
