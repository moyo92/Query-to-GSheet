var page, doSearch, displayResults;
page = require('webpage').create();

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
    page.evaluate(function() {
        $('._WGk').each(function(i) {
            console.log(i + 1, $(this).text());//, ' // ' + $(this).attr('href')].join(': '));
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
