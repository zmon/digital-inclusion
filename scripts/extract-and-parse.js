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
                                 dst1         = "../modules/core/client/map-data/tmp/a/wifi-public.json",
                                 dst2         = "../modules/core/client/map-data/tmp/a/wifi-customer.json",
                                 dst3         = "../modules/core/client/map-data/tmp/a/training-day.json",
                                 dst4         = "../modules/core/client/map-data/tmp/a/training-night.json",
                                 dst5         = "../modules/core/client/map-data/tmp/a/computer-access.json",
                                 dst6         = "../modules/core/client/map-data/tmp/a/computer-reseller.json",
                                 dst7         = "../modules/core/client/map-data/tmp/a/isp-list.json",
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
                                 googlePlaces = new GooglePlaces("AIzaSyBqZ_zfcyUUJDi6OuXq4QYpkdHPeaqFkms", "json"),
                                 // googlePlaces = new GooglePlaces("AIzaSyBP-nR1enubXspfTSfSit1tYwT4ZSwRi-s", "json"),
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
                                 ready,
                                 http         = require('http'),
                                 mongoose     = require('mongoose'),
                                 MongoClient  = require('mongodb').MongoClient, 
                                 assert       = require('assert'),
                                 Schema       = mongoose.Schema,
                                 request      = require('request');

// var PlaceSchema = new Schema({
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   title: {
//     type: String,
//     default: '',
//     trim: true,
//     required: 'Must provide title or place name for location'
//   },
//   caption: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   location: {
//     type: Array
//   },
//   description: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   priority: {
//     type: Number
//   },
//   category: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   url: {
//     type: String,
//     trim: true
//   },
//   readableAddress: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   services: {
//     type: String, 
//     default: ''
//   },
//   address1: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   address2: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   hoursOpen: {
//     type: Array
//   },
//   city: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   state: {
//     type: String,
//     default: 'MO',
//     trim: true
//   },
//   zip: {
//     type: Number
//   },
//   phone: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   lat: {
//     type: Number
//   },
//   lng: {
//     type: Number
//   },
//   contactName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   contactEmail: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   offersWifi: {
//     type: Boolean
//   },
//   offersTraining: {
//     type: Boolean
//   },
//   wifiTerms: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   computerReseller: {
//     type: Boolean
//   },
//   iconMatcher: {
//     type: String
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });

function getErrorMessage (err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
};


// var Place = mongoose.model('Place', PlaceSchema);

function sendToServer(data) {
  console.log("sendToServer");
  console.log(data);
  // http.post({
  //   host: 'localhost:8080',
  //   path: '/api/places'
  // }, function(res) {
  //   console.log("sendToServer-res");
  //   console.log(res);
  // });
  request.post('http://localhost:8080/api/places', {form: data})

    // return http.get({
    //     host: 'personatestuser.org',
    //     path: '/email'
    // }, function(response) {
    //     // Continuously update stream with data
    //     var body = '';
    //     response.on('data', function(d) {
    //         body += d;
    //     });
    //     response.on('end', function() {

    //         // Data reception is done, do whatever with it!
    //         var parsed = JSON.parse(body);
    //         callback({
    //             email: parsed.email,
    //             password: parsed.pass
    //         });
    //     });
    // });

};

function createPlace (req, res) {
  // var place = new Place(req);
  console.log("creating place");
  console.log("res");
  console.log(res);
  console.log("req.body");
  console.log(req);
  sendToServer(req);
  // place.user = req.user;

  // place.save(function (err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(place);
  //   }
  // });
};


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



var limit = 2;

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
// int - priority number
// 
//arg1 -- json
//arg2 -- google response
function prettify(arg1,arg2) {
  console.log("prettification");
  // console.log("arg1");
  // console.log(arg1);
  // console.log("arg2");
  // console.log(arg2);
  // console.log(arg2.results[0].address_components[0]);
  // persist(arg1);
  // var data = 



  // needs category
  var data = {
    title: arg1.name,
    url: arg1.url,
    services: arg1.services,
    primaryCategory: arg1.priority,
    categories: arg1.categories,
    readableAddress: arg2.results[0].formatted_address,
    location: arg2.results[0].geometry.location, 
    address1: arg1.address1,
    city: arg1.city,
    state: arg1.state,
    zip: arg1.zip,
    phone: arg1.phone,
    offersCourses: arg1.offersCourses, 
    hoursOpen: arg1.hoursOpen,
    courseSchedule: arg1.courseSchedule,
    description: arg1.description
  };
  console.log(data);
  persist(data);

  // {
  //   "type" : "Feature", 
  //   "geometry": {"type": "Point", "coordinates": [__, __]},
  //   "properties": {
  //                   "name": __, 
  //                   "category": __, 
  //                   "street": __, 
  //                   "google_id": __, 
  //                   "phone": __, 
  //                   "url": __, 
  //                   "" 
  //                 }
  // };

}




function persist(json) {
  console.log("persist");
  console.log(json);
 
  var opts = "";
  var url = 'mongodb://localhost/digital-inclusion-production';
  // console.log(placeModel);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    var resFunction = function() {
      return 200;
    }
    var res = {status: resFunction};
    createPlace(json, res);
    db.close();
  });

  // var db = mongoose.connect('mongodb://localhost/digitalinclusion', opts, function (err) {
  //   // Log Error
  //   if (err) {
  //     console.error(chalk.red('Could not connect to MongoDB!'));
  //     console.log(err);
  //   } else {

  //     if (cb) cb(db);
  //   }
  // });
}


function getCategory(num) {
  if (num === 1) {
    return "wifi-free";
  } else if (num === 2) {
    return "wifi-customer";
  } else if (num === 3) {
    return "computers-access";
  } else if (num === 4) {
    return "computers-retail";
  } else if (num === 5) {
    return "training-day"
  } else if (num === 6) {
    return "training-night";
  } else if (num === 7) {
    return "isp"; 
  }
}

function getCategories(arr) {
  var lng = arr.length;
  var res = [];
  for (var i = 0; i < lng; i++) {
      console.log("category: " + arr[i]);
      var cat = getCategory(arr[i]);
      res.push(cat);
  }
  console.log("getCategories output:");
  console.log(res);
  return res;
}


function offersClasses(bool) {
  if (bool) {
    return true;
  } else if (!bool) {
    return false;
  }
}

function wrapGeocode(int, json) {
  console.log("wrapGeocode");
  console.log(int);
  console.log(json);
  var priorityCat = getCategory(json.Priority);
  // console.log(priorityCat);
  var allCats = getCategories(json.Categories);

  var clsBool = offersClasses(json.ClassesOffered);
  // console.log("getCategories inside wrapGeocode");
  // console.log(allCats);
  geocoder.geocode(json.readableAddress, function(err, res) {
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
                                                                        var tres = {name: json.Name, phone: json.Phone, zip: json.PostalCode, url: json.Url, services: json.Services, priority: priorityCat, address1: json.Thoroughfare, city: json.Locality, state: json.AdministrativeArea, categories: allCats, offersCourses: clsBool, description: json.Description, hoursOpen: json.HoursOpen, courseSchedule: json.CourseSchedule};
                                                                        // console.log("inspect t/res");
                                                                        // console.log(res);
                                                                        // console.log(tres);
                                                                        // if (json.Priority === 1) {
                                                                        //   console.log("matching category");
                                                                        prettify(tres,res);
                                                                    
                                                                          // console.log()
                                                                          // fs.appendFile(dst1,(JSON.stringify(tres)+'\n'),function(err){});
                                                                          // fs.appendFile(dst1,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 2) {
                                                                        //   fs.appendFile(dst2,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst2,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 3) {
                                                                        //   fs.appendFile(dst3,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst3,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 4) {
                                                                        //   fs.appendFile(dst4,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst4,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 5) {
                                                                        //   fs.appendFile(dst5,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst5,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 6) {
                                                                        //   fs.appendFile(dst6,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst6,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // } else if (td === 7) {
                                                                        //   fs.appendFile(dst7,(JSON.stringify(tres)+'\n'),function(err){});
                                                                        //   fs.appendFile(dst7,(JSON.stringify(res)+'\n'),function(err){});
                                                                        // }



                                                                                      // console.log("**geocoded");
                                                                                      // console.log(res.results[0].geometry);
                                                                                      // console.log(reformat(res));
                                                                                      // tmp1.push(res);
                                                                                      // encode(tmp1);
                                                                                      // parsedJson.google_data.bounds.northeast = res.results[0].geometry.bounds.northeast;

                                                                                      // parsedJson.googleData = res;
                                                                                      // tmp3.push(res.results[0]);
                                                                     });
}

var geocode = function(arr) {
  forEach(arr, function(item, index) {
    var parsedJson = JSON.parse(item);
    console.log("geocode parsed output");
    console.log(parsedJson);
    var td = parsedJson.Priorty;

    parsedJson.readableAddress = (parsedJson.Thoroughfare + ", " + parsedJson.Locality + ", " + parsedJson.AdministrativeArea + ", " + parsedJson.PostalCode);
  
    console.log(parsedJson.readableAddress);
    console.log(parsedJson.Priority);
    console.log(td);

    wrapGeocode(parsedJson.Priority, parsedJson);
    return null;

    
 })
}