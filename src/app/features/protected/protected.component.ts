import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css',
})
export class ProtectedComponent implements OnInit {
  protectedData: string = '';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const data = await this.authService.fetchProtectedData();
      this.protectedData = JSON.stringify(data);
    } catch (error) {
      this.protectedData = 'Unauthorized';
    }
  }

  logout() {
    this.authService.logout();
  }
}
