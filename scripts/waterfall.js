var             s = require('fs'),
               fs = require('graceful-fs'),
               rl = require('readline'),
               ll = require('line-by-line'),
             path = process.argv[2],
             dest = process.argv[3],
            async = require('async'),
          GeoJSON = require('geojson'),
              csv = require('fast-csv'),
         jsontool = require('jsontool'),
        csvString = require('csv-string'),
         geocoder = require('geocoder'),
         upstream = require('fs').createReadStream(path),
        stringify = require('stringify-stream'),
     GooglePlaces = require('googleplaces'),
     googlePlaces = new GooglePlaces("AIzaSyBP-nR1enubXspfTSfSit1tYwT4ZSwRi-s", "json"),
       lineReader = require('readline').createInterface({
                                                          input: upstream
                                                        }),
        Converter = require("csvtojson").Converter,
        converter = new Converter({
                                    constructResult:true,
                                    workerNum:4,
                                    quote: false,
                                    toArrayString: false
                                  }),
             pipe = s.createReadStream(path).pipe(converter),
        locations = [],
             tmp1 = [],
             tmp2 = [],
       downstream = [],
       tracker    = 0,
       count      = 0,
       q,
       oj,
       foo,
       ready;

console.log("$ i $ n $ i $ t $ s $");
console.log(path);
console.log(dest);

// var log = require('simple-node-logger').createSimpleLogger();
// create a rolling file logger based on date/time
// var opts = {
//     logDirectory:'/mylogfiles',
//     fileNamePattern:'roll-<DATE>.log',
//     dateFormat:'YYYY.MM.DD'
// };

// lineReader.on('line', function(line) {
  // console.log('**function-scope: lineReader on event-triggered callback: printing line to console');
  // console.log(line);
  // a.push(line);
  // callback(a);

// });
var increment = function(count) {
  return (count + 1);
};

converter.on("end_parsed", function (arr) {
  console.log("ready?");

  // var coords = setCoordinates(jsonarray);
  // console.log("c: " + coords);
   // var json = fixArrStr(jsonArr);
  // var exportfile = (dest);
  // console.log(exportfile);
  // console.log(jsonarray);
  // s.writeFileSync(dest, coords, 'utf8', callback);
  for (i=0;i<arr.length;i++){
    foo = JSON.stringify(arr[i]);
    encode(foo);
    // s.appendFile(dest,(tt+'\n'));
  };
});

var encode = function(object) {
  console.log("%ż%");
  // console.log(object);
  geocode(object);
  // console.log("encode: " + arr);
  // for (i=0;i<arr.length;i++) {
  //   console.log("encode " + arr[i])
  // }
}



var parse = function(text) {
  // return text.match( /[^\.!\?]+[\.!\?]+/g );
  return text.match( /,/g );
}

var geocode = function(json) {
  // q = json.toString().split(',');
  // addr = { address:  };
  for (i=0;i<json.)
  console.log('geocode ' + json);
  // console.log(json);
  // geocoder.geocode(oj.address, function (err, res) {
                                                      // console.log("**geocoded array");
                                                      // console.log(res.results[0]);
                                                      // console.log(reformat(res));
                                                      // tmp1.push(res);
                                                      // encode(tmp1);
                                                    // });
  // var o = res.forEach(
  //                      console.log(this)
  //                     );
  // var fin = {
  //           address_components: o.address_components,
  //           formatted_address: res.formatted_address,
  //           geometry: {
  //                       location: res.location
  //                     },
  //           place_id: res.place_id
  //        };
  // console.log('geocode ' + json);
  // console.log(o);
}

var callback = function(arr) {
  console.log('* callback');
  // var qu = arr[0].toString().split(',');
  // // console.log(arr);
  // var obj = { name: qu[0], address: (qu[2] + " " + qu[3] + " " + qu[4]) };

  // console.log(obj.address);
  // geocoder.geocode(obj.address, function (err, res) {
  //                                                     console.log("**in-scope: geocoded responses in array");
  //                                                     console.log(res.results[0]);
  //                                                     // console.log(reformat(res));
  //                                                     tmp1.push(res);
  //                                                     encode(tmp1);
  //                                                   });


};




// var csvStream = csv.createWriteStream({headers: true}),
//     writableStream = fs.createWriteStream(path);

// writableStream.on("finish", function(){
//   console.log("DONE!");
// });

// csvStream.pipe(writableStream);
// csvStream.write({a: "a0", b: "b0"});
// csvStream.write({a: "a1", b: "b1"});

// csvStream.end();

//or

// var csvStream = csv.format({headers: true}),
//     writableStream = fs.createWriteStream("my.csv");

// writableStream.on("finish", function(){
//   console.log("DONE!");
// });

// csvStream.pipe(writableStream);
// csvStream.write({a: "a0", b: "b0"});
// csvStream.write({a: "a1", b: "b1"});
// csvStream.write({a: "a2", b: "b2"});
// csvStream.write({a: "a3", b: "b4"});
// csvStream.write({a: "a3", b: "b4"});
// csvStream.end();


var parseCsv = function(row) {
  var r = JSON.parse(row);
  console.log('r u ready');
  console.log(r);
  // return { name: }
}


var watchCount = function () {
  // watches count to delay execution of final function that sends geojson to export folder
};



var setCoordinates = function(jsonarray) {
      //   get and set
     //    coordinates for geocoding
    //     json objects
  var grb = [];
  for (i=0;i<jsonarray.length;i++) {
                                      var str = jsonarray[i].street + ", " + jsonarray[i].city + ", " + jsonarray[i].state + ", " + jsonarray[i].zip;
                                      console.log("**in-scope: addresses for getting coordinates");
                                      console.log(str);
                                      grb.push(str);
                                      // geocoder.geocode(str, function (err, res) {
                                      // console.log("**in-scope: geocoded responses in array");
                                      // console.log(res);
                                      // temp.push(res);
                                      // };
                                    };
  console.log("**in-scope**end-loop** : results array");
  // console.log(results[0]);
  return grb;
};
    // function inputs string
   // & outputs
  // array with latlng string data

var strToArr = function(str) {
  locations.push(str);
};

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


// var numb=fs.readFileSync(process.argv[2]).toString().split('\n');

var getCoordinates = function(name, address) {
  console.log("name: " + name + "=> address: " + address);
}

var importCsv = function(stream) {
  for (i=0;i<stream.length;i++) {
    downstream.push(getCoordinates(stream[0],stream[2]))
  }
  return downstream;
};


var toJson = function(array) {
   //   function takes one arg
  //   in form of array containing
 //   arrays storing csv for columns:
//     name,category,street,lat,lng
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





//  [{ name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
//   { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
//   { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }];
// var path = process.argv.forEach(val, index, array, {});
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
// numb = fs.readFileSync(process.argv[2]).toString().split('\n');
// var linecount = (numb.length);
// var geojsonReady = prepData(sd);
// var gr = prepData(norest);
// var gt = GeoJSON.parse(gr, { Point: ["lat", "lng"] });
// var gb = GeoJSON.parse(gr, {Point: ['lat', 'lng']}, function(json){
//   console.log(JSON.stringify(json));
//   fs.appendFile("modules/core/client/map-data/master-geodata.json", JSON.stringify(json));
// });
// fs.writeFile("modules/core/client/map-data/data.json", gt);