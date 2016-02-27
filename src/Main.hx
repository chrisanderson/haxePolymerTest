package;

import controller.*;
import externs.*;
import haxe.Timer;
import js.*;
import js.html.*;
import jQuery.*;
import haxe.rtti.Meta;
import polymer.*;
import helper.*;
import helper.*;
import minject.Injector;
import test.TestClass;

using StringTools;
using haxe.Json;
using polymer.Polymer;
//using polymer.PolymerElement;
using helper.DomHelper;
using helper.PolymerElementHelper;
using externs.MyElement;

/**
 * ...
 * @author Chris Anderson
 */
class Main
{
	private var app:App = cast Browser.document.querySelector('#app');
	private var _mainInjector:Injector;
	
	static function main()
	{
		//trace('Main.main()');
		
		var mainInstance = new Main();
	}
	
	public function new()
	{
		//trace('Main.new()');
		
		js.Browser.window.addEventListener(PolymerEvents.POLYMER_READY, onPolymerReady);
		js.Browser.window.addEventListener(PolymerEvents.WEB_COMPONENTS_READY, onWebComponentsReady);
	}
	
	public function onPolymerReady(event:CustomEvent)
	{
		trace({'onPolymerReady() event':event});
		
		//Browser.window.console.warn("untyped __js__('window.Polymer'): ", untyped __js__('window.Polymer'));
		
		//var polymerTest:Polymer = new Polymer();
		//Browser.window.console.warn('polymerTest: ', polymerTest);
		//Browser.window.console.warn('Polymer: ', Polymer);
		//Browser.window.console.warn('polymerTest.api: ', polymerTest.api);
		//Browser.window.console.warn('Polymer.api: ', Polymer.api);
		
		//var template = Browser.document.querySelector('template');
		//Browser.window.console.log('template: ', template);
		
		//var test = new controller.AjaxTestController();
		//_testThisJunk();
	}
	
	public function onWebComponentsReady(event:CustomEvent)
	{
		trace({'onWebComponentsReady() event': event});
		
		app.addEventListener('template-bound', _onAppTemplateBound);
	}
	
	public function _onAppTemplateBound(event):Void
	{
		trace('_onAppTemplateBound()');
		
		_mainInjector = new Injector();
		_initializeContext();
		
		_testThisJunk();
		
		//var ajaxTestController = new controller.AjaxTestController();
		//_mainInjector.injectInto(ajaxTestController);
		_mainInjector.instantiate(AjaxTestController);
		
		trace({'_onAppTemplateBound() _mainInjector.hasMapping(TestClass)': _mainInjector.hasMapping(TestClass)});
	}
	
	private function _initializeContext()
	{
		trace('_initializeContext()');
		
		//using mapValue() to ensure TestClass constructor is used
		_mainInjector.mapValue(TestClass, new TestClass());
		_mainInjector.mapValue(SignalController, new SignalController());
	}
	
	private function _testThisJunk()
	{
		_mainInjector.instantiate(AppController);
		
		//var app:App = cast Browser.document.querySelector('#app');
		//app.headerText = 'Haxe Polymer Test';
		//
		//app.onTestButtonClick = function(event)
		//{
			//Browser.alert('test33 :)');
		//}
		
		//var appElement:AppElement = AppElement.getDomInstance('#appElement');
		var appElement:AppElement = cast Browser.document.querySelector('#appElement');
		trace({'appElement': appElement});
		//Browser.window.console.warn('appElement.declarativeMessage: ', appElement.declarativeMessage);
		//Browser.window.console.log('appElement.localName: ', appElement.localName);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(appElement.localName): ', Polymer.getRegisteredPrototype(appElement.localName));
		//Browser.window.console.log('Polymer.getRegisteredPrototype(appElement.localName).element: ', Polymer.getRegisteredPrototype(appElement.localName).element);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(appElement.localName)._publishNames: ', Polymer.getRegisteredPrototype(appElement.localName)._publishNames);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(appElement.localName)._publishLC: ', Polymer.getRegisteredPrototype(appElement.localName)._publishLC);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(appElement.localName).__proto__: ', Polymer.getRegisteredPrototype(appElement.localName).__proto__);
		
		appElement.test();
		
		var myElementDomTest:MyElement = MyElement.getDomInstance('#test36');
		//var myElementDomTest:MyElement = new MyElement('#test36');
		trace("typeof(myElementDomTest): " + Type.typeof(myElementDomTest));
		//myElementTest.test();
		//Browser.window.console.warn('myElementDomTest: ', myElementDomTest);
		//Browser.window.console.warn('myElementDomTest.declarativeMessage: ', myElementDomTest.declarativeMessage);
		myElementDomTest.declarativeMessage = 'test36 !!! changed @ runtime by haxe !!!';
		//Browser.window.console.warn('myElementDomTest.declarativeMessage: ', myElementDomTest.declarativeMessage);
		//Browser.window.console.log('appElement.localName: ', appElement.localName);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(myElementDomTest.localName): ', Polymer.getRegisteredPrototype(myElementDomTest.localName));
		//Browser.window.console.log('Polymer.getRegisteredPrototype(myElementDomTest.localName).element: ', Polymer.getRegisteredPrototype(myElementDomTest.localName).element);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(myElementDomTest.localName)._publishNames: ', Polymer.getRegisteredPrototype(myElementDomTest.localName)._publishNames);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(myElementDomTest.localName)._publishLC: ', Polymer.getRegisteredPrototype(myElementDomTest.localName)._publishLC);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(myElementDomTest.localName).__proto__: ', Polymer.getRegisteredPrototype(myElementDomTest.localName).__proto__);
		
		myElementDomTest.test();
		
		//var myElementTest = MyElement.prototype;
		//trace("typeof(myElementTest): " + Type.typeof(myElementTest));
		////MyElement.test();
		//Browser.window.console.warn('myElementTest: ', myElementTest);
		//Browser.window.console.warn('myElementTest._tagName: ', myElementTest._tagName);
		//myElementTest._boundTextInput.value = "asdfafadsfadfas";//blows up :(
		
		var myElementDomTest2:MyElement = MyElement.getDomInstance('#test33');
		//var myElementDomTest2:MyElement = new MyElement('#test33');
		//trace("typeof(myElementDomTest2): " + Type.typeof(myElementDomTest2));
		//Browser.window.console.warn('myElementDomTest2: ', myElementDomTest2);
		//Browser.window.console.warn('myElementDomTest2.declarativeMessage: ', myElementDomTest2.declarativeMessage);
		myElementDomTest2.declarativeMessage = 'test33 !!! changed @ runtime by haxe !!!';
		//Browser.window.console.warn('myElementDomTest2.declarativeMessage: ', myElementDomTest2.declarativeMessage);
		
		var tempAppNestedContent:Dynamic = Browser.document.querySelector('#appNestedContent');
		trace({'tempAppNestedContent':tempAppNestedContent});
		tempAppNestedContent.declarativeMessage = appElement.declarativeMessage;
		
		var myNestedElement:MyElement = MyElement.getDomInstance('#test32');
		var tempTest32NestedContent:Dynamic = Browser.document.querySelector('#test32NestedContent');
		tempTest32NestedContent.declarativeMessage = appElement.declarativeMessage;
		tempTest32NestedContent.myElementDeclarativeMessage = myNestedElement.declarativeMessage;
		
		//was thinking about binding tempTest32NestedContent.myElementDeclarativeMessage to myNestedElement.declarativeMessage if possible
		//var tempBoundTextInput = cast myNestedElement.boundTextInput;//.bind("value", new PathObserver(myElementDomTest2, "boundText"));//preferred
		//tempBoundTextInput.bind("textContent", new PathObserver(myNestedElement, "declarativeMessage"));
		
		var tempStaticShadowDomNodeList = myElementDomTest.getStaticShadowDomNodeList();//instance preferred
		Browser.window.console.log('tempStaticShadowDomNodeList: ', tempStaticShadowDomNodeList);
		//Browser.window.console.log("myElementDomTest.getElementById('selectTest'): ", myElementDomTest.getElementById('selectTest'));
		//Browser.window.console.log("tempStaticShadowDomNodeList.get('selectTest'): ", tempStaticShadowDomNodeList.get('selectTest'));
		
		//testing out NodeBind outside of templates
		//tempStaticShadowDomNodeList.boundTextInput.bind("value", new PathObserver(myElementDomTest2, "boundText"));//works but tempStaticShadowDomNodeList is dynamic so we don't really know what properties would be found at runtime
		//var test = cast myElementDomTest.boundTextInput;//.bind("value", new PathObserver(myElementDomTest2, "boundText"));//preferred
		//test.bind("value", new PathObserver(myElementDomTest2, "boundText"));//preferred 
		//myElementDomTest.boundTextInput.value = 'dfadfdfadfadf';//works when binding is off 
		
		//var selectTest:SelectElement = cast untyped __js__('window.document.querySelector("#test36").$.selectTest');//fix here works but want to tap MyElement for this
		//var selectTest:SelectElement = cast tempStaticShadowDomNodeList.selectTest;//works but tempStaticShadowDomNodeList is dynamic
		//var selectTest:SelectElement = cast myElementDomTest.getShadowDomElement('#selectTest33');//works but dev has to know the elements available in the shadow dom
		//var selectTest:SelectElement = cast tempStaticShadowDomNodeList.selectTest;
		var selectTest:SelectElement = cast tempStaticShadowDomNodeList.get('selectTest');//works but dev has to know the elements available in the shadow dom
		//var selectTest:SelectElement = cast tempStaticShadowDomNodeList['selectTest'];
		//var selectTest:SelectElement = myElementDomTest.get_selectTest();//works
		
		selectTest.addEventListener('change', function(event)
		{
			//Browser.window.console.log('onSelectTestChange() event: ', event);
			
			var tempOptionCollection:Array<OptionElement> = cast selectTest.options;
			var tempSelectedOption:OptionElement = null;
			
			for(tempOption in tempOptionCollection)
			{
				if(tempOption.selected)
				{
					tempSelectedOption = cast tempOption;
				}
			}
			
			//Browser.window.console.log('onSelectTestChange() tempSelectedOption: ', tempSelectedOption);
			//Browser.window.console.log('onSelectTestChange() tempSelectedOption.value: ', tempSelectedOption.value);
			
			myElementDomTest.boundText3 = 'test' + tempSelectedOption.value;
		});
		
		//testing code completion macros
		trace('test33 macro test: ' + DomElementHelper.index__html);
		
		//testing overriding extern methods
		//myElementDomTest.currentDateChanged = function(value)
		//{
			//trace(value);
		//}
		
		//
		var testTemplate:PolymerElement = cast Browser.document.querySelector('#testTemplate');
		trace({'testTemplate': testTemplate});
		//var tempGrid = testTemplate.getStaticShadowDomNodeList();// .get('grid');
		//Browser.window.console.log('tempGrid: ', tempGrid);
	}
}