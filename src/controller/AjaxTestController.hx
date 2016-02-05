package controller;

import haxe.Timer;
import js.*;
import js.html.*;
import jQuery.*;
import haxe.rtti.Meta;
import polymer.*;
import externs.AjaxTest;
import test.TestClass;
import typeDefinitions.GridData;
import events.Events;
import externs.GridWrapper;
//import prime.bindable.Bindable;

using StringTools;
using haxe.Json;
using polymer.Polymer;
using polymer.PolymerElement;
using helper.DomHelper;
using helper.PolymerElementHelper;

/**
 * ...
 * @author ...
 */
//@:expose
@:keep //using @:keep here to make sure dce doesn't remove what might be considered unused code
class AjaxTestController
{
	private var ajaxTestElement:AjaxTest = AjaxTest.getDomInstance('#ajaxTest');
	private var polymerAjax:PolymerAjax;
	private var downloadBtn:ButtonElement;
	
	//@inject
	private var _testClassInstance:TestClass;
	private var _signalControllerInstance:SignalController;
	
	@inject
	public function new(testClassInstance:TestClass, signalControllerInstance:SignalController)
	{
		trace('new AjaxTestController()');
		
		_testClassInstance = testClassInstance;
		trace({'new() _testClassInstance: ': _testClassInstance.toString()});
		
		_signalControllerInstance = signalControllerInstance;
		trace({'new() _signalControllerInstance: ': _signalControllerInstance});
		
		//ajaxTestElement = cast Browser.document.querySelector('#ajaxTest');
		//ajaxTestElement = AjaxTest.getDomInstance('#ajaxTest');
		ajaxTestElement.addEventListener('domReady', onDomReady);
		
		polymerAjax = cast ajaxTestElement.getShadowDomElementById('polymerAjax');
		downloadBtn = cast ajaxTestElement.getShadowDomElementById('bnDownloadJson');
		
		_testThisJunk();
	}
	
	//testing out catching custom events dispatched from custom elements
	public function onDomReady(event:CustomEvent):Void
	{
		trace({'onDomReady() test33 event':event});
	}
	
	inline public function onPolymerResponse(event:CustomEvent):Void
	{
		trace({'onPolymerResponse() event: ': event});
		trace({'onPolymerResponse() event.detail.response: ': event.detail.response});
		
		var tempResult:GridData = Json.parse(event.detail.response.stringify());
		var tempResultString:String = '';
		//var tempArray = [];
		var tempResultArray = [];//using for the grids
		
		for(tempProp in Reflect.fields(tempResult))
		{
			tempResultString += tempProp + ': ' + Reflect.field(tempResult, tempProp) + '<br>';
			//tempArray.push({tempProp:Reflect.field(tempResult, tempProp)});
		}
		
		for(i in 0...100)
		{
			tempResultArray.push(
			{
				title:tempResult.titleList[Math.ceil(Math.random() * tempResult.titleList.length) - 1],
				date:tempResult.dateList[Math.ceil(Math.random() * tempResult.dateList.length) - 1],
				type:tempResult.typeList[Math.ceil(Math.random() * tempResult.typeList.length) - 1],
				content:tempResult.contentList[Math.ceil(Math.random() * tempResult.contentList.length) - 1],
				enabled:tempResult.enabledList[Math.ceil(Math.random() * tempResult.enabledList.length) - 1]
			});
		};
		
		//Browser.window.console.log('onPolymerResponse() ajaxTestElement: ', ajaxTestElement);
		cast(ajaxTestElement.getShadowDomElementById('ajaxTestResponse'), DivElement).innerHTML = tempResultString;
		
		//cast(ajaxTestElement.getStaticShadowDomNodeList().get('gridNested'), GridWrapper).gridData = tempResultArray;
		
		////testing sharing data between 2 directives
		//MyElement.getDomInstance('#test36').declarativeMessage = event.detail.response.name + ' ' + event.detail.response.version;
		//MyElement.getDomInstance('#test36').boundText3 = event.detail.response.name + ' ' + event.detail.response.version;
		
		//var grid:Dynamic = cast Browser.document.getElementById("grid");
		//var gridNested:Dynamic = ajaxTestElement.getShadowDomElementById('gridNested');
		//grid.data = tempResultArray;//imperative works
		//gridNested.data = tempResultArray;//imperative works
		//_testClassInstance.gridData = new Bindable(cast tempResultArray);
		
		//falling back to events temporarily until i get binding working
		ajaxTestElement.fire(Events.GRID_DATA_READY, {result:tempResultArray});
		_signalControllerInstance.gridDataSignal.dispatch(tempResultArray);
		
		//trace({'onPolymerResponse() ajaxTestElement.templateInstance.model':ajaxTestElement.templateInstance.model});
		//trace({'onPolymerResponse() ajaxTestElement.templateInstance':ajaxTestElement.templateInstance});
		
		//trace({'onPolymerResponse() gridNested.templateInstance.model: ': gridNested.templateInstance.model});
		//trace({'onPolymerResponse() gridNested.templateInstance: ': gridNested.templateInstance});
		
		//Browser.window.console.log('onPolymerResponse() grid: ', grid);
		//Browser.window.console.log('onPolymerResponse() gridNested: ', gridNested);
	}
	
	//@post
	public function _testThisJunk():Void
	{
		//trace({'_testThisJunk() _testClassInstance: ': _testClassInstance.toString()});
		
		//Browser.window.console.warn('ajaxTestElement: ', ajaxTestElement);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(ajaxTestElement.localName): ', Polymer.getRegisteredPrototype(ajaxTestElement.localName));
		//Browser.window.console.log('Polymer.getRegisteredPrototype(ajaxTestElement.localName).element: ', Polymer.getRegisteredPrototype(ajaxTestElement.localName).element);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(ajaxTestElement.localName)._publishNames: ', Polymer.getRegisteredPrototype(ajaxTestElement.localName)._publishNames);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(ajaxTestElement.localName)._publishLC: ', Polymer.getRegisteredPrototype(ajaxTestElement.localName)._publishLC);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(ajaxTestElement.localName).__proto__: ', Polymer.getRegisteredPrototype(ajaxTestElement.localName).__proto__);
		
		var tempStaticShadowDomNodeList = ajaxTestElement.getStaticShadowDomNodeList();//instance preferred
		//Browser.window.console.log('tempStaticShadowDomNodeList: ', tempStaticShadowDomNodeList);
		//Browser.window.console.log("ajaxTestElement.getElementById('polymerAjax'): ", ajaxTestElement.getElementById('polymerAjax'));
		//Browser.window.console.log("tempStaticShadowDomNodeList.get('polymerAjax'): ", tempStaticShadowDomNodeList.get('polymerAjax'));
		
		//Browser.window.console.warn('polymerAjax: ', polymerAjax);
		//Browser.window.console.warn('downloadBtn: ', downloadBtn);
		
		downloadBtn.addEventListener('click', function(event){polymerAjax.go();});
		//polymerAjax.addEventListener(PolymerEvents.POLYMER_RESPONSE, onPolymerResponse);//imperative logic works 
		//polymerAjax.addEventListener(PolymerEvents.POLYMER_RESPONSE, function(event){trace('test');});//imperative logic works
		
		//testing out reading the dom and handling declared events
		polymerAjax.mapDomEventHandler(PolymerEvents.POLYMER_RESPONSE, this);
		
		//Browser.window.console.log('polymerAjax.localName: ', polymerAjax.localName);
		//Browser.window.console.log('Polymer.getRegisteredPrototype(): ', Polymer.getRegisteredPrototype(polymerAjax.localName));
	}
}