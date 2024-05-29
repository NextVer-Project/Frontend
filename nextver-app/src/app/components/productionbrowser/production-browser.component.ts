import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../api/movie.service';
import { AuthService } from '../../api/auth.service';
import { ProductionService } from '../../api/production.service';
import { MovieCountDto } from '../../api/dtos/movie-count.dto';
import { MovieDto } from '../../api/dtos/movie.dto';
import { PaginatedResult, Pagination } from '../../api/dtos/pagination';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { ProductionDto } from '../../api/dtos/production.dto';
import { ProductionCountDto } from '../../api/dtos/production-count.dto';


@Component({
  selector: 'app-production-browser',
  templateUrl: './production-browser.component.html',
  styleUrls: ['./production-browser.component.css']
})
export class ProductionBrowserComponent implements OnInit {
  public movieCount: any;
  public productionCount: any;
  public productions: Array<ProductionDto> | undefined;
  public movies: Array<MovieDto> | undefined;
  public pagination: Pagination | undefined;
  public isFetching = false;
  public isFirstPage = false;
  public isLastPage = false;
  public fetchFailed = false;
  public shouldDisplayIcons: boolean;
  public isTvShow: boolean;
  selectedCategory: string = 'movies';


  constructor(private movieService: MovieService, private productionService: ProductionService, private commonService: CommonService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNumberOfMovies();
    this.getMovies(this.commonService.lastPage);
    this.getNumberOfProductions();
    this.getProductions(this.commonService.lastPage);
    this.resizeScreen();
    this.authService.setSelectedCategory(this.selectedCategory);
  }

  private getNumberOfMovies(): void {
    this.movieService.GetNumberOfMovies()
      .subscribe((response: MovieCountDto) => {
        this.movieCount = response.numberOfMovies;
     });
  }

  public getMovies(pageNumber: number = 1, itemsPerPage: number = 20): void {
    this.isFetching = true;
    this.movieService.getCurrentMovies(pageNumber, itemsPerPage).subscribe((response: PaginatedResult<Array<MovieDto>>) => {
      this.isFetching = false;
      this.fetchFailed = false;

      this.movies = response.result;
      this.pagination = response.pagination;
      this.isFirstPage = this.pagination?.currentPage === 1;
      this.isLastPage = this.pagination?.totalPages === this.pagination?.currentPage;

      this.commonService.setLastPage(this.pagination?.currentPage);
    }, error => {
      this.isFetching = false;
      this.fetchFailed = true;

      console.log('There was an error while processing Your request.');
    });
  }

  private getNumberOfProductions(): void {
    this.productionService.getNumberOfProductions(this.selectedCategory)
      .subscribe((response: ProductionCountDto) => {
        this.productionCount = response.numberOfProductions;
      });
  }

  public getProductions(pageNumber: number = 1, itemsPerPage: number = 20): void {
    this.isFetching = true;
    this.productionService.getCurrentProductions(pageNumber, itemsPerPage, this.selectedCategory)
      .subscribe((response: PaginatedResult<Array<ProductionDto>>) => {
        this.isFetching = false;
        this.fetchFailed = false;

        this.productions = response.result;

        this.pagination = response.pagination;
        this.isFirstPage = this.pagination?.currentPage === 1;
        this.isLastPage = this.pagination?.totalPages === this.pagination?.currentPage;

        this.commonService.setLastPage(this.pagination?.currentPage);
      }, error => {
        this.isFetching = false;
        this.fetchFailed = true;

        console.log('There was an error while processing Your request.');
      });
  }

  public onCategoryChange() {
    this.getNumberOfProductions();
    this.authService.setSelectedCategory(this.selectedCategory); 
    this.getProductions(1);
    this.isTvShow = this.selectedCategory === 'series';
  }



  public changePage(switchToNext: boolean): void {
    // @ts-ignore
    let targetPage = this.pagination?.currentPage;
    // @ts-ignore
    switchToNext ? targetPage++ : targetPage--;
    // @ts-ignore
    if (targetPage > this.pagination?.totalPages || targetPage < 1) { return; }

    this.getProductions(targetPage);
  }

  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldDisplayIcons = screenWidth > 870;
  }
}
