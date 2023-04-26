import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
  CellClickedEvent,
  ColDef,
  ValueGetterParams,
  ValueSetterParams,
} from 'ag-grid-community';
import { VehiclesService } from 'src/app/core/services/vehicles/vehicles.service';
import { ConfigCellComponent } from 'src/app/shared/components/config-cell/config-cell.component';
import { Vehicle } from 'src/app/shared/models/vehicles.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  addIcon = faCirclePlus

  isOpen = false;
  isOpenBody = false;

  vehicles: Vehicle[] = [
    {
      id: 0,
      createdBy:'',
      plate: '',
      chassisNumber: '',
      transitLicense: '',
      engineNumber: '',
      vin: '',
      cylinderCapacity: 0,
      model: 0,
      emptyWeight: 0,
      loadingCapacity: 0,
      fuelType: '', //Electric, Diesel ,Gasoline, Gas, Acpm
      propertyType: '', //OwnSelf, Leased, Rented, Client
      vehicleConfiguration: '',
      brand: '',
      vehicleLine: '',
      bodyWork: '',
      company: '',
      status: '', //Active, Inactive
    },
  ];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', maxWidth: 100 },
    { headerName: 'Placa', field: 'plate' },
    { headerName: 'Modelo', field: 'model' }, //Number
    { headerName: 'Licencia de transito', field: 'transitLicense' }, //Number
    { headerName: 'Número de motor', field: 'engineNumber' },
    { headerName: 'Peso vacío', field: 'emptyWeight' }, //Number
    { headerName: 'Número de VIN', field: 'vin' },
    { headerName: 'Capacidad de Cilindraje', field: 'cylinderCapacity' },
    {
      headerName: 'Tipo de combustible',
      field: 'fuelType',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Electric', 'Diesel', 'Gasoline', 'Gas', 'Acpm'],
      }
    },
    {
      headerName: 'Tipo de propiedad',
      field: 'propertyType',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['OwnSelf', 'Leased', 'Rented', 'Client'],
      },
    },
    { headerName: 'Capacidad de carga', field: 'loadingCapacity' }, //Number
    {
      headerName: 'Estatus',
      field: 'status',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Active', 'Inactive'],
      },
    },
    {
      headerName: '',
      field: 'Config',
      pinned: 'right',
      maxWidth: 150,
      cellRenderer: ConfigCellComponent,
      editable: false,
    },
  ];

  // Data that gets displayed in the grid
  public rowData!: Vehicle[];


  constructor(private vehiclesSrv: VehiclesService) {}

  ngOnInit() {
    this.vehiclesSrv.getVehicles().subscribe((data: any) => {
      this.rowData = data._embedded.vehicles;
    });

  }

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
  };

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {

  }

}
