import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import the PivotViewModule for the pivot table component
import { PivotViewModule, ConditionalFormattingService } from '@syncfusion/ej2-angular-pivotview';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, PivotViewModule ,HttpClientModule
  ],
  providers: [ConditionalFormattingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
