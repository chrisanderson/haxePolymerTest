package helper;

import js.*;
import js.html.Element;
import polymer.*;

using StringTools;
using helper.DomHelper;

/**
 * ...
 * @author Chris Anderson
 */
class DomHelper
{
	static inline public function getDomInstance(polymerElementClass:Class<PolymerElement>, elementId:String):Dynamic
	{
		return Browser.document.querySelector(elementId);
	}
	
	static public function stripDataBindingCharacters(string:String, ?startCharacters:String = '{', ?endCharacters:String = '}'):String
	{
		return string.replace(startCharacters, '').replace(endCharacters, '').trim();
	}
	
	/**
	 * Try to find a Haxe event handler that matches an event handler declared in the dom
	 */
	static inline public function mapDomEventHandler(elementInstance:Element, eventName:String, hostClassInstance:Dynamic):Void
	{
		trace({'mapEventHandler() elementInstance':elementInstance});
		trace({'mapEventHandler() hostClassInstance':hostClassInstance});
		trace({'mapEventHandler() eventName':eventName});
		
		var tempEventHandler = elementInstance.getAttribute(PolymerBase.EVENT_PREFIX + eventName).stripDataBindingCharacters();
		
		//trace('tempEventHandler.length: ' + tempEventHandler.length);
		//trace('onPolymerResponse.length: ' + 'onPolymerResponse'.length);
		//trace('tempEventHandler == onPolymerResponse: ' + (tempEventHandler == 'onPolymerResponse'));
		
		//Browser.window.console.warn('mapEventHandler() tempEventHandler: ', tempEventHandler);
		//Browser.window.console.warn('mapEventHandler() Reflect.field(hostClassInstance, tempEventHandler): ', Reflect.field(hostClassInstance, tempEventHandler));
		//Browser.window.console.warn('mapEventHandler() Reflect.isFunction(Reflect.field(hostClassInstance, tempEventHandler)): ', Reflect.isFunction(Reflect.field(hostClassInstance, tempEventHandler)));
		
		if(Reflect.isFunction(Reflect.field(hostClassInstance, tempEventHandler)))
	  {
	    //trace('found function: ' + tempEventHandler);
			
      elementInstance.addEventListener(eventName, Reflect.field(hostClassInstance, tempEventHandler).bind(hostClassInstance));
      //elementInstance.addEventListener(eventName, fireEvent);
			
			//function fireEvent(?event)
			//{
				////Browser.window.console.log('$tempEventHandler() event: ', event);
				//Reflect.callMethod(hostClassInstance, Reflect.field(hostClassInstance, tempEventHandler), [event]);
			//};
			//fireEvent();
	  }
	  else
	  {
			//after updating to haxe 3.2 throw doesn't seem to work as intended
			//throw 'The dom references a function: $tempEventHandler, but the function wasn\'t found in ${Type.getClassName(Type.getClass(hostClassInstance))}.';
			Browser.console.error('The dom references a function: $tempEventHandler, but the function wasn\'t found in ${Type.getClassName(Type.getClass(hostClassInstance))}.');
		}
	}
}