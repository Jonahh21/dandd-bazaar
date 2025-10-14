import { Routes } from '@angular/router';
import { Skeleton } from './pages/layout/skeleton/skeleton';
import { HomeComponent } from './pages/home/home.component';
import { ItemListComponent } from './pages/ItemList/ItemList.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => Skeleton,
        children: [
            {
                path: '',
                loadComponent: () => HomeComponent
            },
            {
                path: ':gameid/buy',
                loadComponent: () => ItemListComponent
            }
        ]
    }
];
