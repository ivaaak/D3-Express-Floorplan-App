// floorplan.ts types

export interface Point {
    x: number;
    y: number;
    value?: number;
    points?: Point[];
   }
   
   export interface Heatmap {
    binSize: number;
    units: string;
    map: Point[];
   }
   
   export interface Polygon {
    id: string;
    name: string;
    points: Point[];
   }
   
   export interface Overlays {
    polygons: Polygon[];
   }
   
   export interface JsonData {
    heatmap: Heatmap;
    overlays: Overlays;
   }
   