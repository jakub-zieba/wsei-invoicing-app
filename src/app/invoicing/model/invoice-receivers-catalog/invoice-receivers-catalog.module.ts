import { HttpClient } from '@angular/common/http';
import { ItemCatalog } from './item-catalog';
import { Observable, merge } from 'rxjs';
import { Item } from './item';
import { map, flatMap, mergeMap, concatMap } from 'rxjs/operators';

interface Company {
    volumeInfo: CompanyInfo;
}

interface CompanyInfo {
    title: string;
}

interface CompanyResponse {
    items: Company[];
}
export class HttpItemCatalog extends ItemCatalog {
    readonly BASE_QUERY_URL = 'https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?limit=10&';

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    items(query: string): Observable<Item[]> {
        const query_url = `${this.BASE_QUERY_URL}?conditions[q]=${query}`;

        return this.http.get<CompanyResponse>(query_url).pipe(
            map(r => r.items),
            map(items => items.map(i => this.mapToItem(i)))
        );
    }

    mapToItem(i: Company): any {
        return {name: i.volumeInfo.title};
    }
}
