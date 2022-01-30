import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import '@progress/kendo-ui';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoviesComponent } from './components/movies/movies.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { BadgeComponent } from './components/badge/badge.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { HttpClientModule } from '@angular/common/http';

import { MovieDataService } from './services/movie-data.service';

import { NumberFormatPipe } from './pipes/number-format.pipe';
import { DropDownListPopupSelectorDirective } from './directives/dropdownlist-popup-selector.directive';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MoviesComponent,
        NavigationComponent,
        BadgeComponent,
        UserProfileComponent,
        NumberFormatPipe,
        DropDownListPopupSelectorDirective,
        ActionButtonsComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DropDownsModule,
        BrowserAnimationsModule,
        LayoutModule,
        GridModule,
        ButtonsModule,
        ChartsModule,
        DialogsModule,
        DateInputsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [MovieDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
