package externs;

import js.*;
import js.html.*;
import polymer.PolymerElement;

/**
 * ...
 * @author Chris Anderson
 */
//@polymerElement("app-element")
//@:native("window.Polymer.getRegisteredPrototype('app-element')")
extern class AppElement extends PolymerElement
{
	public var declarativeMessage(default, default):String;
	
	public function currentDateChanged():Void;
	public function test():Void;
}