var                              fs           = require('fs-extra'),
                                 readLine     = require('readline'),
                                 json         = require('json'),

                                 // lineByLine   = require('line-by-line'),
                                 // async        = require('async'),
                                 // forEach      = require('async-foreach').forEach,
                                 // GeoJSON      = require('geojson'),
                                 // csv          = require('fast-csv'),
                                 // jsontool     = require('json'),
                                 // csvString    = require('csv-string'),
                                 // geocoder     = require('geocoder'),
                                 // path         = "../modules/core/client/map-data/import/tmp.csv",
                                 src1         = "../modules/core/client/map-data/tmp/a/wifi-public.json",
                                 // src2         = "../modules/core/client/map-data/tmp/a/wifi-customer.json",
                                 // src3         = "../modules/core/client/map-data/tmp/a/training-day.json",
                                 // src4         = "../modules/core/client/map-data/tmp/a/training-night.json",
                                 // src5         = "../modules/core/client/map-data/tmp/a/computer-access.json",
                                 // src6         = "../modules/core/client/map-data/tmp/a/computer-reseller.json",
                                 // src7         = "../modules/core/client/map-data/tmp/a/isp-list.json",
                                 downstream   = fs.createReadStream(src1),
                                 line1        = require('readline').createInterface({ input: downstream }),
                                 arr          = [],
                                 boolean      = "true";


function parseForStorage(obj) {
   console.log("parse this");
   console.log(obj);
}

function addToParsed(obj) {
   console.log("addToParsed");
   console.log(obj);
}

function reset(boolean) {
 
   if (boolean) {
      console.log("reset true to false");
      boolean = false;
   } else if (!boolean) {
      console.log("reset false to true");
      boolean = true;
   }
}

function storeForNext(line) {

}

function isLineName(line) {
   console.log("isLineName");
   console.log(line.hasOwnProperty('name'));
   if (line.name) {
      console.log("condition 1");
   } else {
      console.log("condition 2");
   }
}

line1.on('line', function(line) {
  // console.log("line1: ");
  // console.log(boolean);
  var jsonStr = JSON.stringify(line);
  // console.log(jsonStr);
  if (boolean) {
   // reset(boolean);
   parseForStorage(jsonStr);
   reset(boolean);
  } else if (!boolean) {
   // reset(boolean);
   addToParsed(jsonStr);
  }

  // reset(boolean);
});

// line1: 
// {"name":"Cleaver Family YMCA"}
// line1: 
// {"results":[{"address_components":[{"long_name":"7000","short_name":"7000","types":["street_number"]},{"long_name":"Troost Avenue","short_name":"Troost Ave","types":["route"]},{"long_name":"South Kansas City","short_name":"South Kansas City","types":["neighborhood","political"]},{"long_name":"Kansas City","short_name":"KCMO","types":["locality","political"]},{"long_name":"Kaw Township","short_name":"Kaw Township","types":["administrative_area_level_3","political"]},{"long_name":"Jackson County","short_name":"Jackson County","types":["administrative_area_level_2","political"]},{"long_name":"Missouri","short_name":"MO","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"64131","short_name":"64131","types":["postal_code"]}],"formatted_address":"7000 Troost Ave, Kansas City, MO 64131, USA","geometry":{"bounds":{"northeast":{"lat":39.0004986,"lng":-94.57662739999999},"southwest":{"lat":38.9999512,"lng":-94.57730190000001}},"location":{"lat":39.0002249,"lng":-94.5769646},"location_type":"ROOFTOP","viewport":{"northeast":{"lat":39.0015738802915,"lng":-94.57561566970851},"southwest":{"lat":38.9988759197085,"lng":-94.57831363029152}}},"place_id":"ChIJg_EuMULvwIcR88ouSVMFRlI","types":["premise"]}],"status":"OK"}
