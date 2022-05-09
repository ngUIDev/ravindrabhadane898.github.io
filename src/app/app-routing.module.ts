import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsiderSentimentComponent } from './components/insider-sentiment/insider-sentiment.component';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';

const routes: Routes = [
  {path: '', component: StockTrackerComponent},
  {path: 'sentiment/:symbol', component: InsiderSentimentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
