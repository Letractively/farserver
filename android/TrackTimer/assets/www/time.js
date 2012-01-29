
function list(u, d) {
	var skey = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-times-" + u;
	var value = window.localStorage.getItem(skey);
	
	var collections = [];
	if (value!=null) {
		collections = JSON.parse(value);
	}
	return collections;
}

function insert(u, d, o) {
	var collections = list(u, d);
	collections.push(o);
	
	var skey = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-times-" + u;
	window.localStorage.setItem(skey, JSON.stringify(collections));
}

function get(u, d, started) {
	collections = list(u, d);
	for ( var i = 0; i < collections.length; i++) {
		if (collections[i].started==started) {
			return collections[i];
		}
	}
}

function update(u, d, o) {
	collections = list(u, d);
	for ( var i = 0; i < collections.length; i++) {
		if (collections[i].started==o.started) {
			collections[i] = o;
			break;
		}
	}
	
	var skey = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-times-" + u;
	window.localStorage.setItem(skey, JSON.stringify(collections));
}

function saveTimeConfig() {
	var start = getParam("created");
	var o;
	if (start==0) {
		o = {
			"created": new Date().getTime(),
			"dura": 0,
			"autostop": x$('#autoStop').attr("value")[0],
			"laststart": 0,
			"desc": x$('#editTime').attr("value")[0],
			"notifyInt": x$('#notifyInterval').attr("value")[0]
		}
		insert("me", new Date(), o);
	} else {
		o = get("me", new Date(), start);
		o.desc = x$('#editTime').attr("value");
		o.autostop = x$('#autostop').attr("value");
		update("me", new Date(), o);
	}
	alert(list("me", new Date()));
	location.href = "index.html";
}

function findItem() {
	
}

function getParam(name) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href); 
	if (!results) { return 0; } return results[1] || 0;
}



function formatDura(mill) {
	var d3 = new Date(parseInt(mill));
	return ((d3.getDate()-1)*24 + (d3.getHours()-8)) + ":" 
	+ ((d3.getMinutes()<10)?("0"+d3.getMinutes()):d3.getMinutes()); 
}

function formatHour(mill) {
	var t = new Date(mill);
	return t.getHours() + ":" +  ((t.getMinutes()<10)?("0"+t.getMinutes()):t.getMinutes());
}

function formatedToMill(formated) {
	var sr = formated.split(":");
	return parseInt(sr[0])*60*60*1000 + parseInt(sr[1].charAt(0)=='0'?sr[1].charAt(1):sr[1])*60*1000;
}


var hitKeys = [
	     'ʱ��С��ʿһ.������ȷ��Ŀ��',
	     'ʱ��С��ʿ��.ѧ�����嵥',
	     'ʱ��С��ʿ��.���á�ʱ����־��',
	     'ʱ��С��ʿ��.�ƶ���Ч�ļƻ���',
	     'ʱ��С��ʿ��.��ѭ20:80����',
	     'ʱ��С��ʿ��.���š��������š�ʱ��',
	     'ʱ��С��ʿ��.ȷ�����˵ļ�ֵ��',
	     'ʱ��С��ʿ��.�ϸ�涨�������',
	     'ʱ��С��ʿ��.ѧ������Ȩ',
	     'ʱ��С��ʿʮ.ͬ-����������һ������'
	];
	         
var hitInfos = [
	          "ʱ������Ŀ�������������ʱ����ʵ�ָ�������Ҫʵ�ֵ�Ŀ�ꡣ����ͷ4��10��Ŀ��д�������ҳ�һ������Ŀ�꣬������������Ҫ�ԣ�Ȼ���������Ŀ���趨��ϸ�ļƻ��������ռƻ����С�",
	          "���Լ���Ҫ����ÿһ�����鶼д��������һ�����嵥����������������ʱ����ȷ�Լ���ͷ�ϵ��������к��嵥�Ļ����Ͻ���Ŀ���и",
	          "�㻨�˶���ʱ������Щ���飬������ϸ�أ���¼������ÿ���ˢ����ʼ��ϴ�裬���ϴ��»��˶���ʱ�䣬���ϴ��ʱ�䣬ƽ�ϳ�ȥ�ݷÿͻ���ʱ�䣬��ÿ�컨��ʱ��һһ��¼������������Щ�£���ᷢ���˷�����Щʱ�䡣�����ҵ��˷�ʱ��ĸ�Դ������а취�ı䡣",
	          "����������ⶼ����δ������˼���ǵ��ж�����ġ����ƶ���Ч�ļƻ���ÿ����1Сʱ����ʵʩ�ƻ��оͿ��ܽ�ʡ3-4Сʱ������õ����õĽ���������û���������ƻ�����ôʵ���������ƻ���ʧ�ܡ�",
	          "����80%��ʱ������20%����Ҫ�����顣�����п϶�����һЩͻ�����ź��Ȳ�����Ҫ��������⣬����㷢���Լ����춼�ڴ�����Щ���飬�Ǳ�ʾ���ʱ����������롣һ��Ҫ�˽⣬������˵����Щ����������Ҫ�ģ��������������ġ�",
	          "������ÿ������һ��Сʱ��ȫ�����κ��˸��ŵ�˼��һЩ���飬������һЩ����Ϊ����Ҫ�����飬��һ��Сʱ���Եֹ���һ��Ĺ���Ч�ʣ��������ܱ�����Ĺ���Ч�ʻ�Ҫ�á�",
	          "�����ֵ�۲���ȷ���ͺ���֪��ʲô����������Ҫ�ģ�����ļ�ֵ�۲���ȷʱ�����޷���������ط���ʱ�䡣ʱ�������ص㲻�ڹ���ʱ�䣬��������η���ʱ�䡣����Զû��ʱ����ÿ���£�����Զ��ʱ����������˵����Ҫ���¡�",
	          "�ͽ�ɭ(C.Noarthcote Parkinson)���������ġ��ͽ�ɭ������д����λ������ж���ʱ����ɹ����������ͻ��Զ������Ҫ��ô��ʱ�䡣���������һ�����ʱ�������ĳ�������ͻỨһ���ʱ��ȥ�������������ֻ��һСʱ��ʱ����������������ͻ��Ѹ����Ч����һСʱ����������",
	          "�г���Ŀǰ���������о��ÿ�����Ȩ�����飬������д���������ʵ���������Ȩ��",
	          "����������ֽ����ҵ���Ƕ�ʱ�䶼��ֽ����ҵ������������˼������һ��ʱ��ֻ��˼������绰�Ļ�����ðѵ绰�ۻ���ĳһʱ��һ�ΰ������ꡣ"
	];

var JSON;if(!JSON)JSON={};(function(){var n="number",m="object",l="string",k="function";"use strict";function f(a){return a<10?"0"+a:a}if(typeof Date.prototype.toJSON!==k){Date.prototype.toJSON=function(){var a=this;return isFinite(a.valueOf())?a.getUTCFullYear()+"-"+f(a.getUTCMonth()+1)+"-"+f(a.getUTCDate())+"T"+f(a.getUTCHours())+":"+f(a.getUTCMinutes())+":"+f(a.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b===l?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(i,j){var f="null",c,e,d,g,h=gap,b,a=j[i];if(a&&typeof a===m&&typeof a.toJSON===k)a=a.toJSON(i);if(typeof rep===k)a=rep.call(j,i,a);switch(typeof a){case l:return quote(a);case n:return isFinite(a)?String(a):f;case"boolean":case f:return String(a);case m:if(!a)return f;gap+=indent;b=[];if(Object.prototype.toString.apply(a)==="[object Array]"){g=a.length;for(c=0;c<g;c+=1)b[c]=str(c,a)||f;d=b.length===0?"[]":gap?"[\n"+gap+b.join(",\n"+gap)+"\n"+h+"]":"["+b.join(",")+"]";gap=h;return d}if(rep&&typeof rep===m){g=rep.length;for(c=0;c<g;c+=1)if(typeof rep[c]===l){e=rep[c];d=str(e,a);d&&b.push(quote(e)+(gap?": ":":")+d)}}else for(e in a)if(Object.prototype.hasOwnProperty.call(a,e)){d=str(e,a);d&&b.push(quote(e)+(gap?": ":":")+d)}d=b.length===0?"{}":gap?"{\n"+gap+b.join(",\n"+gap)+"\n"+h+"}":"{"+b.join(",")+"}";gap=h;return d}}if(typeof JSON.stringify!==k)JSON.stringify=function(d,a,b){var c;gap="";indent="";if(typeof b===n)for(c=0;c<b;c+=1)indent+=" ";else if(typeof b===l)indent=b;rep=a;if(a&&typeof a!==k&&(typeof a!==m||typeof a.length!==n))throw new Error("JSON.stringify");return str("",{"":d})};if(typeof JSON.parse!==k)JSON.parse=function(text,reviver){var j;function walk(d,e){var b,c,a=d[e];if(a&&typeof a===m)for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){c=walk(a,b);if(c!==undefined)a[b]=c;else delete a[b]}return reviver.call(d,e,a)}text=String(text);cx.lastIndex=0;if(cx.test(text))text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse");}})();

