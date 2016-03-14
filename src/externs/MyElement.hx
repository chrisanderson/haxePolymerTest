package externs;

import haxe.ds.ObjectMap;
import js.*;
import js.html.*;
import polymer.PolymerElement;
import helper.PolymerElementHelper;

using helper.PolymerElementHelper;

/**
 * ...
 * @author Chris Anderson
 */
//@polymerElement("my-element")//only works with real classes
//@:native("window.Polymer.getRegisteredPrototype('my-element')")
@:keep
extern class MyElement extends PolymerElement
{
	//public var idList:ObjectMap<{}, String> = [selectTest => 'selectTest'];
	public var declarativeMessage(default, default):String;
	public var currentDate(default, default):String;
	public var boundText(default, default):String;
	public var boundText2(default, default):String;
	public var boundText3(default, default):String;
	
	dynamic public function currentDateChanged(value:Int):Void{trace(value);};
	public function boundText3Changed():Void;
	public function test():Void;

  //public function getShadowDomElementList():Element
  //{
  //  cast untyped __js__("{0}.$.{1}", myElementDomTest, selectTest)
  //}

  //only available in real classes
  //@:isVar public var selectTest(get, never):SelectElement;
  //public function get_selectTest():SelectElement
  //{
  //  return cast untyped __js__("{0}.$.{1}", this, selectTest);
  //  //return polymerElementInstance.getShadowDomElement('#selectTest');
  //  //return cast polymerElementInstance.shadowRoot.querySelector('#selectTest');
  //}
	
	//was hoping i could use getter/setter with a method that has a param 
	//but doesn't work as expected
	//@:isVar public var selectTest(get, never):SelectElement;
	//public function get_selectTest(polymerElementInstance:PolymerElement):SelectElement
	//{
	//	trace({'get_selectTest() polymerElementInstance: ': polymerElementInstance});
  //
	//	return polymerElementInstance.get('selectTest');
	//	//return polymerElementInstance.getShadowDomElement('#selectTest');
	//	//return cast polymerElementInstance.shadowRoot.querySelector('#selectTest');
	//}
}