// code samples 
// blog post code samples
// TARGET VS SOURCE



// SCOPE




// LEVELS OF SCOPE

// Global scope
// Local Scope

// Global / Function / Block

// Variable Declaration vs Assignment

// VAR / LET / CONST


// VARIABLE SHADOWING
// contrived examples


// VARIABLE HOISTING

// FUNCTION HOISTING



// FUNCTION TYPES
// Personal preference for regular function declarations for transparency and modules for 

// function declaration 

 function manageTableTotals() {
    var selectedItems = collectCheckedBoxes();
    var numsArray = filterListForSelected(selectedItems);
    var price = totalPrice(numsArray);
    updateDOMTotalPrice(price);
    updateDOMItemCount(countItems(numsArray));
    toggleTaxes(CACHE);
  }

// function expression(unamed)

 var manageTableTotals = function () {
    var selectedItems = collectCheckedBoxes();
    var numsArray = filterListForSelected(selectedItems);
    var price = totalPrice(numsArray);
    updateDOMTotalPrice(price);
    updateDOMItemCount(countItems(numsArray));
    toggleTaxes(CACHE);
  }

// function expression(named)

var manageTableTotals = function updateTotals() {
  var selectedItems = collectCheckedBoxes();
  var numsArray = filterListForSelected(selectedItems);
  var price = totalPrice(numsArray);
  updateDOMTotalPrice(price);
  updateDOMItemCount(countItems(numsArray));
  toggleTaxes(CACHE);
}

// immediately invoked function expression
// can this be refactored? array of objects object {id: name, function: }
// 

var addButtonEventListeners = (function () {
  document.getElementById('btn-add-item').addEventListener('click', buildAddGroceryInputs);
  document.getElementById('btn-del-item').addEventListener('click', buildDeleteGroceryInputs);
  document.getElementById('btn-select-all').addEventListener('click', selectAllToggle);
  document.getElementById('btn-reset').addEventListener('click', reset);
}());

function addButtonListeners() { //refactored
  var buttons = [{ id: 'btn-add-item', buttonFunction: buildAddGroceryInputs }, { id: 'btn-del-item', buttonFunction: buildDeleteGroceryInputs }, { id: 'btn-select-all', buttonFunction }, { id: 'btn-reset', buttonFunction: reset }]

  buttons.forEach(el => {
    document.getElementById(el.id).addEventListener('click', el.buttonFunction)
  })
}

// can this be refactored to ?
//  test. 

  function manageTableTotals() { //refactored
  var numsArray = filterListForSelected(collectCheckedBoxes());
  updateDOMTotalPrice(totalPrice(numsArray));
  updateDOMItemCount(countItems(numsArray));
  toggleTaxes(CACHE);
}

// anonymous function






// arrow function





// THIS, THIS, THIS or THIS
// order of precedence

// new -


// explicit -


// implicit -


// default -





//  CLOSURES

function setCACHE(data) {
  var cache = {};
  function cacheData(data, cacheName) {
    if (data) { cache[cacheName] = data };
    return cache[cacheName];
  };

  return {
    totalPrice: function (data) { return cacheData(data, 'totalPrice') },
    taxRate: function (data) { return cacheData(data, 'taxRate') },
    element: {
      price: document.getElementById('cost-num')
    }
  }
}

// ES MODULES

// Named exports:

export { createNewList, buildSavedList, returnSavedList, manageGroceryList }; // this goes at the end of your module file

import { createNewList, buildSavedList, returnSavedList, manageGroceryList } from './modules/localStorage.js';

<script type="module" src="localStorage.js"></script>

// Default Exports:

export default newList;

import newList from './modules/localStorage.js';

// Renaming imports and exports
// method 1:

export {
  createNewList as newList,
  buildSavedList as savedList
};

import { newList, savedList } from './modules/localStorage.js';

// method 2:

export { createNewList, buildSavedList };

import {
  createNewList as newList,
  buildSavedList as savedList
} from './modules/localStorage.js';

// Creating Module objects:
export { createNewList, buildSavedList, returnSavedList, manageGroceryList }};
import * as Storage from './modules/localStorage.js';
Storage.manageGroceryList('addItem', 'banana', 3);

// CLASSIC MODULE PATTERN using named exports:

// ./modules/cache.js
const CACHE = (function setCACHE(data) {
  var cache = {};
  function cacheData(data, cacheName) {
    if (data) { cache[cacheName] = data };
    return cache[cacheName];
  };

  return {
    totalPrice: function (data) { return cacheData(data, 'totalPrice') },
    taxRate: function (data) { return cacheData(data, 'taxRate') },
    element: {
      price: document.getElementById('cost-num')
    }
  }
})();

export { CACHE };

// main.js
import { CACHE } from "./modules/cache.js";





