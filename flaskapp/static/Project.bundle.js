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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var adminProjectSelect = document.getElementById("admin-project-select");
if (adminProjectSelect) {
  var adminProjectEdit = document.getElementById("admin-project-edit");
  adminProjectSelect.addEventListener("change", function (e) {
    console.log(e, adminProjectSelect.value);
    adminProjectEdit.setAttribute("href", "/projects/" + adminProjectSelect.value + "/update");
  });
}

var Project = Vue.component("Project", {
  // ... options ...
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  template: "<div>\n              <h2>{{data.title}}</h2>\n              <img class=\"img-responsive\" :src=\"data.image_url\" :alt=\"data.title + ' screenshot'\"/>\n              <p>{{data.comments}}</p>\n            </div>"
});

var vm = new Vue({
  // Again, vm is our Vue instance's name for consistency.
  el: "#vm",
  delimiters: ["[[", "]]"],
  data: {
    greeting: "Hello, Vue!",
    projects: JSON.parse(x),
    currentProject: 0
  },
  components: {
    project: Project
  },
  methods: {
    changeProject: function changeProject(direction) {
      console.log(direction);
      // const op = operators[direction];
      if (this.currentProject < this.projects.length && direction === "+") {
        this.currentProject++;
      } else if (this.currentProject > 0 && direction === "-") {
        this.currentProject--;
      }
    }
  },
  computed: {
    isFirst: function isFirst() {
      return this.currentProject === 0;
    },
    isLast: function isLast() {
      return this.currentProject === this.projects.length - 1;
    }
  },
  created: function created() {
    // `this` points to the vm instance
    console.log("a is: " + this.project);
    // console.log(JSON.parse(this.dinger));
  },
  template: "<div><project :data=\"projects[currentProject]\"></project>\n  <footer class=\"projects__footer\">\n    <button class=\"btn btn-primary\" :class=\"{'disabled': isFirst, 'btn-icon-left icon-arrow-left' : !isFirst}\" @click=\"changeProject('-')\">Previous</button>\n    <button class=\"btn btn-primary\" :class=\"{'disabled': isLast, 'btn-icon-right icon-arrow-right' : !isLast}\" @click=\"changeProject('+')\">next</button></footer>\n  </div>"
});

console.log(x);

/***/ })

/******/ });
//# sourceMappingURL=Project.bundle.js.map