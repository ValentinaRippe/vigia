import { Component,  } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import {
  faPen,
  faCircleInfo,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { VehiclesService } from 'src/app/core/services/vehicles/vehicles.service';

@Component({
  selector: 'app-config-cell',
  templateUrl: './config-cell.component.html',
})
export class ConfigCellComponent implements ICellRendererAngularComp {
  params: any;
  cellValue!: string;

  isOpen = false;
  isOpenBody = false;

  icons = {
    faPen,
    faCircleInfo,
    faTrash,
  };


  constructor(private vehiclesSrv: VehiclesService) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  editClicked() {
    console.log('Edit', this.params);
  }

  removeClicked() {
    const {id} = this.params.data

    this.vehiclesSrv.deleteVehicles(id).subscribe(res => {
      console.log('Vehiculo eliminado', res)
    })

  }


  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
