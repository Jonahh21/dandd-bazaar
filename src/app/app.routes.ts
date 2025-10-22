import { Routes } from '@angular/router';
import { Skeleton } from './pages/layout/skeleton/skeleton';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GamesComponent } from './pages/games/games.component';
import { GameComponent } from './pages/game/game';
import { GameInventory } from './pages/game-inventory/game-inventory';
import { GameStore } from './pages/game-store/game-store';

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
                path: 'games',
                loadComponent: () => GamesComponent
            },
            {
                path: 'games/:gameId',
                loadComponent: () => GameComponent,
                children: [
                    {
                        path: 'inventory',
                        loadComponent: () => GameInventory
                    },
                    {
                        path: 'store',
                        loadComponent: () => GameStore
                    }
                ]
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
