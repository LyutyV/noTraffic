import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IPolygon } from '../../interfaces/poligon.interface';
import { IDot } from '../../interfaces/dot.interface';

@Component({
    selector: 'app-zone-canvas',
    templateUrl: './app-zone-canvas.component.html',
    styleUrls: ['./app-zone-canvas.component.scss'],
})
export class ZoneCanvasComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() zones: IPolygon[] = [];
    @Output() createZone = new EventEmitter<{ points: (IDot | null)[] }>();
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private backgroundImage = new Image();
    private tempPoints: IDot[] = [];

    ngOnInit(): void {
        this.backgroundImage.src = 'https://picsum.photos/1920/1080';
    }

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement;
        const context = canvas.getContext('2d');
        if (context) {
            this.ctx = context;
            this.backgroundImage.onload = () => {
                this.draw();
            };
            canvas.addEventListener('click', this.onCanvasClick.bind(this));
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zones'] && !changes['zones'].firstChange) {
            this.draw();
        }
    }

    onCanvasClick(event: MouseEvent): void {
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const point: IDot = { x, y };
        this.tempPoints.push(point);

        if (this.tempPoints.length === 4) {
            this.draw();
            this.createZone.emit({ points: this.tempPoints });
            this.tempPoints = [];
        } else {
            this.draw();
        }
    }

    private draw(): void {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
        if (this.zones) {
            this.zones.forEach((zone) => {
                this.drawZone(zone.points);
            });
        }
        if (this.tempPoints.length > 0) {
            this.drawTempZone();
        }
    }

    private drawZone(points: (IDot | null)[]): void {
        const validPoints = points.filter((p) => p !== null) as IDot[];
        if (validPoints.length === 0) {
            return;
        }
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(validPoints[0].x, validPoints[0].y);
        for (let i = 1; i < validPoints.length; i++) {
            this.ctx.lineTo(validPoints[i].x, validPoints[i].y);
        }
        if (validPoints.length === 4) {
            this.ctx.lineTo(validPoints[0].x, validPoints[0].y);
        }
        this.ctx.stroke();
    }

    private drawTempZone(): void {
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.tempPoints[0].x, this.tempPoints[0].y);
        for (let i = 1; i < this.tempPoints.length; i++) {
            this.ctx.lineTo(this.tempPoints[i].x, this.tempPoints[i].y);
        }
        if (this.tempPoints.length === 4) {
            this.ctx.lineTo(this.tempPoints[0].x, this.tempPoints[0].y);
        }
        this.ctx.stroke();
        this.tempPoints.forEach((point) => {
            this.ctx.fillStyle = 'blue';
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}
