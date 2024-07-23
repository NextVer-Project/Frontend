import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../../../api/movie.service';

import { UIPresentationConfigService } from '../../../services/ui-presentation-config.service';

@Component({
  selector: 'app-production-search',
  templateUrl: './production-search.component.html',
  styleUrls: ['./production-search.component.css']
})
export class ProductionSearchComponent {
  public searchQuery: string = '';
  public expanded: boolean = false;
  public id: number | undefined;

  @Input() parentComponent: string;
  @Input() placeholder: string = 'Search';
  @Input() searchResults: any[] = [];
  @Input() isHeader: boolean = false;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';

  constructor(private movieService: MovieService, private uiPresentationConfigService: UIPresentationConfigService) { }

  isTitleComponent(): boolean {
    return this.parentComponent === 'movie-edit' ||
      this.parentComponent === 'tvshow-edit';
  }

  expandSearch(): void {
    this.expanded = true;
  }

  shrinkSearch(): void {
    setTimeout(() => {
      this.expanded = false;
      this.searchText = '';
      this.searchResults = [];
    }, 200);
  }

  onSearch() {
    if (this.searchText.trim() === '') {
      this.searchResults = []; 
    } else {
      this.search.emit(this.searchText);
    }
  }

  onSelectItem(item: any) {
    this.selectItem.emit(item);
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }
}
