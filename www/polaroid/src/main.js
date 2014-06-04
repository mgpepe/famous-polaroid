/*** main.js ***/

define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    
    // import the AppView class using require
    var AppView = require('views/AppView');
    var Utility = require('famous/utilities/Utility');
    var mainContext = Engine.createContext();

    var SlideData = require('data/SlideData');
    Utility.loadURL(SlideData.getUrl(), initApp);

    function initApp(data){
    	var data = SlideData.parse(data);
	      // create a new instance of app view
	    var appView = new AppView({data:data});

		// add the instance to the context
	    mainContext.add(appView);	
        mainContext.setPerspective(1000);
    }

});
