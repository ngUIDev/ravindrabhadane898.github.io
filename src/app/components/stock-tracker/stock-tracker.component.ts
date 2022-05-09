import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IStockList } from 'src/app/models/stock';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.scss']
})
export class StockTrackerComponent implements OnInit {

  public stockSearchForm: FormGroup; 
  stockList: IStockList[] = [];
  stockListFromStorage: Array<IStockList> = [];
  loadingSpinner:boolean = false;

  constructor(private stockTrackerService: StockTrackerService) { }

  ngOnInit() {
    this.initializeForm();
    let stocks: IStockList[] = this.stockTrackerService.getData();
    if (stocks && stocks.length > 0) {
      this.stockListFromStorage = stocks;
    }    
  }
  /*
  @name initializeForm
  @description to display form 
  */
  private initializeForm() {
    this.stockSearchForm = new FormGroup({
      stocksymbol: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5), this.stockNameValidator.bind(this)])
    })
  }

  /*
  @name stocksymbol
  @description getter method to get stocksymbol control
  */
  get stocksymbol() {
    return this.stockSearchForm.get('stocksymbol');
  }

  private stockNameValidator(userControl: AbstractControl) {    
    let currentStockList = this.stockTrackerService.getData();
    if (userControl.value && currentStockList.findIndex((cs: IStockList) => cs.symbol === userControl.value?.toUpperCase()) != -1) {
      return { alreadyExists: true };
    }
    return null
  }

  /*
  @name onTrackStockSymbol
  @description Add deatils to child component on click of track status button
  */
  onTrackStockSymbol() {   
    this.loadingSpinner = true;
    let symbol = this.stocksymbol?.value.toUpperCase();
    forkJoin([
      this.stockTrackerService.getQuoteData(symbol),
      this.stockTrackerService.getStockName(symbol)
    ]).subscribe(([quoteData, symbolData]) => {
      let sym = symbolData.result.find(r => r.symbol === symbol);
      if(sym){
        let stockDetails: IStockList = {
          currentPrice: quoteData.c,
          percentChangeToday: quoteData.dp,
          highPrice: quoteData.h,
          openingPrice: quoteData.o,
          symbol: sym ? sym.symbol : '',
          description: sym ? sym.description : ''
        }
        this.stockList.push(stockDetails);
        this.stockListFromStorage = this.stockTrackerService.storeData(stockDetails);
        this.stockSearchForm.reset();
      } else{
        this.isSymbolValid(true);
      }    
      this.loadingSpinner = false;   
     })
  }

  /*
  @name isSymbolValid
  @description check stock symbol is valid or not, when api not found symbol
  @param Boolean value return to know to show the error message or not
  */
  private isSymbolValid(value:boolean){    
    this.stockSearchForm.controls.stocksymbol.setErrors({
      invalidValue: value
    })    
  }

  /*
  @name closeStock
  @description boolean value return from child component to close the stock card and remove from storage
  */
  closeStock(value: string) {
    this.stockListFromStorage = this.stockTrackerService.removeData(value);
  }

}
