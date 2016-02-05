package polymer;

import js.*;
import js.html.*;

/**
 * ...
 * @author ...
 */
//@:native("(require('polymer-ajax'))")
//@:native("(bower-compontents/polymer-ajax/polymer-ajax.html)")
//@:native("polymer-ajax") //@:native("PolymerAjax")
//@:native("Browser.document.querySelector('ajaxTest')")
@:native("window.Polymer.getRegisteredPrototype('polymer-ajax')")
extern class PolymerAjax extends PolymerElement
{	
  public function go():String;
}