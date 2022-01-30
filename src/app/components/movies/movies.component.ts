import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogCloseResult, DialogService } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {
  movies: any;
  //confirmCastSubscription: any;
  private confirmCastSubscription: Subscription | undefined;

  //public movies: any[] = [];

  constructor(
    public movieDataService: MovieDataService,
    private dialogService: DialogService,
    
    
) {
    
 this.movieDataService.getMovies().subscribe((data:Array<any>)=>{
   this.movies =data;
   console.log(JSON.stringify(data));
 })
}
    

public showCrew(cast: any, movie:any): void {
 
  console.log("cast --------------",cast)
  this.confirmCastSubscription = this.dialogService
      .open({
          title: `${movie} crew`,
          content: `Starring ${cast}`,
          actions: [
              { text: 'OK' },
              // { text: 'Confirm', primary: true }
          ],
          width: 500,
          height: 245,
          actionsLayout: 'normal'
      })
      .result
      .pipe(
          take(1),
          filter((result) => !(result instanceof DialogCloseResult || result.text === 'Ok'))
      )
      .subscribe(() => {
          
          
      });
}
public showTrailer(link: any, movie:any): void {
 
  
  this.confirmCastSubscription = this.dialogService
      .open({
          title: `${movie} trailer`,
          content: `${link}`,
          actions: [
              { text: 'OK' },
              // { text: 'Confirm', primary: true }
          ],
          width: 500,
          height: 245,
          actionsLayout: 'normal'
      })
      .result
      .pipe(
          take(1),
          filter((result) => !(result instanceof DialogCloseResult || result.text === 'Ok'))
      )
      .subscribe(() => {
          
          
      });
}
public showComments(cast: any, movie:any): void {
 
  
  this.confirmCastSubscription = this.dialogService
      .open({
          title: `${movie} Reviews`,
          content: `{{cast}}`,
          actions: [
              { text: 'OK' },
              // { text: 'Confirm', primary: true }
          ],
          width: 500,
          height: 245,
          actionsLayout: 'stretched'
      })
      .result
      .pipe(
          take(1),
          filter((result) => !(result instanceof DialogCloseResult || result.text === 'Ok'))
      )
      .subscribe(() => {
          
          
      });
}
  // getMovies(){
  //   this.movies = this.movieDataService.getMovies();
  //   console.log(JSON.stringify(this.movies))
  // } 

//   constructor() { this.movises = [{"name":"pushpa", "tile":"skadjksdj", "rating":"4.5", "duration":"90"},{"name":"KGF", "tile":"skadjksdj", "rating":"4.65","duration":"98"}];
//  }
  
  ngOnInit() {
    
  }

}


