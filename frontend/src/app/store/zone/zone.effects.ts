import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ZoneActions } from './zone.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ZoneService } from '../../services/zone.service';

@Injectable()
export class ZoneEffects {
    private actions$: Actions = inject(Actions);
    private zoneService: ZoneService = inject(ZoneService);
    loadZones$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZoneActions.loadZones),
            mergeMap(() =>
                this.zoneService.fetchZones().pipe(
                    map((zones) => ZoneActions.loadZonesSuccess({ zones })),
                    catchError((error) => of(ZoneActions.loadZonesFailure({ error })))
                )
            )
        )
    );
    createZone$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZoneActions.createZone),
            mergeMap((action) =>
                this.zoneService.createZone(action.zone).pipe(
                    map((zone) => ZoneActions.createZoneSuccess({ zone })),
                    catchError((error) => of(ZoneActions.createZoneFailure({ error })))
                )
            )
        )
    );
    deleteZone$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZoneActions.deleteZone),
            mergeMap((action) =>
                this.zoneService.deleteZone(action.id).pipe(
                    map(() => ZoneActions.deleteZoneSuccess({ id: action.id })),
                    catchError((error) => of(ZoneActions.deleteZoneFailure({ error })))
                )
            )
        )
    );
}
