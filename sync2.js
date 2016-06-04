var                                fs = require('fs-extra'),
                                 path = "modules/core/client/map-data/import/test-warni.csv",
                                 dst1 = "modules/core/client/map-data/freeWifi-public.json",
                                 dst2 = "modules/core/client/map-data/freeWifi-customer.json",
                                 dst3 = "modules/core/client/map-data/computerTraining-day.json",
                                 dst4 = "modules/core/client/map-data/computerTraining-night.json",
                                 dst5 = "modules/core/client/map-data/computerAccess.json",
                                 dst6 = "modules/core/client/map-data/computerRetail.json",
                                 dst7 = "modules/core/client/map-data/ispList.json",
                                 f1 = "modules/core/client/map-data/export/freeWifi-public.json",
                                 f2 = "modules/core/client/map-data/export/freeWifi-customer.json",
                                 f3 = "modules/core/client/map-data/export/computerTraining-day.json",
                                 f4 = "modules/core/client/map-data/export/computerTraining-night.json",
                                 f5 = "modules/core/client/map-data/export/computerAccess.json",
                                 f6 = "modules/core/client/map-data/export/computerRetail.json",
                                 f7 = "modules/core/client/map-data/export/ispList.json",
                             readLine = require('readline'),
                           lineByLine = require('line-by-line'),
                                async = require('async'),
                              forEach = require('async-foreach').forEach,
                              GeoJSON = require('geojson'),
                             jsontool = require('jsontool'),
                            parseJson = require('parse-json'),
                            stringify = require('stringify-stream'),
                                Queue = require('better-queue'),
                                queue = new Queue(function (input, cb) {
                                                                        cb(null, result);
                                                                      }),
                                count = 0,
                            locations = [],
                                 tmp1 = [],
                                 tmp2 = [],
                                 tmp3 = [],
                                  ds1 = fs.createReadStream(dst1),
                                  ds2 = fs.createReadStream(dst2),
                                  ds3 = fs.createReadStream(dst3),
                                  ds4 = fs.createReadStream(dst4),
                                  ds5 = fs.createReadStream("modules/core/client/map-data/computerAccess.json"),
                                  ds6 = fs.createReadStream(dst6),
                                  ds7 = fs.createReadStream(dst7),
                          lineReader1 = require('readline').createInterface({
                                                                             input: ds1
                                                                            }),
                          lineReader2 = require('readline').createInterface({
                                                                             input: ds2
                                                                            }),
                          lineReader3 = require('readline').createInterface({
                                                                             input: ds3
                                                                            }),
                          lineReader4 = require('readline').createInterface({
                                                                             input: ds4
                                                                            }),
                          lineReader5 = require('readline').createInterface({
                                                                             input: ds5
                                                                            }),
                          lineReader6 = require('readline').createInterface({
                                                                             input: ds6
                                                                            }),
                          lineReader7 = require('readline').createInterface({
                                                                             input: ds7
                                                                            }),
                                        index,
                                        query,
                                        object,
                                        foo1=[],
                                        foo2=[],
                                        foo3=[],
                                        foo4=[],
                                        foo5=[],
                                        foo6=[],
                                        foo7=[],
                                        bar,
                                        ready;

console.log("tots");
lineReader1.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo1.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build1(foo1);
});
lineReader2.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo2.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build2(foo2);
});
lineReader3.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo3.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build3(foo3);
});
lineReader4.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo4.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build4(foo4);
});
lineReader5.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo5.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build5(foo5);
});
lineReader6.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo6.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build6(foo6);
});
lineReader7.on('line', function(line) {

  // console.log(line);
  // var json = JSON.stringify(line);
  foo7.push(line);
  // console.log(json);
  // console.log(json.results[0].address_components);
  // var o = json.results[0];
  // ref(o);
  build7(foo7);
});


function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

var build1 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref1(get,item);
      fs.appendFile(f1,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}

var build2 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref2(get,item);
      fs.appendFile(f2,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}
var build3 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref3(get,item);
      fs.appendFile(f3,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}
var build4 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref4(get,item);
      fs.appendFile(f4,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}
var build5 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref5(get,item);
      fs.appendFile(f5,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}
var build6 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref6(get,item);
      fs.appendFile(f6,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}
var build7 = function(arr) {
  arr.forEach(function(item,index){
    if (isEven(index)) {
      console.log("skippity");
    } else {
      var pre = (index - 1);
      var get = arr[pre];
      var toStore = ref7(get,item);
      fs.appendFile(f7,(JSON.stringify(toStore)+'\n'),function(err){});
    }
  });
}



var ref1 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "freeWifi-public",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref2 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "freeWifi-customer",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref3 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  console.log("prprp");
  console.log(prpr);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "computerTraining-day",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref4 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "computerTraining-night",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref5 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "computerAccess",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref6 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "computerRetail",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}
var ref7 = function(json1,json2) {
  var d = JSON.parse(json1);
  var name = d.name;
  var prpr = JSON.parse(json2);
  var r = prpr.results[0];
  var add = r.formatted_address;
  var lat = r.geometry.location.lat;
  var lng = r.geometry.location.lng;
  var pid = r.place_id;
  var x = {
    // "type": "FeatureCollection",
    // "features":[
                // {
                  "type":"Feature",
                  "geometry": {"type":"Point", "coordinates":[lng,lat]},
                  "properties": {
                    "name": name,
                    "category": "ispList",
                    "street": add,
                    "google_id": pid
                  }
                }
  //              ]
  // };
  return x;
}