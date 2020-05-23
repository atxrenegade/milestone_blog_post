// blogpost

JS SCOPES, CLOSURES AND MODULES - DEEP DIVE

Mental Models 

After discovering some misguided mental models in my understanding of some of the more opaque idiosyncrasies of JavaScript I was directed towards Kyle Simpson's infamous and invaluable series "You Don't Know JS' (specifically the 'Scopes and Closure' volume).  I highly recommend a thorough consumption of each of these books to any developer who plans to spend any amount of time working with the rapidly transforming, increasingly dominating language of js for a solid grasp of some of these often misunderstood and miscommunicated concepts. I hope in can do it some justice in clarifying and communicating some of those concepts here. 

I am a full picture person, I retain details best when I have a complete picture, and aerial view, a deep exploration of low level concepts, but this is the real world and in development we often don't get time for contemplation and review so I savor it when I can. Here's in my Reader Digest version of mulling over Kyle's book(3 x for good measure), dozens of StackOverflow posts, YouTube videos, Wikipedia (surprisingly), medium, Dev.to, GitHub repos and dozens of other sources. Some of the specific misconceptions I was looking to clarify were hoisting, the use vs banishment of var, closures, and the mystical JIT compilation process. Much of what I discovered contradicted what I had originally been taught, but these new arguments were backed with compelling logic from experienced developers and convincing code samples that altered the way I view, and currently use JS language and features. So let's dive in. 

Compiled vs Interpreted

For machines to understand high level languages like Javascript the code must be translated or complied into to machine code. Compilation is a process in which the compiler converts higher level source code into an machine language executable file in a build step before runtime. 
Interpreted languages are translated at runtime and executed line by line while the source code is converted to machine code.

There are arguments for and against each. Compiled code is faster to execute because the build step occurs prior to runtime, and the entire program has already been checked for errors and the work of converting to machine code is already complete. Interpreted code is more flexible to correct, it runs line by line, often displaying errors as they are occur, and takes less memory.

But why do we care? Isnt Javascript a interpreted language?It was... in the beginning, but modern day JavaScript engines use a refined combination of compliation and interpretation commonly referred to as just-in-time compilation, aka JIT compilation. Understanding the way our code is processed during compilation and at runtime will help us get a clearer understanding of scopes, variables and their behavior, and of when these objects are determined and available for use. By having a deeper understnading of these concepts we can use this knowledge to replace memorization of misleading, incomplete, and outdated mental models. 

JS Engine and the Runtime Environment

There are two important components involved at runtime, the javascript engine, and the runtime environment that the engine operates within. Each browser uses it's own engine ss they compete for speed and effciency. You've probably heard of the popular ones, V8 for Google Chrome, Karma for Internet Explorer, WebKit for Safari and Firefox( Developer Edition - my personal preference) uses Spider Monkey.  While JS can still be executed with an interpreter, these browsers use their fine tuned engines with complex processes for asynchronously compiling, optimizing and executing source code through multiple threads with the runtime environment.

So what is the runtime environment? 















