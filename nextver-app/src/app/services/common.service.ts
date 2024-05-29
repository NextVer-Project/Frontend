import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductionDto } from '../api/dtos/production.dto';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public lastPage: number;
  public selectedProduction: ProductionDto | undefined;
  private selectedCategory: string;

  constructor() {
    this.lastPage = 1;
    this.selectedCategory = 'movie';
  }

  public setLastPage(page: number | undefined): void {
    this.lastPage = page === undefined ? 1 : page;
  }

  private selectedProductionIdSubject = new BehaviorSubject<number | undefined>(undefined);
  private selectedCategorySubject = new BehaviorSubject<string | undefined>(undefined);

  selectedProductionId$ = this.selectedProductionIdSubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setProductionIdAndCategory(id: number, category: string): void {
    this.selectedProductionIdSubject.next(id);
    this.selectedCategorySubject.next(category);
  }

  public setSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }

  public getSelectedCategory(): string {
    return this.selectedCategory;
  }
}
