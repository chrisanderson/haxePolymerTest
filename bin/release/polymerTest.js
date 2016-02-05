(function (console) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Main = function() {
	this._mainInjector = new minject_Injector();
	this._initializeContext();
	window.addEventListener("polymer-ready",$bind(this,this.onPolymerReady));
	window.addEventListener("WebComponentsReady",$bind(this,this.onWebComponentsReady));
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var mainInstance = new Main();
};
Main.prototype = {
	onPolymerReady: function(event) {
	}
	,onWebComponentsReady: function(event) {
		this._testThisJunk();
	}
	,_initializeContext: function() {
		this._mainInjector.mapValue(test_TestClass,new test_TestClass());
	}
	,_testThisJunk: function() {
		this._mainInjector.instantiate(controller_AppController);
	}
	,__class__: Main
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var controller_AppController = function() {
	this.test33Button2 = window.document.querySelector("#test33Button2");
	this.test33Button = window.document.querySelector("#test33Button");
	this.app = window.document.querySelector("#app");
	this._testThisJunk();
};
$hxClasses["controller.AppController"] = controller_AppController;
controller_AppController.__name__ = ["controller","AppController"];
controller_AppController.prototype = {
	_testThisJunk: function() {
		this.app.headerText = "Haxe Polymer Test";
		helper_DomHelper.mapDomEventHandler(this.test33Button,"click",this);
		helper_DomHelper.mapDomEventHandler(this.test33Button2,"click",this);
	}
	,onTestButtonClick: function(event) {
		js_Browser.alert("html button test33 :) event: " + event);
	}
	,onTestButtonClick2: function(event) {
		js_Browser.alert("paper-button test33 :) event: " + event);
	}
	,__class__: controller_AppController
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var helper_DomHelper = function() { };
$hxClasses["helper.DomHelper"] = helper_DomHelper;
helper_DomHelper.__name__ = ["helper","DomHelper"];
helper_DomHelper.stripDataBindingCharacters = function(string,startCharacters,endCharacters) {
	if(endCharacters == null) endCharacters = "}";
	if(startCharacters == null) startCharacters = "{";
	return StringTools.trim(StringTools.replace(StringTools.replace(string,startCharacters,""),endCharacters,""));
};
helper_DomHelper.mapDomEventHandler = function(elementInstance,eventName,hostClassInstance) {
	var tempEventHandler = helper_DomHelper.stripDataBindingCharacters(elementInstance.getAttribute("on-" + eventName));
	if(Reflect.isFunction(Reflect.field(hostClassInstance,tempEventHandler))) elementInstance.addEventListener(eventName,Reflect.field(hostClassInstance,tempEventHandler).bind(hostClassInstance)); else window.console.error("The dom references a function: " + tempEventHandler + ", but the function wasn't found in " + Type.getClassName(Type.getClass(hostClassInstance)) + ".");
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var minject_ClassMap = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["minject.ClassMap"] = minject_ClassMap;
minject_ClassMap.__name__ = ["minject","ClassMap"];
minject_ClassMap.__interfaces__ = [haxe_IMap];
minject_ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,__class__: minject_ClassMap
};
var minject_InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject_InjectionConfig;
minject_InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject_InjectionConfig.prototype = {
	getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		this.result = result;
	}
	,__class__: minject_InjectionConfig
};
var minject_Injector = function() {
	this.injectionConfigs = new haxe_ds_StringMap();
	this.injecteeDescriptions = new minject_ClassMap();
	this.attendedToInjectees = new minject_InjecteeSet();
	this.children = [];
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapValue: function(whenAskedFor,useValue,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectValueResult(useValue));
		return config;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = minject_RequestHasher.resolveRequest(forClass,named);
		var config = new minject_InjectionConfig(forClass,named);
		this.setConfig(requestName,config);
		return config;
	}
	,setConfig: function(requestName,v) {
		this.injectionConfigs.set(requestName,v);
		var _g1 = 0;
		var _g = this.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var child = this.children[i];
			if(!child.hasConfig(requestName)) child.setConfig(requestName,v);
		}
	}
	,getConfig: function(requestName) {
		return this.injectionConfigs.get(requestName);
	}
	,hasConfig: function(requestName) {
		return this.injectionConfigs.exists(requestName);
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe_rtti_Meta.getType(forClass);
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject_point_ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject_point_MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject_point_PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var typeString = fieldMeta.type[0];
				var klass = Type.resolveClass(typeString);
				var point2 = new minject_point_PropertyInjectionPoint(field,klass,name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject_InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named) {
		var requestName = minject_RequestHasher.resolveRequest(forClass,named);
		return this.injectionConfigs.get(requestName);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe_rtti_Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject_Injector
};
var minject_InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject_InjecteeSet;
minject_InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject_InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,__class__: minject_InjecteeSet
};
var minject_InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject_InjecteeDescription;
minject_InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject_InjecteeDescription.prototype = {
	__class__: minject_InjecteeDescription
};
var minject_RequestHasher = function() { };
$hxClasses["minject.RequestHasher"] = minject_RequestHasher;
minject_RequestHasher.__name__ = ["minject","RequestHasher"];
minject_RequestHasher.resolveRequest = function(forClass,named) {
	if(named == null) named = "";
	return "" + minject_RequestHasher.getClassName(forClass) + "#" + named;
};
minject_RequestHasher.getClassName = function(forClass) {
	if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
	this.makeRequestNames();
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	makeRequestNames: function() {
		this.requestNames = [];
		var _g1 = 0;
		var _g = this.args.length;
		while(_g1 < _g) {
			var i = _g1++;
			var arg = this.args[i];
			var requestName = minject_RequestHasher.resolveRequest(Type.resolveClass(arg.type),arg.name);
			this.requestNames.push(requestName);
		}
	}
	,applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g1 = 0;
		var _g = this.args.length;
		while(_g1 < _g) {
			var i = _g1++;
			var arg = this.args[i];
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getConfig(this.requestNames[i]);
			if(arg.opt && config == null) {
				values.push(null);
				continue;
			}
			var injection = config.getResponse(injector);
			values.push(injection);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject_point_NoParamsConstructorInjectionPoint;
minject_point_NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject_point_NoParamsConstructorInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject_point_NoParamsConstructorInjectionPoint
};
var minject_point_PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject_point_PostConstructInjectionPoint;
minject_point_PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject_point_PostConstructInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject_point_PostConstructInjectionPoint
};
var minject_point_PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
	this.requestName = minject_RequestHasher.resolveRequest(type,injectionName);
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var config = injector.getConfig(this.requestName);
		Reflect.setProperty(target,this.name,config.getResponse(injector));
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_result_InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject_result_InjectionResult;
minject_result_InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject_result_InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,__class__: minject_result_InjectionResult
};
var minject_result_InjectValueResult = function(value) {
	minject_result_InjectionResult.call(this);
	this.value = value;
};
$hxClasses["minject.result.InjectValueResult"] = minject_result_InjectValueResult;
minject_result_InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject_result_InjectValueResult.__super__ = minject_result_InjectionResult;
minject_result_InjectValueResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.value;
	}
	,__class__: minject_result_InjectValueResult
});
var test_TestClass = function() {
	this.id = 0;
};
$hxClasses["test.TestClass"] = test_TestClass;
test_TestClass.__name__ = ["test","TestClass"];
test_TestClass.prototype = {
	__class__: test_TestClass
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var __map_reserved = {}
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
js_Boot.__toStr = {}.toString;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
