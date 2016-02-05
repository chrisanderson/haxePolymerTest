package helper;

import haxe.ds.StringMap;
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
	{
		//return polymerElementInstance[untyped __js__("'.$'")];
		//return untyped __js__('$polymerElementInstance.$');
		//return untyped __js__('window.document.querySelector("#test36").$');//fix here temp code
		
		var tempElementsWithIdList = polymerElementInstance.shadowRoot.querySelectorAll('[id]');
		//var tempElementId = polymerElementInstance.shadowRoot.querySelector('#selectTest').id;
		var tempResult:StringMap<Element> = new StringMap<Element>();// = 
		//[
			//'$tempElementId' => polymerElementInstance.shadowRoot.querySelector('#selectTest'),
			//'selectTest' => polymerElementInstance.shadowRoot.querySelector('#selectTest')
		//];
		
		for(tempProp in tempElementsWithIdList)
		{
			//Browser.window.console.warn('getStaticShadowDomNodeList() tempProp: ', tempProp);
			
			var tempElement:Element = cast tempProp;
			var tempElementId = tempElement.id;//.replace('$', '');
			
			tempResult.set(tempElementId, cast tempProp);
		}
		
		//Browser.window.console.warn('getStaticShadowDomNodeList() tempResult: ', tempResult);
		
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