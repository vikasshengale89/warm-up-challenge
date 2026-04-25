import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/learning/learning.component').then(m => m.LearningComponent) }
];
