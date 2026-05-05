import { Routes } from '@angular/router';
import { HomePageComponent } from './views/pages/home-page/home-page.component';
import { BrowsePageComponent } from './views/pages/browse-page/browse-page.component';
import { FavoritesPageComponent } from './views/pages/favorites-page/favorites-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'browse', component: BrowsePageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
