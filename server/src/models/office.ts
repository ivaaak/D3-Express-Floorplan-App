import * as mongodb from "mongodb";

// Office Model
export interface Office {
    _id?: mongodb.ObjectId;
    name?: string;
    imageUrls?: string[];
    chosenFloorplan?: string;
    //desks?: Desk; //not needed as its data duplication, can be fetched from desks with the officeId
}

/*
{
  "_id":{
    "$oid":"660e7f1c229f221d65c47681"
  },
  "name":"Blubito AG",
  "imageUrls":[
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://static.dezeen.com/uploads/2019/05/synchroon-office-space-encounters-interiors-utrecht-netherlands_dezeen_floor-plan.jpg"
  ],
  "chosenFloorplan":"https://static.dezeen.com/uploads/2019/05/synchroon-office-space-encounters-interiors-utrecht-netherlands_dezeen_floor-plan.jpg"
}
*/