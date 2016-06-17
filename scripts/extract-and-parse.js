var                              fs           = require('fs-extra'),
                                 readLine     = require('readline'),
                                 lineByLine   = require('line-by-line'),
                                 async        = require('async'),
                                 forEach      = require('async-foreach').forEach,
                                 GeoJSON      = require('geojson'),
                                 csv          = require('fast-csv'),
                                 jsontool     = require('json'),
                                 csvString    = require('csv-string'),
                                 geocoder     = require('geocoder'),
                                 path         = "../modules/core/client/map-data/import/tmp.csv",
                                 dst1         = "../modules/core/client/map-data/tmp/wifi-public.json",
                                 dst2         = "../modules/core/client/map-data/tmp/wifi-customer.json",
                                 dst3         = "../modules/core/client/map-data/tmp/training-day.json",
                                 dst4         = "../modules/core/client/map-data/tmp/training-night.json",
                                 dst5         = "../modules/core/client/map-data/tmp/computer-access.json",
                                 dst6         = "../modules/core/client/map-data/tmp/computer-reseller.json",
                                 dst7         = "../modules/core/client/map-data/tmp/isp-list.json",
                                 // f1           = "../modules/core/client/map-data/export/wifi-public.json",
                                 // f2           = "../modules/core/client/map-data/export/wifi-customer.json",
                                 // f3           = "../modules/core/client/map-data/export/training-day.json",
                                 // f4           = "../modules/core/client/map-data/export/training-night.json",
                                 // f5           = "../modules/core/client/map-data/export/computer-access.json",
                                 // f6           = "../modules/core/client/map-data/export/computer-reseller.json",
                                 // f7           = "../modules/core/client/map-data/export/isp-list.json",
                                 upstream     = fs.createReadStream(path),
                                 stringify    = require('stringify-stream'),
                                 GooglePlaces = require('googleplaces'),
                                 googlePlaces = new GooglePlaces("AIzaSyBP-nR1enubXspfTSfSit1tYwT4ZSwRi-s", "json"),
                                 finalPath    = fs.createReadStream('../modules/core/client/map-data/data.json'),
                                 lineReader   = require('readline').createInterface({ input: upstream }),
                                 Converter    = require("csvtojson").Converter,
                                 converter    = new Converter({
                                                                constructResult: true,
                                                                workerNum: 4,
                                                                quote: false,
                                                                delimiter: '#',
                                                                toArrayString: true
                                                              }),
                                 Queue        = require('better-queue'),
                                 queue        = new Queue(function (input, cb) {cb(null, result)}),
                                 pipe         = fs.createReadStream(path).pipe(converter),
                                 downstream   = fs.createReadStream(dst1),
                                 lineReader2  = require('readline').createInterface({ input: downstream }),
                                 lineReader3  = require('line-reader'),
                                 ri           = 0,
                                 c            = 0,
                                 count        = 0,
                                 locations    = [],
                                 tmp1         = [],
                                 tmp2         = [],
                                 tmp3         = [],
                                 index,
                                 query,
                                 object,
                                 foo,
                                 bar,
                                 ready;



var increment = function(num) {
  // console.log('increment ' + (num+1));
  index = (num+1);
  // console.log(index);
  return index;
};

converter.on("end_parsed", function (arr) {
  console.log("ready?");

  var len = arr.length;
  for (i=0;i<len;i++){
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



var limit = 7;

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
    console.log("parsed");
    // console.log(parsedJson);
    var td = parsedJson.Priority;

    parsedJson.readableAddress = (parsedJson.Thoroughfare + ", " + parsedJson.Locality + ", " + parsedJson.AdministrativeArea + ", " + parsedJson.PostalCode);
  
    console.log(parsedJson);
    console.log(td);
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
                                                                        // var name = parsedJson.Name;
                                                                        var tres = {name: parsedJson.Name};
                                                                        // console.log(tres);
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