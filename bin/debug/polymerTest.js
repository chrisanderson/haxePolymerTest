(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var Main = function() {
	console.log("Main.new()");
	window.addEventListener("polymer-ready",$bind(this,this.onPolymerReady));
	window.addEventListener("WebComponentsReady",$bind(this,this.onWebComponentsReady));
};
Main.__name__ = true;
Main.main = function() {
	console.log("Main.main()");
	var mainInstance = new Main();
};
Main.prototype = {
	onPolymerReady: function(event) {
		window.console.log("onPolymerReady() event: ",event);
		this._testThisJunk();
	}
	,onPolymerResponse: function(event) {
		window.console.log("onPolymerResponse() event: ",event);
		window.console.log("onPolymerResponse() event.detail.response: ",event.detail.response);
		window.document.querySelector("#ajaxTestResponse").textContent = JSON.stringify(event.detail.response);
	}
	,onWebComponentsReady: function(event) {
		window.console.log("onWebComponentsReady() event: ",event);
	}
	,_testThisJunk: function() {
		var ajaxTest;
		console.log("PolymerAjax.get_instance()");
		ajaxTest = window.document.querySelector("#ajaxTest");
		window.console.warn("ajaxTest: ",ajaxTest);
		var tempBnDownloadJson = window.document.querySelector("#bnDownloadJson");
		tempBnDownloadJson.addEventListener("click",function(event) {
			ajaxTest.go();
		});
		var stripCurlyBraces = function(string) {
			var tempString = string;
			tempString = StringTools.replace(StringTools.replace(tempString,"{",""),"}","");
			return tempString;
		};
		var tempEventHandler = stripCurlyBraces(ajaxTest.getAttribute("on-polymer-response"));
		if(Reflect.isFunction(Reflect.field(this,tempEventHandler))) {
			console.log("found function: " + tempEventHandler);
			ajaxTest.addEventListener("polymer-response",$bind(this,this.onPolymerResponse));
		} else throw "The dom references a function: " + tempEventHandler + " but the function wasn't found in this class.";
		var myElementDomTest;
		console.log("MyElement.getDomInstance() elementId: " + "#test36");
		window.Polymer.getRegisteredPrototype('my-element').elementId = "#test36";
		myElementDomTest = window.document.querySelector("#test36");
		console.log("typeof(myElementDomTest): " + Std.string(Type["typeof"](myElementDomTest)));
		window.console.warn("myElementDomTest: ",myElementDomTest);
		window.console.warn("myElementDomTest.declarativeMessage: ",myElementDomTest.declarativeMessage);
		myElementDomTest.declarativeMessage = "test36 !!! changed @ runtime by haxe !!!";
		window.console.warn("myElementDomTest.declarativeMessage: ",myElementDomTest.declarativeMessage);
		var myElementTest;
		console.log("MyElement.get_prototype()");
		myElementTest = window.Polymer.getRegisteredPrototype("my-element");
		console.log("typeof(myElementTest): " + Std.string(Type["typeof"](myElementTest)));
		window.console.warn("myElementTest: ",myElementTest);
		var myElementDomTest2;
		console.log("MyElement.getDomInstance() elementId: " + "#test33");
		window.Polymer.getRegisteredPrototype('my-element').elementId = "#test33";
		myElementDomTest2 = window.document.querySelector("#test33");
		console.log("typeof(myElementDomTest2): " + Std.string(Type["typeof"](myElementDomTest2)));
		window.console.warn("myElementDomTest2: ",myElementDomTest2);
		window.console.warn("myElementDomTest2.declarativeMessage: ",myElementDomTest2.declarativeMessage);
		myElementDomTest2.declarativeMessage = "test33 !!! changed @ runtime by haxe !!!";
		window.console.warn("myElementDomTest2.declarativeMessage: ",myElementDomTest2.declarativeMessage);
		var tempTimer = new haxe.Timer(1000);
		tempTimer.run = function() {
			myElementDomTest.currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
			myElementDomTest2.currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
		};
		var tempStaticShadowDomNodeList = window.document.querySelector("#test36").$;
		window.console.log("tempStaticShadowDomNodeList: ",tempStaticShadowDomNodeList);
		window.console.log("tempStaticShadowDomNodeList.selectTest: ",tempStaticShadowDomNodeList.selectTest);
		var selectTest = window.document.querySelector("#test36").$.selectTest;
		selectTest.addEventListener("change",function(event1) {
			window.console.log("onSelectTestChange() event: ",event1);
			var tempOptionCollection = selectTest.selectedOptions;
			var tempOption = tempOptionCollection[0];
			window.console.log("onSelectTestChange() tempOption: ",tempOption);
			window.console.log("onSelectTestChange() tempOption.value: ",tempOption.value);
			myElementDomTest.boundText3 = "test" + tempOption.value;
		});
	}
	,__class__: Main
};
var PolymerEvents = function() { };
PolymerEvents.__name__ = true;
var PolymerEventHandlers = function() { };
PolymerEventHandlers.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = true;
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
console.log("MyElement.__init__");
console.log("PolymerAjax.__init__");
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
PolymerEvents.POLYMER_READY = "polymer-ready";
PolymerEvents.POLYMER_RESPONSE = "polymer-response";
PolymerEvents.WEB_COMPONENTS_READY = "WebComponentsReady";
PolymerEventHandlers.ON_POLYMER_READY = "on-polymer-ready";
PolymerEventHandlers.ON_POLYMER_RESPONSE = "on-polymer-response";
Main.main();
})();

//# sourceMappingURL=polymerTest.js.map