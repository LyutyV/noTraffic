import { IDot } from './dot.interface';

export interface IPolygon {
    id: string;
    name: string;
    points: [IDot | null, IDot | null, IDot | null, IDot | null];
    isSelected?: boolean;
}
