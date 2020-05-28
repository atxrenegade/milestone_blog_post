---
title: JS Under the Hood - The Fuzzy Parts | Understanding JIT Comp, Scopes, Closures, Hoisting, Shadowing, THIS, & the Module Pattern

published: false

description: Understanding Just-In-Time Compilation,Exploring Scopes, Closures, Hoisting, and Shadowing, Comparing Variable and Function Behavior and Types, Implicit vs Explicit - Rules of Precedence for determining THIS, The Principle of Least Exposure (POLE), Review of the Classic Module Pattern and the ES Module Format

tags: #javascript #web-development #closure #hoisting #modules #jit-compilation #shadowing
---

Some of the topics explored in this post:
• Understanding Just-In-Time Compilation
• Exploring Scopes, Closures, Hoisting, and Shadowing 
• Comparing Variable and Function Behavior and Types
• Implicit vs Explicit - Rules of Precedence for determining THIS
• The Principle of Least Exposure (POLE)
• Review of the Classic Module Pattern and the ES Module Format

## Correcting Distorted Mental Models 

After discovering some misguided mental models in my understanding of some of the more opaque idiosyncrasies of JavaScript I was directed towards Kyle Simpson's infamous and invaluable series "You Don't Know JS" (specifically the 'Scope and Closures' volume).  I highly recommend a thorough consumption of each of these books to any developer who plans to spend any amount of time working with the rapidly transforming language of JavaScript for a solid grasp of some of these often misunderstood and miscommunicated concepts. I hope I can do it some justice in clarifying and communicating some of those concepts here. 

I am a full picture person, I retain details best when I have a complete picture, an aerial view, a deep exploration of low level concepts. But this is the real world and in development we often don't get time for contemplation and review, so I savor it when I can. Here's my Reader Digest version of mulling over Kyle's book(3 x for good measure), Stack Overflow posts, YouTube videos, Wikipedia (surprisingly), medium, Dev.to, GitHub repos and a dozen of other sources. Some of the specific misconceptions I was looking to clarify were hoisting, the use vs banishment of var, closures, and the mystical JIT compilation process. Much of what I discovered contradicted what I had originally been taught, but these new arguments were backed with compelling logic from experienced developers and convincing code samples that altered the way I view, and currently use JS language and features. So let's dive in. 

## Compiled vs Interpreted

For machines to understand high level languages like JavaScript the code must be translated or complied into to machine code. Compilation is a process in which the compiler converts higher level source code into an machine language executable file in a build step before runtime. Interpreted languages are translated at runtime line by line while the source code is converted to machine code during execution. There are arguments for and against each format. Compiled code is faster to execute because the build step occurs prior to runtime, the entire program has already been checked for errors and the work of converting to machine code is already complete. Interpreted code is more flexible to correct, it runs line by line, often displaying errors as they occur, and takes less memory.

But why do we care? Isn't JavaScript an interpreted language? It was... in the beginning, but modern day JavaScript engines use a refined combination of compilation and interpretation commonly referred to as just-in-time compilation (aka JIT compilation). Understanding the way our code is processed during compilation and execution will help us get a clearer understanding of scopes, variables and their behavior, and of when these objects are determined and available for use in our code. By having a deeper understanding of these concepts we can use this knowledge to replace memorization of misleading, incomplete, and outdated mental models. Remember these are highly level summaries of complex processes simplified for basic comprehension.

## JS Engine and the Runtime Environment

There are two important components involved at runtime, the JavaScript engine, and the runtime environment that the engine operates within. Each browser uses it's own engine as they compete for speed and efficiency. You've probably heard of the popular ones, V8 for Google Chrome, Karma for Internet Explorer, Nitro for Safari and Firefox( Developer Edition - my personal preference) uses Spider Monkey.  While JS can still be executed with an interpreter, it is more commonly processes by these browsers and their fine tuned engines using complex processes for asynchronously compiling, optimizing and executing source code through multiple threads within the runtime environment.

So what is the runtime environment? The runtime environment, is the environment that your code is executed in. It is generally the collection of libraries, tools, and support systems available within the runtime space. Some of these tools and services include the server environment, your desktop environment, the browser, the js engine, the core library, etc.. This also where the event loop is implemented. 

## Three Stage Compilation

Now that we understand that JS uses a combination of both compilation and interpretation known as "just in time compiling", we are going to take a closer look at the compilation phase to better understand scope and variable behavior. Again, compilation is preprocessing of source code into machine code, it is during this phase that JS engine creates a map of scopes and identifiers that determine the availability of our functions and variables. In JavaScript the compilation of our code occurs literal nanoseconds before the engines executes the translated code, so in order to facilitate this process it is broken down into three stages: 

  • Stage One: Tokenizing/Lexing
  • Stage Two: Parsing
  • Stage three: Code Generation

In the first stage of compilation, lexical analysis and tokenizing refers to the process in which the engine analyzes our syntax and breaks it down into 'tokens'. Tokens are just strings with assigned meanings we recognize them as identifiers, keywords, operators, literals, comments, etc.

Once the source code has been lexed/tokenized, the engine parses the code to create an abstract tree representation (AST). The AST is a data structure that tells our compiler


### Code Generation
**** describe code generation phase
turns AST into executable code - intermediate representation of the program


What significance does this have to us as developers?
Aside from a few corner cases scope is determined 


On to the Execution Phase
Once code has been compiled it is ready to be executed.  JavaScript execution is described as asynchronous, single threaded and non-blocking. So what does that mean exactly? 

While js engines and environments use multi-threaded processes, the actual execution of js is single threaded. This means that as the compiled code is executed, each process is carried out to completion before moving on to the next, only one thread is executed at a time. But isn't that blocking/synchronous in nature? While, technically yes. It does. JS in fact has one memory heap (just like it sounds a heap of memory), and a single call stack (think of call stack as a stack of tasks that have to be executed in the order of first in, last out). 

Event loop. 

Pizza Party Analysis 

Days of dial up are over, attention span of a goldfish, goldfish - 8 seconds, human 7 seconds


So that was a lot of information.  If you are following let's get back to why? WHy? WHy? Why do we care? Why does this matter to a developer working at a web application level?  

So why is this relevant?
 SO I can tell you that JS is an async single threaded non blocking language that 
It helps us understand hoisting, variable and function behavior, and ....... like asynchronous JS.
scope is mapped out during compilation,  a new instance is created at runtime whenever called or invoked.  
scope is mostly determined during compilation (corner cases modules where the variable or function has been loaded yet), which mean they cannot be altered at runtime. more compiled than not,  important to understand

Where do targets and source fit in?

## This, This, This or This

The use of the keyword this is a concept that often trips up and mystifies new developers. The common misconception is that THIS is a reference to the function itself, OR to the lexical scope of the function being called on the THIS object, but THIS is actually a runtime binding determined by the call site that creates an execution context for the life of that THIS instance. In other words THIS is kind of like a post-it note we stick to a js object to let our program know what THIS is referring to. In order to determine what THIS is referring to, we need to examine the point in our code where our THIS was attached to our object, aka the call site. There are multiple ways to configure our THIS binding, and since more that one determining variation can appear at the same call site, we need to recognize and understand the hierarchy that applies to the THIS binding rules. In order from highest precedence to lowest precedence the four rules for determining what our THIS binding context is are: 1. The NEW constructor keyword, 2. explicit binding 3. implicit binding, and 4.default binding. Let's explore how each of these execution contexts are determined and the syntax used to implement them.

### THIS by Default

Starting from the bottom up, the default rule is in effect when none of the other cases apply to our call site. If our THIS instance is not using implicit or explicit binding, or the NEW constructor keyword, then the default THIS behavior will be determined by whether or not the CONTENTS of the function are running in strict mode. If strict mode has not been applied to our function then our THIS binding will refer to the global object. If our function IS running in strict mode then the global object becomes unavailable and the value of THIS is set to 'undefined';

 ```
  code sample - use strict
  code sample - non use strict

 ```

### Implicitly THIS
Implicit execution contexts are determined the same way the dot operator function call operated. When we call a function using the dot operator we look to the left of the dot to determine what object we are invoking the function on. In the case of implicit binding to the THIS keyword, we determine ownership of the execution context by investigating the call-site in the same way, in more complex cases where multiple properties are chained together only the last level, the final property is the determinant.

Word of caution with the use of implicit bindings. This binding type easily falls back to the default object and unintentionally resets when it loses it implicit binding. We can prevent this by creating hard bindings with explicit context with the bind() function.

implicit code sample

### Explicitly THIS - Bind, Call and Apply
These functions are useful when we want to create methods that can be used on different objects, they give us the control to specify what context we are binding the original method to, the initial arguments passed in to upon invocation, and the option to create a brand new method bound to our object through hard bindings without mutating the original object or function.

THIS can be explicitly set to the object of our choice by using one of three popular methods bind(), call(), or apply(). Each of these important tools work similarly with slight variations in parameter expectations and return values. The first parameter passe into each of these functions will be the object we intend to explicitly set as our execution context.  If you decide to pass in a primitive value (such a string or integer) instead the value will be auto-boxed to create the object parameter is the function expects. Autoboxing is when we pass a primitive data type like an integer or a string into a method that is expecting and object and it automatically 'wraps; our argument in an object for us.

Autoboxing syntax example

The call() method takes two or more parameters as an argument list, the first parameter is the THIS context we are explicitly binding to the call method, and the remaining parameters are the arguments we would like to pass into the call() method which immediately invokes the function being called with these arguments.

The apply() method is virtually identical to the call() and is also used to explicitly bind our execution context to our object and pass arguments to a function being executing on the specified object, the ONLY difference between call() and apply(), is that instead of accepting multiple parameters for additional arguments, the apply() method takes this additional parameters as a single array; The return values for call and apply is the result of the method called on on our bound object with the specified parameters.

The bind() method is a another close, relative of call() and apply(). It is also used to explicitly bind our THIS context and the first parameter is again our intended object for execution context, and the following parameters are again a list of arguments we are passing to the function being invoked, but instead of being invoked immediately as with call() and apply(), a new function is created and returned with the provided parameters hard coded into the newly created function (aka as 'hard binding'), the argument list while passed into the new function before any new arguments passed in at execution time.

explicit code sample 

### A brand NEW THIS

The easiest rule to identify is the use of the NEW constructor. The NEW keyword creates a new javascript object that THIS binds to for the duration of the constructor call. These will return our newly created objects automatically unless another return value has been specified.

new code sample

To review the order of rules determining precedence for our THIS binding from highest to lowest:

1. The NEW constructor keyword
2. EXPLICIT binding - using bind(), call(), or apply() to set our THIS context
3. IMPLICIT binding - look to the left!
4. DEFAULT binding - global object or undefined (strict vs non-strict mode)


## ES Modules and the Module Pattern

In early days of web programming, when the internet still consisted of primarily static web pages, js code was limited to single lines embedded in html to assemble web components.(-XXX confirm this) As it has slowly taken on a new role and expanded functionality to both front and back end development, and non-browser applications, javascript programs have increased in size and complexity, and with it the demand for a consistent load pattern for the use of multiple js files and resources within the same program. As our js files expand in size breaking code down into modules allow us to organize our code into smaller modular pieces, making programs easier to read, scale, debug, reuse components, implement a separation of concerns, and honor the privilege of least exposure, by encapsulating variables and methods into public and private interfaces.

### The Classic Module pattern ********* TO DO

Prior to ES6 Javascript did not have Built-in modules, and solutions such as the use of an IIFE, UMDs(Universal Module Definition), AMDs(Asynchronous Module Definition), the Common JS pattern, and module bundlers evolved out of necessity. Before the creation of native JS modules we had to rely on enclosing functions and closures using the classic module pattern to group similar functions, retain state with within them, and to control access to private user interfaces.

In order a for module to fit the characteristics of the classic module pattern Kyle  Simpson (You Don't Know JS) reminds us that it display the following characteristics:

1. an outer scope from that runs at least once,
2. an inner scope that has at least one piece of hidden information
3. must return a reference to at least one function that has closure over a hidden module state 


Below is a syntax example I have create of the classic module pattern in from my experimental app for scopes, modules and closures, it includes the use of a function expression storing an IIFE that returns a public interface through its inner function by uses closure to make the return object keys storing stateful data. 

```
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

```

### ES Modules
Since ES built-in modules were introduced in ES6 they have slowly found support across the browser landscape as they become the standardized native format for javascript development. As of 2020 the only browsers still lagging in adopting ES modules are: Opera, Internet Explorer, and a few less commonly known and used outliers.

ESMs are fairly simple and include three lines of code to implement: an export statement in the file containing module to be exported, an import statement in the top level js file that we are importing to, and a module script statement to be include in the html file. ES Modules do not require Immediately Invoked Function, or any fancy or mystical syntax. Modules are singletons no matter how many times they are imported/exported only one instance is created at the top scope level, because ES modules are automatically created in 'strict-mode' and declarations are scoped to modules and not visible globally. Because modules are operating in strict mode and not available globally, this may limit accessibility to module features in the console and limit debugging capabilities for these objects.

There are several formats for including these three steps in our code, each with minor variations in syntax and functionality. Named exports are the most straightforward use of ES modules. This es module syntax is useful for exporting/importing multiple objects from one file and to the top level js file of a program using the example shorthand syntax below. Don't forget we need to include the following three steps in any module variation: load the module file with a script tag in our html file, export the module using one of the es module variations, import the module into our top level file.
``` 
// Named exports: 

// modules/localStorage.js'
export { createNewList, buildSavedList, returnSavedList, manageGroceryList }; 

// js/main.js
import { createNewList, buildSavedList, returnSavedList, manageGroceryList } from './modules/localStorage.js';

// index.html
<script type="module" src="localStorage.js"></script>
```

### Default Exports
Another variation of ES Modules is to use default exports. Default export we created to cooperate with UMD and Common JS modules. This syntax will only export ONE object per file.


```
// Default Exports:

// js/modules/localStorage.js'
export default newList;

// js/main.js
import newList from './modules/localStorage.js';
```

### Renaming Exports
Sometimes to avoid naming collisions we may have to rename our modules upon export:


```
// Renaming Module Exports

// js/modules/localStorage.js'
export {
  createNewList as newList,
  buildSavedList as savedList
};

// js/main.js
import { newList, savedList } from './modules/localStorage.js';
```

### Renaming Imports
ES6 has also provided us an option to alternatively rename modules upon import if we prefer:


```
// Renaming Module Imports

// js/modules/localStorage.js'
export { createNewList, buildSavedList };

// js/main.js
import {
  createNewList as newList,
  buildSavedList as savedList
} from './modules/localStorage.js';
```

### Module Objects
The final module variation will will explore is the creating module objects. Using module object we include or named exports in our export file, and import everything, and reference our exported objects as properties of the imported module


```
// Creating Module Objects

// js/modules/localStorage.js
export { createNewList, buildSavedList, returnSavedList, manageGroceryList };

// js/main.js
import * as Storage from './modules/localStorage.js';
Storage.manageGroceryList('addItem', 'banana', 3);
```


## Deeper Exploration

Whew. That was a lot to cover. If you are still here and want to explore these topic further I have two personal favorites I would like to share here, one specifically for in-depth exploration and another for the full breadth of web development and javascript topics. The first resource as I have already mentioned above is the "You Don't Know JS" series by Kyle Simpson, now into it's second edition. These books can be purchased in hardcover on Amazon.com, or digested for free electronically directly from the github repo: https://github.com/getify/You-Dont-Know-JS.  While the majority of the material covered in this blog post was based on "Scopes and Closure", other titles include: "Async and Performance", "Es6 & Beyond", "This and Object Prototypes", "Types and Grammar", and more. Alternatively if video instruction is more your learning style Kyle has some notable intermediate and advanced JS classes at https://frontendmasters.com.  The second resource is a github repo titled '33 Things Every Developer Should Know'. XXX add link here XXX It is a thorough list of articles and video resources for exploring everything from to 

Good luck on your journey. I hope I was able to clarify some of these topics for you.  If you found this blog post helpful please like it, or share it with other developers you think could benefit, and follow me on Dev.to or check out my online portfolio at http://www.harleighabel.com

Harleigh Abel | atxrenegade - https://github.com/atxrenegade

### References:

All Things Javascript. “Function Declarations VS Function Expressions in JavaScript.” YouTube, 14 Oct. 2016, www.youtube.com/watch?v=gjLn95skIKE.

Code With Mosh. “JavaScript This Keyword.” YouTube, 15 May 2018, www.youtube.com/watch?v=gvicrj31JOM. Accessed 25 May 2020.

Griffith, Steve. “JS Function Methods Call( ), Apply( ), and Bind( ).” YouTube, 10 Oct. 2017, www.youtube.com/watch?v=uBdH0iB1VDM.

“JavaScript Modules.” MDN Web Docs, developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules. Accessed 25 May 2020.

“JavaScript Runtime.” MDN Web Docs, developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/JavaScript_runtime. Accessed 25 May 2020.

Johansson, Mattias Petter. “JS Function Methods Call( ), Apply( ), and Bind( ).” YouTube, 10 Oct. 2017, www.youtube.com/watch?v=uBdH0iB1VDM. Accessed 25 May 2020.

Maldonado, Leonardo. “Leonardomso/33-Js-Concepts.” GitHub, 24 May 2020, github.com/leonardomso/33-js-concepts. Accessed 25 May 2020.

“Phases of Compiler with Example.” Guru99.Com, 10 Dec. 2019, www.guru99.com/compiler-design-phases-of-compiler.html.

Roberts, Phillip. “What the Heck Is the Event Loop Anyway? | Philip Roberts | JSConf EU.” YouTube, 9 Oct. 2014, www.youtube.com/watch?v=8aGhZQkoFbQ. Accessed 25 May 2020.

Simpson, Kyle. “Getify/You-Dont-Know-JS.” GitHub, 25 May 2020, github.com/getify/You-Dont-Know-JS.

Techsith. “Javascript Closure Tutorial ( Closures Explained ).” YouTube, 18 Nov. 2015, www.youtube.com/watch?v=71AtaJpJHw0. Accessed 25 May 2020.

Wikipedia Contributors. “JavaScript.” Wikipedia, Wikimedia Foundation, 22 Mar. 2019, en.wikipedia.org/wiki/JavaScript.

Zlatkov, Alexander. “How JavaScript Works: An Overview of the Engine, the Runtime, and the Call Stack.” Medium, 12 Dec. 2018, blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf. Accessed 25 May 2020.

‌










