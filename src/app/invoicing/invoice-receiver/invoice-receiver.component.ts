import { Component, OnInit } from '@angular/core';
import { LocalItemCatalog } from '../model/item-catalog/local-item-catalog'
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap, map, retry, filter } from 'rxjs/operators';
import { Item } from '../model/item-catalog/item';

interface ItemSuggestion {
  name: string;
  label: string;
}

@Component({
  selector: 'app-invoice-receiver',
  templateUrl: './invoice-receiver.component.html',
  styleUrls: ['./invoice-receiver.component.scss']
})
export class InvoiceReceiverComponent implements OnInit {
  readonly WAIT_TIME_BEFORE_SEARCH = 400;
  readonly MINIMAL_QUERY_LENGTH = 3;

  private name: String
  suggestions: ItemSuggestion[] = [];


  private searchQuery = new Subject<string>();
  private searchResult = this.searchQuery.pipe(
      debounceTime(this.WAIT_TIME_BEFORE_SEARCH),
      filter(q => q.length >= this.MINIMAL_QUERY_LENGTH),
      switchMap( q => this.itemsCatalog.items(q)),
      map(data => this.toAnotherForm(data)),
      tap(data => console.log(data)),
      retry(3),
  );

  constructor(private itemsCatalog: LocalItemCatalog) { }

  ngOnInit() {
    this.searchResult.subscribe((items) => {
      this.suggestions = items;
    });
  }

  handleAutocompleteCompanyName($event: any): void {
    this.searchQuery.next($event.target.value);
  }

  toAnotherForm(data: Item[]): ItemSuggestion[] {
    return data.map(i => {
      return {
        name: i.name,
        label: i.name
      };
    });
  }

  selectSuggestion(item: ItemSuggestion): void {
    this.name = item.name;
    this.suggestions = [];
  }
}
