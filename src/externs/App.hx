package externs;

import polymer.PolymerElement;

/**
 * ...
 * @author ...
 */
extern class App extends PolymerElement
{
	public var headerText(default, default):String;
	
	public var gridData(default, default):Array<Dynamic>;
	public var gridDataSource(default, default):Dynamic;
	
	//dynamic public function onTestButtonClick(event:Dynamic):Void;
}