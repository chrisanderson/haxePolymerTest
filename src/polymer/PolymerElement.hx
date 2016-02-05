package polymer;

import js.*;
import js.html.*;
import typeDefinitions.TemplateInstance;

/**
 * ...
 * @author ...
 */
//@:native('polymer-element')
//@:native("Polymer.getRegisteredPrototype('polymer-element')")
extern class PolymerElement extends PolymerBase implements ArrayAccess<Node>
{
	//var extend:Dynamic;
	//var api:PolymerAPI;
	//var queue:Dynamic;
	//var whenPolymerReady:Dynamic;
	//var getRegisteredPrototype:Dynamic;
	//var waitingForPrototype:Dynamic;
	
	//public function waitingForPrototype(name:String):Void{}
	
	#if(haxe_ver < 3.2)
		//shadowRoot is now part of haxe std js lib in 3.2 and higher
		public var shadowRoot:DocumentFragment;//not sure where to throw this
	#end
	
	public var templateInstance:TemplateInstance;//not sure where to throw this
}