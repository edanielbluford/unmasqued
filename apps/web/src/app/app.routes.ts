import { Routes } from '@angular/router';
import { CharacterDirectoryPage } from './features/characters/pages/character-directory.page';
import { CharacterDetailPage } from './features/characters/pages/character-detail.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'games/sable-harbor/characters',
  },
  {
    path: 'games/:gameId/characters',
    component: CharacterDirectoryPage,
    title: 'Your characters | Unmasqued',
  },
  {
    path: 'games/:gameId/characters/:characterId',
    component: CharacterDetailPage,
    title: 'Character sheet | Unmasqued',
  },
  {
    path: '**',
    redirectTo: 'games/sable-harbor/characters',
  },
];
