"use strict";
var fs = require("fs");
var page = require ('webpage').create();
//var settings = { encoding: 'utf8'};


// page.customHeaders = {};
// page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
// page.viewportSize = {width: 1280, height: 1024};

// page.open('https://www.google.ae/search?q=leads+generation+dubai', function (status){
//   console.log('Status: '+ status);
//
//    if (status === 'success'){
//      page.render('example.png');
//      var path = 'ads.xml';
//   //   window.setTimeout(function() {
//   //       page.render('example.png');
//   //       console.log(page.plainText);
//   //       //fs.writeFIle('ads.txt',page.content);
//   //       fs.writeFile('ads.txt', page.plainText, (err)
//   //         if(err) throw err;
//   //     );
//   //       phantom.exit();
//   //     },9000);
//   // }
//   // else {
//   //   console.log('Unable to load page!');
//   //   phantom.exit();
//   // }
//
//               // //Identify elements with the class name (Jwu) which are ads according to google DOM
//               //     var ads = page.evaluate(function(err){
//               //        return document.getElementsByClassName('_WGk').textContent;
//               //        throw err;
//               //     });
//       console.log(ads.length );
//       // for (var i=0, i < ads.length,i++){
//       //   console.log[i];
//       //   console.log(ads[i]);
//       //   fs.write(path,ads[i],'w')
//       // }
//       // var content = page.plainText;
//       console.log(ads);
//       fs.write(path,ads,'w')
//
//       // var adsArr;
//       //
//       // for(var i=0, i < ads.length, i++){
//       //   adsArr.push(ads[i])
//       // }
//     //  console.log(adsArr);
//       //var content = JSON.stringify(ads);
//
//     //  console.log(content);
//     }
//     //   fs.writeFile('ads.txt', page.plainText, (err){
//     //     if(err) throw err;
//     // });
//
//       phantom.exit();
//
//     });
    //var path = 'ads.xml';

// page.open('http://phantomjs.org', function(status) {
//   console.log('Status: '+ status);
//   if (status === 'success'){
//     page.render('example.png');
//       page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//         console.log("jquery included")
//         //  var ads = page.evaluate(function(err) {
//         //    console.log(err);
//         //    return $('.community').text();
//     //      });
//       )};
//   }//end of if statement
//
//     phantom.exit();
//   });


page.open('prodigalfit.com', function(status) {

  console.log(status)
  page.render('example.png');

  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    page.evaluate(function() {
      console.log($(".blog-post-content-grid").text());
    });
    phantom.exit()
  });
});
