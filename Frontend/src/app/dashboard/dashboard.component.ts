import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Client, ClientService } from '../client.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'riskCategory', 'actions'];
  /** Full list from the API; use `filteredClients` for the table. */
  allClients: Client[] = [];
  nameSearch = '';
  /** Empty string = all risk categories. */
  riskFilter = '';

  readonly riskCategoryOptions = [
    { value: '', label: 'All risk levels' },
    { value: 'Aggressive', label: 'Aggressive' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Conservative', label: 'Conservative' }
  ];

  constructor(private clientService: ClientService) {}

  get filteredClients(): Client[] {
    let list = this.allClients;
    const q = this.nameSearch.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => (c.name || '').toLowerCase().includes(q));
    }
    if (this.riskFilter) {
      list = list.filter((c) => c.riskCategory === this.riskFilter);
    }
    return list;
  }

  get emptyTableMessage(): string {
    if (this.allClients.length === 0) {
      return 'No clients yet. Add a client to get started.';
    }
    return 'No clients match your search or filter.';
  }

  get totalClientCount(): number {
    return this.allClients.length;
  }

  get visibleClientCount(): number {
    return this.filteredClients.length;
  }

  readonly riskCategoryKeys: Array<'Aggressive' | 'Moderate' | 'Conservative' > = [
    'Aggressive',
    'Moderate',
    'Conservative'
    
  ];

  get riskCategoryCounts(): Record<'Aggressive' | 'Moderate' | 'Conservative' , number> {
    const counts: Record<'Aggressive' | 'Moderate' | 'Conservative' , number> = {
      Aggressive: 0,
      Moderate: 0,
      Conservative: 0
     
    };
    for (const client of this.allClients) {
      if (!client.riskCategory) {
        continue; // Skip clients without a risk category
      } else if ((client.riskCategory as 'Aggressive' | 'Moderate' | 'Conservative') in counts) {
        const key = client.riskCategory as 'Aggressive' | 'Moderate' | 'Conservative';
        counts[key] += 1;
      } else {
        continue; // Skip clients with an unrecognized risk category
      }
    }
    return counts;
  }

  get riskGraphData(): Record<'Aggressive' | 'Moderate' | 'Conservative' , number> {
    const total = this.allClients.length || 1;
    return {
      Aggressive: Math.round((this.riskCategoryCounts.Aggressive / total) * 100),
      Moderate: Math.round((this.riskCategoryCounts.Moderate / total) * 100),
      Conservative: Math.round((this.riskCategoryCounts.Conservative / total) * 100)
    };
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => (this.allClients = data),
      error: (err) => console.error(err)
    });
  }

  deleteClient(id: number) {
    if(confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadClients();
      });
    }
  }
}
