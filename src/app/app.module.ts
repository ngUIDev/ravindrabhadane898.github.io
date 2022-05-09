import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { InsiderSentimentComponent } from './components/insider-sentiment/insider-sentiment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    StockTrackerComponent,
    StockDetailComponent,
    InsiderSentimentComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
