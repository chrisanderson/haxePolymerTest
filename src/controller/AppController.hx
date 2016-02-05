package controller;

import externs.AjaxTest;
import externs.AppElement;
import externs.GridWrapper;
import externs.MyElement;
import externs.polymer.CoreIconButton;
import haxe.Timer;
import js.*;
import js.html.*;
import jQuery.*;
import haxe.rtti.Meta;
import polymer.*;
import externs.App;
//import bindx.Bind;
//import prime.utils.Bind;
import test.TestClass;
import events.Events;
import helper.DomElementHelper;

using polymer.Polymer;
using polymer.PolymerElement;
using helper.DomHelper;
using helper.PolymerElementHelper;
//using bindx.Bind;
//using prime.utils.Bind;

/**
 * ...
 * @author ...
 */
//@:expose
@:keep //using @:keep here to make sure dce doesn't remove what might be considered unused code
class AppController
{
	private var app:App = cast Browser.document.querySelector('#app');
	private var test33Button:ButtonElement = cast Browser.document.querySelector('#test33Button');
	private var test33Button2:CoreIconButton = cast Browser.document.querySelector('#test33Button2');
	private var grid:GridWrapper = cast Browser.document.querySelector('#grid');
	private var _gridData:Array<Dynamic>;
	
	//@inject
	private var _testClassInstance:TestClass;
	private var _signalControllerInstance:SignalController;
	
	@inject
	public function new(testClassInstance:TestClass, signalControllerInstance:SignalController)
	{
		trace('new AppController()');
		
		_testClassInstance = testClassInstance;
		trace({'new() _testClassInstance: ': _testClassInstance.toString()});
		
		_signalControllerInstance = signalControllerInstance;
		trace({'new() _signalControllerInstance: ': _signalControllerInstance});
		
		_testThisJunk();
	}
	
	public function _testThisJunk():Void
	{
		trace('_testThisJunk()');
		
		//app = cast Browser.document.querySelector('#app');
		
		trace({'app':app});
		
		app.headerText = 'Haxe Polymer Test';
		
		//shadow dom complains here
		//test33Button = cast app.getShadowDomElement('#test33Button');
		//test33Button2 = cast app.getShadowDomElement('#test33Button2');
		
		trace({'test33Button':test33Button});
		trace({'test33Button2':test33Button2});
		trace({'grid':grid});
		
		//works
		//app.onTestButtonClick = function(event)
		//{
			//Browser.alert('test33 :) event: ' + event);
		//}
		
		//app.onTestButtonClick = onTestButtonClick;//works in ff and ie too
		
		//testing out reading the dom and handling declared events
		test33Button.mapDomEventHandler('click', this);
		test33Button2.mapDomEventHandler('click', this);
		
		//setupKendoGrid();
		
		//fix here throws errors with haxe 3.2, thinking about testing prime-bindable
		//var onGridDataChange = function(oldValue, newValue) 
		//{
			//setupKendoGrid();
		//}		
		//_testClassInstance.gridData.bindx(onGridDataChange);
		//onGridDataChange.on(_testClassInstance.gridData.change, this);
		
		if(grid != null)
		{
			//grid.addEventListener(Events.GRID_DATA_READY, onGridDataChange);
			grid.addEventListener(Events.GRID_DATA_READY, function(event){Browser.alert('event: ' + event);});
		}
		_signalControllerInstance.gridDataSignal.add(onGridDataChange);
	}
	
	public function onTestButtonClick(event)
	{
		Browser.alert('html button test33 :) event: ' + event);
		trace('html button test33 :) event: ' + event);
	}
	
	public function onTestButtonClick2(event)
	{
		Browser.alert('paper-button test33 :) event: ' + event);
		trace('paper-button test33 :) event: ' + event);
	}
	
	//public function onGridDataChange(oldValue, newValue):Void 
	//public function onGridDataChange(event:CustomEvent):Void 
	public function onGridDataChange(data:Array<Dynamic>):Void 
	{
		//Browser.alert('onGridDataChange event: ' + event);
		//trace({'onGridDataChange() event':event});
		trace({'onGridDataChange() data':data});
		
		_gridData = data;
		app.gridData = _gridData;//testing template level dataBinding
		app.gridDataSource = {data:_gridData, pageSize:10};//testing template level dataBinding
		
		if(grid != null)
		{
			trace({'onGridDataChange() grid':grid});
			//grid.setGridData(_gridData);//works
		}
		
		trace({'app.gridData':app.gridData});
		trace({'app.gridDataSource':app.gridDataSource});
		
		//if(_gridData == null)
		//{
			//setupKendoGrid();
		//}
		
		//var tempGrid:Dynamic = new JQuery("#grid").data("kendoGrid");
		////var tempGrid:Dynamic = untyped __js__('$("#grid").data("kendoGrid")');
		//trace({'tempGrid':tempGrid});
		//tempGrid.dataSource = {data:_gridData, pageSize:10};
	}
	
	public function setupKendoGrid():Void 
	{
		//trace({'setupKendoGrid _testClassInstance.gridData':_testClassInstance.gridData});
		//trace({'setupKendoGrid gridData':gridData});
		
		var testGrid:Dynamic = untyped __js__('$("#grid").kendoGrid(
		{
			//dataSource:{
					////type: "odata",
					////transport: {
							////read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
					////},
					//data:gridData,
					//pageSize: 5
			//},
			height: 200,
			groupable: true,
			sortable: true,
			pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
			},
			columns: [{
					field: "date",
					title: "Date"
			}, {
					field: "title",
					title: "Title"
			}, {
					field: "type",
					title: "Type"
			}, {
					field: "content",
					title: "Content"
			}, {
					field: "enabled",
					title: "Enabled"
			}]
		});');
	}
}