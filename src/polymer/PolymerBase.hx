package polymer;

import js.html.*;

/**
 * @author Chris Anderson
 */
extern class PolymerBase extends HtmlElement implements ArrayAccess<Node>
{
	static inline var EVENT_PREFIX:String = 'on-';
	
	public function created():Void;
	public function ready():Void;
	public function attached():Void;
	public function domReady():Void;
	public function detached():Void;
	
	public function marshalNodeReferences():Void;
	
	//public function fire(event:CustomEvent, detail:Dynamic, sender:Dynamic):Void;
	public function fire(event:String, detail:Dynamic):Void;
}