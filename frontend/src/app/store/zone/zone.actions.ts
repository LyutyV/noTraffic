import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IPolygon } from '../../interfaces/poligon.interface';

export const ZoneActions = createActionGroup({
    source: 'Zone',
    events: {
        loadZones: emptyProps(),
        loadZonesSuccess: props<{ zones: IPolygon[] }>(),
        loadZonesFailure: props<{ error: any }>(),
        createZone: props<{ zone: IPolygon }>(),
        createZoneSuccess: props<{ zone: IPolygon }>(),
        createZoneFailure: props<{ error: any }>(),
        deleteZone: props<{ id: string }>(),
        deleteZoneSuccess: props<{ id: string }>(),
        deleteZoneFailure: props<{ error: any }>(),
        selectZone: props<{ id: string }>(),
    },
});
