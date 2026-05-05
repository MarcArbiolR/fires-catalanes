import { Component, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FairsService } from '../../../services/fairs.service';

@Component({
  selector: 'app-regions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regions-list.component.html',
  styleUrl: './regions-list.component.css'
})
export class RegionsListComponent implements OnInit {
  @Output() regionSelected = new EventEmitter<string>();
  
  regions = signal<string[]>([]);
  selectedRegion = signal<string | null>(null);

  constructor(private fairsService: FairsService) {}

  ngOnInit(): void {
    this.regions.set(this.fairsService.getUniqueRegions());
  }

  selectRegion(region: string): void {
    this.selectedRegion.set(region);
    this.regionSelected.emit(region);
  }
}
