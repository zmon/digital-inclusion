     var  fs  = require('fs'),
          lbl = require('line-by-line'),
           rl = require('readline'),
        async = require('async'),
      GeoJSON = require('geojson'),
    Converter = require("csvtojson").Converter,
    converter = new Converter({
                                constructResult:true,
                                workerNum:4,
                                quote: true,
                                toArrayString: false
                              }),
         pipe = fs.createReadStream("data-hotspots-daytime.csv").pipe(converter);
  //   pipe.on("end_parsed", function (jsonArray) {
  //   console.log("kill me");
  //    console.log(jsonArray); //here is your result jsonarray
  // });
     var pipe2 = fs.createReadStream("data-hotspots-daytime.csv");
     var lr2 = rl.createInterface({
                                    input: pipe2
                                  });


     // var apikey = ;
// var GOOGLE_PLACES_OUTPUT_FORMAT = "json";
var GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces("AIzaSyBP-nR1enubXspfTSfSit1tYwT4ZSwRi-s", "json");
     // var aa =
     console.log("****veriyf");
    console.log(lr2);

var fixArstr = function(jsons) {
  // console.log("fix : " + json);
  for (i=0;i<jsons.length;i++){
    console.log("fixing: " + jsons[i].name)
  }
};

var geocoder = require('geocoder');

// Geocoding
var accplaces = [];
var getCor = function(jsonarray) {
  var bu = "https://maps.googleapis.com/maps/api/place/details/output?parameters";
  // var full = bu + apikey;
  for (i=0;i<jsonarray.length;i++) {
    console.log("iou");
    console.log(jsonarray[i]);
    var addstr = jsonarray[i].street + ", " + jsonarray[i].city + ", " + jsonarray[i].state + ", " + jsonarray[i].zip;
    console.log(addstr);
    geocoder.geocode(addstr, function ( err, data ) {
      console.log("whoree");
      console.log(data);
      accplaces.push(data);
    });
  }
  var results = accplaces;
  console.log("fhcus");
  console.log(results[0]);
  return results;
}

converter.on("end_parsed", function (jsonArray) {
  console.log("not even close to ready");
  console.log(jsonArray);
  getCor(jsonArray);
   var json = fixArstr(jsonArray);
   fs.writeFileSync('accumuLate.json', jsonArray, "");
});
console.log("black death");

// require("fs").createReadStream("./x-file.csv").pipe(converter);

var ready;
// var besticle = [["Mid-Continent Public Library - Blue Springs North Branch", "library", "850 Northwest Hunter Drive", 39.0502423, -94.2732334],
// ["Mid-Continent Public Library - Blue Springs South Branch","library", "2220 S. 7 Hwy.,Blue Springs,MO,64014", 38.9970765, -94.2724222]];

var olive;
// lint=>named function takes array for processing lines into arrays storing latlng coords for addresses
var str2arr = function(str) {
  olive=[];
  olive.push(str);
  return olive;
}
var addLL2arr = function(array) {

}
var lint = function (array) {
  var lv = [];
  // console.log(line.toString().split('\n'));
  for (i=0;i<array.length;i++) {
    var ln = array[i];
    lv.push(ln.toString().split(','));
    // console.log(lines[i]);
  }
  return lv;
};

var prpLn = function(string) {
  // ln.split(/,/)
  var far = string.replace(/'/g, "");
  console.log("?");
  // var f =  ln.replace(/'/g, '"');
  console.log(far);
  return far;
  // ln.replace(/["']/g, "");
}

var upstream = [];
var downstream = [];
var numb = process.argv[2];
var lineReader = require('readline').createInterface({
                                                        input: require('fs').createReadStream(numb)
                                                     });

var callback = function(arr) {
  console.log('callback');
  console.log(arr);
  for (i=0;i<arr.length;i++){
    arr[i].replace(/'/g);
  }
  return arr;
}
lineReader.on('line', function(line) {
  // upstream.push(line);
  var a=[];
  var csvString=line;
  console.log('prpLn');
  console.log(line);
  var eqa = prpLn(line);
  console.log("eqa");
  console.log(eqa);
  var jsonArray = a.push(line);
  // converter.on("end_parsed", function (jsonArray) {
  //   console.log("kill me");
  //    console.log(jsonArray); //here is your result jsonarray
  // });

//read from file
// require("fs").createReadStream("./x-file.csv").pipe(converter);



  // var ckq = prpLn(line);
  // var cqk = lint(line);
  // console.log(cqk);
  // converter.fromString(csvString, function(err,result) {
  //   console.log("check results from converter");
  //   console.log(result);
  // });
  // console.log('Line from file:', line);
  var rql = callback(a);
  return rql;
});



// var numb=fs.readFileSync(process.argv[2]).toString().split('\n');
//get pre-geocoded csv from file

var getCoords = function(name, address) {
  console.log("name: " + name + "=> address: " + address);
}

var loadGdt = function(upstream) {
  for (i=0;i<upstream.length;i++) {
    downstream.push(getCoords(upstream[0],upstream[2]))
  }
  return downstream;
}

var logdat = loadGdt(numb);
console.log("##check geocoded##");
console.log(logdat);

// arg -- accepts array of arrays storing csv: name,category,street,lat,lng
var prepData = function(array) {
  ready = [];
  for (i=0;i<array.length;i++) {
    var ld = array[i];
    var ts =     {
                    name: ld[0],
                    category: ld[1],
                    street: ld[2],
                    lat: ld[3],
                    lng: ld[4]
                  };
    ready.push(ts);
  }
  return ready;
};



// [
//   { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
//   { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
//   { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
// ];

// var path = process.argv.forEach(val, index, array, {

// });
// var ph = process.argv[2];
// process.argv.forEach((val, index, array) => {
//   if (index === 2) {
//     path = array[index];
//     console.log("path");
//     console.log(path);
//   }
// });
// fs.readFile(ph, function callback(err, data) {

  // foo++;
  // console.log("data=> "+data);
// });

// numb=fs.readFileSync(process.argv[2]).toString().split('\n');
// lines=(numb.length);

// console.log(numb.length);
// var lv;
// var lint = function (array) {
//   var lv = [];
//   // console.log(line.toString().split('\n'));
//   for (i=0;i<array.length;i++) {
//     var ln = array[i];
//     lv.push(ln.toString().split('\n'));
//     // console.log(lines[i]);
//   }
//   return lv;
// }

// var psod = lint(numb);
// console.log("lint*");
// console.log(psod);

// var geojsonReady = prepData(sd);
// var gr = prepData(norest);
// console.log(gr);

// var gt = GeoJSON.parse(gr, { Point: ["lat", "lng"] });
// var gb = GeoJSON.parse(gr, {Point: ['lat', 'lng']}, function(json){
//   console.log(JSON.stringify(json));
//   fs.appendFile("modules/core/client/map-data/master-geodata.json", JSON.stringify(json));
// });


// console.log(gt);
// fs.writeFile("modules/core/client/map-data/data.json", gt);


// for (line in lines)




// lines.forEach((val,index,array)=>{

//     console.log("1");

// })

// for (i=0; i < chunk.length; ++i)

// console.log(lines);