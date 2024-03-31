export interface Point {
    x: number;
    y: number;
}

export interface HeatmapMapItem {
    x?: number;
    y?: number;
    value: number;
    points?: Point[];
}

export interface Heatmap {
    binSize: number;
    units: string;
    map: HeatmapMapItem[];
}

export interface Polygon {
    id: string;
    name: string;
    points: Point[];
}

export interface Overlays {
    polygons: Polygon[];
}

export interface Floorplan {
    heatmap: Heatmap;
    overlays: Overlays;
}
