import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { SelectionRange } from '@progress/kendo-angular-dateinputs';
import { MS_PER_MINUTE } from '@progress/kendo-date-math';

// the two collections are mutated directly, simulating an in-memory db data persistence
import { stocksInPortfolio, uncategorizedStocks, heatmapStocks,movies } from '../data/stocks';
import { Stock } from '../models/stock';
import { StockIntervalDetails } from '../models';
import { MoviesComponent } from '../components/movies/movies.component';


@Injectable()
export class MovieDataService {
    
    public data: BehaviorSubject<Stock[]> = new BehaviorSubject(stocksInPortfolio);
    private BASE_URL = "http://localhost:5001";
    public movies:any =[];
    public selectedCurrency: 'USD' | 'EUR' | 'GBP' | 'All' = 'All';
    public selectedLanguage: 'Kannada' | 'English' | 'Hindi' | 'All' = 'All';
    public selectedStock: Stock = {
        symbol: '', name: '', price: 0, day_change: 0, change_pct: 0,
        volume: 0, volume_avg: 0, market_cap: 0, pe: 0, intraday: [0]
    };

    constructor(private http: HttpClient) {}
    public getDataStream(): Observable<Stock[]> {
        return this.data
            .pipe(map((stocks) => {
                if (this.selectedCurrency === 'USD') {
                    return stocks;
                }

                return stocks.map((item) => ({ ...item, price: this.convertCurrency(item) }));
            }));
    }

    public query(sort: SortDescriptor[] = []): void {
        const data = orderBy(stocksInPortfolio, sort);
        this.data.next(data);
    }

 getMovies():Observable<Array<any>> {
       return this.http.get<Array<any>>('https://localhost:5001/api/Movies/v1');
   
        return this.movies;      
      }

   

    public convertCurrency(dataItem: Stock): any {
        const currency = { GBP: 0.77, EUR: 0.9, All:1 };

        if (this.selectedCurrency === 'USD') { return dataItem.price; }

        return Number((dataItem.price * currency[this.selectedCurrency]).toFixed(2));
    }

    public changeLanguage(selectedLanguae: any): void {
        this.selectedLanguage = this.selectedLanguage;
        this.data.next(stocksInPortfolio);
    }

   

    private generateDataForSymbol(stock: Stock, intervalInMinutes: number, range: SelectionRange): StockIntervalDetails[] {
        const data: StockIntervalDetails[] = [];

        const minutesPerDay = 1440;
        const standingPoint = {
            close: stock.intraday[0],
            volume: intervalInMinutes < minutesPerDay ?
                stock.volume / (minutesPerDay / intervalInMinutes) :
                stock.volume * (intervalInMinutes / minutesPerDay)
        };

        const intervalInMs = MS_PER_MINUTE * intervalInMinutes;
        const start = range.start.getTime() + intervalInMs;
        for (let dateInMs = start, index = 0; dateInMs <= range.end.getTime(); dateInMs += intervalInMs, index++) {
            const previousInterval = data[index - 1] || standingPoint;

            const random = Math.random() + 0.01;
            const volatility = 0.03;

            let cngP = 2 * volatility * random;
            if (cngP > volatility) {
                cngP -= (2 * volatility);
            }

            const change = Number(previousInterval.close) * cngP;
            const newPrice = Number(previousInterval.close) + change;
            const high = Math.max(newPrice, Number(previousInterval.close));
            const low = Math.min(newPrice, Number(previousInterval.close));

            data.push({
                open: Number(previousInterval.close?.toFixed(2)),
                close: Number(newPrice.toFixed(2)),
                high: Number((high + (0.015 * high)).toFixed(2)),
                low: Number((low - (0.015 * low)).toFixed(2)),
                volume: this.getStocksTradeVolume(standingPoint.volume),
                date: new Date(dateInMs)
            });
        }

        return data;
    }

    private getStocksTradeVolume(oldValue: number): number {
        const coef = Number.parseFloat((Math.random()).toFixed(2));
        const newValue = Number.parseFloat((oldValue + (oldValue * coef / 1.5)).toFixed(0));
        const diff = newValue - oldValue;
        const sign = Math.random() >= 0.5 ? 1 : -1;

        return Number((oldValue + (diff * sign)).toFixed(0));
    }
}
