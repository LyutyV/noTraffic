import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPolygon } from '../../interfaces/poligon.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-zone-list',
    imports: [CommonModule],
    templateUrl: './app-zone-list.component.html',
    styleUrl: './app-zone-list.component.scss',
})
export class AppZoneListComponent {
    @Input() zones: IPolygon[] = [];
    @Input() loading: boolean = false;
    @Output() deleteZone = new EventEmitter<string>();

    onDeleteZone(zoneId: string): void {
        this.deleteZone.emit(zoneId);
    }
}
