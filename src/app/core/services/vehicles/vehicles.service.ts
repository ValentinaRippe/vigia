import { Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Vehicle } from 'src/app/shared/models/vehicles.model';

import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private apiUrl = environment.api;

  vahicles!: AngularFireList<Vehicle>

  constructor(private http: HttpClient, public db: AngularFireDatabase ) {
    this.vahicles = db.list('/telemetry')
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}vehicles?size=913`);
  }

  getGeoRealTime(plate: string): AngularFireList<Vehicle> {
    return this.vahicles = this.db.list(`/telemetry/${plate}`)
  }

  updateVehicle(id: number, data: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}vehicles/${id}`, {
      data,
    });
  }

  createVehicle(data: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}vehicles`, {
      data,
    });
  }

  deleteVehicles(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.apiUrl}vehicles/${id}`);
  }
}
