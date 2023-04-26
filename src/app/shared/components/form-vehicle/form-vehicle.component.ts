import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicles.model';
import { VehiclesService } from 'src/app/core/services/vehicles/vehicles.service';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
})
export class FormVehicleComponent implements OnInit {
  formBasics!: FormGroup;

  vehicle!: Vehicle

  constructor(
    private readonly formBuilder: FormBuilder,
    private vehicleSrv: VehiclesService
  ) {}

  ngOnInit(): void {
    this.formBasics = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      id: [0, Validators.required],
      createdBy: ['', Validators.required],
      plate: ['', Validators.required],
      chassisNumber: ['', Validators.required],
      transitLicense: ['', Validators.required],
      engineNumber: ['', Validators.required],
      vin: ['', Validators.required],
      cylinderCapacity: [0, Validators.required],
      model: [0, Validators.required],
      emptyWeight: [0, Validators.required],
      loadingCapacity: [0, Validators.required],
      fuelType: ['', Validators.required], //Electric, Diesel ,Gasoline, Gas, Acpm
      propertyType: ['', Validators.required], //OwnSelf, Leased, Rented, Client
      vehicleConfiguration: ['', Validators.required],
      brand: ['', Validators.required],
      vehicleLine: ['', Validators.required],
      bodyWork: ['', Validators.required],
      company: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  validation(input: any) {
    return (
      this.formBasics.controls[input].errors &&
      this.formBasics.controls[input].touched
    );
  }

  validateForm(): boolean {
    return this.formBasics.invalid;
  }

  submit() {
    console.log(this.vehicle)
    /* this.vehicleSrv.createVehicle(this.vehicle).subscribe(data => {
      console.log(data)
    }) */
  }
}
