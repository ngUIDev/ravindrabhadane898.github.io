import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IQuote, ISymbolLookup } from '../models/stock';
import { StockTrackerService } from './stock-tracker.service';

describe('StockTrackerService', () => {
  let service: StockTrackerService;
  let mockHttpClient:HttpClient;

  beforeEach(() => {
    service = new StockTrackerService(mockHttpClient);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return symbol details',()=>{
    const mockResponse:IQuote = {
      c:1,
      d:2,
      dp:3,
      h:4,
      l:5,
      o:6,
      pc:7,
      t:8      
    }
    let response:any;
    spyOn(service, 'getQuoteData').and.returnValue(of(mockResponse));
    service.getQuoteData('GOOG').subscribe(res=>{response = res});
    expect(response).toEqual(mockResponse);
  })
  it('should return company name',()=>{
    const mockResponse:ISymbolLookup = {
     count:2,
     result:[
        {
          "description": "MORGAN STANLEY",
          "displaySymbol": "MS",
          "symbol": "MS",
          "type": "Common Stock"
        },
        {
          "description": "MORGAN STANLEY",
          "displaySymbol": "MS.MX",
          "symbol": "MS.MX",
          "type": "Common Stock"
      }]
    }
    let response:any;
    spyOn(service, 'getStockName').and.returnValue(of(mockResponse));
    service.getStockName('MS').subscribe(res=>{response = res});
    expect(response).toEqual(mockResponse);
  })
});
