import { Routes } from '@angular/router';
import { Skeleton } from './pages/layout/skeleton/skeleton';
import { HomeComponent } from './pages/home/home.component';
import { ItemListComponent } from './pages/ItemList/ItemList.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
    },
    {
        path: 'login',
        loadComponent: () => LoginComponent
    },
    {
        path: 'register',
        loadComponent: () => RegisterComponent
    }
];
