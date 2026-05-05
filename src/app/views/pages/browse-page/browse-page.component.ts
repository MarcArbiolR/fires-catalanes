import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsListComponent } from '../../elements/regions-list/regions-list.component';
import { FairsListComponent } from '../../elements/fairs-list/fairs-list.component';

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [CommonModule, RegionsListComponent, FairsListComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css'
})
export class BrowsePageComponent {
  selectedRegion = signal<string | null>(null);

  onRegionSelected(region: string): void {
    this.selectedRegion.set(region);
  }
}
