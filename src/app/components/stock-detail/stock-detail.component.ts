import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IStockList } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent {
  @Input() stockList: Array<IStockList> = [];
  @Output() closeStockCard = new EventEmitter<string>();  

  onClose(value: string) {
    this.closeStockCard.emit(value);
  }

}
