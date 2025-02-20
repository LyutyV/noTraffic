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
    @Output() selectZone = new EventEmitter<string>();

    onDeleteZone(zoneId: string): void {
        if (confirm('Are you sure you want to delete zone?')) this.deleteZone.emit(zoneId);
    }

    onSelectZone(zoneId: string): void {
        this.selectZone.emit(zoneId);
    }
}
