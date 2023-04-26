import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { map } from 'rxjs';
import { VehiclesService } from 'src/app/core/services/vehicles/vehicles.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() vehicle!: Vehicle;
  @Input() edit: boolean = false;
  @Output() isShowModal = new EventEmitter<boolean>();
  //Add vehicle modal
  @Input() isAddOpen: boolean = true;

  alertNotUbication!: string

  geo: any = [10.405980406990285, -75.488072436448263];

  constructor(private vehiclesSrv: VehiclesService) {}

  ngOnInit(): void {
    this.realTimeLocation();
    this.activeTab();
  }

  ngOnChanges(): void {
    this.realTimeLocation();
  }

  //Changes Realtime
  realTimeLocation() {
    this.vehiclesSrv
      .getGeoRealTime(this.vehicle.plate)
      .snapshotChanges()
      .pipe(
        map((change: any) => {
          if (change) {
            return change.map((c: any) => ({
              id: c.payload?.key,
              val: c.payload.val()
            }));
          } else {
            this.alertNotUbication = 'No hay ubicación a tiempo real para este vehiculo';
          }
        })
      )
      .subscribe((data) => {
        if (data) {
          let latitude = data[5]?.val as unknown as number
            ? data[5].val as unknown as number
            : this.alertNotUbication = 'No hay ubicación a tiempo real para este vehiculo' ;
          let longitude = data[6].val as unknown as number
            ? data[6].val as unknown as number
            : this.alertNotUbication = 'No hay ubicación a tiempo real para este vehiculo';
          this.geo = [latitude, longitude];
        } else {
            this.alertNotUbication = 'No hay ubicación a tiempo real para este vehiculo';
        }
      });
  }

  //Modal
  isOpenConf = false;
  isOpenGen = true;

  //Tab
  activeGen!: string;
  activeConf!: string;

  modalShow() {
    this.isShowModal.emit(false);
  }

  openTab(tab: number) {
    if (tab === 1 && this.isOpenGen === false) {
      this.isOpenGen = true;
      this.isOpenConf = false;
      this.activeTab();
    }
    if (tab == 2 && this.isOpenConf === false) {
      this.isOpenConf = true;
      this.isOpenGen = false;
      this.activeTab();
    }
  }

  activeTab() {
    this.activeGen = '';
    this.activeConf = '';

    if (this.isOpenConf === true) {
      this.activeConf =
        'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
    } else {
      this.activeGen =
        'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
    }
  }
}
