//var GoogleSpreadsheet = require('google-spreadsheet');


//var doc = new GoogleSpreadsheet('1hx5qTgtRiIeAp1CVpwn2ecHhFfSmAH9hutzRcjxBIuA');//1GXRqt9UMEX2jLq_dcrBQOYhZS5DjaTQIxPYNJuY0eGM
//// async.series([
//   function setAuth(step) {
//     // see notes below for authentication instructions!
//     var creds = require('./client_secret.json');
//     // OR, if you cannot save the file locally (like on heroku)
//     // var creds_json = {
//     //   client_email: 'yourserviceaccountemailhere@google.com',
//     //   private_key: 'your long private key stuff here'
//     // }
//     //
//     doc.useServiceAccountAuth(creds, step);
//   },
//   function getInfoAndWorksheets(step) {
//   doc.getInfo(function(err, info) {
//     console.log('Loaded doc: '+info.title+' by '+info.author.email);
//     sheet = info.worksheets[0];
//     console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
//     step();
//   });
// }], function(err){
//     if( err ) {
//       console.log('Error: '+err);
//     }
// });
var page, doSearch ,displayResults, google;
//moment = require('moment');
page = require('webpage').create();
google = require('googleapis');
var sheets = google.sheets('v4');
var auth = require('./quickstart.js');
//var authentication = require("./authentication");
// var now = moment();
// var currentDate = now.format('L');
// var currentTime = now.format('LTS');

function appendData(auth, data){
  console.log("Adding to sheet...");

  sheets.spreadsheets.values.update({
    auth:auth,
    spreadsheetID: '1hx5qTgtRiIeAp1CVpwn2ecHhFfSmAH9hutzRcjxBIuA',
    range: "'Ad Status'!A2:D",
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [data]
    }
  }, function(err, result) {
  if(err) {
      // Handle error
      console.log(err);
    } else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });
}



doSearch = function() {
    console.log('Searching...');
    page.evaluate(function() {
        $("input[name=q]").val('used car in dubai');
        $("form").trigger('submit');
        return true;
    });
    page.render('phantomjs-searching.png');
};

// displayResults = function() {
//     console.log('Results...');
//     var currentTime = new Date();
//     var path = 'ads.txt';
//
//     $('._WGk').each(function(i) {
//       page.evaluate(function() {
//         console.log(i + 1, $(this).text() +" "+ currentTime);//, ' // ' + $(this).attr('href')].join(': '));
//           doc.getInfo(function(err, info) {
//             if (err) {
//               console.log('An error occured (doc.getInfo):');
//               console.log(err);
//             }
//             //
//             // sheet = info.worksheets[0];
//             // sheet.getRows({
//             //   offset: 1,
//             //   limit: 1500,
//             // }, function (err, rows) {
//             //   if (err) {
//             //     console.log('An error occured (sheet.getRows):');
//             //     console.log(err);
//             //   }
//             // })
//             //
//             // rows.forEach(function(row) {
//             //   console.log('Reading sheet...');
//             //   row.AdURL = $(this).text();
//             //   row.Time =  currentTime;
//             //   row.status = '1';
//             //   row.save()
//             //   console.log('Ads Status Updated...');
//             //   console.log('Job Completed');
//             // });
//
//             return true;
//         });
//       });
//     });
//     page.render('phantomjs-results.png');
//   };


  displayResults = function() {
      console.log('Results...');
      page.evaluate(function() {
        var fullDate = new Date();
        //new Date();
        //console.log('Time is '+ currentTime);
        var currentMonth = fullDate.getMonth();
        var currentTime = fullDate.getFullYear();
          $('._WGk').each(function(i) {
            var result = [$(this).text()];
            var dataToSheet = [result, currentMonth, currentTime, '1'];
            console.log(dataToSheet);
            //console.log([i + 1, $(this).text(), ' // ' + currentTime].join(': '));
              // console.log([i + 1, $(this).text(), ' // ' + now.getTime()].join(': '));
            //  authentication.authenticate().then((auth)=>{
            appendData(auth,dataToSheet);
              //});
          });
          return true;
      });
      page.render('phantomjs-results.png');
  };

page.onLoadFinished = function(status) {
    if (status === 'success') {
        page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {
            if (!phantom.state) {
                doSearch();
                phantom.state = 'results';
            } else {
                displayResults();
                phantom.exit();
            }
        });
    } else {
        console.log('Connection failed.');
        phantom.exit();
    }
};

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open('http://google.com');
