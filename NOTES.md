NOTES

Dive Deep 
read three times
Mental Models
misconceptions, coding vertigo

Compiled or Interpreted
source code need to be translated to machine code, either by compilation or interpreting 

what is compiled?
is code written in a language that has been translated by a compiler into a executable maching language program that can executed without need to be compiled again once the executable program has been created. compiled code is faster at runtime because the work of  translating to machine has already been completed. Converts the whole program at one time. input - entire program, executes faster, requires more memory to create code, displays errors entire program is check, need a build step

what is interpreted?

interpreted code is more flexible, interpreter is still available during runtime, converts program line by line, input single line, exectues slower, requires less memory, no object code, has to convert high level languages to machine code during execution, displays errors with each executed instruction

why do we care?
misconception, tortured metaphor languages can be implemented as either, interpretors for c, js just in time compilers 
deeper understanding of scope and variable and fucntion behavior, when variables scopes and fucntions are determined and when do become available in our code, but understanding the process it becomes knowledge instead of memorization

what does it mean to js?
misconception that js is an interpreted scripting language, the first js engines were interpreters but modern js engine use a complex combination of compilation and interpreted code with just in time compilers
 
three stage of compilation:
lexing/parsing/generation
lexing - lexical analysis, tokenizing - turns strings into tokens to analyze syntax, a token is a string with an assigned meaning, token name you might recognize identitier, keyword,seperator, operator, literal, comment
parsing - parses the lexed code and creates the AST - the Abstract Syntax Tree - AST’s are data structures. an abstract tree representation of the source code used by compilers
generation- turns AST into executable code - intermediate representation of the program

JS engines more complex process, the secret recipe of the JS emgine useing different technigues and algorithms to optimize the code, js compilation creates a map of scopes and identifiers

what does this mean for us?
scope is mostly determined during compilation (corner cases modules where the variable or function has been laoded yet), which mean they cannot be altered at runtime. more compiled than not,  important to understand

occurence of variables and identifiers do one of two things they TARGET a value(refer to) or they are the SOURCE of the (value) ,they are the SIGN that points to the bucket(target) , or the bucket holding the value is the (source).  target - left hand side, source right hand side

why is target and source relevant

declaration at compilation time?
assigment at execution time?
scope is mapped out during compilation,  a new instance is created at runtime whenever called or invoked.  

phase two execution
JS engine  interpreter/compiler- is the program that complies and executes the JS code, different browsers have different engines, Google Chrome uses it’s engine V8. Firefox uses SpiderMOnkey, Internet Explorer uses Chakra, can be an interpreter or just in time complier
as these engines have evolved the process has become more complicated as they compete for speed and efficieny, Engines like V8 now compile use multiple threads for compiling executing and optimzing silmalteanously
js engines operate in JS runtime enviromentes,

js runtime environment - provides libraries and support services , browser, server environment, desktop envrionment, where the event loop is implemented in runtime, RUNTIME support services, where your code is executed when you run it

 while JS is executed line by line code line by line in a single thread but the runtime engines and runtime enviroments are not but environment handles thread management for you 

‘The JavaScript engine translates your script into runnable machine code instructions so it can be executed by the CPU of the host machine. The engine translates scripts at runtime on the fly. Your code won’t be compiled unless you run it.
The JavaScript runtime environment provides your scripts with utility libraries which can be used during execution. It’s your script that references these libraries. The engine itself doesn’t depend on them.
‘

js is single threaded AND non blocking -
single threaded - one call stack, one memory heap, executes code in order , must complete each process before moving on the the next, which means be nature js is a blocking language by nature

non blocking functionality is feature provided by the environment - ie node js or web browser
 - event loop model in js is non blocking, immediately invoked scripts are loaded an executed immediately, while callback events are placed in the event handeler queue in the order that the events occur, each callback is executed to completion before moving on the the next callback in the queue - not part of js language, this an environment feature that turns single threaded js into a non blcoking asynchrous exectution

Lexical Scope and the Scope Chain 
lexical scoping means that scope is determined during compilation during the lexing phase by the location of blocks function and  declarations in relation to each other. scope is not generally modifiable during run time

what is scope?
scope is the area that a variable is visible in, the part of a program that these references are contained in
where the compiler looks for variables and functions, scopes are nested within each other, they are completely eclosed, boundaries do not leak into other scopes, one scope is fully enclosed within it’s parent

references to a  variable or fucntion are allowed as long as they are within the scope that the declaration was made or a enclosing parent scope

what is scope chain? 
is a reference to the relationship/location scopes have to each other and the method/direction the interpreter uses to connect an identifier with its declaration/scope
are like a series of russian nesting dolls, layers of an onion
move outward and up, one directional,
when the interpreter reaches an identifer, is searches the current scope for a declaration, if no declaration is found it continues to move outward in the next parent scope until it either finds the declaration or reaches the external scope layer (the global scope)
if no declaration is found a reference error is thrown, if in not a strict mode an accidental global variable will be created. a value cannot be assigned to a undeclared variable or function. the scope of a variable refernce will be determined by its declarator during compilation
js engines recognise assignment and declaration as two seperate and distinct operations

compiler handles declaration during lexing, 
interpreter handles assignment durng execution

levels of scopes
prior to 
ECMAScript 2015   there were two levels of scope, function scope and  global scope
blocks did not exist therefore you couldnt use them to scope
added keywords let and const for block scoping, meaning JavaScript now has both function and block scoping
global  scope-  the outtermost scope, objects defined here accessible throughout an entire program
differenct js environments handle global scope differently, and the acutal outermost scope can vary from program and the outtermost scope is not always the global scope object
reasons to use the global scope -  exposes js build ins, exposes environment built ins - like console, the DOM, setTimeOut
can be the glue between modules


local - visible only within the current scope  (function or block)
function - objects that are function scoped are only accessible from the function level inwards to the nested children of the parent fucntion scope
block - only becomes a scope if it needs to contain its variable declarations
there are many code blocks enclosed in curly braces that do not qualify as blcok scopes examples - try , catch - classes - object literals, fuction declarations, dont define fucntions in blocks they behave unpredicatbly, and prior to ecma 2016 were illlegal in strict mousing block scope narrows our variable scopes, honoring the pole priciniple
reduces chance of tdz errors and make code more readable

 ECMAScript 2015 added keywords let and const for block scoping, meaning JavaScript now has both function and block scoping
implied scopes - parameter scope - non simple parameters create their own scope (non simple includes parameters with default values, function scope is nested within the parameter scope - can create unintentional side effect like shadowing. >> function name scope - name identifier of function expression is in tis own scope between the out function declaraion and the nested inner scope
how does this effect our programming

<!-- image of the scope buckets? of just comment colors-->
Principle of Least Exposure.
what?
principle of least privilege - every process module or fucntion only access the data and variables, information it legimately needs to perform the work it has been created for, aka principle of minimal priveledge, principle of least authority, component, system level

pricinple of least exposure- pole prevents naming collisions, unintended dependancy, and unexpected behavior, limits exposure to program variables registered at each scope, declare variables in small, private, deeply nested scopes

why?  
stability - easier to update, control side effects, bugs  through encapsulation, better code organization, control visibility of components from one part of a program to another
security - can isolate vulnerabiliteis in a system or application
deployment - fewer priviledges easier to deploy

How?
declare variables in small, private, deeply nested scopes, use blocks and functions to nest our variables in, scope with blocks and iife’s

The Case For VAR
minimal scope exposure
variable declarator with a bad rap
the outcast of the javascript world
labelled legacy code 
treated suspiciously, misunderstood
prior to this book I had also bought into the trend of throwing the baby out with the bath water
var for the top-level scope of any function,
var for global scoped variables
var for function scoping, used for function wide variables
using only let or const does not allow us to visually differentiate between block scope and function scope, visually sets a function scoped variable apart from a block scoped variable
legal redeclaration allowd can be used as semantic reminder, not possible to redeclare, has no effect
use in loops for vairables that need to be retianed and accessed outside the loop
attaches to the nearest function scope
var can be used inside loops to indicate a variable that will be accessed outside the loop, rather than declaring a variable outside the loop and seperating it from it usaage

His logical case for, affected me transitioned to my most commonly used variable declarator

Reviewing LET
let best used for block scoping, can be redefined
attach to nearest block scope
                            
                            
Downgrading CONST 
 const cannot be declared without  assignment, and cannot be reassigned, const is inflexible, best used with immutable variables like fixed numbers or strings, 
attaches to nearest block scope
leaving out variable assigment in the declaration results in syntax error


Hoisting and the DEAD ZONE 
registration -
initialzation - after the identifier has been registered to its scope in complication, the stage at whcih a  and has been given a value whether explicitly or  implicityly by default (var) and is availble for use
assignment - is the explicit  value assignment of a variable

temporal dead zone - is the the gap, the void, the virtual nothingness between a variable being registered and intialized

what is hoisting? 
hoisting is when a variable is accessible/visibile at the top of the scope it is declared in before it has been declared in the code, 

Variable Hoisting 
we know the what about why and about our different variable types but now we will explore the how?
the process of creating a variable/function
what the js engine does with it

there are two steps in creating an javascript and these steps are often seperated in our code
first we declare a variable/function with a variable type and identifier (name), second we set a value for that variable we have declared, creation and source occur in seperate stage, target idenitifers are registerd to their scopes during compilation while variable assignment occurs during the execution phase

declaration, initialization and assignment
declaration is when we let js know abouta variable we plan to use by including the variable type and identifier
initialization - is when this varible is given and initial value and ready to use
value assignment - is when we tell js what the inded value of our variable is

contrary to popular belief all variables hoist, meaning all variable declarators are metaphorically hoisted/raised to the top of our code 
hoisting is a mental model for the process of that occures when the JS engine ‘registers’ our idenitifier names in the compilation phase first to determine the  future scope  of our js objects for the abstrat Syntax Tree (AST), identifier is created at top of scope for every INSTANCE

WHY? How do our vairable types behave differently? 
		VAR - once the var variable identifier has been registered in our program it is immediately autoinitialized and assigned a value of ‘undefined’, the variable becomes availble for use in our program even before we have assigned it a value
	
		LET - when a let variable is declared in our program the variable is also ‘hoisted’ , like all js variables so that the identifier is registered in compliation, however a let value will not be initalized until the developer assigns a value, this means the any reference to the varible before the initialization/variable assignment step has been reached in the code block will throw a Refernce Error

		CONST - const variables - cannot be redeclared, and therefor cannot be declared without variable assignment, confusion between value immuntability and assignment mutaibilty

Temporal Dead Zone - is the time period between a variable being top of scopw and being auto-initialized, to avoid temporal dead zone errors always use let and const at the top of the scope they are declared in, elminating the observable time between identifier registration and variable initialization and value assignment

dont recommend using a variable before it’s declaration, is confusing and difficult to read

Variable Shadowing - syntax example
Shadowing is the legal process of eclipsing the value of variable declared in an enclosing scope by declaring a variable of the same name in an inner scope
legal process of maintaining two variables of the same name with different values in different scopes
an inner variable blocks the visibiliy of the value of the variable of the same name with a new value in a local scope, from that point inward on the scope chain the original value is eclipsed by the new value and no longer assessible (cornern cases global.variable name - only available to variables declared with var or function in the global scope)

since the compiler will search first for the declaration in the inner most scope it will not look beyond that once the local variable declatrator ahs been found

- i dont know why you would do this, maybe during testing, just use a different variable name?
- knowlege prevents accidental shadowing

legal shadowing :
let can shadow var
var cannot shadow let this would be trying to cross a scope boundary which is prohibited

let (inner scope) can always shadow var(outer scope)

to make changes to legacy code, to hide conceal data from a public interface

              <!-- code sample of hoisting with results for const, var, let-->

                                                    
Function Scopes And Behaviors
while functions are created to ……. different types of functions have subtle differences in behavior

function declaration - aka function statement - function keyowrd, name of function, curly braces, function is hoisted and immediately initialixed to the function definition, which allows us to use the function before it is declared in the same scope

function expressions - assigning a function to a variable, can be named or anonymous, anonymous is most common, variable name is hoisted but the definition is not therefore cant be used until the fucntion definition is reached in the code, dont need names, they can stored in variables and invoked by calling the variable name. some function expressions are explicitly named, others are inferred, name inferrencing often fails and wont show up in the stack trace making debugging more challenging

anonymous function - declared without an identifier,
arrow functions are always anonymous

IIEF - Immediately-invoked function expressions are often used to create modules; before ECMAScript 2015 there was no built-in module construct in the language. can be used to create a scope to hide variables and functions, can be named, or anonymous/unnamed function expression, can be used anywhere an expression can be used, not recommended to use iife for scopes with break, return, continue or this, they are full functions and may alter intended fucntion boudaries and meanings, self invoking

arrow functions -
are always anonymous, dont define a this keyword
 arrow function were created to shorten syntax, they are anonymous and never to be stored in a variable to be refered to after creation
arrow functions adopt this binding from their enclosing scope
cannot over ride lexical binding, even with NEW
used with callbacks such as event handlers and timers, alternative to bind
contridicts traditional use of this and defaults to using this as lexical scoping to determin context instead of the intended determiniation of context by call site, must be defined before use

function return values in js - implicit vs explicit
in js the only time a function implicity returns a value is when the object created is returned using a the keyword new with a constructor function and in single statement arrow functions without the use of curly braces, using curly braces will prevent the implicit return.

Function Hoisting - function are named reusable unit of code, if sticking with seperation of concerns, desinged to execute a psecific task.

function hoisting?

Like var function delcarations also hoist their indentifiers AND autoinitalize to the fucntion definition value, giving us access to our idenifier and full functionality at the top of the fucntion scope, 
like var fucntion definitions also attach to the nearest function scope. (or global scoe if no function scope is available), all of forms of fucntions ie function expressions will have their identifers registerd at the tope of the scope but will be autoinitalized to undefined and not useable with out throwing a typeError until the engine reaches the line that defines our function.

use for function hoisting - executable code first, function declarations last

THIS, THIS, THIS or THIS
 <!-- this, this, or this table -->
you can not use this to access or reference lexical scope
not a reference to the fucntion itself, or the fucntions lexical scope
runtime binding
activation record(aka execution context) - creates a this binding used for the life of a function execution
based entirely on where the fucntion is called NOT where it is declared(lexical scope)

default binding
call site plain function - no other binding rules apply, default binding applies
strict default binding - global object not available, this is set to undefined, if CONTENTS of function are running in strict mode;
non strict default binding -  global object;
REMEMBER ‘the contents of the invoked function making the this reference -- not the function call-site -- determines the default binding value’

implicit binding - context object, only top/last level of object property, common for function callbacks to lose their this binding and reset to default because callsites for callbacks are often bare functions, this can be prempted by explicit binding  

explicit binding:
are utility functions that allow us to explicitly state the context we are binding to the function call. if you use a primitive value as the context instead of an object the value with ‘auto-boxe’ wrapped in an object

three methods: call, apply, bind 

call:  calls a function and passes the first argument as our the intended execution contect we are binding to, all addtional parameters are the arguments we are passing in to the function we are calling, immediately invokes the called function

apply:  calls a function and takes the first argument object we are binding to, the this context we are applying the function to, second argument is an array of arguments we are passing into the function we are calling, immediately invokes the applied function

	bind: works very similarly to call with the primary difference being that instead of immediately 		invoke the function being called, and new function is created with the provided parameters, the first 	paramater again being the object the fucntion is being called on and following parameters are the 	arguments we are passing into the fucntion we are invoking, the this para is hardcoded into the new 	function, creates a hard binding - strong and explicit

new binding: 
constructor functions are purely semantic in JS, these are just regular function being instantiated with the keyword new, it is not actually creating a new object like it would with object oriented programming languages, these constuctor calls (not functions) create a new object and bind that object as the context for our this binding for that function call
order of precedence :
new
explicit - 
implicit -
default 
**** 

Closures
‘JavaScript, function closures capture their non-local variables by reference.’ wikipedia 
‘closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.’ Youdont know js

‘To use a closure, define a function inside another function and expose it. To expose a function, return it or pass it to another function’

‘In the most basic of terms, a closure is a function within another function. The inner function has access to the outer function’s scope.’

to observe a closure it must be invoked from another part of the program

‘Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn't be accessible.
The key parts of this definition are:
* Must be a function involved 
* Must reference at least one variable from an outer scope 
* Must be invoked in a different branch of the scope chain from the variable(s)’

you can emulate private methods with closures, data hiding and encapulation
only a function can have closure
closure refers to variables by reference not by value (pointer), you are accessing the acutal variable, not a copy of it
uses: data privacy, event handlers, callback functions, currying;
benefits: makes code cleaner, easier to read, narrowing function scope, elminating the need to pass in preserved data, more effcient - stores values rather than having to recompute them over and over again
three things to make a closure

ES Modules and the Module Pattern
wikipedia - Modules allow gathering properties and methods in a namespace and making some of them private.

Classic Module Pattern:
outer scope from function that runs at least once,
inner scope that has at least one piece of hidden information
must return a reference to at least one  fucntion that has closure over a hidden module state 

ES Modules

this is the most recent solution for module syntax but other commonly used variaations are AMD, UMD and Common JS, before ecma 2016 modules didnt exisit in javascript and immediately invoked functions expressions were used as a substititue, the script you import your files into acts as the top level module, you can only use import export inside a modules. You can only access modules features  in the script they are imported into they are not accessible in the js console which may limit debugging capbilities, modules use strict mode automatically



Resources and acknowledgements
link and introduction to you dont know JS, 
deep dive into scopes, closures, modules, shadowing 
depth
book by Kyle Simpson Called ‘You DOnt Know JS” 1st 2nd edition
Two books 
https://github.com/getify/You-Dont-Know-JS/tree/1st-ed 1st Edition
Repo https://github.com/getify/You-Dont-Know-JS
Amazon link https://www.amazon.com/You-Dont-Know-Js-Book/dp/B01AY9P0P6

breadth resources: github repo  33 things every js developer should know: 

Books async and performance, es6 & beyond, scope and closures, this and object protoypes, types and grammar, up and going

https://frontendmasters.com/teachers/kyle-simpson/
wikipedia
youtube
stack overflow
if it’s wrong I blame stack overflwo contributors. Hahhaah, jk 


what about function hoisting



