package;

import haxe.Timer;
import js.Boot;
import js.Browser;
import js.html.ButtonElement;
import js.html.CustomEvent;
import js.html.Element;
import js.html.Event;
import js.html.HtmlElement;
import js.html.HTMLOptionsCollection;
import js.html.InputElement;
import js.html.OptionElement;
import js.html.SelectElement;
import js.Lib;
import jQuery.*;
import haxe.rtti.Meta;

using StringTools;
using haxe.Json;

/**
 * ...
 * @author Chris Anderson
 */
class Main 
{
	static function main()
	{
		trace('Main.main()');
		
		var mainInstance = new Main();
	}
	
	public function new()
	{
		trace('Main.new()');
		
		js.Browser.window.addEventListener(PolymerEvents.POLYMER_READY, onPolymerReady);
		js.Browser.window.addEventListener(PolymerEvents.WEB_COMPONENTS_READY, onWebComponentsReady);
	}
	
	public function onPolymerReady(event:CustomEvent)
	{
		Browser.window.console.log('onPolymerReady() event: ', event);
		
		//Browser.window.console.warn("untyped __js__('window.Polymer'): ", untyped __js__('window.Polymer'));
		
		//var polymerTest:Polymer = new Polymer();
		//Browser.window.console.warn('polymerTest: ', polymerTest);
		//Browser.window.console.warn('Polymer: ', Polymer);
		//Browser.window.console.warn('polymerTest.api: ', polymerTest.api);
		//Browser.window.console.warn('Polymer.api: ', Polymer.api);
		
		//var template = Browser.document.querySelector('template');
		//Browser.window.console.log('template: ', template);
		
		_testThisJunk();
	}
	
	public function onPolymerResponse(event:CustomEvent)
	{
		Browser.window.console.log('onPolymerResponse() event: ', event);
		Browser.window.console.log('onPolymerResponse() event.detail.response: ', event.detail.response);
		
		Browser.document.querySelector('#ajaxTestResponse').textContent = event.detail.response.stringify();
	}
	
	public function onWebComponentsReady(event:CustomEvent)
	{
		Browser.window.console.log('onWebComponentsReady() event: ', event);
	}
	
	private function _testThisJunk()
	{		
		var ajaxTest:PolymerAjax = PolymerAjax.instance;
		Browser.window.console.warn('ajaxTest: ', ajaxTest);
		//ajaxTest.addEventListener(PolymerEvents.POLYMER_RESPONSE, onPolymerResponse);//works but testing handling the declared version in the dom
		//ajaxTest.go();
		
		var tempBnDownloadJson:ButtonElement = cast Browser.document.querySelector('#bnDownloadJson');
		tempBnDownloadJson.addEventListener('click', function(event){ajaxTest.go();});
		
		function stripCurlyBraces(string:String):String
		{
			var tempString = string;
			tempString = tempString.replace('{', '').replace('}', '');
			
			return tempString;
		}
		
		var tempEventHandler = stripCurlyBraces(ajaxTest.getAttribute(PolymerEventHandlers.ON_POLYMER_RESPONSE));
		
		if(Reflect.isFunction(Reflect.field(this, tempEventHandler)))
	  {
	    trace('found function: ' + tempEventHandler);
			
      ajaxTest.addEventListener(PolymerEvents.POLYMER_RESPONSE, onPolymerResponse);
			
			//function test(event) 
			//{
				//Browser.window.console.log('onPolymerResponse() event: ', event);
				//Reflect.callMethod(this, Reflect.field(this, tempEventHandler), [event]);
			//};
			//test();
	  }
	  else
	  {
		  throw 'The dom references a function: ' + tempEventHandler + ' but the function wasn\'t found in this class.';
	  }
	
		var myElementDomTest:MyElement = MyElement.getDomInstance('#test36');
		//var myElementDomTest:MyElement = new MyElement('#test36');
		trace("typeof(myElementDomTest): " + Type.typeof(myElementDomTest));
		//myElementTest.test();
		Browser.window.console.warn('myElementDomTest: ', myElementDomTest);
		Browser.window.console.warn('myElementDomTest.declarativeMessage: ', myElementDomTest.declarativeMessage);
		myElementDomTest.declarativeMessage = 'test36 !!! changed @ runtime by haxe !!!';
		Browser.window.console.warn('myElementDomTest.declarativeMessage: ', myElementDomTest.declarativeMessage);
		
		var myElementTest = MyElement.prototype;
		trace("typeof(myElementTest): " + Type.typeof(myElementTest));
		//MyElement.test();
		Browser.window.console.warn('myElementTest: ', myElementTest);
		//Browser.window.console.warn('myElementTest._tagName: ', myElementTest._tagName);
		//myElementTest._boundTextInput.value = "asdfafadsfadfas";//blows up :(
		
		var myElementDomTest2:MyElement = MyElement.getDomInstance('#test33');
		//var myElementDomTest2:MyElement = new MyElement('#test33');
		trace("typeof(myElementDomTest2): " + Type.typeof(myElementDomTest2));
		Browser.window.console.warn('myElementDomTest2: ', myElementDomTest2);
		Browser.window.console.warn('myElementDomTest2.declarativeMessage: ', myElementDomTest2.declarativeMessage);
		myElementDomTest2.declarativeMessage = 'test33 !!! changed @ runtime by haxe !!!';
		Browser.window.console.warn('myElementDomTest2.declarativeMessage: ', myElementDomTest2.declarativeMessage);
		
		var tempTimer = new Timer(1000);
		tempTimer.run = function()
		{
			myElementDomTest.currentDate = untyped __js__('moment().format("MMMM Do YYYY, h:mm:ss a")');
			myElementDomTest2.currentDate = untyped __js__('moment().format("MMMM Do YYYY, h:mm:ss a")');
		}
		
		var tempStaticShadowDomNodeList = myElementDomTest.staticShadowDomNodeList;//preferred
		//var tempStaticShadowDomNodeList = MyElement.staticShadowDomNodeList();
		Browser.window.console.log('tempStaticShadowDomNodeList: ', tempStaticShadowDomNodeList);
		Browser.window.console.log('tempStaticShadowDomNodeList.selectTest: ', tempStaticShadowDomNodeList.selectTest);
		
		//var selectTest:SelectElement = cast untyped __js__('window.document.querySelector("#test36").$.selectTest');//fix here works but want to tap MyElement for this
		//var selectTest:SelectElement = MyElement.getDomInstance('#test36').selectTest;
		var selectTest:SelectElement = myElementDomTest.selectTest;
		selectTest.addEventListener('change', function(event)
		{
			Browser.window.console.log('onSelectTestChange() event: ', event);
			
			var tempOptionCollection:HTMLOptionsCollection = cast selectTest.selectedOptions;
			var tempOption:OptionElement = cast tempOptionCollection[0];
			
			Browser.window.console.log('onSelectTestChange() tempOption: ', tempOption);
			Browser.window.console.log('onSelectTestChange() tempOption.value: ', tempOption.value);
			
			myElementDomTest.boundText3 = 'test' + tempOption.value;
		});
	}
}

@:native('window.Platform')
extern class Platform 
{
	static public function mixin():Void;
}

class PolymerEvents 
{
  inline static public var POLYMER_READY = 'polymer-ready';
  inline static public var POLYMER_RESPONSE = 'polymer-response';
  inline static public var WEB_COMPONENTS_READY = 'WebComponentsReady';
}

class PolymerEventHandlers 
{
  inline static public var ON_POLYMER_READY = 'on-polymer-ready';
  inline static public var ON_POLYMER_RESPONSE = 'on-polymer-response';
}

@:native('window.Polymer')
extern class Polymer 
{
	//static var _polymerInstance:Polymer;
	//
	//static var instance(get, never):Polymer; 
	//static inline function get_instance():Polymer
	//{
		//return untyped __js__('window.Polymer');
	//} 
	
	//static function main():Void 
	//{
		//trace('Polymer.main()');
		//
		//new Polymer();
	//}
	
	public function new()
	{
		trace('Polymer.new()');
		
		//Browser.window.console.warn("instance: ", instance);
		//
		//_polymerInstance = instance;
	}
	
	//static public function __init__():Void
	//{
		//trace('Polymer.__init__');
		////_polymerInstance = instance;
	//}
	
	var extend:Dynamic;
	static var api:PolymerAPI;
	
	static public function element(name:String, prototype:Dynamic):Void;
	static public function getRegisteredPrototype(elementName:String):Dynamic;
}

//@:native('polymer-body')
@:native("window.Polymer.getRegisteredPrototype('polymer-body')")
extern class PolymerBody
{
}

//@:native('polymer-element')
@:native("window.Polymer.getRegisteredPrototype('polymer-element')")
extern class PolymerElement extends HtmlElement
{
	var extend:Dynamic;
	var api:PolymerAPI;
	var queue:Dynamic;
	var whenPolymerReady:Dynamic;
	var getRegisteredPrototype:Dynamic;
	var waitingForPrototype:Dynamic;
}

/* example
package test;
@:keep
@:registerElement("hx-btn")
class Btn extends js.html.Element {
    function createdCallback(){
        var shadow:js.html.Element = untyped this.createShadowRoot();
        var text=getAttribute("text");
        shadow.innerHTML='<input type="button" value="$text" />';
    }
    function attachedCallback(){}    
    function detachedCallback(){}    
    function attributeChangedCallback(attrName:String, oldVal:String, newVal:String){}
}
That generates: 
var test_Btn = document.registerElement("hx-btn",{
    prototype: Object.create(Element.prototype, {
        createdCallback:{value: function() {
            var shadow = this.createShadowRoot();
            var text = this.getAttribute("text");
            shadow.innerHTML = "<input type=\"button\" value=\"" + text + "\" />";
        }},
        attachedCallback:{value: function() {
        }},
        detachedCallback:{value: function() {
        }},
        attributeChangedCallback:{value: function(attrName,oldVal,newVal) {
        }}
    })
});
*/ 

@polymerElement("my-element")
@:native("window.Polymer.getRegisteredPrototype('my-element')")
extern class MyElement extends PolymerElement
{	
	//public var _tagName:String;
	public var declarativeMessage:String;
	public var currentDate:String;
	public var boundText:String;
	public var boundText2:String;
	public var boundText3:String;
	
	public function ready():Void;
	public function currentDateChanged():Void;
	
	public function boundText3Changed():Void
	{
		this.declarativeMessage = this.boundText3;
		this.boundText = this.declarativeMessage;
		this.boundText2 = this.declarativeMessage;
	}
	
	static public function test():Void;
	
	//--------------------------------------	
	static public var elementId:String;
	
	public var domInstance(get, never):MyElement;
	static public var prototype(get, never):MyElement;
	
	//static public var declarativeMessage(get, never):String;
	public var _boundTextInput(get, never):InputElement;
	public var _tagName(get, never):String;
	
	static inline public function get_prototype():MyElement
	{
		trace('MyElement.get_prototype()');
		
		//trace('haxe.rtti.Meta.getType(MyElement): ' + haxe.rtti.Meta.getType(MyElement));
		
		return Polymer.getRegisteredPrototype('my-element');
	}
	
	static inline public function getDomInstance(elementId:String):MyElement
	{
		trace('MyElement.getDomInstance() elementId: ' + elementId);
		
		MyElement.elementId = elementId;
		//Browser.document.querySelector(elementId).id = elementId;
		
		//trace('haxe.rtti.Meta.getType(MyElement): ' + haxe.rtti.Meta.getType(MyElement));
		
		return cast Browser.document.querySelector(elementId);
	}
	
	public function new(?elementId:String)
	{
		trace('MyElement.new() elementId: ', elementId);
		
		if(elementId != null)
		{
			MyElement.elementId = elementId;
			
			staticShadowDomNodeList = untyped __js__('window.document.querySelector("#test36").$');
		}
	}
	
	static public function __init__():Void
	{
		trace('MyElement.__init__');
	}
	
	inline public function get_declarativeMessage():String
	{
		//return getDomInstance(MyElement.elementId) + untyped __js__('.declarativeMessage');
		
		var tempMyElement:MyElement = cast new MyElement(elementId);
		return cast untyped document.querySelector(elementId).declarativeMessage;
	}
	
	private function get_boundTextInput():InputElement
	{
		return getDomInstance(MyElement.elementId) + untyped __js__('.$.boundTextInput');
	}
	
	private function get_tagName():String
	{
		return getDomInstance(MyElement.elementId) + untyped __js__('._tagName');
	}
	
	//fix here
	public var selectTest(get, never):SelectElement;
	inline public function get_selectTest():SelectElement
	{
		return cast untyped __js__('window.document.querySelector("#test36").$.selectTest');
	}
	
	//public var staticShadowDomNodeList:Dynamic;// = untyped __js__('window.document.querySelector("#test36").$');
	public var staticShadowDomNodeList(get, never):Dynamic;
	inline public function get_staticShadowDomNodeList():Dynamic
	{
		return untyped __js__('window.document.querySelector("#test36").$');
	}
}

//@:native("(require('polymer-ajax'))")
//@:native("(bower-compontents/polymer-ajax/polymer-ajax.html)")
//@:native("polymer-ajax") //@:native("PolymerAjax")
//@:native("Browser.document.querySelector('ajaxTest')")
@:native("window.Polymer.getRegisteredPrototype('polymer-ajax')")
extern class PolymerAjax extends PolymerElement
{	
  public function go():String;
	
	//--------------------------------------	
	static public var instance(get, never):PolymerAjax;
	
	static inline public function get_instance():PolymerAjax
	{
		trace('PolymerAjax.get_instance()');
		
		//return Polymer.getRegisteredPrototype('polymer-ajax');
		return cast Browser.document.querySelector('#ajaxTest');
		
		//haxe.rtti.Meta.getType(PolymerAjax).customElementName
	}
	
	public function new()
	{
		trace('PolymerAjax.new()');
	}
	
	static public function __init__():Void
	{
		trace('PolymerAjax.__init__');
	}
}

@:native("window.Polymer.api")
extern class PolymerAPI
{	
	var extend:Dynamic;
  var api:PolymerAPI;
}