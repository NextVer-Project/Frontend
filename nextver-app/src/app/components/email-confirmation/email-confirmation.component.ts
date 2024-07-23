import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  message: string = '';

  constructor(
    private route: ActivatedRoute, private uiPresentationConfigService: UIPresentationConfigService
  ) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'] || 'Invalid request parameters.';
    });
  }
}
