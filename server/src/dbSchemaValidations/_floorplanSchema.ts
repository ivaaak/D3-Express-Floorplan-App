export const floorplanJsonSchema = {
  bsonType: "object",
  properties: {
     heatmap: {
       bsonType: "object",
       properties: {
         binSize: {
           bsonType: "double", // Adjusted to double to allow decimal values
         },
         units: {
           bsonType: "string",
         },
         map: {
           bsonType: "array",
           items: {
             bsonType: "object",
             properties: {
               x: {
                 bsonType: "double",
               },
               y: {
                 bsonType: "double",
               },
               value: {
                 bsonType: "double", // Adjusted to double to allow decimal values
               },
               points: {
                 bsonType: "array",
                 items: {
                  bsonType: "object",
                  properties: {
                     x: {
                       bsonType: "double",
                     },
                     y: {
                       bsonType: "double",
                     },
                  },
                 },
               },
             },
           },
         },
       },
     },
     overlays: {
       bsonType: "object",
       properties: {
         polygons: {
           bsonType: "array",
           items: {
             bsonType: "object",
             properties: {
               id: {
                 bsonType: "string",
               },
               name: {
                 bsonType: "string",
               },
               points: {
                 bsonType: "array",
                 items: {
                  bsonType: "object",
                  properties: {
                     x: {
                       bsonType: "double",
                     },
                     y: {
                       bsonType: "double",
                     },
                  },
                 },
               },
             },
           },
         },
       },
     },
  },
 };
 