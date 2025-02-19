import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ZoneState } from './zone.reducer';

export const selectZoneState = createFeatureSelector<ZoneState>('zones');
export const selectAllZones = createSelector(selectZoneState, (state) => state.zones);
export const selectZonesLoading = createSelector(selectZoneState, (state) => state.loading);
export const selectZonesError = createSelector(selectZoneState, (state) => state.error);
