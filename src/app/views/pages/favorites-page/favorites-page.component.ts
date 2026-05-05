import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FavoritesService } from '../../../services/favorites.service';
import { Fair } from '../../../models/fair';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  favorites = signal<Fair[]>([]);
  private destroy$ = new Subject<void>();

  constructor(private favoritesService: FavoritesService) {
    this.favoritesService.getFavoritesChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites.set(favorites);
      });
  }

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeFavorite(fair: Fair): void {
    this.favoritesService.removeFavorite(fair.activityId);
  }

  private loadFavorites(): void {
    this.favorites.set(this.favoritesService.getFavorites());
  }
}
