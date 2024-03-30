// floorplan.ts

export interface Point {
    x?: number;
    y? : number;
}

export interface MapPoint extends Point {
    value?: number;
    points?: Point[];
}

export interface Heatmap {
    binSize?: number;
    units?: string;
    map?: MapPoint[];
}

export interface Polygon {
    id?: string;
    name?: string;
    points?: Point[];
}

export interface Overlays {
    polygons?: Polygon[];
}

export interface Floorplan {
    heatmap?: Heatmap;
    overlays?: Overlays;
}
