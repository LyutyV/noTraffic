import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { logger } from './store/meta-reducer';
import { zoneReducer } from './store/zone/zone.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ZoneEffects } from './store/zone/zone.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideStore({}, { metaReducers: [logger] }),
        provideState({ name: 'zones', reducer: zoneReducer }),
        provideEffects(ZoneEffects),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideStoreDevtools({
            maxAge: 25,
        }),
    ],
};
