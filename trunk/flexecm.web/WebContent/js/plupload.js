/*1.5.7*/
(function() {
	var f = 0, k = [], m = {}, i = {}, a = {
		"<" : "lt",
		">" : "gt",
		"&" : "amp",
		'"' : "quot",
		"'" : "#39"
	}, l = /[<>&\"\']/g, b, c = window.setTimeout, d = {}, e;
	function h() {
		this.returnValue = false
	}
	function j() {
		this.cancelBubble = true
	}
	(function(n) {
		var o = n.split(/,/), p, r, q;
		for (p = 0; p < o.length; p += 2) {
			q = o[p + 1].split(/ /);
			for (r = 0; r < q.length; r++) {
				i[q[r]] = o[p]
			}
		}
	})
			("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");
	var g = {
		VERSION : "1.5.7",
		STOPPED : 1,
		STARTED : 2,
		QUEUED : 1,
		UPLOADING : 2,
		FAILED : 4,
		DONE : 5,
		GENERIC_ERROR : -100,
		HTTP_ERROR : -200,
		IO_ERROR : -300,
		SECURITY_ERROR : -400,
		INIT_ERROR : -500,
		FILE_SIZE_ERROR : -600,
		FILE_EXTENSION_ERROR : -601,
		IMAGE_FORMAT_ERROR : -700,
		IMAGE_MEMORY_ERROR : -701,
		IMAGE_DIMENSIONS_ERROR : -702,
		mimeTypes : i,
		ua : (function() {
			var r = navigator, q = r.userAgent, s = r.vendor, o, n, p;
			o = /WebKit/.test(q);
			p = o && s.indexOf("Apple") !== -1;
			n = window.opera && window.opera.buildNumber;
			return {
				windows : navigator.platform.indexOf("Win") !== -1,
				android : /Android/.test(q),
				ie : !o && !n && (/MSIE/gi).test(q)
						&& (/Explorer/gi).test(r.appName),
				webkit : o,
				gecko : !o && /Gecko/.test(q),
				safari : p,
				opera : !!n
			}
		}()),
		typeOf : function(n) {
			return ({}).toString.call(n).match(/\s([a-z|A-Z]+)/)[1]
					.toLowerCase()
		},
		extend : function(n) {
			g.each(arguments, function(o, p) {
				if (p > 0) {
					g.each(o, function(r, q) {
						n[q] = r
					})
				}
			});
			return n
		},
		cleanName : function(n) {
			var o, p;
			p = [ /[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C",
					/\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e",
					/[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N",
					/\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o",
					/[\331-\334]/g, "U", /[\371-\374]/g, "u" ];
			for (o = 0; o < p.length; o += 2) {
				n = n.replace(p[o], p[o + 1])
			}
			n = n.replace(/\s+/g, "_");
			n = n.replace(/[^a-z0-9_\-\.]+/gi, "");
			return n
		},
		addRuntime : function(n, o) {
			o.name = n;
			k[n] = o;
			k.push(o);
			return o
		},
		guid : function() {
			var n = new Date().getTime().toString(32), o;
			for (o = 0; o < 5; o++) {
				n += Math.floor(Math.random() * 65535).toString(32)
			}
			return (g.guidPrefix || "p") + n + (f++).toString(32)
		},
		buildUrl : function(o, n) {
			var p = "";
			g.each(n, function(r, q) {
				p += (p ? "&" : "") + encodeURIComponent(q) + "="
						+ encodeURIComponent(r)
			});
			if (p) {
				o += (o.indexOf("?") > 0 ? "&" : "?") + p
			}
			return o
		},
		each : function(q, r) {
			var p, o, n;
			if (q) {
				p = q.length;
				if (p === b) {
					for (o in q) {
						if (q.hasOwnProperty(o)) {
							if (r(q[o], o) === false) {
								return
							}
						}
					}
				} else {
					for (n = 0; n < p; n++) {
						if (r(q[n], n) === false) {
							return
						}
					}
				}
			}
		},
		formatSize : function(n) {
			if (n === b || /\D/.test(n)) {
				return g.translate("N/A")
			}
			if (n > 1073741824) {
				return Math.round(n / 1073741824, 1) + " GB"
			}
			if (n > 1048576) {
				return Math.round(n / 1048576, 1) + " MB"
			}
			if (n > 1024) {
				return Math.round(n / 1024, 1) + " KB"
			}
			return n + " b"
		},
		getPos : function(o, s) {
			var t = 0, r = 0, v, u = document, p, q;
			o = o;
			s = s || u.body;
			function n(B) {
				var z, A, w = 0, C = 0;
				if (B) {
					A = B.getBoundingClientRect();
					z = u.compatMode === "CSS1Compat" ? u.documentElement
							: u.body;
					w = A.left + z.scrollLeft;
					C = A.top + z.scrollTop
				}
				return {
					x : w,
					y : C
				}
			}
			if (o && o.getBoundingClientRect && g.ua.ie
					&& (!u.documentMode || u.documentMode < 8)) {
				p = n(o);
				q = n(s);
				return {
					x : p.x - q.x,
					y : p.y - q.y
				}
			}
			v = o;
			while (v && v != s && v.nodeType) {
				t += v.offsetLeft || 0;
				r += v.offsetTop || 0;
				v = v.offsetParent
			}
			v = o.parentNode;
			while (v && v != s && v.nodeType) {
				t -= v.scrollLeft || 0;
				r -= v.scrollTop || 0;
				v = v.parentNode
			}
			return {
				x : t,
				y : r
			}
		},
		getSize : function(n) {
			return {
				w : n.offsetWidth || n.clientWidth,
				h : n.offsetHeight || n.clientHeight
			}
		},
		parseSize : function(n) {
			var o;
			if (typeof (n) == "string") {
				n = /^([0-9]+)([mgk]?)$/.exec(n.toLowerCase().replace(
						/[^0-9mkg]/g, ""));
				o = n[2];
				n = +n[1];
				if (o == "g") {
					n *= 1073741824
				}
				if (o == "m") {
					n *= 1048576
				}
				if (o == "k") {
					n *= 1024
				}
			}
			return n
		},
		xmlEncode : function(n) {
			return n ? ("" + n).replace(l, function(o) {
				return a[o] ? "&" + a[o] + ";" : o
			}) : n
		},
		toArray : function(p) {
			var o, n = [];
			for (o = 0; o < p.length; o++) {
				n[o] = p[o]
			}
			return n
		},
		inArray : function(p, q) {
			if (q) {
				if (Array.prototype.indexOf) {
					return Array.prototype.indexOf.call(q, p)
				}
				for ( var n = 0, o = q.length; n < o; n++) {
					if (q[n] === p) {
						return n
					}
				}
			}
			return -1
		},
		addI18n : function(n) {
			return g.extend(m, n)
		},
		translate : function(n) {
			return m[n] || n
		},
		isEmptyObj : function(n) {
			if (n === b) {
				return true
			}
			for ( var o in n) {
				return false
			}
			return true
		},
		hasClass : function(p, o) {
			var n;
			if (p.className == "") {
				return false
			}
			n = new RegExp("(^|\\s+)" + o + "(\\s+|$)");
			return n.test(p.className)
		},
		addClass : function(o, n) {
			if (!g.hasClass(o, n)) {
				o.className = o.className == "" ? n : o.className.replace(
						/\s+$/, "")
						+ " " + n
			}
		},
		removeClass : function(p, o) {
			var n = new RegExp("(^|\\s+)" + o + "(\\s+|$)");
			p.className = p.className.replace(n, function(r, q, s) {
				return q === " " && s === " " ? " " : ""
			})
		},
		getStyle : function(o, n) {
			if (o.currentStyle) {
				return o.currentStyle[n]
			} else {
				if (window.getComputedStyle) {
					return window.getComputedStyle(o, null)[n]
				}
			}
		},
		addEvent : function(s, n, t) {
			var r, q, p, o;
			o = arguments[3];
			n = n.toLowerCase();
			if (e === b) {
				e = "Plupload_" + g.guid()
			}
			if (s.addEventListener) {
				r = t;
				s.addEventListener(n, r, false)
			} else {
				if (s.attachEvent) {
					r = function() {
						var u = window.event;
						if (!u.target) {
							u.target = u.srcElement
						}
						u.preventDefault = h;
						u.stopPropagation = j;
						t(u)
					};
					s.attachEvent("on" + n, r)
				}
			}
			if (s[e] === b) {
				s[e] = g.guid()
			}
			if (!d.hasOwnProperty(s[e])) {
				d[s[e]] = {}
			}
			q = d[s[e]];
			if (!q.hasOwnProperty(n)) {
				q[n] = []
			}
			q[n].push({
				func : r,
				orig : t,
				key : o
			})
		},
		removeEvent : function(s, n) {
			var q, t, p;
			if (typeof (arguments[2]) == "function") {
				t = arguments[2]
			} else {
				p = arguments[2]
			}
			n = n.toLowerCase();
			if (s[e] && d[s[e]] && d[s[e]][n]) {
				q = d[s[e]][n]
			} else {
				return
			}
			for ( var o = q.length - 1; o >= 0; o--) {
				if (q[o].key === p || q[o].orig === t) {
					if (s.removeEventListener) {
						s.removeEventListener(n, q[o].func, false)
					} else {
						if (s.detachEvent) {
							s.detachEvent("on" + n, q[o].func)
						}
					}
					q[o].orig = null;
					q[o].func = null;
					q.splice(o, 1);
					if (t !== b) {
						break
					}
				}
			}
			if (!q.length) {
				delete d[s[e]][n]
			}
			if (g.isEmptyObj(d[s[e]])) {
				delete d[s[e]];
				try {
					delete s[e]
				} catch (r) {
					s[e] = b
				}
			}
		},
		removeAllEvents : function(o) {
			var n = arguments[1];
			if (o[e] === b || !o[e]) {
				return
			}
			g.each(d[o[e]], function(q, p) {
				g.removeEvent(o, p, n)
			})
		}
	};
	g.Uploader = function(r) {
		var o = {}, u, t = [], q, p = false;
		u = new g.QueueProgress();
		r = g.extend({
			chunk_size : 0,
			multipart : true,
			multi_selection : true,
			file_data_name : "file",
			filters : []
		}, r);
		function s() {
			var w, x = 0, v;
			if (this.state == g.STARTED) {
				for (v = 0; v < t.length; v++) {
					if (!w && t[v].status == g.QUEUED) {
						w = t[v];
						w.status = g.UPLOADING;
						if (this.trigger("BeforeUpload", w)) {
							this.trigger("UploadFile", w)
						}
					} else {
						x++
					}
				}
				if (x == t.length) {
					this.stop();
					this.trigger("UploadComplete", t)
				}
			}
		}
		function n() {
			var w, v;
			u.reset();
			for (w = 0; w < t.length; w++) {
				v = t[w];
				if (v.size !== b) {
					u.size += v.size;
					u.loaded += v.loaded
				} else {
					u.size = b
				}
				if (v.status == g.DONE) {
					u.uploaded++
				} else {
					if (v.status == g.FAILED) {
						u.failed++
					} else {
						u.queued++
					}
				}
			}
			if (u.size === b) {
				u.percent = t.length > 0 ? Math.ceil(u.uploaded / t.length
						* 100) : 0
			} else {
				u.bytesPerSec = Math.ceil(u.loaded
						/ ((+new Date() - q || 1) / 1000));
				u.percent = u.size > 0 ? Math.ceil(u.loaded / u.size * 100) : 0
			}
		}
		g.extend(this, {
			state : g.STOPPED,
			runtime : "",
			features : {},
			files : t,
			settings : r,
			total : u,
			id : g.guid(),
			init : function() {
				var A = this, B, x, w, z = 0, y;
				if (typeof (r.preinit) == "function") {
					r.preinit(A)
				} else {
					g.each(r.preinit, function(D, C) {
						A.bind(C, D)
					})
				}
				r.page_url = r.page_url
						|| document.location.pathname
								.replace(/\/[^\/]+$/g, "/");
				if (!/^(\w+:\/\/|\/)/.test(r.url)) {
					r.url = r.page_url + r.url
				}
				r.chunk_size = g.parseSize(r.chunk_size);
				r.max_file_size = g.parseSize(r.max_file_size);
				A.bind("FilesAdded", function(C, F) {
					var E, D, H = 0, I, G = r.filters;
					if (G && G.length) {
						I = [];
						g.each(G, function(J) {
							g.each(J.extensions.split(/,/), function(K) {
								if (/^\s*\*\s*$/.test(K)) {
									I.push("\\.*")
								} else {
									I.push("\\."
											+ K.replace(new RegExp("["
													+ ("/^$.*+?|()[]{}\\"
															.replace(/./g,
																	"\\$&"))
													+ "]", "g"), "\\$&"))
								}
							})
						});
						I = new RegExp(I.join("|") + "$", "i")
					}
					for (E = 0; E < F.length; E++) {
						D = F[E];
						D.loaded = 0;
						D.percent = 0;
						D.status = g.QUEUED;
						if (I && !I.test(D.name)) {
							C.trigger("Error", {
								code : g.FILE_EXTENSION_ERROR,
								message : g.translate("File extension error."),
								file : D
							});
							continue
						}
						if (D.size !== b && D.size > r.max_file_size) {
							C.trigger("Error", {
								code : g.FILE_SIZE_ERROR,
								message : g.translate("File size error."),
								file : D
							});
							continue
						}
						t.push(D);
						H++
					}
					if (H) {
						c(function() {
							A.trigger("QueueChanged");
							A.refresh()
						}, 1)
					} else {
						return false
					}
				});
				if (r.unique_names) {
					A.bind("UploadFile", function(C, D) {
						var F = D.name.match(/\.([^.]+)$/), E = "tmp";
						if (F) {
							E = F[1]
						}
						D.target_name = D.id + "." + E
					})
				}
				A.bind("UploadProgress", function(C, D) {
					D.percent = D.size > 0 ? Math.ceil(D.loaded / D.size * 100)
							: 100;
					n()
				});
				A.bind("StateChanged", function(C) {
					if (C.state == g.STARTED) {
						q = (+new Date())
					} else {
						if (C.state == g.STOPPED) {
							for (B = C.files.length - 1; B >= 0; B--) {
								if (C.files[B].status == g.UPLOADING) {
									C.files[B].status = g.QUEUED;
									n()
								}
							}
						}
					}
				});
				A.bind("QueueChanged", n);
				A.bind("Error", function(C, D) {
					if (D.file) {
						D.file.status = g.FAILED;
						n();
						if (C.state == g.STARTED) {
							c(function() {
								s.call(A)
							}, 1)
						}
					}
				});
				A.bind("FileUploaded", function(C, D) {
					D.status = g.DONE;
					D.loaded = D.size;
					C.trigger("UploadProgress", D);
					c(function() {
						s.call(A)
					}, 1)
				});
				if (r.runtimes) {
					x = [];
					y = r.runtimes.split(/\s?,\s?/);
					for (B = 0; B < y.length; B++) {
						if (k[y[B]]) {
							x.push(k[y[B]])
						}
					}
				} else {
					x = k
				}
				function v() {
					var F = x[z++], E, C, D;
					if (F) {
						E = F.getFeatures();
						C = A.settings.required_features;
						if (C) {
							C = C.split(",");
							for (D = 0; D < C.length; D++) {
								if (!E[C[D]]) {
									v();
									return
								}
							}
						}
						F.init(A, function(G) {
							if (G && G.success) {
								A.features = E;
								A.runtime = F.name;
								A.trigger("Init", {
									runtime : F.name
								});
								A.trigger("PostInit");
								A.refresh()
							} else {
								v()
							}
						})
					} else {
						A.trigger("Error", {
							code : g.INIT_ERROR,
							message : g.translate("Init error.")
						})
					}
				}
				v();
				if (typeof (r.init) == "function") {
					r.init(A)
				} else {
					g.each(r.init, function(D, C) {
						A.bind(C, D)
					})
				}
			},
			refresh : function() {
				this.trigger("Refresh")
			},
			start : function() {
				if (t.length && this.state != g.STARTED) {
					this.state = g.STARTED;
					this.trigger("StateChanged");
					s.call(this)
				}
			},
			stop : function() {
				if (this.state != g.STOPPED) {
					this.state = g.STOPPED;
					this.trigger("CancelUpload");
					this.trigger("StateChanged")
				}
			},
			disableBrowse : function() {
				p = arguments[0] !== b ? arguments[0] : true;
				this.trigger("DisableBrowse", p)
			},
			getFile : function(w) {
				var v;
				for (v = t.length - 1; v >= 0; v--) {
					if (t[v].id === w) {
						return t[v]
					}
				}
			},
			removeFile : function(w) {
				var v;
				for (v = t.length - 1; v >= 0; v--) {
					if (t[v].id === w.id) {
						return this.splice(v, 1)[0]
					}
				}
			},
			splice : function(x, v) {
				var w;
				w = t.splice(x === b ? 0 : x, v === b ? t.length : v);
				this.trigger("FilesRemoved", w);
				this.trigger("QueueChanged");
				return w
			},
			trigger : function(w) {
				var y = o[w.toLowerCase()], x, v;
				if (y) {
					v = Array.prototype.slice.call(arguments);
					v[0] = this;
					for (x = 0; x < y.length; x++) {
						if (y[x].func.apply(y[x].scope, v) === false) {
							return false
						}
					}
				}
				return true
			},
			hasEventListener : function(v) {
				return !!o[v.toLowerCase()]
			},
			bind : function(v, x, w) {
				var y;
				v = v.toLowerCase();
				y = o[v] || [];
				y.push({
					func : x,
					scope : w || this
				});
				o[v] = y
			},
			unbind : function(v) {
				v = v.toLowerCase();
				var y = o[v], w, x = arguments[1];
				if (y) {
					if (x !== b) {
						for (w = y.length - 1; w >= 0; w--) {
							if (y[w].func === x) {
								y.splice(w, 1);
								break
							}
						}
					} else {
						y = []
					}
					if (!y.length) {
						delete o[v]
					}
				}
			},
			unbindAll : function() {
				var v = this;
				g.each(o, function(x, w) {
					v.unbind(w)
				})
			},
			destroy : function() {
				this.stop();
				this.trigger("Destroy");
				this.unbindAll()
			}
		})
	};
	g.File = function(q, o, p) {
		var n = this;
		n.id = q;
		n.name = o;
		n.size = p;
		n.loaded = 0;
		n.percent = 0;
		n.status = 0
	};
	g.Runtime = function() {
		this.getFeatures = function() {
		};
		this.init = function(n, o) {
		}
	};
	g.QueueProgress = function() {
		var n = this;
		n.size = 0;
		n.loaded = 0;
		n.uploaded = 0;
		n.failed = 0;
		n.queued = 0;
		n.percent = 0;
		n.bytesPerSec = 0;
		n.reset = function() {
			n.size = n.loaded = n.uploaded = n.failed = n.queued = n.percent = n.bytesPerSec = 0
		}
	};
	g.runtimes = {};
	window.plupload = g
})();
(function(k, m, l, g) {
	var d = {}, j;
	function c(s) {
		var r = s.naturalWidth, u = s.naturalHeight;
		if (r * u > 1024 * 1024) {
			var t = m.createElement("canvas");
			t.width = t.height = 1;
			var q = t.getContext("2d");
			q.drawImage(s, -r + 1, 0);
			return q.getImageData(0, 0, 1, 1).data[3] === 0
		} else {
			return false
		}
	}
	function f(u, r, z) {
		var q = m.createElement("canvas");
		q.width = 1;
		q.height = z;
		var A = q.getContext("2d");
		A.drawImage(u, 0, 0);
		var t = A.getImageData(0, 0, 1, z).data;
		var x = 0;
		var v = z;
		var y = z;
		while (y > x) {
			var s = t[(y - 1) * 4 + 3];
			if (s === 0) {
				v = y
			} else {
				x = y
			}
			y = (v + x) >> 1
		}
		var w = (y / z);
		return (w === 0) ? 1 : w
	}
	function o(K, s, t) {
		var v = K.naturalWidth, z = K.naturalHeight;
		var E = t.width, B = t.height;
		var F = s.getContext("2d");
		F.save();
		var r = c(K);
		if (r) {
			v /= 2;
			z /= 2
		}
		var I = 1024;
		var q = m.createElement("canvas");
		q.width = q.height = I;
		var u = q.getContext("2d");
		var G = f(K, v, z);
		var A = 0;
		while (A < z) {
			var J = A + I > z ? z - A : I;
			var C = 0;
			while (C < v) {
				var D = C + I > v ? v - C : I;
				u.clearRect(0, 0, I, I);
				u.drawImage(K, -C, -A);
				var x = (C * E / v) << 0;
				var y = Math.ceil(D * E / v);
				var w = (A * B / z / G) << 0;
				var H = Math.ceil(J * B / z / G);
				F.drawImage(q, 0, 0, D, J, x, w, y, H);
				C += I
			}
			A += I
		}
		F.restore();
		q = u = null
	}
	function p(r, s) {
		var q;
		if ("FileReader" in k) {
			q = new FileReader();
			q.readAsDataURL(r);
			q.onload = function() {
				s(q.result)
			}
		} else {
			return s(r.getAsDataURL())
		}
	}
	function n(r, s) {
		var q;
		if ("FileReader" in k) {
			q = new FileReader();
			q.readAsBinaryString(r);
			q.onload = function() {
				s(q.result)
			}
		} else {
			return s(r.getAsBinary())
		}
	}
	function e(u, s, q, y) {
		var t, r, x, v, w = this;
		p(d[u.id], function(z) {
			t = m.createElement("canvas");
			t.style.display = "none";
			m.body.appendChild(t);
			x = new Image();
			x.onerror = x.onabort = function() {
				y({
					success : false
				})
			};
			x.onload = function() {
				var F, A, C, B, E;
				if (!s.width) {
					s.width = x.width
				}
				if (!s.height) {
					s.height = x.height
				}
				v = Math.min(s.width / x.width, s.height / x.height);
				if (v < 1) {
					F = Math.round(x.width * v);
					A = Math.round(x.height * v)
				} else {
					if (s.quality && q === "image/jpeg") {
						F = x.width;
						A = x.height
					} else {
						y({
							success : false
						});
						return
					}
				}
				t.width = F;
				t.height = A;
				o(x, t, {
					width : F,
					height : A
				});
				if (q === "image/jpeg") {
					B = new h(atob(z.substring(z.indexOf("base64,") + 7)));
					if (B.headers && B.headers.length) {
						E = new a();
						if (E.init(B.get("exif")[0])) {
							E.setExif("PixelXDimension", F);
							E.setExif("PixelYDimension", A);
							B.set("exif", E.getBinary());
							if (w.hasEventListener("ExifData")) {
								w.trigger("ExifData", u, E.EXIF())
							}
							if (w.hasEventListener("GpsData")) {
								w.trigger("GpsData", u, E.GPS())
							}
						}
					}
				}
				if (s.quality && q === "image/jpeg") {
					try {
						z = t.toDataURL(q, s.quality / 100)
					} catch (D) {
						z = t.toDataURL(q)
					}
				} else {
					z = t.toDataURL(q)
				}
				z = z.substring(z.indexOf("base64,") + 7);
				z = atob(z);
				if (B && B.headers && B.headers.length) {
					z = B.restore(z);
					B.purge()
				}
				t.parentNode.removeChild(t);
				y({
					success : true,
					data : z
				})
			};
			x.src = z
		})
	}
	l.runtimes.Html5 = l
			.addRuntime(
					"html5",
					{
						getFeatures : function() {
							var v, r, u, t, s, q;
							r = u = s = q = false;
							if (k.XMLHttpRequest) {
								v = new XMLHttpRequest();
								u = !!v.upload;
								r = !!(v.sendAsBinary || v.upload)
							}
							if (r) {
								t = !!(v.sendAsBinary || (k.Uint8Array && k.ArrayBuffer));
								s = !!(File
										&& (File.prototype.getAsDataURL || k.FileReader) && t);
								q = !!(File && (File.prototype.mozSlice
										|| File.prototype.webkitSlice || File.prototype.slice))
							}
							j = l.ua.safari && l.ua.windows;
							return {
								html5 : r,
								dragdrop : (function() {
									var w = m.createElement("div");
									return ("draggable" in w)
											|| ("ondragstart" in w && "ondrop" in w)
								}()),
								jpgresize : s,
								pngresize : s,
								multipart : s || !!k.FileReader || !!k.FormData,
								canSendBinary : t,
								cantSendBlobInFormData : !!(l.ua.gecko
										&& k.FormData && k.FileReader && !FileReader.prototype.readAsArrayBuffer)
										|| l.ua.android,
								progress : u,
								chunks : q,
								multi_selection : !(l.ua.safari && l.ua.windows),
								triggerDialog : (l.ua.gecko && k.FormData || l.ua.webkit)
							}
						},
						init : function(s, u) {
							var q, t;
							function r(z) {
								var x, w, y = [], A, v = {};
								for (w = 0; w < z.length; w++) {
									x = z[w];
									if (v[x.name] && l.ua.safari
											&& l.ua.windows) {
										continue
									}
									v[x.name] = true;
									A = l.guid();
									d[A] = x;
									y.push(new l.File(A, x.fileName || x.name,
											x.fileSize || x.size))
								}
								if (y.length) {
									s.trigger("FilesAdded", y)
								}
							}
							q = this.getFeatures();
							if (!q.html5) {
								u({
									success : false
								});
								return
							}
							s
									.bind(
											"Init",
											function(A) {
												var J, I, F = [], z, G, w = A.settings.filters, x, E, v = m.body, H;
												J = m.createElement("div");
												J.id = A.id
														+ "_html5_container";
												l
														.extend(
																J.style,
																{
																	position : "absolute",
																	background : s.settings.shim_bgcolor
																			|| "transparent",
																	width : "100px",
																	height : "100px",
																	overflow : "hidden",
																	zIndex : 99999,
																	opacity : s.settings.shim_bgcolor ? ""
																			: 0
																});
												J.className = "plupload html5";
												if (s.settings.container) {
													v = m
															.getElementById(s.settings.container);
													if (l.getStyle(v,
															"position") === "static") {
														v.style.position = "relative"
													}
												}
												v.appendChild(J);
												no_type_restriction: for (z = 0; z < w.length; z++) {
													x = w[z].extensions
															.split(/,/);
													for (G = 0; G < x.length; G++) {
														if (x[G] === "*") {
															F = [];
															break no_type_restriction
														}
														E = l.mimeTypes[x[G]];
														if (E
																&& l.inArray(E,
																		F) === -1) {
															F.push(E)
														}
													}
												}
												J.innerHTML = '<input id="'
														+ s.id
														+ '_html5"  style="font-size:999px" type="file" accept="'
														+ F.join(",")
														+ '" '
														+ (s.settings.multi_selection
																&& s.features.multi_selection ? 'multiple="multiple"'
																: "") + " />";
												J.scrollTop = 100;
												H = m.getElementById(s.id
														+ "_html5");
												if (A.features.triggerDialog) {
													l.extend(H.style, {
														position : "absolute",
														width : "100%",
														height : "100%"
													})
												} else {
													l.extend(H.style, {
														cssFloat : "right",
														styleFloat : "right"
													})
												}
												H.onchange = function() {
													r(this.files);
													this.value = ""
												};
												I = m
														.getElementById(A.settings.browse_button);
												if (I) {
													var C = A.settings.browse_button_hover, D = A.settings.browse_button_active, B = A.features.triggerDialog ? I
															: J;
													if (C) {
														l.addEvent(B,
																"mouseover",
																function() {
																	l.addClass(
																			I,
																			C)
																}, A.id);
														l
																.addEvent(
																		B,
																		"mouseout",
																		function() {
																			l
																					.removeClass(
																							I,
																							C)
																		}, A.id)
													}
													if (D) {
														l.addEvent(B,
																"mousedown",
																function() {
																	l.addClass(
																			I,
																			D)
																}, A.id);
														l
																.addEvent(
																		m.body,
																		"mouseup",
																		function() {
																			l
																					.removeClass(
																							I,
																							D)
																		}, A.id)
													}
													if (A.features.triggerDialog) {
														l
																.addEvent(
																		I,
																		"click",
																		function(
																				K) {
																			var y = m
																					.getElementById(A.id
																							+ "_html5");
																			if (y
																					&& !y.disabled) {
																				y
																						.click()
																			}
																			K
																					.preventDefault()
																		}, A.id)
													}
												}
											});
							s
									.bind(
											"PostInit",
											function() {
												var v = m
														.getElementById(s.settings.drop_element);
												if (v) {
													if (j) {
														l
																.addEvent(
																		v,
																		"dragenter",
																		function(
																				z) {
																			var y, w, x;
																			y = m
																					.getElementById(s.id
																							+ "_drop");
																			if (!y) {
																				y = m
																						.createElement("input");
																				y
																						.setAttribute(
																								"type",
																								"file");
																				y
																						.setAttribute(
																								"id",
																								s.id
																										+ "_drop");
																				y
																						.setAttribute(
																								"multiple",
																								"multiple");
																				l
																						.addEvent(
																								y,
																								"change",
																								function() {
																									r(this.files);
																									l
																											.removeEvent(
																													y,
																													"change",
																													s.id);
																									y.parentNode
																											.removeChild(y)
																								},
																								s.id);
																				l
																						.addEvent(
																								y,
																								"dragover",
																								function(
																										A) {
																									A
																											.stopPropagation()
																								},
																								s.id);
																				v
																						.appendChild(y)
																			}
																			w = l
																					.getPos(
																							v,
																							m
																									.getElementById(s.settings.container));
																			x = l
																					.getSize(v);
																			if (l
																					.getStyle(
																							v,
																							"position") === "static") {
																				l
																						.extend(
																								v.style,
																								{
																									position : "relative"
																								})
																			}
																			l
																					.extend(
																							y.style,
																							{
																								position : "absolute",
																								display : "block",
																								top : 0,
																								left : 0,
																								width : x.w
																										+ "px",
																								height : x.h
																										+ "px",
																								opacity : 0
																							})
																		}, s.id);
														return
													}
													l
															.addEvent(
																	v,
																	"dragover",
																	function(w) {
																		w
																				.preventDefault()
																	}, s.id);
													l
															.addEvent(
																	v,
																	"drop",
																	function(x) {
																		var w = x.dataTransfer;
																		if (w
																				&& w.files) {
																			r(w.files)
																		}
																		x
																				.preventDefault()
																	}, s.id)
												}
											});
							s
									.bind(
											"Refresh",
											function(v) {
												var w, x, y, A, z;
												w = m
														.getElementById(s.settings.browse_button);
												if (w) {
													x = l
															.getPos(
																	w,
																	m
																			.getElementById(v.settings.container));
													y = l.getSize(w);
													A = m
															.getElementById(s.id
																	+ "_html5_container");
													l.extend(A.style, {
														top : x.y + "px",
														left : x.x + "px",
														width : y.w + "px",
														height : y.h + "px"
													});
													if (s.features.triggerDialog) {
														if (l.getStyle(w,
																"position") === "static") {
															l
																	.extend(
																			w.style,
																			{
																				position : "relative"
																			})
														}
														z = parseInt(
																l
																		.getStyle(
																				w,
																				"zIndex"),
																10);
														if (isNaN(z)) {
															z = 0
														}
														l.extend(w.style, {
															zIndex : z
														});
														l.extend(A.style, {
															zIndex : z - 1
														})
													}
												}
											});
							s.bind("DisableBrowse", function(v, x) {
								var w = m.getElementById(v.id + "_html5");
								if (w) {
									w.disabled = x
								}
							});
							s.bind("CancelUpload", function() {
								if (t && t.abort) {
									t.abort()
								}
							});
							s
									.bind(
											"UploadFile",
											function(v, x) {
												var y = v.settings, B, w;
												function A(D, G, C) {
													var E;
													if (File.prototype.slice) {
														try {
															D.slice();
															return D
																	.slice(G, C)
														} catch (F) {
															return D.slice(G, C
																	- G)
														}
													} else {
														if (E = File.prototype.webkitSlice
																|| File.prototype.mozSlice) {
															return E.call(D, G,
																	C)
														} else {
															return null
														}
													}
												}
												function z(C) {
													var F = 0, E = 0;
													function D() {
														var L, P, N, O, K, M, H, G = v.settings.url;
														function J(S) {
															if (t.sendAsBinary) {
																t
																		.sendAsBinary(S)
															} else {
																if (v.features.canSendBinary) {
																	var Q = new Uint8Array(
																			S.length);
																	for ( var R = 0; R < S.length; R++) {
																		Q[R] = (S
																				.charCodeAt(R) & 255)
																	}
																	t
																			.send(Q.buffer)
																}
															}
														}
														function I(R) {
															var V = 0, W = "----pluploadboundary"
																	+ l.guid(), T, S = "--", U = "\r\n", Q = "";
															t = new XMLHttpRequest;
															if (t.upload) {
																t.upload.onprogress = function(
																		X) {
																	x.loaded = Math
																			.min(
																					x.size,
																					E
																							+ X.loaded
																							- V);
																	v
																			.trigger(
																					"UploadProgress",
																					x)
																}
															}
															t.onreadystatechange = function() {
																var X, Z;
																if (t.readyState == 4
																		&& v.state !== l.STOPPED) {
																	try {
																		X = t.status
																	} catch (Y) {
																		X = 0
																	}
																	if (X >= 400) {
																		v
																				.trigger(
																						"Error",
																						{
																							code : l.HTTP_ERROR,
																							message : l
																									.translate("HTTP Error."),
																							file : x,
																							status : X
																						})
																	} else {
																		if (N) {
																			Z = {
																				chunk : F,
																				chunks : N,
																				response : t.responseText,
																				status : X
																			};
																			v
																					.trigger(
																							"ChunkUploaded",
																							x,
																							Z);
																			E += M;
																			if (Z.cancelled) {
																				x.status = l.FAILED;
																				return
																			}
																			x.loaded = Math
																					.min(
																							x.size,
																							(F + 1)
																									* K)
																		} else {
																			x.loaded = x.size
																		}
																		v
																				.trigger(
																						"UploadProgress",
																						x);
																		R = L = T = Q = null;
																		if (!N
																				|| ++F >= N) {
																			x.status = l.DONE;
																			v
																					.trigger(
																							"FileUploaded",
																							x,
																							{
																								response : t.responseText,
																								status : X
																							})
																		} else {
																			D()
																		}
																	}
																}
															};
															if (v.settings.multipart
																	&& q.multipart) {
																O.name = x.target_name
																		|| x.name;
																t
																		.open(
																				"post",
																				G,
																				true);
																l
																		.each(
																				v.settings.headers,
																				function(
																						Y,
																						X) {
																					t
																							.setRequestHeader(
																									X,
																									Y)
																				});
																if (typeof (R) !== "string"
																		&& !!k.FormData) {
																	T = new FormData();
																	l
																			.each(
																					l
																							.extend(
																									O,
																									v.settings.multipart_params),
																					function(
																							Y,
																							X) {
																						T
																								.append(
																										X,
																										Y)
																					});
																	T
																			.append(
																					v.settings.file_data_name,
																					R);
																	t.send(T);
																	return
																}
																if (typeof (R) === "string") {
																	t
																			.setRequestHeader(
																					"Content-Type",
																					"multipart/form-data; boundary="
																							+ W);
																	l
																			.each(
																					l
																							.extend(
																									O,
																									v.settings.multipart_params),
																					function(
																							Y,
																							X) {
																						Q += S
																								+ W
																								+ U
																								+ 'Content-Disposition: form-data; name="'
																								+ X
																								+ '"'
																								+ U
																								+ U;
																						Q += unescape(encodeURIComponent(Y))
																								+ U
																					});
																	H = l.mimeTypes[x.name
																			.replace(
																					/^.+\.([^.]+)/,
																					"$1")
																			.toLowerCase()]
																			|| "application/octet-stream";
																	Q += S
																			+ W
																			+ U
																			+ 'Content-Disposition: form-data; name="'
																			+ v.settings.file_data_name
																			+ '"; filename="'
																			+ unescape(encodeURIComponent(x.name))
																			+ '"'
																			+ U
																			+ "Content-Type: "
																			+ H
																			+ U
																			+ U
																			+ R
																			+ U
																			+ S
																			+ W
																			+ S
																			+ U;
																	V = Q.length
																			- R.length;
																	R = Q;
																	J(R);
																	return
																}
															}
															G = l
																	.buildUrl(
																			v.settings.url,
																			l
																					.extend(
																							O,
																							v.settings.multipart_params));
															t.open("post", G,
																	true);
															t
																	.setRequestHeader(
																			"Content-Type",
																			"application/octet-stream");
															l
																	.each(
																			v.settings.headers,
																			function(
																					Y,
																					X) {
																				t
																						.setRequestHeader(
																								X,
																								Y)
																			});
															if (typeof (R) === "string") {
																J(R)
															} else {
																t.send(R)
															}
														}
														if (x.status == l.DONE
																|| x.status == l.FAILED
																|| v.state == l.STOPPED) {
															return
														}
														O = {
															name : x.target_name
																	|| x.name
														};
														if (y.chunk_size
																&& x.size > y.chunk_size
																&& (q.chunks || typeof (C) == "string")) {
															K = y.chunk_size;
															N = Math
																	.ceil(x.size
																			/ K);
															M = Math
																	.min(
																			K,
																			x.size
																					- (F * K));
															if (typeof (C) == "string") {
																L = C
																		.substring(
																				F
																						* K,
																				F
																						* K
																						+ M)
															} else {
																L = A(
																		C,
																		F * K,
																		F
																				* K
																				+ M)
															}
															O.chunk = F;
															O.chunks = N
														} else {
															M = x.size;
															L = C
														}
														if (v.settings.multipart
																&& q.multipart
																&& typeof (L) !== "string"
																&& k.FileReader
																&& q.cantSendBlobInFormData
																&& q.chunks
																&& v.settings.chunk_size) {
															(function() {
																var Q = new FileReader();
																Q.onload = function() {
																	I(Q.result);
																	Q = null
																};
																Q
																		.readAsBinaryString(L)
															}())
														} else {
															I(L)
														}
													}
													D()
												}
												B = d[x.id];
												if (q.jpgresize
														&& v.settings.resize
														&& /\.(png|jpg|jpeg)$/i
																.test(x.name)) {
													e
															.call(
																	v,
																	x,
																	v.settings.resize,
																	/\.png$/i
																			.test(x.name) ? "image/png"
																			: "image/jpeg",
																	function(C) {
																		if (C.success) {
																			x.size = C.data.length;
																			z(C.data)
																		} else {
																			if (q.chunks) {
																				z(B)
																			} else {
																				n(
																						B,
																						z)
																			}
																		}
																	})
												} else {
													if (!q.chunks
															&& q.jpgresize) {
														n(B, z)
													} else {
														z(B)
													}
												}
											});
							s.bind("Destroy", function(v) {
								var x, y, w = m.body, z = {
									inputContainer : v.id + "_html5_container",
									inputFile : v.id + "_html5",
									browseButton : v.settings.browse_button,
									dropElm : v.settings.drop_element
								};
								for (x in z) {
									y = m.getElementById(z[x]);
									if (y) {
										l.removeAllEvents(y, v.id)
									}
								}
								l.removeAllEvents(m.body, v.id);
								if (v.settings.container) {
									w = m.getElementById(v.settings.container)
								}
								w.removeChild(m
										.getElementById(z.inputContainer))
							});
							u({
								success : true
							})
						}
					});
	function b() {
		var t = false, r;
		function u(w, y) {
			var v = t ? 0 : -8 * (y - 1), z = 0, x;
			for (x = 0; x < y; x++) {
				z |= (r.charCodeAt(w + x) << Math.abs(v + x * 8))
			}
			return z
		}
		function q(x, v, w) {
			var w = arguments.length === 3 ? w : r.length - v - 1;
			r = r.substr(0, v) + x + r.substr(w + v)
		}
		function s(w, x, z) {
			var A = "", v = t ? 0 : -8 * (z - 1), y;
			for (y = 0; y < z; y++) {
				A += String.fromCharCode((x >> Math.abs(v + y * 8)) & 255)
			}
			q(A, w, z)
		}
		return {
			II : function(v) {
				if (v === g) {
					return t
				} else {
					t = v
				}
			},
			init : function(v) {
				t = false;
				r = v
			},
			SEGMENT : function(v, x, w) {
				switch (arguments.length) {
				case 1:
					return r.substr(v, r.length - v - 1);
				case 2:
					return r.substr(v, x);
				case 3:
					q(w, v, x);
					break;
				default:
					return r
				}
			},
			BYTE : function(v) {
				return u(v, 1)
			},
			SHORT : function(v) {
				return u(v, 2)
			},
			LONG : function(v, w) {
				if (w === g) {
					return u(v, 4)
				} else {
					s(v, w, 4)
				}
			},
			SLONG : function(v) {
				var w = u(v, 4);
				return (w > 2147483647 ? w - 4294967296 : w)
			},
			STRING : function(v, w) {
				var x = "";
				for (w += v; v < w; v++) {
					x += String.fromCharCode(u(v, 1))
				}
				return x
			}
		}
	}
	function h(v) {
		var x = {
			65505 : {
				app : "EXIF",
				name : "APP1",
				signature : "Exif\0"
			},
			65506 : {
				app : "ICC",
				name : "APP2",
				signature : "ICC_PROFILE\0"
			},
			65517 : {
				app : "IPTC",
				name : "APP13",
				signature : "Photoshop 3.0\0"
			}
		}, w = [], u, q, s = g, t = 0, r;
		u = new b();
		u.init(v);
		if (u.SHORT(0) !== 65496) {
			return
		}
		q = 2;
		r = Math.min(1048576, v.length);
		while (q <= r) {
			s = u.SHORT(q);
			if (s >= 65488 && s <= 65495) {
				q += 2;
				continue
			}
			if (s === 65498 || s === 65497) {
				break
			}
			t = u.SHORT(q + 2) + 2;
			if (x[s]
					&& u.STRING(q + 4, x[s].signature.length) === x[s].signature) {
				w.push({
					hex : s,
					app : x[s].app.toUpperCase(),
					name : x[s].name.toUpperCase(),
					start : q,
					length : t,
					segment : u.SEGMENT(q, t)
				})
			}
			q += t
		}
		u.init(null);
		return {
			headers : w,
			restore : function(B) {
				u.init(B);
				var z = new h(B);
				if (!z.headers) {
					return false
				}
				for ( var A = z.headers.length; A > 0; A--) {
					var C = z.headers[A - 1];
					u.SEGMENT(C.start, C.length, "")
				}
				z.purge();
				q = u.SHORT(2) == 65504 ? 4 + u.SHORT(4) : 2;
				for ( var A = 0, y = w.length; A < y; A++) {
					u.SEGMENT(q, 0, w[A].segment);
					q += w[A].length
				}
				return u.SEGMENT()
			},
			get : function(A) {
				var B = [];
				for ( var z = 0, y = w.length; z < y; z++) {
					if (w[z].app === A.toUpperCase()) {
						B.push(w[z].segment)
					}
				}
				return B
			},
			set : function(B, A) {
				var C = [];
				if (typeof (A) === "string") {
					C.push(A)
				} else {
					C = A
				}
				for ( var z = ii = 0, y = w.length; z < y; z++) {
					if (w[z].app === B.toUpperCase()) {
						w[z].segment = C[ii];
						w[z].length = C[ii].length;
						ii++
					}
					if (ii >= C.length) {
						break
					}
				}
			},
			purge : function() {
				w = [];
				u.init(null)
			}
		}
	}
	function a() {
		var t, q, r = {}, w;
		t = new b();
		q = {
			tiff : {
				274 : "Orientation",
				34665 : "ExifIFDPointer",
				34853 : "GPSInfoIFDPointer"
			},
			exif : {
				36864 : "ExifVersion",
				40961 : "ColorSpace",
				40962 : "PixelXDimension",
				40963 : "PixelYDimension",
				36867 : "DateTimeOriginal",
				33434 : "ExposureTime",
				33437 : "FNumber",
				34855 : "ISOSpeedRatings",
				37377 : "ShutterSpeedValue",
				37378 : "ApertureValue",
				37383 : "MeteringMode",
				37384 : "LightSource",
				37385 : "Flash",
				41986 : "ExposureMode",
				41987 : "WhiteBalance",
				41990 : "SceneCaptureType",
				41988 : "DigitalZoomRatio",
				41992 : "Contrast",
				41993 : "Saturation",
				41994 : "Sharpness"
			},
			gps : {
				0 : "GPSVersionID",
				1 : "GPSLatitudeRef",
				2 : "GPSLatitude",
				3 : "GPSLongitudeRef",
				4 : "GPSLongitude"
			}
		};
		w = {
			ColorSpace : {
				1 : "sRGB",
				0 : "Uncalibrated"
			},
			MeteringMode : {
				0 : "Unknown",
				1 : "Average",
				2 : "CenterWeightedAverage",
				3 : "Spot",
				4 : "MultiSpot",
				5 : "Pattern",
				6 : "Partial",
				255 : "Other"
			},
			LightSource : {
				1 : "Daylight",
				2 : "Fliorescent",
				3 : "Tungsten",
				4 : "Flash",
				9 : "Fine weather",
				10 : "Cloudy weather",
				11 : "Shade",
				12 : "Daylight fluorescent (D 5700 - 7100K)",
				13 : "Day white fluorescent (N 4600 -5400K)",
				14 : "Cool white fluorescent (W 3900 - 4500K)",
				15 : "White fluorescent (WW 3200 - 3700K)",
				17 : "Standard light A",
				18 : "Standard light B",
				19 : "Standard light C",
				20 : "D55",
				21 : "D65",
				22 : "D75",
				23 : "D50",
				24 : "ISO studio tungsten",
				255 : "Other"
			},
			Flash : {
				0 : "Flash did not fire.",
				1 : "Flash fired.",
				5 : "Strobe return light not detected.",
				7 : "Strobe return light detected.",
				9 : "Flash fired, compulsory flash mode",
				13 : "Flash fired, compulsory flash mode, return light not detected",
				15 : "Flash fired, compulsory flash mode, return light detected",
				16 : "Flash did not fire, compulsory flash mode",
				24 : "Flash did not fire, auto mode",
				25 : "Flash fired, auto mode",
				29 : "Flash fired, auto mode, return light not detected",
				31 : "Flash fired, auto mode, return light detected",
				32 : "No flash function",
				65 : "Flash fired, red-eye reduction mode",
				69 : "Flash fired, red-eye reduction mode, return light not detected",
				71 : "Flash fired, red-eye reduction mode, return light detected",
				73 : "Flash fired, compulsory flash mode, red-eye reduction mode",
				77 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
				79 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
				89 : "Flash fired, auto mode, red-eye reduction mode",
				93 : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
				95 : "Flash fired, auto mode, return light detected, red-eye reduction mode"
			},
			ExposureMode : {
				0 : "Auto exposure",
				1 : "Manual exposure",
				2 : "Auto bracket"
			},
			WhiteBalance : {
				0 : "Auto white balance",
				1 : "Manual white balance"
			},
			SceneCaptureType : {
				0 : "Standard",
				1 : "Landscape",
				2 : "Portrait",
				3 : "Night scene"
			},
			Contrast : {
				0 : "Normal",
				1 : "Soft",
				2 : "Hard"
			},
			Saturation : {
				0 : "Normal",
				1 : "Low saturation",
				2 : "High saturation"
			},
			Sharpness : {
				0 : "Normal",
				1 : "Soft",
				2 : "Hard"
			},
			GPSLatitudeRef : {
				N : "North latitude",
				S : "South latitude"
			},
			GPSLongitudeRef : {
				E : "East longitude",
				W : "West longitude"
			}
		};
		function s(x, F) {
			var z = t.SHORT(x), C, I, J, E, D, y, A, G, H = [], B = {};
			for (C = 0; C < z; C++) {
				A = y = x + 12 * C + 2;
				J = F[t.SHORT(A)];
				if (J === g) {
					continue
				}
				E = t.SHORT(A += 2);
				D = t.LONG(A += 2);
				A += 4;
				H = [];
				switch (E) {
				case 1:
				case 7:
					if (D > 4) {
						A = t.LONG(A) + r.tiffHeader
					}
					for (I = 0; I < D; I++) {
						H[I] = t.BYTE(A + I)
					}
					break;
				case 2:
					if (D > 4) {
						A = t.LONG(A) + r.tiffHeader
					}
					B[J] = t.STRING(A, D - 1);
					continue;
				case 3:
					if (D > 2) {
						A = t.LONG(A) + r.tiffHeader
					}
					for (I = 0; I < D; I++) {
						H[I] = t.SHORT(A + I * 2)
					}
					break;
				case 4:
					if (D > 1) {
						A = t.LONG(A) + r.tiffHeader
					}
					for (I = 0; I < D; I++) {
						H[I] = t.LONG(A + I * 4)
					}
					break;
				case 5:
					A = t.LONG(A) + r.tiffHeader;
					for (I = 0; I < D; I++) {
						H[I] = t.LONG(A + I * 4) / t.LONG(A + I * 4 + 4)
					}
					break;
				case 9:
					A = t.LONG(A) + r.tiffHeader;
					for (I = 0; I < D; I++) {
						H[I] = t.SLONG(A + I * 4)
					}
					break;
				case 10:
					A = t.LONG(A) + r.tiffHeader;
					for (I = 0; I < D; I++) {
						H[I] = t.SLONG(A + I * 4) / t.SLONG(A + I * 4 + 4)
					}
					break;
				default:
					continue
				}
				G = (D == 1 ? H[0] : H);
				if (w.hasOwnProperty(J) && typeof G != "object") {
					B[J] = w[J][G]
				} else {
					B[J] = G
				}
			}
			return B
		}
		function v() {
			var y = g, x = r.tiffHeader;
			t.II(t.SHORT(x) == 18761);
			if (t.SHORT(x += 2) !== 42) {
				return false
			}
			r.IFD0 = r.tiffHeader + t.LONG(x += 2);
			y = s(r.IFD0, q.tiff);
			r.exifIFD = ("ExifIFDPointer" in y ? r.tiffHeader
					+ y.ExifIFDPointer : g);
			r.gpsIFD = ("GPSInfoIFDPointer" in y ? r.tiffHeader
					+ y.GPSInfoIFDPointer : g);
			return true
		}
		function u(z, x, C) {
			var E, B, A, D = 0;
			if (typeof (x) === "string") {
				var y = q[z.toLowerCase()];
				for (hex in y) {
					if (y[hex] === x) {
						x = hex;
						break
					}
				}
			}
			E = r[z.toLowerCase() + "IFD"];
			B = t.SHORT(E);
			for (i = 0; i < B; i++) {
				A = E + 12 * i + 2;
				if (t.SHORT(A) == x) {
					D = A + 8;
					break
				}
			}
			if (!D) {
				return false
			}
			t.LONG(D, C);
			return true
		}
		return {
			init : function(x) {
				r = {
					tiffHeader : 10
				};
				if (x === g || !x.length) {
					return false
				}
				t.init(x);
				if (t.SHORT(0) === 65505
						&& t.STRING(4, 5).toUpperCase() === "EXIF\0") {
					return v()
				}
				return false
			},
			EXIF : function() {
				var y;
				y = s(r.exifIFD, q.exif);
				if (y.ExifVersion && l.typeOf(y.ExifVersion) === "array") {
					for ( var z = 0, x = ""; z < y.ExifVersion.length; z++) {
						x += String.fromCharCode(y.ExifVersion[z])
					}
					y.ExifVersion = x
				}
				return y
			},
			GPS : function() {
				var x;
				x = s(r.gpsIFD, q.gps);
				if (x.GPSVersionID) {
					x.GPSVersionID = x.GPSVersionID.join(".")
				}
				return x
			},
			setExif : function(x, y) {
				if (x !== "PixelXDimension" && x !== "PixelYDimension") {
					return false
				}
				return u("exif", x, y)
			},
			getBinary : function() {
				return t.SEGMENT()
			}
		}
	}
})(window, document, plupload);
(function(d, a, b, c) {
	function e(f) {
		return a.getElementById(f)
	}
	b.runtimes.Html4 = b
			.addRuntime(
					"html4",
					{
						getFeatures : function() {
							return {
								multipart : true,
								triggerDialog : (b.ua.gecko && d.FormData || b.ua.webkit)
							}
						},
						init : function(f, g) {
							f
									.bind(
											"Init",
											function(p) {
												var j = a.body, n, h = "javascript", k, x, q, z = [], r = /MSIE/
														.test(navigator.userAgent), t = [], m = p.settings.filters, o, l, s, w;
												no_type_restriction: for (o = 0; o < m.length; o++) {
													l = m[o].extensions
															.split(/,/);
													for (w = 0; w < l.length; w++) {
														if (l[w] === "*") {
															t = [];
															break no_type_restriction
														}
														s = b.mimeTypes[l[w]];
														if (s
																&& b.inArray(s,
																		t) === -1) {
															t.push(s)
														}
													}
												}
												t = t.join(",");
												function v() {
													var B, y, i, A;
													q = b.guid();
													z.push(q);
													B = a.createElement("form");
													B.setAttribute("id",
															"form_" + q);
													B.setAttribute("method",
															"post");
													B
															.setAttribute(
																	"enctype",
																	"multipart/form-data");
													B
															.setAttribute(
																	"encoding",
																	"multipart/form-data");
													B.setAttribute("target",
															p.id + "_iframe");
													B.style.position = "absolute";
													y = a
															.createElement("input");
													y.setAttribute("id",
															"input_" + q);
													y.setAttribute("type",
															"file");
													y.setAttribute("accept", t);
													y.setAttribute("size", 1);
													A = e(p.settings.browse_button);
													if (p.features.triggerDialog
															&& A) {
														b
																.addEvent(
																		e(p.settings.browse_button),
																		"click",
																		function(
																				C) {
																			if (!y.disabled) {
																				y
																						.click()
																			}
																			C
																					.preventDefault()
																		}, p.id)
													}
													b.extend(y.style, {
														width : "100%",
														height : "100%",
														opacity : 0,
														fontSize : "99px",
														cursor : "pointer"
													});
													b.extend(B.style, {
														overflow : "hidden"
													});
													i = p.settings.shim_bgcolor;
													if (i) {
														B.style.background = i
													}
													if (r) {
														b
																.extend(
																		y.style,
																		{
																			filter : "alpha(opacity=0)"
																		})
													}
													b
															.addEvent(
																	y,
																	"change",
																	function(F) {
																		var D = F.target, C, E = [], G;
																		if (D.value) {
																			e("form_"
																					+ q).style.top = -1048575
																					+ "px";
																			C = D.value
																					.replace(
																							/\\/g,
																							"/");
																			C = C
																					.substring(
																							C.length,
																							C
																									.lastIndexOf("/") + 1);
																			E
																					.push(new b.File(
																							q,
																							C));
																			if (!p.features.triggerDialog) {
																				b
																						.removeAllEvents(
																								B,
																								p.id)
																			} else {
																				b
																						.removeEvent(
																								A,
																								"click",
																								p.id)
																			}
																			b
																					.removeEvent(
																							y,
																							"change",
																							p.id);
																			v();
																			if (E.length) {
																				f
																						.trigger(
																								"FilesAdded",
																								E)
																			}
																		}
																	}, p.id);
													B.appendChild(y);
													j.appendChild(B);
													p.refresh()
												}
												function u() {
													var i = a
															.createElement("div");
													i.innerHTML = '<iframe id="'
															+ p.id
															+ '_iframe" name="'
															+ p.id
															+ '_iframe" src="'
															+ h
															+ ':&quot;&quot;" style="display:none"></iframe>';
													n = i.firstChild;
													j.appendChild(n);
													b
															.addEvent(
																	n,
																	"load",
																	function(C) {
																		var D = C.target, B, y;
																		if (!k) {
																			return
																		}
																		try {
																			B = D.contentWindow.document
																					|| D.contentDocument
																					|| d.frames[D.id].document
																		} catch (A) {
																			p
																					.trigger(
																							"Error",
																							{
																								code : b.SECURITY_ERROR,
																								message : b
																										.translate("Security error."),
																								file : k
																							});
																			return
																		}
																		y = B.documentElement.innerText
																				|| B.documentElement.textContent;
																		if (y) {
																			k.status = b.DONE;
																			k.loaded = 1025;
																			k.percent = 100;
																			p
																					.trigger(
																							"UploadProgress",
																							k);
																			p
																					.trigger(
																							"FileUploaded",
																							k,
																							{
																								response : y
																							})
																		}
																	}, p.id)
												}
												if (p.settings.container) {
													j = e(p.settings.container);
													if (b.getStyle(j,
															"position") === "static") {
														j.style.position = "relative"
													}
												}
												p
														.bind(
																"UploadFile",
																function(i, A) {
																	var B, y;
																	if (A.status == b.DONE
																			|| A.status == b.FAILED
																			|| i.state == b.STOPPED) {
																		return
																	}
																	B = e("form_"
																			+ A.id);
																	y = e("input_"
																			+ A.id);
																	y
																			.setAttribute(
																					"name",
																					i.settings.file_data_name);
																	B
																			.setAttribute(
																					"action",
																					i.settings.url);
																	b
																			.each(
																					b
																							.extend(
																									{
																										name : A.target_name
																												|| A.name
																									},
																									i.settings.multipart_params),
																					function(
																							E,
																							C) {
																						var D = a
																								.createElement("input");
																						b
																								.extend(
																										D,
																										{
																											type : "hidden",
																											name : C,
																											value : E
																										});
																						B
																								.insertBefore(
																										D,
																										B.firstChild)
																					});
																	k = A;
																	e("form_"
																			+ q).style.top = -1048575
																			+ "px";
																	B.submit()
																});
												p.bind("FileUploaded",
														function(i) {
															i.refresh()
														});
												p
														.bind(
																"StateChanged",
																function(i) {
																	if (i.state == b.STARTED) {
																		u()
																	} else {
																		if (i.state == b.STOPPED) {
																			d
																					.setTimeout(
																							function() {
																								b
																										.removeEvent(
																												n,
																												"load",
																												i.id);
																								if (n.parentNode) {
																									n.parentNode
																											.removeChild(n)
																								}
																							},
																							0)
																		}
																	}
																	b
																			.each(
																					i.files,
																					function(
																							A,
																							y) {
																						if (A.status === b.DONE
																								|| A.status === b.FAILED) {
																							var B = e("form_"
																									+ A.id);
																							if (B) {
																								B.parentNode
																										.removeChild(B)
																							}
																						}
																					})
																});
												p
														.bind(
																"Refresh",
																function(y) {
																	var F, A, B, C, i, G, H, E, D;
																	F = e(y.settings.browse_button);
																	if (F) {
																		i = b
																				.getPos(
																						F,
																						e(y.settings.container));
																		G = b
																				.getSize(F);
																		H = e("form_"
																				+ q);
																		E = e("input_"
																				+ q);
																		b
																				.extend(
																						H.style,
																						{
																							top : i.y
																									+ "px",
																							left : i.x
																									+ "px",
																							width : G.w
																									+ "px",
																							height : G.h
																									+ "px"
																						});
																		if (y.features.triggerDialog) {
																			if (b
																					.getStyle(
																							F,
																							"position") === "static") {
																				b
																						.extend(
																								F.style,
																								{
																									position : "relative"
																								})
																			}
																			D = parseInt(
																					F.style.zIndex,
																					10);
																			if (isNaN(D)) {
																				D = 0
																			}
																			b
																					.extend(
																							F.style,
																							{
																								zIndex : D
																							});
																			b
																					.extend(
																							H.style,
																							{
																								zIndex : D - 1
																							})
																		}
																		B = y.settings.browse_button_hover;
																		C = y.settings.browse_button_active;
																		A = y.features.triggerDialog ? F
																				: H;
																		if (B) {
																			b
																					.addEvent(
																							A,
																							"mouseover",
																							function() {
																								b
																										.addClass(
																												F,
																												B)
																							},
																							y.id);
																			b
																					.addEvent(
																							A,
																							"mouseout",
																							function() {
																								b
																										.removeClass(
																												F,
																												B)
																							},
																							y.id)
																		}
																		if (C) {
																			b
																					.addEvent(
																							A,
																							"mousedown",
																							function() {
																								b
																										.addClass(
																												F,
																												C)
																							},
																							y.id);
																			b
																					.addEvent(
																							a.body,
																							"mouseup",
																							function() {
																								b
																										.removeClass(
																												F,
																												C)
																							},
																							y.id)
																		}
																	}
																});
												f
														.bind(
																"FilesRemoved",
																function(y, B) {
																	var A, C;
																	for (A = 0; A < B.length; A++) {
																		C = e("form_"
																				+ B[A].id);
																		if (C) {
																			C.parentNode
																					.removeChild(C)
																		}
																	}
																});
												f
														.bind(
																"DisableBrowse",
																function(i, A) {
																	var y = a
																			.getElementById("input_"
																					+ q);
																	if (y) {
																		y.disabled = A
																	}
																});
												f
														.bind(
																"Destroy",
																function(i) {
																	var y, A, B, C = {
																		inputContainer : "form_"
																				+ q,
																		inputFile : "input_"
																				+ q,
																		browseButton : i.settings.browse_button
																	};
																	for (y in C) {
																		A = e(C[y]);
																		if (A) {
																			b
																					.removeAllEvents(
																							A,
																							i.id)
																		}
																	}
																	b
																			.removeAllEvents(
																					a.body,
																					i.id);
																	b
																			.each(
																					z,
																					function(
																							E,
																							D) {
																						B = e("form_"
																								+ E);
																						if (B) {
																							B.parentNode
																									.removeChild(B)
																						}
																					})
																});
												v()
											});
							g({
								success : true
							})
						}
					})
})(window, document, plupload);