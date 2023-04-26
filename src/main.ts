import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if(!navigator.geolocation){
  alert('No soporta la geolocalización')
  throw Error('No soporta la geolocalización')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
