import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductionDto } from '../api/dtos/production.dto';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public lastPage: number;
  public selectedProduction: ProductionDto | undefined;

  constructor() {
    this.lastPage = 1;
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

  

  getProductionId(): number | undefined {
    return this.selectedProductionIdSubject.value;
  }

  getCategory(): string | undefined {
    return this.selectedCategorySubject.value;
  }
}
