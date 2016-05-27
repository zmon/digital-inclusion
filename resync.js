var                              fs           = require('fs-extra'),
                                 path         = "modules/core/client/map-data/import/test-warni.csv",
                                 dst1         = "modules/core/client/map-data/freeWifi-public.json",
                                 m1           = "modules/core/client/map-data/freeWifi-public-map.json",
                                 dst2         = "modules/core/client/map-data/freeWifi-customer.json",
                                 m2           = "modules/core/client/map-data/freeWifi-customer-map.json",
                                 dst3         = "modules/core/client/map-data/computerTraining-day.json",
                                 m3           = "modules/core/client/map-data/computerTraining-day-map.json",
                                 dst4         = "modules/core/client/map-data/computerTraining-night.json",
                                 m4           = "modules/core/client/map-data/computerTraining-night-map.json",
                                 dst5         = "modules/core/client/map-data/computerAccess.json",
                                 m5           = "modules/core/client/map-data/computerAccess-map.json",
                                 dst6         = "modules/core/client/map-data/computerRetail.json",
                                 m6           = "modules/core/client/map-data/computerRetail-map.json",
                                 dst7         = "modules/core/client/map-data/ispList.json",
                                 m7           = "modules/core/client/map-data/ispList-map.json",
                                 f1           = "modules/core/client/map-data/export/freeWifi-public.json",
                                 f2           = "modules/core/client/map-data/export/freeWifi-customer.json",
                                 f3           = "modules/core/client/map-data/export/computerTraining-day.json",
                                 f4           = "modules/core/client/map-data/export/computerTraining-night.json",
                                 f5           = "modules/core/client/map-data/export/computerAccess.json",
                                 f6           = "modules/core/client/map-data/export/computerRetail.json",
                                 f7           = "modules/core/client/map-data/export/ispList.json",
                                 readLine     = require('readline'),
                                 lineByLine   = require('line-by-line'),
                                 async        = require('async'),
                                 forEach      = require('async-foreach').forEach,
                                 GeoJSON      = require('geojson'),
                                 csv          = require('fast-csv'),
                                 jsontool     = require('jsontool'),
                                 csvString    = require('csv-string'),
                                 geocoder     = require('geocoder'),
                                 upstream     = fs.createReadStream(path),
                                 stringify    = require('stringify-stream'),
                                 GooglePlaces = require('googleplaces'),
                                 googlePlaces = new GooglePlaces("AIzaSyBP-nR1enubXspfTSfSit1tYwT4ZSwRi-s", "json"),
                                 finalPath    = fs.createReadStream('modules/core/client/map-data/data.json'),
                                 lineReader   = require('readline').createInterface({
                                                                              input: upstream
                                                                            }),
                                 Converter = require("csvtojson").Converter,
                                 converter = new Converter({
                                                        constructResult:true,
                                                        workerNum:4,
                                                        quote: false,
                                                        toArrayString: true
                                                      }),
                                Queue = require('better-queue'),
                                queue = new Queue(function (input, cb) {
                                                                        cb(null, result);
                                                                      }),
                                 pipe = fs.createReadStream(path).pipe(converter),
                                count = 0,
                            locations = [],
                                 tmp1 = [],
                                 tmp2 = [],
                                 tmp3 = [],
                           downstream = fs.createReadStream(dst1),
                          lineReader2 = require('readline').createInterface({
                                                                             input: downstream
                                                                            }),
                          lineReader3 = require('line-reader'),
                                        index,
                                        query,
                                        object,
                                        foo,
                                        bar,
                                        ready;

console.log("y");



// fs = require('fs');
// parse = require('..');

// Using the first line of the CSV data to discover the column names
// rs = fs.createReadStream(path);
// parser = parse({columns: true}, function(err, data){
//   console.log(data);
// })
// rs.pipe(parser);

/*
`node samples/header-based-columns.js`
[ { Foo: 'first', Bar: 'row', Baz: 'items' },
  { Foo: 'second', Bar: 'row', Baz: 'items' } ]
*/

// var ;

// var

// q.push(1)
// q.push({ x: 1 })


// var log = require('simple-node-logger').createSimpleLogger();
// create a rolling file logger based on date/time
// var opts = {
//     logDirectory:'/mylogfiles',
//     fileNamePattern:'roll-<DATE>.log',
//     dateFormat:'YYYY.MM.DD'
// };
var ri = 0;
lineReader.on('line', function(line) {
  // console.log('**function-scope: lineReader on event-triggered callback: printing line to console');
  ri += 1;
  console.log(ri + ": " + line);

  tmp1.push(line);
  callback(tmp1, ri);

});

lineReader2.on('line', function(line) {
  console.log("linereader2");
    var ck = delayPublish(c);
    if (ck) {
      console.log('then treue');
    } else {
      console.log("then flase");
      console.log('writing to current');
    console.log(line);
    }
});


lineReader3.eachLine('modules/core/client/map-data/data.json', function(line) {
  console.log("^^^^^^^");
  console.log(line);
});



var c = 0;
var increment = function(num) {
  // console.log('increment ' + (num+1));
  index = (num+1);
  // console.log(index);
  return index;
};

converter.on("end_parsed", function (arr) {
  console.log("ready?");


  for (i=0;i<arr.length;i++){
    foo = JSON.stringify(arr[i]);
    c += 1;
    encode(c, foo);
    // s.appendFile(dest,(tt+'\n'));
  };
});

var callback = function(arr) {

  // console.log('* callback ' + index);
  // var inDexter = (index - 1);
  // console.log(arr[index]);



};



var limit = 46;

var delayPublish = function(num) {
  if (num === limit) {
    console.log("delayPublish false");
    return false;
  } else if (num < limit) {
    return true;
  }
}

var checkLimit = function(num) {

  if (num === limit) {
    console.log("reached limit");
    geocode(tmp2);
    console.log(tmp3);
    // writeToCurrent();
  } else if (num < limit) {
    console.log(num + " reaching limit " + limit);
  }

}

var encode = function(index, obj) {

  tmp2.push(obj);
  checkLimit(index);


}


var geocode = function(arr) {
  forEach(arr, function(item, index) {
    var parsedJson = JSON.parse(item);
    console.log(parsedJson);
    var td = parsedJson.pri;
    parsedJson.readableAddress = (parsedJson.thoroughfare + ", " + parsedJson.locality + ", " + parsedJson.administrativeArea + ", " + parsedJson.postalCode);
    geocoder.geocode(parsedJson.readableAddress, function (err, res) {
                                                                        // console.log("geocode res");
                                                                        // console.log(res.results[0]);
                                                                        // console.log(res.results[0].address_components);
                                                                        // console.log(res.results[0].geometry);
                                                                        // fs.appendFile(dest,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // var str = "Visit Microsoft!";
                                                                        // var name = str.replace("results", parsedJson.name);
                                                                        // res.name = {"name": parsedJson.name);
                                                                        // var tm = JSON.parse(res);
                                                                        // console.log(res);
                                                                        var name = parsedJson.name;
                                                                        var tres = {name: name};
                                                                        console.log(tres);
                                                                        // console.log(res);
                                                                        if (td === 1) {
                                                                          fs.appendFile(dst1,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst1,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 2) {
                                                                          fs.appendFile(dst2,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst2,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 3) {
                                                                          fs.appendFile(dst3,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst3,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 4) {
                                                                          fs.appendFile(dst4,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst4,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 5) {
                                                                          fs.appendFile(dst5,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst5,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 6) {
                                                                          fs.appendFile(dst6,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst6,(JSON.stringify(res)+'\n'),function(err){});
                                                                        } else if (td === 7) {
                                                                          fs.appendFile(dst7,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          fs.appendFile(dst7,(JSON.stringify(res)+'\n'),function(err){});
                                                                        }



                                                                                      // console.log("**geocoded");
                                                                                      // console.log(res.results[0].geometry);
                                                                                      // console.log(reformat(res));
                                                                                      // tmp1.push(res);
                                                                                      // encode(tmp1);
                                                                                      // parsedJson.google_data.bounds.northeast = res.results[0].geometry.bounds.northeast;

                                                                                      // parsedJson.googleData = res;
                                                                                      // tmp3.push(res.results[0]);
                                                                     });
 })
}