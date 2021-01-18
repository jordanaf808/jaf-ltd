1-8-2021

Container Pattern: 'Component that gets wrapped with all the Higher Order Component it needs, in order to properly run the contained components'

The process of determining whether the collections are loading or not should be handled within the collection components themselves, not within the parent: Shop component. Components should be as dumb as possible, the Shop doesn't need to find out what the collection components need. Because we have multiple components we are going to use "Container Pattern"

- Containers don't render anything, they just pass props down to components \*

|--- THUNK ---|

A middleware that allows 'Actions' run as asynchronous functions and dispatch actions to the reducer. In our 'fetchCollectionStartAsync' Thunk, we can dispatch 3 actions, the 'fetchCollectionsStart', 'fetch...Success', or 'fetch...Failure'. The function will see the first dispatch and send that action to the reducer, then it calls our 'get' to the Firestore, waits for the data to return, then fires the second dispatch if it succeeds or the Failure dispatch if it fails.

|--- SAGA ---|
https://flaviocopes.com/redux-saga/ -->

---

Being a Redux Middleware, Redux Saga can intercept Redux Actions, and inject its own functionality.

There are a few concepts to grasp, and here are the main keywords that you’ll want to stick in your head, altogether: saga, generator, middleware, promise, pause, resume, effect, dispatch, action, fulfilled, resolved, yield, yielded.

A saga is some “story” that reacts to an effect that your code is causing. That might contain one of the things we talked before, like an HTTP request or some procedure that saves to the cache.

We create a middleware with a list of sagas to run, which can be one or more, and we connect this middleware to the Redux store.

A saga is a generator function. When a promise is run and yielded, the middleware suspends the saga until the promise is resolved.

Once the promise is resolved the middleware resumes the saga, until the next yield statement is found, and there it is suspended again until its promise resolves.

Inside the saga code, you will generate effects using a few special helper functions provided by the redux-saga package. To start with, we can list:

takeEvery()
takeLatest()
take()
call()
put()

When an effect is executed, the saga is paused until the effect is fulfilled.

When the middleware executes a saga with multiple sagas, it stops at the yield takeEvery instruction and waits (asynchronously, of course) until the next action is dispatched. Then it runs its callback, and the saga resumes.

A middleware function that conditionally runs, based on what action is coming into the reducer. It is meant to handle side-effects, e.g. async API calls

A dispatch sends an action to the reducer (idk if the reducer runs the action or sends it to Sagas ), then send the action to the Saga. The Saga can then send new actions to the reducer, and so on...

'Side-Effects' - either API calls to the backend (async code) OR something that triggers an impure reaction.

'Pure Function' - A function that returns the same result when given the same arguments/values.

'Generators' - ES6 - functions that can be stopped and continued, instead of executing all expresions in a single step. When called it returns an iterator object, with each call to the iterator's 'next()' method. The body of the generator function executes until the next yield expression and then stops.

e.g.

---

    function* generatorFunction() {
        yield 'First value';
        yield 'Second value';
        return 'Third value';
        }
    const iteratorObject = generatorFunction();
    console.log(iteratorObject.next())
    //{value: "First value", done: false}
    console.log(iteratorObject.next())
    //{value: "Second value", done: false}
    console.log(iteratorObject.next())
    // {value: "Third value", done: true}
    console.log(iteratorObject.next())
    // {value: "undefined, done: true}

---

Async. e.g.

---

    try {
    const successResponse = yield fetch('url');`
    const parsedResponse = yield successResponse.json();`
    console.log(successResponse);
    } catch(error) {
    console.log(error)
    }

'Generator Functions are similar to Async/Await where you perform an operation, then "await" the return of a Promise-based event. Generator Functions pause when they see a certain key called a "Yield" '

When we invoke a Gen. function we return a "Generator Object" {}

declare gen. function:

    function* gen() {
    console.log('a');
    console.log('b');
    }
    // undefined

save returned object to a variable

    const g = gen()
    // undefined

return g

    g
    // gen {<suspended>}

g does not perform the console.logs because it is 'suspended' we must call .next()

    g.next()
    // a
    // b
    // {value: undefined, done: true}


    function* gen(i) {
    yield i;
    yield i + 10;
    }
    // undefined
    const g = gen(5)
    // VM1907:1 Uncaught SyntaxError: Identifier 'g' has already been declared
    const gg = gen(5)
    // undefined
    const ggObject = gg.next()
    // undefined
    ggObject
    // {value: 5, done: false} done: false value: 5 __proto__: Object
    const gggObject = gg.next()
    // undefined
    gggObject
    // {value: 15, done: false}
    gg.next()
    // {value: undefined, done: true}

---

import 'Effects' from sagas to perform actions (e.g. create or listen)

'takeEvery' - Listens for every action of a specific type. It allows us to perform an asynchronous request without 'blocking' our app from running js code. we can perform other actions or Sagas meanwhile. We yield control of this action to the middleware. If we receive another takeEvery action type, the middleware can determine whether to cancel the previous action/other actions

## Lecture 195.

First we took the logic to dispatch actions to fetch our collections for our shop component and put it into the actions themselves with a async Thunk function in Redux, in shop.actions. Now, we need to move it out of the actions and into a Saga and change it to a generator function\*.

we no longer need the dispatch from our saga.
We no longer need a .then on our fetchCollections logic because 'yield' returns a 'Promise' that resolves with the value of our collectionRef.get(); that we set to const snapshot.
Instead of using our regular function to map through the snapshot response we use call.

'Call' - an 'effect' inside our generator that invokes functions ( 1st argument ), and subsequent parameters ( other arguments ) to pass into said function, then allows Saga to yield; control the call and cancel it if necessary (e.g. takes too long) and test it.

- Remember To make a new Branch for Section 21 \*

## Lecture 196

put - fires an action to the reducer from a saga

take('ACTION') - waits for the specific 'ACTION' and, if needed, the payload. Only runs once! then it is completed.

takeEvery('ACTION') - spawns a new Saga every time the specific 'ACTION' is passed into it.

takeLatest('ACTION') - only takes the latest action passed into it. If an action is currently working, this will cancel that action and start a new one.

'all' - takes an array of Sagas. instead of synchronously executing 3x: `yield fetchStart();` 'all' allows us to run those 3 sagas asap, asynchronously, like this:
yield all([
call(...)
])
We can call any number of sagas inside of this array and execute them on separate task threads.
