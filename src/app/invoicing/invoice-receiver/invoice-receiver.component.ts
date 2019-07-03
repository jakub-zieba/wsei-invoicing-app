import { Component, OnInit } from '@angular/core';
import { HttpItemCatalog } from '../model/invoice-receivers-catalog/invoice-receivers-catalog.module'
import { ItemCatalog } from '../model/invoice-receivers-catalog/item-catalog'
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap, map, retry, filter } from 'rxjs/operators';
import { Item } from '../model/item-catalog/item';

@Component({
  selector: 'app-invoice-receiver',
  templateUrl: './invoice-receiver.component.html',
  styleUrls: ['./invoice-receiver.component.scss']
})
export class InvoiceReceiverComponent implements OnInit {
  readonly WAIT_TIME_BEFORE_SEARCH = 400;
  readonly MINIMAL_QUERY_LENGTH = 3;

  private searchQuery = new Subject<string>();
  private searchResult = this.searchQuery.pipe(
      debounceTime(this.WAIT_TIME_BEFORE_SEARCH),
      filter(q => q.length >= this.MINIMAL_QUERY_LENGTH),
      switchMap( q => this.itemsCatalog.items(q)),
      map(data => this.toAnotherForm(data)),
      tap(data => console.log(data)),
      retry(3),
  );

  constructor(private itemsCatalog: ItemCatalog) { }

  ngOnInit() {
  }

  handleAutocompleteCompanyName($event: any): void {
    this.searchQuery.next($event.target.value);
  }

  toAnotherForm(data: Item[]): ItemSuggestion[] {
    return data.map(i => {
      return {
        name: i.data.krs_podmioty.nazwa,
        label: i.data.krs_podmioty.nazwa
      };
    });
  }
}
