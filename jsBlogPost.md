---
title:JS Under the Hood - The Fuzzy Parts | Understanding JIT Comp, Scopes, Closures, Hoisting, Shadowing, THIS, & the Module Pattern
published: false
description: 
tags: 
---

Some of the topics explored in this post:
• Understanding Just-In-Time Compilation
• Exploring Scopes, Closures, Hoisting, and Shadowing 
• Comparing Variable and Function Behavior and Types
• Implicit vs Explicit - Rules of Precedence for determining THIS
• The Principle of Least Exposure (POLE)
• Review of the Module Pattern

## Correcting Distorted Mental Models 

After discovering some misguided mental models in my understanding of some of the more opaque idiosyncrasies of JavaScript I was directed towards Kyle Simpson's infamous and invaluable series "You Don't Know JS" (specifically the 'Scope and Closures' volume).  I highly recommend a thorough consumption of each of these books to any developer who plans to spend any amount of time working with the rapidly transforming language of JavaScript for a solid grasp of some of these often misunderstood and miscommunicated concepts. I hope I can do it some justice in clarifying and communicating some of those concepts here. 

I am a full picture person, I retain details best when I have a complete picture, an aerial view, a deep exploration of low level concepts. But this is the real world and in development we often don't get time for contemplation and review, so I savor it when I can. Here's my Reader Digest version of mulling over Kyle's book(3 x for good measure), Stack Overflow posts, YouTube videos, Wikipedia (surprisingly), medium, Dev.to, GitHub repos and a dozen of other sources. Some of the specific misconceptions I was looking to clarify were hoisting, the use vs banishment of var, closures, and the mystical JIT compilation process. Much of what I discovered contradicted what I had originally been taught, but these new arguments were backed with compelling logic from experienced developers and convincing code samples that altered the way I view, and currently use JS language and features. So let's dive in. 

## Compiled vs Interpreted

For machines to understand high level languages like JavaScript the code must be translated or complied into to machine code. Compilation is a process in which the compiler converts higher level source code into an machine language executable file in a build step before runtime. 
Interpreted languages are translated at runtime line by line while the source code is converted to machine code during execution.

There are arguments for and against each format. Compiled code is faster to execute because the build step occurs prior to runtime, the entire program has already been checked for errors and the work of converting to machine code is already complete. Interpreted code is more flexible to correct, it runs line by line, often displaying errors as they occur, and takes less memory.

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


Code Generation
**** describe code generation phase
turns AST into executable code - intermediate representation of the program


What significance does this have to us as devleopers?
Aside from a few corner cases scope is determined 


On to the Execution Phase
Once code has been compiled it is ready to be executed.  JavaScript execution is described as asynchronous, single threaded and non-blocking. So what does that mean exactly? 

While js engines and environments use multi-threaded processes, the actual execution of js is single threaded. This means that as the compiled code is executed, each process is carried out to completion before moving on to the next, only one thread is executed at a time. But isn't that blocking/synchronous in nature? While, technically yes. It does. JS in fact has one memory heap (just like it sounds a heap of memory), and a single call stack (think of call stack as a stack of tasks that have to be executed in the order of first in, last out). 

Event loop. 

Pizza Party Analysis 

Days of dial up are over, attention span of a goldfish, 


So that was a lot of information.  If you are following let's get back to why? WHy? WHy? Why do we care? Why does this matter to a developer working at a web application level?  

So why is this relevant?
 SO I can tell you that JS is an async single threaded non blocking language that 
It helps us understand hoisting, variable and function behavior, and ....... like asynchronous JS.
scope is mapped out during compilation,  a new instance is created at runtime whenever called or invoked.  
scope is mostly determined during compilation (corner cases modules where the variable or function has been loaded yet), which mean they cannot be altered at runtime. more compiled than not,  important to understand

Where do targets and source fit in?












ES Modules and the Module Pattern













## Deeper Exploration

Whew. That was a lot to cover. If you are still here and want to explore these topic further I have two personal favorites I would like to share here, one specifically for in-depth exploration and another for the full breadth of web development and javascript topics. The first resource as I have already mentioned above is the "You Don't Know JS" series by Kyle Simpson, now into it's second edition. These books can be purchased in hardcover on Amazon.com, or digested for free electronically directly from the github repo: https://github.com/getify/You-Dont-Know-JS.  While the majority of the material covered in this blog post was based on "Scopes and Closure", other titles include: "Async and Performance", "Es6 & Beyond", "This and Object Prototypes", "Types and Grammar", and more. Alternatively if video instruction is more your learning style Kyle has some notable intermediate and advanced JS classes at https://frontendmasters.com.

The second resource is a github repo titled '33 Things Every Developer Should Know' . It is a throughout list of articles and video resources for exploring everything from to 

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










