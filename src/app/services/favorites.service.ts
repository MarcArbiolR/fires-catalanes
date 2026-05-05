import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fair } from '../models/fair';
import { CATALAN_FAIRS } from '../models/fairs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'fires_catalanes_favorites';
  private favoritesChanged = new BehaviorSubject<Fair[]>([]);

  constructor() {
    this.loadInitialFavorites();
  }

  private loadInitialFavorites(): void {
    const favorites = this.getFavorites();
    this.favoritesChanged.next(favorites);
  }

  getFavoritesChanged(): Observable<Fair[]> {
    return this.favoritesChanged.asObservable();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined' && localStorage !== null;
    } catch {
      return false;
    }
  }

  addFavorite(fair: Fair): void {
    if (!this.isLocalStorageAvailable()) return;
    
    const favorites = this.getFavorites();
    if (!favorites.find(f => f.activityId === fair.activityId)) {
      favorites.push(fair);
      this.saveFavorites(favorites);
      this.favoritesChanged.next(favorites);
    }
  }

  removeFavorite(activityId: string): void {
    if (!this.isLocalStorageAvailable()) return;
    
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.activityId !== activityId);
    this.saveFavorites(filtered);
    this.favoritesChanged.next(filtered);
  }

  getFavorites(): Fair[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }
    
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    if (!stored) {
      return [];
    }
    try {
      const favoriteIds: string[] = JSON.parse(stored);
      return CATALAN_FAIRS.filter(fair => favoriteIds.includes(fair.activityId));
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  }

  isFavorite(activityId: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    
    const favorites = this.getFavorites();
    return favorites.some(f => f.activityId === activityId);
  }

  private saveFavorites(favorites: Fair[]): void {
    if (!this.isLocalStorageAvailable()) return;
    
    const favoriteIds = favorites.map(f => f.activityId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favoriteIds));
  }
}
