package externs.polymer;

import polymer.PolymerElement;

/**
 * ...
 * @author ...
 */
extern class CoreIconButton extends PolymerElement
{
	public var src(default, default):String;
	public var active(default, default):Bool;
	public var icon(default, default):String;
	
	dynamic public function activeChanged():Void;
}