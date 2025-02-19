import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCanvasComponent } from './app-zone-canvas.component';

describe('AppZoneCanvasComponent', () => {
    let component: ZoneCanvasComponent;
    let fixture: ComponentFixture<ZoneCanvasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ZoneCanvasComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ZoneCanvasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
