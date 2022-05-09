import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IQuote, ISentimentLookup, IStockList, ISymbolLookup } from '../models/stock';
@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {
  private stockQuoteUrl = "https://finnhub.io/api/v1/quote";
  private symbolSearchUrl = "https://finnhub.io/api/v1/search";
  private insiderSentimentUrl = "https://finnhub.io/api/v1/stock/insider-sentiment";

  constructor(private http: HttpClient) { }
  /*
  @getQuoteData
  @description to call API to get the details of stock symbol entered
  @param stock symbol
  @return: Success to return api response and failed to return error
  */
  getQuoteData(symbol:string):Observable<IQuote>{
    const params = new HttpParams()
      .set('symbol', symbol)
      .set("token","bu4f8kn48v6uehqi3cqg");
      let headers = new HttpHeaders();
    return this.http.get<IQuote>(this.stockQuoteUrl, { params, headers}).pipe(
      catchError(this.handleError));
  }

  /*
  @getStockName
  @description to call API to get the matched result of stock symbol entered
  @param stock symbol
  @return: Success to return api response and failed to return error
  */
  getStockName(symbol:string):Observable<ISymbolLookup>{
    const params = new HttpParams()
    .set('q', symbol)
    .set("token","bu4f8kn48v6uehqi3cqg")
    let headers = new HttpHeaders();
    return this.http.get<ISymbolLookup>(this.symbolSearchUrl,{ params, headers }).pipe(
      catchError(this.handleError))
  }

  /*
  @getSentimentData
  @description to call API to get the sentiments of symbol, start and end date entered
  @param stock symbol, from and to dates should be past three month
  @return: Success to return api response and failed to return error
  */
  getSentimentData(symbol:string, startDate:string, endDate: string):Observable<ISentimentLookup>{
    const params = new HttpParams()
    .set('symbol', symbol)
    .set("from",startDate)
    .set("to",endDate)
    .set("token","bu4f8kn48v6uehqi3cqg")
    let headers = new HttpHeaders();
    return this.http.get<ISentimentLookup>(this.insiderSentimentUrl,{ params, headers }).pipe(
      catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      //A client-side or network error occured. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else{
      // The backend returned an unsuccessful response code.
      //The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=> err);
  }

  /*
  @name getData
  @description get JSON value of stocks data stored in local storage 
  */
  getData(){
    return JSON.parse(localStorage.getItem("stocks")|| "[]")
  }

  /*
  @name storeData
  @description to get stock details from API and stored in localstorage
  @ return updated stocks stored in local storage
  */
  storeData(data : IStockList):IStockList[]{    
    let stocks:IStockList[] = this.getData();
    stocks.push(data);
    localStorage.setItem("stocks", JSON.stringify(stocks.slice()))
    return JSON.parse(localStorage.getItem("stocks")|| '[]')
  }
  /*
  @name removeData
  @description To remove the data from array
  @param symbol: stock details to be removed of symbol entered
  @return JSON values of stored data in local storage
  */
  removeData(symbol:string){
    let stockList:IStockList[] = this.getData();
    stockList.splice(stockList.findIndex((sl:IStockList) => sl.symbol === symbol),1);
    localStorage.setItem("stocks",JSON.stringify(stockList))
    return JSON.parse(localStorage.getItem("stocks")|| '[]')
  }


}
