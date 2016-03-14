package helper;

import externs.MyElement;
import haxe.ds.*;
import js.*;
import js.html.*;

import polymer.*;

using helper.DomHelper;
using StringTools;

/**
 * ...
 * @author Chris Anderson
 * A collection of methods that help Haxe interact with Polymer Elements
 */
class PolymerElementHelper //extends PolymerElement
{	
	//had thought about grabbing an array of all shadowDom elements with an id similar to polymer's $ shortcut
	//would be cool if i could return a struct similar to $ instead StringMap<Element>
	static inline public function getStaticShadowDomNodeList(polymerElementInstance:PolymerElement):StringMap<Element>
	//static inline public function getStaticShadowDomNodeList(polymerElementInstance:PolymerElement):ObjectMap<{}, Dynamic>
	{
		var tempNodeList:ObjectMap<Dynamic, Element> = cast untyped __js__("{0}.$", polymerElementInstance);
		//var tempNodeList = untyped __js__("{0}.$", polymerElementInstance);

    Browser.window.console.log("test33 typeof: ", Type.typeof(tempNodeList));
    Browser.window.console.log("test33 tempNodeList: ", tempNodeList);
    //Browser.window.console.log("test33 tempNodeList.keys(): ", tempNodeList.keys());
    //Browser.window.console.log("test33 tempNodeList.toString(): ", tempNodeList.toString());
    //$type(tempNodeList);

		//return tempNodeList;
		
		//var tempElementsWithIdList:Array<Element> = Lambda.array(tempNodeList);
    var tempElementsWithIdList:NodeList = polymerElementInstance.shadowRoot.querySelectorAll('[id]');

    Browser.window.console.log("tempElementsWithIdList:", tempElementsWithIdList);

		//var tempElementId = polymerElementInstance.shadowRoot.querySelector('#selectTest').id;
		var tempResult:StringMap<Element> = new StringMap<Element>();// =
		//[
			//'$tempElementId' => polymerElementInstance.shadowRoot.querySelector('#selectTest'),
			//'selectTest' => polymerElementInstance.shadowRoot.querySelector('#selectTest')
		//];

		//for(tempProp in tempNodeList.keys())
		for(tempProp in tempElementsWithIdList)
		{
			//Browser.window.console.warn('getStaticShadowDomNodeList() tempProp: ', tempProp);

			var tempElement:Element = cast tempProp;
			var tempElementId = tempElement.id;//.replace('$', '');

			tempResult.set(tempElementId, cast tempProp);
		}

		Browser.window.console.warn('getStaticShadowDomNodeList() tempResult: ', tempResult);

		return tempResult;
	}
	
	static inline public function getShadowDomElementById(polymerElementInstance:PolymerElement, elementId:String):Dynamic
	{
		var tempStaticShadowDomNodeList = getStaticShadowDomNodeList(polymerElementInstance);
		var tempResult = tempStaticShadowDomNodeList.get(elementId);
		
		return (tempResult != null) ? tempResult : throw 'Element with id: $elementId wasn\'t found in $tempStaticShadowDomNodeList.';
	}
	
	static inline public function getShadowDomElement(polymerElementInstance:PolymerElement, shadowDomElementId:String):Element
	{
		var tempResult = cast(polymerElementInstance.shadowRoot.querySelector(shadowDomElementId), Element);
		
		return (tempResult != null) ? tempResult : throw 'Element with id: $shadowDomElementId wasn\'t found in ${polymerElementInstance.localName}.shadowRoot.';
	}
}

//class NodeListIterator
//{
//  var _objectMap:ObjectMap<{}, Element>;
//  var _i:Int;
//
//  public function new(objectMap:ObjectMap<{}, Element>)
//  {
//    this._objectMap = objectMap;
//    _i = 0;
//  }
//
//  public function hasNext()
//  {
//    return i < _objectMap.keys().;
//  }
//
//  public function next()
//  {
//    return s.charAt(i++);
//  }
//}