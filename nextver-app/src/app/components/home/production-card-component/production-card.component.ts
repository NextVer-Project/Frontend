import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../api/auth.service';
import { ProductionDto } from '../../../api/dtos/production.dto';
import { User } from '../../../interfaces/user';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-production-card',
  templateUrl: './production-card.component.html',
  styleUrls: ['./production-card.component.css']
})
export class ProductionCardComponent {
  @Input() public production: ProductionDto | undefined;
  user: User | undefined;
  public releaseYear: string;
  public selectedCategory: string;

  constructor(private datePipe: DatePipe, private router: Router, private commonService: CommonService, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.production && this.production.releaseDate) {
      const releaseDate = new Date(this.production.releaseDate);
      this.production.releaseDate = releaseDate;
      this.releaseYear = this.datePipe.transform(releaseDate, 'yyyy');

      const runtimeMinutes = parseInt(this.production.runtime, 10);
      const hours = Math.floor(runtimeMinutes / 60);
      const minutes = runtimeMinutes % 60;
      this.production.runtime = hours + "h " + minutes + " min";
    }

    if (this.production && this.production.coverUrl) {
      this.production.formattedProductionCoverUrl = this.production.coverUrl;
      console.log('Formatted Production Cover URL:', this.production?.formattedProductionCoverUrl);
    }

    this.selectedCategory = this.commonService.getSelectedCategory();
  }

  selectProduction(category: string): void {
    if (this.user !== undefined && this.production) {
      this.commonService.selectedProduction = this.production;
      this.router.navigate(['/details/', category, this.production.id]);
    }
    else
    {
      console.log('Please Sign In before checking production.');
    }
  }
}
