import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPolygon } from '../../interfaces/poligon.interface';
import { Observable } from 'rxjs';
import { ZoneActions } from '../../store/zone/zone.actions';
import * as ZoneSelectors from '../../store/zone/zone.selectors';
import { IDot } from '../../interfaces/dot.interface';
import { AppZoneListComponent } from '../app-zone-list/app-zone-list.component';
import { ZoneCanvasComponent } from '../app-zone-canvas/app-zone-canvas.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'zone-manager',
    templateUrl: './zone-manager.component.html',
    styleUrls: ['./zone-manager.component.scss'],
    imports: [CommonModule, AppZoneListComponent, ZoneCanvasComponent],
    providers: [AsyncPipe],
})
export class ZoneManagerComponent {
    zones$: Observable<IPolygon[]>;
    loading$: Observable<boolean>;

    constructor(private store: Store) {
        this.zones$ = this.store.select(ZoneSelectors.selectAllZones);
        this.store.dispatch(ZoneActions.loadZones());
        this.loading$ = this.store.select(ZoneSelectors.selectZonesLoading);
    }

    onCreateZone(zoneData: { points: (IDot | null)[] }): void {
        setTimeout(() => {
            const validPoints = zoneData.points.every((point) => point !== null);
            if (!validPoints) {
                alert('All 4 dots required to create zone');
                return;
            }
            const zoneName = prompt('Enter zone name');
            if (!zoneName || zoneName.trim() === '') {
                alert('Zone name is required');
                return;
            }
            const newZone: IPolygon = {
                id: this.generateId(),
                name: zoneName.trim(),
                points: zoneData.points as [IDot, IDot, IDot, IDot],
            };
            this.store.dispatch(ZoneActions.createZone({ zone: newZone }));
        }, 0);
    }

    onDeleteZone(zoneId: string): void {
        this.store.dispatch(ZoneActions.deleteZone({ id: zoneId }));
    }

    onZoneSelect(zoneId: string): void {
        this.store.dispatch(ZoneActions.selectZone({ id: zoneId }));
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
