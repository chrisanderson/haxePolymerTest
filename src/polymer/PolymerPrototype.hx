package polymer;

/**
 * @author Chris Anderson
 */

typedef PolymerPrototype = 
{
	//>PolymerBase,//inherit from PolymerBase//not sure about this'n
	
	var __proto__:PolymerBase;
	
	var _instanceAttributes:Array<Dynamic>;
	var _observeNames:Array<Dynamic>;
	var _publishLC:Dynamic;
	var _publishNames:Array<String>;
	
	var element:PolymerElement;
	var eventDelegates:Dynamic;
	var observe:Dynamic;
	var publish:Dynamic;
	var reflect:Dynamic;
	
	function domReady():Void;
	function ready():Void;
	function resolvePath(urlPath:String, base:String):Void;
}