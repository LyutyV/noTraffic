import { createReducer, on } from '@ngrx/store';
import { ZoneActions } from './zone.actions';
import { IPolygon } from '../../interfaces/poligon.interface';

export interface ZoneState {
    zones: IPolygon[];
    loading: boolean;
    error: any;
}

export const initialState: ZoneState = {
    zones: [],
    loading: false,
    error: null,
};

export const zoneReducer = createReducer(
    initialState,
    on(ZoneActions.loadZones, (state) => ({ ...state, loading: true })),
    on(ZoneActions.loadZonesSuccess, (state, { zones }) => ({
        ...state,
        zones,
        loading: false,
        error: null,
    })),
    on(ZoneActions.loadZonesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(ZoneActions.createZone, (state) => ({ ...state, loading: true })),
    on(ZoneActions.createZoneSuccess, (state, { zone }) => ({
        ...state,
        zones: [...state.zones, zone],
        loading: false,
        error: null,
    })),
    on(ZoneActions.createZoneFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(ZoneActions.deleteZone, (state) => ({ ...state, loading: true })),
    on(ZoneActions.deleteZoneSuccess, (state, { id }) => ({
        ...state,
        zones: state.zones.filter((zone) => zone.id !== id),
        loading: false,
        error: null,
    })),
    on(ZoneActions.deleteZoneFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
