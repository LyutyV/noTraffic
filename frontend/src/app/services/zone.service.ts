import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPolygon } from '../interfaces/poligon.interface';

@Injectable({
    providedIn: 'root',
})
export class ZoneService {
    private baseUrl = 'http://127.0.0.1:8000/api/zones/';

    constructor(private http: HttpClient) {}

    fetchZones(): Observable<IPolygon[]> {
        return this.http.get<IPolygon[]>(this.baseUrl);
    }

    createZone(zone: IPolygon): Observable<IPolygon> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<IPolygon>(this.baseUrl, zone, { headers });
    }

    deleteZone(id: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete(this.baseUrl, {
            headers,
            body: { id },
        });
    }
}
