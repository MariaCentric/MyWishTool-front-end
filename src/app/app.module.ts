import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CentricHeaderModule, CentricIcon2Module, CentricSidenavModule, CentricUploadAreaModule } from '@windmill/ng-windmill';
import { CentricButtonModule } from '@windmill/ng-windmill';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CentricUploadAreaModule, 
    CentricButtonModule,
    CentricIcon2Module,
    CentricHeaderModule,
    CentricSidenavModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
