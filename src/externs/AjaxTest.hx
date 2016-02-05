package externs;

import js.html.CustomEvent;
import polymer.PolymerElement;

/**
 * ...
 * @author ...
 */
extern class AjaxTest extends PolymerElement
{
	public var url(default, default):String;
	
	public function onPolymerResponse(event:CustomEvent):Void;
	public function setGridData(gridData:Array<Dynamic>):Void;
	
	//doesn't work but would be nice
	override public function domReady():Void
	{
		this.fire('domReady', {});
	}
}