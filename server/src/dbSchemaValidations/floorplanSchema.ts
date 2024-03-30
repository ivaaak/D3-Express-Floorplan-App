export const floorplanJsonSchema = {
  bsonType: "object",
  properties: {
    heatmap: {
      bsonType: "object",
      properties: {
        binSize: {
          bsonType: "int",
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
                bsonType: "double",
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
