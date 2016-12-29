var system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: phantomjs-run-jasmine.js URL');
    phantom.exit(1);
}

var doneRegEx = /^\d+ specs, (\d+) failure/;
var noReallyDoneRegEx = /^Finished in \d[\d\.]* second/;
var rc;

var page = require('webpage').create();


page.onConsoleMessage = function (msg) {
    system.stdout.write(msg);
    var match = doneRegEx.exec(msg);
    if (match) {
        rc = match[1]==="0" ? 0 : 1;
        return;
    }
    match = noReallyDoneRegEx.exec(msg);
    if (match) {
        system.stdout.writeLine("");
        
        if (page) page.close();
        setTimeout(function(){ phantom.exit(rc); }, 0);
    }
};

system.stdout.writeLine("");

page.open(system.args[1], function(status){
    if (status !== "success") {
        console.log("Couldn't load the page");
        if (page) page.close();
        setTimeout(function(){ phantom.exit(1); }, 0);
    }
    system.stdout.writeLine("");
});
