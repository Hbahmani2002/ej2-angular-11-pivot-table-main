import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import the PivotViewModule for the pivot table component
import { PivotViewModule, ConditionalFormattingService } from '@syncfusion/ej2-angular-pivotview';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoApisComponent } from './demo-apis/demo-apis.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DemoApisComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, PivotViewModule ,HttpClientModule, AppRoutingModule,CoreModule
  ],
  providers: [ConditionalFormattingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
