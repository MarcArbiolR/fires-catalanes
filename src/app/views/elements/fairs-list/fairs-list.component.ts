import { Component, OnInit, OnDestroy, Input, signal, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FairsService } from '../../../services/fairs.service';
import { FavoritesService } from '../../../services/favorites.service';
import { Fair } from '../../../models/fair';

@Component({
  selector: 'app-fairs-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fairs-list.component.html',
  styleUrl: './fairs-list.component.css'
})
export class FairsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedRegion: string | null = null;
  
  fairs = signal<Fair[]>([]);
  favoriteIds = signal<Set<string>>(new Set());
  private destroy$ = new Subject<void>();

  constructor(
    private fairsService: FairsService,
    private favoritesService: FavoritesService
  ) {
    this.favoritesService.getFavoritesChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        const ids = new Set(favorites.map(f => f.activityId));
        this.favoriteIds.set(ids);
      });
  }

  ngOnInit(): void {
    this.loadFavoriteIds();
    if (this.selectedRegion) {
      this.loadFairs(this.selectedRegion);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRegion']) {
      if (this.selectedRegion) {
        this.loadFairs(this.selectedRegion);
      } else {
        this.fairs.set([]);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFairs(region: string): void {
    const fairsByRegion = this.fairsService.getFairsByRegion(region);
    this.fairs.set(fairsByRegion);
  }

  private loadFavoriteIds(): void {
    const favorites = this.favoritesService.getFavorites();
    const ids = new Set(favorites.map(f => f.activityId));
    this.favoriteIds.set(ids);
  }

  isFavorite(fair: Fair): boolean {
    return this.favoriteIds().has(fair.activityId);
  }

  toggleFavorite(fair: Fair): void {
    if (this.isFavorite(fair)) {
      this.favoritesService.removeFavorite(fair.activityId);
    } else {
      this.favoritesService.addFavorite(fair);
    }
  }
}
