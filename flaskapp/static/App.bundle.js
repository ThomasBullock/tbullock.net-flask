/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(3);

var _ajax2 = _interopRequireDefault(_ajax);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadProjectImage = document.getElementById("image_url");
// import editor from "./modules/editor";

var uploadPublicId = document.getElementById("image_public_id");

var offCanvasMenuButton = document.getElementById("menu-trigger");
var offCanvasMenu = document.querySelector(".mobile-menu");

var navLinks = Array.from(document.querySelectorAll(".nav-link"));

console.log(navLinks);

console.log(offCanvasMenuButton);

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    link.classList.remove("is-visible");
  });
});

// window.Prism.manual = true;

if (uploadProjectImage) {
  uploadProjectImage.addEventListener("click", function () {
    console.log("clicky file!");
    _ajax2.default.transport({
      url: "http://localhost:5000/upload",
      accept: "image/*",
      progress: function progress(percentage) {
        document.title = percentage + "%";
      },
      ratio: 95,
      fieldName: "image"
    }).then(function (res) {
      console.log(res);
      var _res$body$file = res.body.file,
          url = _res$body$file.url,
          public_id = _res$body$file.public_id;

      console.log(url, public_id);
      uploadProjectImage.value = url;
      uploadPublicId.value = public_id;
      console.dir(uploadPublicId);
    }).catch(function (err) {
      console.log(err);
    });
  });
}

offCanvasMenuButton.addEventListener("click", function (e) {
  offCanvasMenuButton.classList.toggle("open");
  offCanvasMenu.classList.toggle("is-visible");
});

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.ajax = t() : e.ajax = t();
}(window, function () {
  return function (e) {
    var t = {};function n(r) {
      if (t[r]) return t[r].exports;var o = t[r] = { i: r, l: !1, exports: {} };return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var r = Object.create(null);if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {
        n.d(r, o, function (t) {
          return e[t];
        }.bind(null, o));
      }return r;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 3);
  }([function (e, t) {
    var n;n = function () {
      return this;
    }();try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
    }e.exports = n;
  }, function (e, t, n) {
    "use strict";
    (function (e) {
      var r = n(2),
          o = setTimeout;function i() {}function a(e) {
        if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new");if ("function" != typeof e) throw new TypeError("not a function");this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], d(e, this);
      }function u(e, t) {
        for (; 3 === e._state;) {
          e = e._value;
        }0 !== e._state ? (e._handled = !0, a._immediateFn(function () {
          var n = 1 === e._state ? t.onFulfilled : t.onRejected;if (null !== n) {
            var r;try {
              r = n(e._value);
            } catch (e) {
              return void s(t.promise, e);
            }c(t.promise, r);
          } else (1 === e._state ? c : s)(t.promise, e._value);
        })) : e._deferreds.push(t);
      }function c(e, t) {
        try {
          if (t === e) throw new TypeError("A promise cannot be resolved with itself.");if (t && ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || "function" == typeof t)) {
            var n = t.then;if (t instanceof a) return e._state = 3, e._value = t, void f(e);if ("function" == typeof n) return void d((r = n, o = t, function () {
              r.apply(o, arguments);
            }), e);
          }e._state = 1, e._value = t, f(e);
        } catch (t) {
          s(e, t);
        }var r, o;
      }function s(e, t) {
        e._state = 2, e._value = t, f(e);
      }function f(e) {
        2 === e._state && 0 === e._deferreds.length && a._immediateFn(function () {
          e._handled || a._unhandledRejectionFn(e._value);
        });for (var t = 0, n = e._deferreds.length; t < n; t++) {
          u(e, e._deferreds[t]);
        }e._deferreds = null;
      }function l(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n;
      }function d(e, t) {
        var n = !1;try {
          e(function (e) {
            n || (n = !0, c(t, e));
          }, function (e) {
            n || (n = !0, s(t, e));
          });
        } catch (e) {
          if (n) return;n = !0, s(t, e);
        }
      }a.prototype.catch = function (e) {
        return this.then(null, e);
      }, a.prototype.then = function (e, t) {
        var n = new this.constructor(i);return u(this, new l(e, t, n)), n;
      }, a.prototype.finally = r.a, a.all = function (e) {
        return new a(function (t, n) {
          if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");var r = Array.prototype.slice.call(e);if (0 === r.length) return t([]);var o = r.length;function i(e, a) {
            try {
              if (a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a)) {
                var u = a.then;if ("function" == typeof u) return void u.call(a, function (t) {
                  i(e, t);
                }, n);
              }r[e] = a, 0 == --o && t(r);
            } catch (e) {
              n(e);
            }
          }for (var a = 0; a < r.length; a++) {
            i(a, r[a]);
          }
        });
      }, a.resolve = function (e) {
        return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.constructor === a ? e : new a(function (t) {
          t(e);
        });
      }, a.reject = function (e) {
        return new a(function (t, n) {
          n(e);
        });
      }, a.race = function (e) {
        return new a(function (t, n) {
          for (var r = 0, o = e.length; r < o; r++) {
            e[r].then(t, n);
          }
        });
      }, a._immediateFn = "function" == typeof e && function (t) {
        e(t);
      } || function (e) {
        o(e, 0);
      }, a._unhandledRejectionFn = function (e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
      }, t.a = a;
    }).call(this, n(5).setImmediate);
  }, function (e, t, n) {
    "use strict";
    t.a = function (e) {
      var t = this.constructor;return this.then(function (n) {
        return t.resolve(e()).then(function () {
          return n;
        });
      }, function (n) {
        return t.resolve(e()).then(function () {
          return t.reject(n);
        });
      });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      })(e);
    }n(4);var o,
        i,
        a,
        u,
        c,
        s,
        f,
        l = n(8),
        d = (i = function i(e) {
      return new Promise(function (t, n) {
        e = u(e), (e = c(e)).beforeSend && e.beforeSend();var r = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");r.open(e.method, e.url), r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(e.headers).forEach(function (t) {
          var n = e.headers[t];r.setRequestHeader(t, n);
        });var o = e.ratio;r.upload.addEventListener("progress", function (t) {
          var n = Math.round(t.loaded / t.total * 100),
              r = Math.ceil(n * o / 100);e.progress(Math.min(r, 100));
        }, !1), r.addEventListener("progress", function (t) {
          var n = Math.round(t.loaded / t.total * 100),
              r = Math.ceil(n * (100 - o) / 100) + o;e.progress(Math.min(r, 100));
        }, !1), r.onreadystatechange = function () {
          if (4 === r.readyState) {
            var e = r.response;try {
              e = JSON.parse(e);
            } catch (e) {}var o = l.parseHeaders(r.getAllResponseHeaders()),
                i = { body: e, code: r.status, headers: o };f(r.status) ? t(i) : n(i);
          }
        }, r.send(e.data);
      });
    }, a = function a(e) {
      return e.method = "POST", i(e);
    }, u = function u() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};if (e.url && "string" != typeof e.url) throw new Error("Url must be a string");if (e.url = e.url || "", e.method && "string" != typeof e.method) throw new Error("`method` must be a string or null");if (e.method = e.method ? e.method.toUpperCase() : "GET", e.headers && "object" !== r(e.headers)) throw new Error("`headers` must be an object or null");if (e.headers = e.headers || {}, e.type && ("string" != typeof e.type || !Object.values(o).includes(e.type))) throw new Error("`type` must be taken from module's «contentType» library");if (e.progress && "function" != typeof e.progress) throw new Error("`progress` must be a function or null");if (e.progress = e.progress || function (e) {}, e.beforeSend = e.beforeSend || function (e) {}, e.ratio && "number" != typeof e.ratio) throw new Error("`ratio` must be a number");if (e.ratio < 0 || e.ratio > 100) throw new Error("`ratio` must be in a 0-100 interval");if (e.ratio = e.ratio || 90, e.accept && "string" != typeof e.accept) throw new Error("`accept` must be a string with a list of allowed mime-types");if (e.accept = e.accept || "*/*", e.multiple && "boolean" != typeof e.multiple) throw new Error("`multiple` must be a true or false");if (e.multiple = e.multiple || !1, e.fieldName && "string" != typeof e.fieldName) throw new Error("`fieldName` must be a string");return e.fieldName = e.fieldName || "files", e;
    }, c = function c(e) {
      switch (e.method) {case "GET":
          var t = s(e.data, o.URLENCODED);delete e.data, e.url = /\?/.test(e.url) ? e.url + "&" + t : e.url + "?" + t;break;case "POST":case "PUT":case "DELETE":case "UPDATE":
          var n = function () {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).type || o.JSON;
          }(e);(l.isFormData(e.data) || l.isFormElement(e.data)) && (n = o.FORM), e.data = s(e.data, n), n !== d.contentType.FORM && (e.headers["content-type"] = n);}return e;
    }, s = function s() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};switch (arguments.length > 1 ? arguments[1] : void 0) {case o.URLENCODED:
          return l.urlEncode(e);case o.JSON:
          return l.jsonEncode(e);case o.FORM:
          return l.formEncode(e);default:
          return e;}
    }, f = function f(e) {
      return e >= 200 && e < 300;
    }, { contentType: o = { URLENCODED: "application/x-www-form-urlencoded; charset=utf-8", FORM: "multipart/form-data", JSON: "application/json; charset=utf-8" }, request: i, get: function get(e) {
        return e.method = "GET", i(e);
      }, post: a, transport: function transport(e) {
        return e = u(e), l.selectFiles(e).then(function (t) {
          for (var n = new FormData(), r = 0; r < t.length; r++) {
            n.append(e.fieldName, t[r], t[r].name);
          }l.isObject(e.data) && Object.keys(e.data).forEach(function (t) {
            var r = e.data[t];n.append(t, r);
          });var o = e.beforeSend;return e.beforeSend = function () {
            return o(t);
          }, e.data = n, a(e);
        });
      }, selectFiles: function selectFiles(e) {
        return delete (e = u(e)).beforeSend, l.selectFiles(e);
      } });e.exports = d;
  }, function (e, t, n) {
    "use strict";
    n.r(t);var r = n(1);window.Promise = window.Promise || r.a;
  }, function (e, t, n) {
    (function (e) {
      var r = void 0 !== e && e || "undefined" != typeof self && self || window,
          o = Function.prototype.apply;function i(e, t) {
        this._id = e, this._clearFn = t;
      }t.setTimeout = function () {
        return new i(o.call(setTimeout, r, arguments), clearTimeout);
      }, t.setInterval = function () {
        return new i(o.call(setInterval, r, arguments), clearInterval);
      }, t.clearTimeout = t.clearInterval = function (e) {
        e && e.close();
      }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
        this._clearFn.call(r, this._id);
      }, t.enroll = function (e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
      }, t.unenroll = function (e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
      }, t._unrefActive = t.active = function (e) {
        clearTimeout(e._idleTimeoutId);var t = e._idleTimeout;t >= 0 && (e._idleTimeoutId = setTimeout(function () {
          e._onTimeout && e._onTimeout();
        }, t));
      }, n(6), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate;
    }).call(this, n(0));
  }, function (e, t, n) {
    (function (e, t) {
      !function (e, n) {
        "use strict";
        if (!e.setImmediate) {
          var r,
              o,
              i,
              a,
              u,
              c = 1,
              s = {},
              f = !1,
              l = e.document,
              d = Object.getPrototypeOf && Object.getPrototypeOf(e);d = d && d.setTimeout ? d : e, "[object process]" === {}.toString.call(e.process) ? r = function r(e) {
            t.nextTick(function () {
              m(e);
            });
          } : !function () {
            if (e.postMessage && !e.importScripts) {
              var t = !0,
                  n = e.onmessage;return e.onmessage = function () {
                t = !1;
              }, e.postMessage("", "*"), e.onmessage = n, t;
            }
          }() ? e.MessageChannel ? ((i = new MessageChannel()).port1.onmessage = function (e) {
            m(e.data);
          }, r = function r(e) {
            i.port2.postMessage(e);
          }) : l && "onreadystatechange" in l.createElement("script") ? (o = l.documentElement, r = function r(e) {
            var t = l.createElement("script");t.onreadystatechange = function () {
              m(e), t.onreadystatechange = null, o.removeChild(t), t = null;
            }, o.appendChild(t);
          }) : r = function r(e) {
            setTimeout(m, 0, e);
          } : (a = "setImmediate$" + Math.random() + "$", u = function u(t) {
            t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && m(+t.data.slice(a.length));
          }, e.addEventListener ? e.addEventListener("message", u, !1) : e.attachEvent("onmessage", u), r = function r(t) {
            e.postMessage(a + t, "*");
          }), d.setImmediate = function (e) {
            "function" != typeof e && (e = new Function("" + e));for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) {
              t[n] = arguments[n + 1];
            }var o = { callback: e, args: t };return s[c] = o, r(c), c++;
          }, d.clearImmediate = p;
        }function p(e) {
          delete s[e];
        }function m(e) {
          if (f) setTimeout(m, 0, e);else {
            var t = s[e];if (t) {
              f = !0;try {
                !function (e) {
                  var t = e.callback,
                      r = e.args;switch (r.length) {case 0:
                      t();break;case 1:
                      t(r[0]);break;case 2:
                      t(r[0], r[1]);break;case 3:
                      t(r[0], r[1], r[2]);break;default:
                      t.apply(n, r);}
                }(t);
              } finally {
                p(e), f = !1;
              }
            }
          }
        }
      }("undefined" == typeof self ? void 0 === e ? this : e : self);
    }).call(this, n(0), n(7));
  }, function (e, t) {
    var n,
        r,
        o = e.exports = {};function i() {
      throw new Error("setTimeout has not been defined");
    }function a() {
      throw new Error("clearTimeout has not been defined");
    }function u(e) {
      if (n === setTimeout) return setTimeout(e, 0);if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }!function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }try {
        r = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        r = a;
      }
    }();var c,
        s = [],
        f = !1,
        l = -1;function d() {
      f && c && (f = !1, c.length ? s = c.concat(s) : l = -1, s.length && p());
    }function p() {
      if (!f) {
        var e = u(d);f = !0;for (var t = s.length; t;) {
          for (c = s, s = []; ++l < t;) {
            c && c[l].run();
          }l = -1, t = s.length;
        }c = null, f = !1, function (e) {
          if (r === clearTimeout) return clearTimeout(e);if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);try {
            r(e);
          } catch (t) {
            try {
              return r.call(null, e);
            } catch (t) {
              return r.call(this, e);
            }
          }
        }(e);
      }
    }function m(e, t) {
      this.fun = e, this.array = t;
    }function h() {}o.nextTick = function (e) {
      var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
        t[n - 1] = arguments[n];
      }s.push(new m(e, t)), 1 !== s.length || f || u(p);
    }, m.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function (e) {
      return [];
    }, o.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  }, function (e, t, n) {
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }var o = n(9);e.exports = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e);
      }var t, n, i;return t = e, i = [{ key: "urlEncode", value: function value(e) {
          return o(e);
        } }, { key: "jsonEncode", value: function value(e) {
          return JSON.stringify(e);
        } }, { key: "formEncode", value: function value(e) {
          if (this.isFormData(e)) return e;if (this.isFormElement(e)) return new FormData(e);if (this.isObject(e)) {
            var t = new FormData();return Object.keys(e).forEach(function (n) {
              var r = e[n];t.append(n, r);
            }), t;
          }throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
        } }, { key: "isObject", value: function value(e) {
          return "[object Object]" === Object.prototype.toString.call(e);
        } }, { key: "isFormData", value: function value(e) {
          return e instanceof FormData;
        } }, { key: "isFormElement", value: function value(e) {
          return e instanceof HTMLFormElement;
        } }, { key: "selectFiles", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};return new Promise(function (t, n) {
            var r = document.createElement("INPUT");r.type = "file", e.multiple && r.setAttribute("multiple", "multiple"), e.accept && r.setAttribute("accept", e.accept), r.style.display = "none", document.body.appendChild(r), r.addEventListener("change", function (e) {
              var n = e.target.files;t(n), document.body.removeChild(r);
            }, !1), r.click();
          });
        } }, { key: "parseHeaders", value: function value(e) {
          var t = e.trim().split(/[\r\n]+/),
              n = {};return t.forEach(function (e) {
            var t = e.split(": "),
                r = t.shift(),
                o = t.join(": ");r && (n[r] = o);
          }), n;
        } }], (n = null) && r(t.prototype, n), i && r(t, i), e;
    }();
  }, function (e, t) {
    var n = function n(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
    },
        r = function r(e, t, o, i) {
      return t = t || null, o = o || "&", i = i || null, e ? function (e) {
        for (var t = new Array(), n = 0; n < e.length; n++) {
          e[n] && t.push(e[n]);
        }return t;
      }(Object.keys(e).map(function (a) {
        var u,
            c,
            s = a;if (i && (s = i + "[" + s + "]"), "object" == _typeof(e[a]) && null !== e[a]) u = r(e[a], null, o, s);else {
          t && (c = s, s = !isNaN(parseFloat(c)) && isFinite(c) ? t + Number(s) : s);var f = e[a];f = (f = 0 === (f = !1 === (f = !0 === f ? "1" : f) ? "0" : f) ? "0" : f) || "", u = n(s) + "=" + n(f);
        }return u;
      })).join(o).replace(/[!'()*]/g, "") : "";
    };e.exports = r;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ })

/******/ });
//# sourceMappingURL=App.bundle.js.map