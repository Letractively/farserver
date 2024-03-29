package com.elfish.ftp.worker
{
	import com.elfish.ftp.core.Client;
	import com.elfish.ftp.core.FtpListener;
	import com.elfish.ftp.event.FTPEvent;
	import com.elfish.ftp.model.Command;
	import com.elfish.ftp.model.ControlSocket;
	import com.elfish.ftp.model.Response;
	import com.elfish.ftp.status.CommandsStatus;
	import com.elfish.ftp.status.ResponseStatus;
	
	import flash.events.EventDispatcher;
	
	////////////////////////////////////////////////////////////////////////////////
	//
	//  Copyright (C) 2009-2010 www.elfish.com.cn
	//  The following is Source Code about CwdWorker.as
	//	Bug and advice to darkty2009@gmail.com
	//
	////////////////////////////////////////////////////////////////////////////////
	
	[Event(name="ftp_workfinish", type="com.elfish.ftp.event.FTPEvent")]
	
	public class CwdWorker extends EventDispatcher implements IWorker
	{
		include "../../Version.as";
		
		private var list:Array;
		public var name:String;
		private var control:ControlSocket;
		public var listener:FtpListener;
		
		public function CwdWorker(control:ControlSocket, name:String)
		{
			this.control = control;
			this.name = name;
			
			list = new Array();
			list.push(new Command(CommandsStatus.CWD, name));
			
			list = list.reverse();
			
			this.control.responseCall = response;
		}
		
		
		public function set commandList(list:Array):void
		{
			this.list = list;
		}
		
		public function get commandList():Array
		{
			return this.list;
		}
		
		public function executeCommand():void
		{
			if(list.length > 0) {
				control.send(list[list.length-1] as Command);
				list.pop();
			}
		}
		
		public function response(rsp:Response):void
		{
			if (listener) {
				listener.tell(this, rsp);
			}
		}
	}
}