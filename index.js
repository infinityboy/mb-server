var express = require('express');
var http = require('http');
var app = express();
var tilelive = require('@mapbox/tilelive');
var path = require("path");
var fs = require("fs");
var Pbf = require('pbf');
var download = require('download');
require('@mapbox/mbtiles').registerProtocols(tilelive);

// 设置端口为7777
app.set('port', 7777);

app.use(function(req, res, next) {
    // 服务端要支持跨域，否则会出现跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 放置的矢量瓦片数据位置
tilelive.load('mbtiles:'+ __dirname + '/tiles/2017-07-03_planet_z0_z14.mbtiles', function(err, source) {
   if (err) {
       throw err;
   }
   
   //访问的url是：http://localhost:7777/tiles/{z}/{x}/{y}.pbf
   app.get(/^\/tiles\/(\d+)\/(\d+)\/(\d+).pbf$/, function(req, res) {
       var z = req.params[0];
       var x = req.params[1];
       var y = req.params[2];
       console.log('get tile %d, %d, %d', z, x, y);


       source.getTile(z, x, y, function(err, tile, headers) {
           if (err) {
               res.status(404)
               res.send(err.message);
               console.log(err.message);
           } else {
               res.set(headers);
               res.send(tile);
           }
       });

   });

});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


//     //9次
//    "text-font": [
//     "Open Sans Italic",
//     "Arial Unicode MS Regular"
//     ],
//     //8次 poi
//     "text-font": [
//         "Open Sans Semibold",
//         "Arial Unicode MS Bold"
//     ],
//     //3次 道路
//     "text-font": [
//         "Open Sans Regular",
//         "Arial Unicode MS Regular"
//     ],
//     //5次 顶层国家道路
//     "text-font": [
//         "Open Sans Bold",
//         "Arial Unicode MS Bold"
//     ],

// https://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Semibold,Arial%20Unicode%20MS%20Bold/512-767.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA
// http://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Semibold,Arial%20Unicode%20MS%20Bold/512-767.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA
// https://orangemug.github.io/font-glyphs/glyphs/Roboto%20Regular/28672-28927.pbf  Roboto%20Condensed%20Italic
var urlList = [];
// for (let index = 0; index <= 10000; index++) {
//     if(index == 0) {
//         var startNum = 0
//         var endNum = startNum + 255
//     }else{
//         startNum = endNum + 1;
//         endNum = startNum + 255
//     }
//     //mapbox font1
//     // var element = 'http://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Semibold,Arial%20Unicode%20MS%20Bold/'
//     // + startNum + '-' + endNum + '.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA';

//     //mapbox font2
//     // var element = 'http://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Italic,Arial%20Unicode%20MS%20Regular/'
//     // + startNum + '-' + endNum + '.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA';

//     //mapbox font3
//     // var element = 'http://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Regular,Arial%20Unicode%20MS%20Regular/'
//     // + startNum + '-' + endNum + '.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA';

//     //mapbox font4
//     // var element = 'http://api.mapbox.com/fonts/v1/mapbox/Open%20Sans%20Bold,Arial%20Unicode%20MS%20Bold/'
//     // + startNum + '-' + endNum + '.pbf?access_token=pk.eyJ1IjoiaW5maW5pdHlib3kiLCJhIjoiY2pqM282cXljMHp0YzNrcDY1dDY4Z2RsOCJ9.3fsEouhw244mr7ZgMUloBA';

//     //osm font1
//     // var element = 'http://orangemug.github.io/font-glyphs/glyphs/Roboto%20Regular/'
//     // + startNum + '-' + endNum + '.pbf';

//     //osm font2 
//     // var element = 'http://orangemug.github.io/font-glyphs/glyphs/Roboto%20Condensed%20Italic/'
//     // + startNum + '-' + endNum + '.pbf';
//     urlList.push(element)
// }

// for (let index = 0; index < urlList.length; index++) {
//     download(urlList[index], './pbf/Open%20Sans%20Semibold,Arial%20Unicode%20MS%20Bold').then((val) => {
// 	    console.log('done!');
//     })
// }

// console.log(urlList)
// console.log(urlList[urlList.length-1])


