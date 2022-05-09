import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISentimentLookup, ISentimentData, IState } from 'src/app/models/stock';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-insider-sentiment',
  templateUrl: './insider-sentiment.component.html',
  styleUrls: ['./insider-sentiment.component.scss']
})
export class InsiderSentimentComponent implements OnInit {
  insiderSentimentList: Array<ISentimentData> = [];
  symbol: string;
  stockName: string;
  loadingSpinner:boolean = false;
  months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  constructor(private stockTrackerService: StockTrackerService, private route: ActivatedRoute, private localtion: Location) { }

  ngOnInit() {
    this.symbol = this.route.snapshot.params.symbol; // get symbol from path
    let state = this.localtion.getState() as IState; //get stock name from state
    this.stockName = state.name;
    this.loadingSpinner = true;
    if (this.symbol && this.stockName) {
      this.loadSentimentData(this.symbol);
    } else{
      this.loadingSpinner = false;
    }    
  }

  /*
  @name loadSentimentData
  @decsription to display insider sentiment for last three months
  */
  private loadSentimentData(symbol: string) {
    this.loadingSpinner = true;
    let sentimentList: ISentimentData[] = [];
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() - 2);
    let startDateInput = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
    let endDateInput = formatDate(endDate, 'yyyy-MM-dd', 'en-US');
    this.stockTrackerService.getSentimentData(symbol, endDateInput, startDateInput).pipe(
      finalize(()=> this.loadingSpinner = false)).subscribe(
      (item: ISentimentLookup) => {
        if (item.data && item.data.length > 0) {
          item.data.forEach(element => {
            let sentimentData: ISentimentData = {
              change: element.change,
              month: element.month,
              mspr: element.mspr
            }
            sentimentList.push(sentimentData);
          });
        }
      });
    this.insiderSentimentList = sentimentList;    
  }

}
