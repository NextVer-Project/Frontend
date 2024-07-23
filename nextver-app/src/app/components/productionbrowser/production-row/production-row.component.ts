import { Component, Input, OnInit } from '@angular/core';
import { MovieDto } from '../../../api/dtos/movie.dto';
import { DatePipe } from '@angular/common';
import { ProductionDto } from '../../../api/dtos/production.dto';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../api/auth.service';
import { User } from '../../../interfaces/user';
import { UIPresentationConfigService } from '../../../services/ui-presentation-config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-production-row',
  templateUrl: './production-row.component.html',
  styleUrls: ['./production-row.component.css']
})
export class ProductionRowComponent implements OnInit {
  @Input() public production: ProductionDto | undefined;
  user: User | undefined;
  public releaseYear: string;

  constructor(private datePipe: DatePipe, private router: Router, private commonService: CommonService,
    private authService: AuthService, private uiPresentationConfigService: UIPresentationConfigService,
    private toastr: ToastrService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
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
  }



  selectProduction(): void {
    if (this.user !== undefined && this.production) {
      const category = this.commonService.getSelectedCategory();
      this.commonService.selectedProduction = this.production;
      this.router.navigate(['/details', category, this.production.id]);
    } else {
      this.toastr.error('Please Sign In before checking production.', 'Error');
    }
  }
}
