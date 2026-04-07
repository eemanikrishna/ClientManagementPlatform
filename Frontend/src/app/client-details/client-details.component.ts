import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClientService, Client } from '../client.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client?: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.clientService.getClientById(+params['id']).subscribe((c) => (this.client = c));
      }
    });
  }

  initials(name: string): string {
    if (!name?.trim()) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  downloadDoc(client: Client) {
    if (!client.id || !client.documentName) return;
    this.clientService.downloadDocument(client.id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = client.documentName || 'document';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
