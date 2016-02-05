package test;

//import bindx.IBindable;
//import prime.bindable.IBindableReadonly;
import typeDefinitions.GridData;

/**
 * ...
 * @author Chris Anderson
 */
class TestClass //implements IBindableReadonly
{
	public var id:Int;
	
	//public var gridData:GridData;
	public var gridData(get, set):GridData;
	
	private var _gridData:GridData;

	public function new()
	{
		id = 0;
	}

	public function toString():String
	{
		return "TestClass id: " + id;
	}
	
	public function get_gridData():GridData 
	{
		return _gridData;
	}
	public function set_gridData(value:GridData):GridData 
	{
		trace({'set_gridData value':value});
		
		return value;
	}
}