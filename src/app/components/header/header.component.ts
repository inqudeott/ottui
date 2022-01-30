import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
    public listItems: Array<string> = ['Kannda', 'Tamil', 'Telugu', 'Hindi'];
    public selected = this.service.selectedLanguage;

    constructor(public router: Router, private service: MovieDataService) { }

    public onCurrencyChange(e: any): void {
        this.service.changeLanguage(e);
    }
}
