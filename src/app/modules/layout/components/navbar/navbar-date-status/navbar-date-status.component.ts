import { Component, OnInit } from '@angular/core';
import { JalaliDateService } from './jalal-date.service';

@Component({
  selector: 'app-navbar-date-status',
  standalone: true,
  imports: [],
  templateUrl: './navbar-date-status.component.html',
})
export class NavbarDateStatusComponent implements OnInit {
  date: string = '';
  currentTime: string = '';

  constructor(private jalaliDateService: JalaliDateService) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every second
  }

  updateDateTime(): void {
    this.date = this.jalaliDateService.getJalaliDate();
    this.currentTime = this.jalaliDateService.getTime();
  }
}
