import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { HomeComponent } from './features/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';
import { ConfigCellComponent } from './shared/components/config-cell/config-cell.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { GeneralComponent } from './shared/components/general/general.component';
import { FormVehicleComponent } from './shared/components/form-vehicle/form-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HomeComponent,
    HeaderComponent,
    ConfigCellComponent,
    SettingsComponent,
    GeneralComponent,
    FormVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    OverlayModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
