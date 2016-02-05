package externs;

import polymer.PolymerElement;

/**
 * ...
 * @author ...
 */
extern class GridWrapper extends PolymerElement
{
	public var gridData(default, default):Array<Dynamic>;
	
	public function setGridData(gridData:Array<Dynamic>):Void;
}