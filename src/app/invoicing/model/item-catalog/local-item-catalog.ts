import { Observable, of } from 'rxjs';
import { Item } from './item';
import { ItemCatalog } from './item-catalog';

export class LocalItemCatalog extends ItemCatalog {
    private availableItems: Item[] = [
        {name: 'Arcsoft Software Development'},
        {name: 'Firmaq'},
        {name: 'Oknoplast'},
    ];

    public items(query: string): Observable<Item[]> {
        return of(this.availableItems
            .filter(i => i.name.includes(query))
        );
    }
}
