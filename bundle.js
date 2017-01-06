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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var creature_class_1 = __webpack_require__(1);
	var targetFps = 15;
	main();
	function main() {
	    var creature = new creature_class_1.Creature({
	        name: 'Frank',
	        hygiene: 0,
	        hunger: 0,
	        boredom: 0
	    });
	    var feedButton = document.getElementById('feed');
	    var playButton = document.getElementById('play');
	    feedButton.addEventListener('click', function () {
	        creature.feed(5);
	    });
	    playButton.addEventListener('click', function () {
	        creature.playWith(5);
	    });
	    gameLoop(creature);
	}
	function gameLoop(creature) {
	    var beginMs = +new Date();
	    var lastMs = beginMs;
	    var targetDelay = (1 / targetFps) * 1000;
	    var frameCount = 0;
	    setInterval(function () {
	        var nowMs = +new Date();
	        var shouldRender = (nowMs - lastMs) >= targetDelay;
	        if (shouldRender) {
	            frameCount++;
	            var seconds = (nowMs - beginMs) / 1000;
	            var fps = frameCount / seconds;
	            console.log('FPS: ' + fps);
	            lastMs = nowMs;
	            gameTick(frameCount, creature);
	        }
	    }, 5);
	}
	function gameTick(thisTick, creature) {
	    creature.tick(thisTick);
	    renderStats(creature);
	}
	function renderStats(creature) {
	    var statsDiv = document.getElementById('stats-container');
	    var statusString = creature.statuses.join(', ');
	    var statsContent = "\n        <span><strong>Hunger: </strong>" + creature.hunger + "</span>\n        <span><strong>Boredom: </strong>" + creature.boredom + "</span>\n        <span><strong>Statuses: </strong>" + statusString + "</span>\n    ";
	    statsDiv.innerHTML = statsContent;
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Creature = (function () {
	    function Creature(opts) {
	        this.name = 'The Creature';
	        this.hunger = 0;
	        this.lastHungerTick = 0;
	        this.boredom = 0;
	        this.lastBoredomTick = 0;
	        this.hygiene = 0;
	        this.lastHygieneTick = 0;
	        this.statuses = [];
	        this.alive = true;
	        this.lastUpdated = 0;
	        this.name = opts.name;
	        this.hunger = opts.hunger;
	        this.boredom = opts.boredom;
	        this.hygiene = opts.hygiene;
	    }
	    Creature.prototype.feed = function (foodValue) {
	        this.hunger -= foodValue;
	        return this.hunger;
	    };
	    Creature.prototype.playWith = function (boredomValue) {
	        this.boredom -= boredomValue;
	        return this.boredom;
	    };
	    Creature.prototype.clean = function (hygieneValue) {
	        this.hygiene -= hygieneValue;
	        if (hygieneValue < 0)
	            this.hygiene = 0;
	        return this.hygiene;
	    };
	    Creature.prototype.tick = function (thisTick) {
	        this.updateHunger(thisTick);
	        this.updateBoredom(thisTick);
	        this.calculateStatuses();
	    };
	    Creature.prototype.updateHunger = function (thisTick) {
	        if (thisTick - this.lastHungerTick > 75) {
	            this.hunger++;
	            this.lastHungerTick = thisTick;
	        }
	        return this.hunger;
	    };
	    Creature.prototype.updateBoredom = function (thisTick) {
	        if (thisTick - this.lastBoredomTick > 150) {
	            this.boredom++;
	            this.lastBoredomTick = thisTick;
	        }
	    };
	    Creature.prototype.calculateStatuses = function () {
	        this.statuses = [];
	        (_a = this.statuses).push.apply(_a, this.getHungerStatuses());
	        (_b = this.statuses).push.apply(_b, this.getBoredomStatuses());
	        var _a, _b;
	    };
	    Creature.prototype.getHungerStatuses = function () {
	        var result = [];
	        if (this.hunger < -50) {
	            result.push('Stuffed');
	        }
	        else if (this.hunger < 0) {
	            result.push('Well Fed');
	        }
	        else if (this.hunger < 10) {
	            result.push('Satisfied');
	        }
	        else if (this.hunger < 20) {
	            result.push('Peckish');
	        }
	        else if (this.hunger < 50) {
	            result.push('Hungry');
	        }
	        else if (this.hunger < 80) {
	            result.push('Starving');
	        }
	        return result;
	    };
	    Creature.prototype.getBoredomStatuses = function () {
	        var result = [];
	        if (this.boredom < -10) {
	            result.push('Overstimulated');
	        }
	        else if (this.boredom < 10) {
	            result.push('Content');
	        }
	        else if (this.boredom < 50) {
	            result.push('Fidgity');
	        }
	        else if (this.boredom < 101) {
	            result.push('Restless');
	        }
	        return result;
	    };
	    return Creature;
	}());
	exports.Creature = Creature;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map