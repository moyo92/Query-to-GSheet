var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var page, doSearch, displayResults;
page = require('webpage').create();

var doc = new GoogleSpreadsheet('1hx5qTgtRiIeAp1CVpwn2ecHhFfSmAH9hutzRcjxBIuA');
var sheet;
var creds = require('./client_secret.json');


doSearch = function() {
    console.log('Searching...');
    page.evaluate(function() {
        $("input[name=q]").val('saudia');
        $("form").trigger('submit');
        return true;
    });
    page.render('phantomjs-searching.png');
};


displayResults = function() {
    console.log('Results...');
    var ads;// = new Array[];
    page.evaluate(function() {
      var fullDate = new Date();
      var currentDay = fullDate.getDate();
      var currentYear = fullDate.getFullYear();
      //console.log('Time is '+ currentTime);
        $('._WGk').each(function(i) {
          console.log(i + 1, $(this).text());
          ads.push($(this).text());
            // console.log([i + 1, $(this).text(), ' // ' + now.getTime()].join(': '));
        });
        return true;
    });

//Write to GoogleSpreadsheet


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
