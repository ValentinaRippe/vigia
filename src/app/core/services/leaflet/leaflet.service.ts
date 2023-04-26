import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  public userLocation!: [number, number]

  constructor() {
    this.getUserLocation()
  }

  getUserLocation(){
    navigator.geolocation.getCurrentPosition(({coords}) => {
      this.userLocation = [coords.latitude, coords.longitude]

      return this.userLocation
    })
  }

}
