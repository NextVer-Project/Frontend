import { Component, Input, OnInit } from '@angular/core';
import { MovieDto } from '../../../api/dtos/movie.dto';
import { DatePipe } from '@angular/common';
import { ProductionDto } from '../../../api/dtos/production.dto';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../api/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-production-row',
  templateUrl: './production-row.component.html',
  styleUrls: ['./production-row.component.css']
})
export class ProductionRowComponent implements OnInit {
  @Input() public production: ProductionDto | undefined;
  user: User | undefined;

  constructor(private datePipe: DatePipe, private router: Router, private commonService: CommonService, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.production && this.production.releaseDate) {
      const releaseDate = new Date(this.production.releaseDate);
      this.production.releaseDate = this.datePipe.transform(releaseDate, 'dd MMMM yyyy');
    }

    if (this.production && this.production.coverUrl) {
      this.production.formattedProductionCoverUrl = this.production.coverUrl + '?width=100&height=150';
      console.log('Formatted Production Cover URL:', this.production?.formattedProductionCoverUrl);
    }
  }

  selectProduction(): void {
    if (this.user !== undefined && this.production) {
      const category = this.authService.getSelectedCategory();
      this.commonService.selectedProduction = this.production;
      this.router.navigate(['/details', category, this.production.id]);
    } else {
      console.log('Please Sign In before checking production.');
    }
  }
}
