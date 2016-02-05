package polymer;

import js.html.HtmlElement;

/**
 * ...
 * @author ...
 */
@:native('Polymer')//need this so js output won't use polymer.Polymer (package.Class)
extern class Polymer 
{	
	//var extend:Dynamic;
	//static var api:PolymerAPI;
	
	static public function element(name:String, prototype:Dynamic):Void;
	static public function getRegisteredPrototype(name:String):PolymerPrototype;
	static public function registerPrototype(name:String, prototype:Dynamic):Dynamic;
  static public function instanceOfType(element:HtmlElement, type:String):Bool;
}