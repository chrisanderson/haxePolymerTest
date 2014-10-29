(function () { "use strict";
var Main = function() { };
Main.main = function() {
	window.addEventListener(PolymerEvents.READY,Main.onPolymerReady);
};
Main.onPolymerReady = function(event) {
	var ajax = window.document.querySelector("polymer-ajax");
	ajax.addEventListener(PolymerEvents.RESPONSE,Main.onPolymerResponse);
};
Main.onPolymerResponse = function(event) {
	null;
};
var PolymerEvents = function() { };
PolymerEvents.READY = "polymer-ready";
PolymerEvents.RESPONSE = "polymer-response";
Main.main();
})();
