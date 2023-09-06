1-8-2021

<br>

---

# Lecture 191 - Container Pattern {#191}

---

<br>
Container Pattern: 'Component that gets wrapped with all the Higher Order Component it needs, in order to properly run the contained components'

The process of determining whether the collections are loading or not should be handled within the collection components themselves, not within the parent: Shop component. Components should be as dumb as possible, the Shop doesn't need to find out what the collection components need. Because we have multiple components we are going to use "Container Pattern"

- Containers don't render anything, they just pass props down to components \*

<br>

---

# Section18 - Asynchronous Redux

---

## Lecture 188 - Redux Thunk {#188}

A middleware that allows 'Actions' run as asynchronous functions and dispatch actions to the reducer. In our 'fetchCollectionStartAsync' Thunk, we can dispatch 3 actions, the 'fetchCollectionsStart', 'fetch...Success', or 'fetch...Failure'. The function will see the first dispatch and send that action to the reducer, then it calls our 'get' to the Firestore, waits for the data to return, then fires the second dispatch if it succeeds or the Failure dispatch if it fails.

<br>

---

# Section 20 - SAGAS

---

## Lecture 193 - Intro To Sagas {#193}

---

<br>

- [**_Sagas Resource Link_**](https://flaviocopes.com/redux-saga/)

Being a Redux Middleware, Redux Saga can intercept Redux Actions, and inject its own functionality.

There are a few concepts to grasp, and here are the main keywords that you’ll want to stick in your head, altogether: saga, generator, middleware, promise, pause, resume, effect, dispatch, action, fulfilled, resolved, yield, yielded.

A saga is some “story” that reacts to an effect that your code is causing. That might contain one of the things we talked before, like an HTTP request or some procedure that saves to the cache.

We create a middleware with a list of sagas to run, which can be one or more, and we connect this middleware to the Redux store.

A saga is a generator function. When a promise is run and yielded, the middleware suspends the saga until the promise is resolved.

Once the promise is resolved the middleware resumes the saga, until the next yield statement is found, and there it is suspended again until its promise resolves.

Inside the saga code, you will generate effects using a few special helper functions provided by the redux-saga package. To start with, we can list:

> ```js
> takeEvery();
> takeLatest();
> take();
> call();
> put();
> ```

When an effect is executed, the saga is paused until the effect is fulfilled.

When the middleware executes a saga with multiple sagas, it stops at the yield takeEvery instruction and waits (asynchronously, of course) until the next action is dispatched. Then it runs its callback, and the saga resumes.

A middleware function that conditionally runs, based on what action is coming into the reducer. It is meant to handle side-effects, e.g. async API calls

A dispatch sends an action to the reducer (idk if the reducer runs the action or sends it to Sagas ), then send the action to the Saga. The Saga can then send new actions to the reducer, and so on...

`Side-Effects` - either API calls to the backend (async code) OR something that triggers an impure reaction.

`Pure Function` - A function that returns the same result when given the same arguments/values.

<br>

---

## Lecture 195 - Generator Functions {#195}

---

<br>

`Generators` - ES6 - functions that can be stopped and continued, instead of executing all expresions in a single step. When called it returns an iterator object, with each call to the iterator's 'next()' method. The body of the generator function executes until the next yield expression and then stops.

e.g.

```js
function* generatorFunction() {
  yield 'First value';
  yield 'Second value';
  return 'Third value';
}
const iteratorObject = generatorFunction();
console.log(iteratorObject.next());
//{value: "First value", done: false}
console.log(iteratorObject.next());
//{value: "Second value", done: false}
console.log(iteratorObject.next());
// {value: "Third value", done: false}
console.log(iteratorObject.next());
// {value: "undefined, done: true}
```

Async. e.g.

```js
try {
    const successResponse = yield fetch('url');`
    const parsedResponse = yield successResponse.json();`
    console.log(successResponse);
} catch(error) {
console.log(error)
}
```

'Generator Functions are similar to Async/Await where you perform an operation, then "await" the return of a Promise-based event. Generator Functions pause when they see a certain key called a "Yield" '

When we invoke a Gen. function we return a "Generator Object" {}

declare gen. function:

```js
function* gen() {
  console.log('a');
  console.log('b');
}
```

save returned object to a variable

```js
const g = gen();
// undefined
```

enter g

```js
g;
// gen {<suspended>}
```

g does not perform the console.logs because it is 'suspended' we must call .next()

```js
g.next();
// a
// b
// {value: undefined, done: true}
```

```js
function* gen(i) {
  yield i;
  yield i + 10;
}
// undefined
const g = gen(5);
// VM1907:1 Uncaught SyntaxError: Identifier 'g' has already been declared
const gg = gen(5);
// undefined
const ggObject = gg.next();
// undefined
ggObject;
// {value: 5, done: false}
const gggObject = gg.next();
// undefined
gggObject;
// {value: 15, done: false}
gg.next();
// {value: undefined, done: true}
```

---

import 'Effects' from sagas to perform actions (e.g. create or listen)

'takeEvery' - Listens for every action of a specific type. It allows us to perform an asynchronous request without 'blocking' our app from running js code. we can perform other actions or Sagas meanwhile. We yield control of this action to the middleware. If we receive another takeEvery action type, the middleware can determine whether to cancel the previous action/other actions

<br>

---

## Lecture 198 - Redux Thunk Into Saga. {#198}

---

<br>

First we took the logic to dispatch actions to fetch our collections for our shop component and put it into the actions themselves with a async Thunk function in Redux, in shop.actions. Now, we need to move it out of the actions and into a Saga and change it to a generator function.

we no longer need the dispatch from our saga.
We no longer need a .then on our fetchCollections logic because 'yield' returns a 'Promise' that resolves with the value of our collectionRef.get(); that we set to const snapshot.
Instead of using our regular function to map through the snapshot response we use call.

'Call' - an 'effect' inside our generator that invokes functions ( 1st argument ), and subsequent parameters ( other arguments ) to pass into said function, then allows Saga to yield; control the call and cancel it if necessary (e.g. takes too long) and test it.

> - Remember To make a new Branch for Section 21

<br>

---

## Lecture 199 - `take, takeEvery, takeLatest`

---

<br>

`put` - fires an action to the reducer from a saga

`take('ACTION')` - waits for the specific 'ACTION' and, if needed, the payload. Only runs once! then it is completed.

`takeEvery('ACTION')` - spawns a new Saga every time the specific 'ACTION' is passed into it.

`takeLatest('ACTION')` - only takes the latest action passed into it. If an action is currently working, this will cancel that action and start a new one.

`all` - takes an array of Sagas. instead of synchronously executing 3x: `yield fetchStart();` 'all' allows us to run those 3 sagas asap, asynchronously, like this:

```js
yield all([
call(...)
])
```

We can call any number of sagas inside of this array and execute them on separate task threads.

<br>

---

## Lecture 202 - Sign-In With Sagas {#202}

---

<br>

We want to switch our Sign-In/Auth process from an Observer pattern to a more Promise oriented method of asynchronously fetching/updating that data accordingly. Because promises are becoming more prevalent.

We have the Google sign-in method and the plain email/password sign in. So we need 2 separate sets of Start, Complete, and Failure Action Types.

We change our User Reducer to accept new cases for Google and Email signin action types and return the state with the current user and payload and error status (null or error payload)

Create new User Sagas: listen for googleSignInStart which triggers signInWithGoogle, our actual sign in api call from the saga. signInWithGoogle will return a userRef
OnGoogleSignInStart(): takeLatest GOOGLE_SIGN_IN_START, signInWithGoogle <--- trigger
signInWithGoogle(): try/catch yield auth.signInWithPopup

We trigger this saga with the Sign In component. We 'connect' the sign in component to redux and mapDispatchToProps to bring in the googleSignInStart trigger. When that button is pressed, it triggers the google popup to sign in.

When we sign in the auth.signInWithPopup returns us the 'user' object, the same as the 'userAuth' object we were using before in the observer pattern. We use that to create a new user and/or get the userRef object which allows us to get the snapshot and return the user data and trigger the googleSignInSuccess or Failure.

## Lecture 204

7:30 - since we get the user auth and snapshot object the same way between google and email sign in we can consolidate our 'success' and 'failure' action types.

10:30 consolidate duplicate snapshot logic into new generator function\*.

## Lecture 205

recreate persistance for our user auth. in our user saga

there is no promise based way to get snapshot to check whether our user exists or not. we need to make a new firebase.util that will use the existing checking onSnapshotAuth method but we will unsubscribe right after we get the value (?)

## Lecture 208

Clear Cart on SignOut

We could listen for sign out in our cart-item reducer, but this clear items in cart feature could be useful in its own reusable function. We can put it into a Saga and trigger it with a sign out success action. Now that it's in its own saga we can dispatch multiple actions or functions based on sign out success or we can reuse our clearCart action somewhere else.

<br>

---

# Section 21 - Hooks

## Lecture 210 - React Hooks Intro {#210}

---

<br>

Originally if you wanted to leverage _internal_ state in your component you had to use a _class_ component. Then came **Hooks**. Hooks allow functional components access to the state like a class component. Hooks were added in React 16.8

`UseState` - gives functional components access to the state. useState returns an array with 2 values. the value set to a variable, and a function to change that value. e.g. [valueName, setValue] = useState('initialValue').
Can't useState for component lifecycle methods.

_reminder_ Array Destructuring:

```js
const arr = [1, 2, 3];
const [a, b, c] = arr;
// a = 1, b = 2, c = 3
```

### useState example:

```js
const UseStateExample = () => {
  const [name, setName] = useState('initialValue');
  const [addr, setAddr] = useState('Amsterdam');

  return (
    <Card>
      <h1>{name}</h1> // 'initialValue'
      <h1>{addr}</h1> // 'Amsterdam'
      <button onClick={() => setName('Jordan')}>Set Name To Jordan</button>
      <button onClick={() => setAddr('Hawaii')}>Set Address To Hawaii</button>
    </Card>
  );
};
// returns:
// <h1>Jordan</h1>
// <h1>Hawaii</h1>
```

`useEffect` - Allows us to fire side-effects inside functional components. it doesn't get any value, instead, it gets a function that gets called whenever the component changes or rerenders. e.g. when a setState function is triggered by a button. It mimics componentDidMount or any _update_ lifecycle methods.
If you don't want it to fire on every single update, pass in an array as a secondary parameter. The useEffect will only be triggered when the props passed in the array are changed (like componentDidMount).

```js
useEffect(() => {
  console.log('hello');
}, [searchQuery]);
```

- `note` - you can't pass an async function directly in the useEffect, (async returns a thunk(?) object and useEffect requires you to return a regular function. Instead _that_ function can return an async function like so... inside of our useEffect we have an anonymous function that returns the variable fetchFunc which itself is an async (anonymous?) function that awaits a response from a fetch to the api and then awaits the parse of that response. We then attempt to setUser state to the 1st index of the response, _which_ if we _don't_ pass an array in as the 2nd argument to the useEffect, will create an infinite loop and crash. so don't forget to pass in that array (see next example). Most importantly, at the end, trigger the function we just declared above and vòila.

```js
useEffect(() => {
  const fetchFunc = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
    );
    const resJson = await response.json();
    setUser(resJson[0]); // <-- **this** triggers an infinite loop, because useEffect is called every time state changes
  };
  fetchFunc();
});
```

One of the reasons we have an array as a second parameter is to prevent infinte loops, like our useEffect above, from happening. We only want this useEffect to run when the value of the props in it's array change.

We can mimic a componentDidMount lifecycle by passing in an empty array. This way the effect only fires once.

```js
useEffect(() => {
  const fetchFunc = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
    );
    const resJson = await response.json();
    setUser(resJson[0]);
  };
  fetchFunc();
}, []);
```

If we wanted to conditionally call a useEffect, e.g. if(!searchquery), we cannot do it outside of the useEffect(), we must do it inside the anonymous function.

```js
useEffect(() => {
  if (searchQuery.length > 0) {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
      );
      const resJson = await response.json();
      setUser(resJson[0]);
    };
  }
  fetchFunc();
}, [searchQuery]);
```

<br>

---

## Lecture 215

---

<br>

Replacing our componentDidMount's with hooks.

Render Cycles with Hooks: since we converted our ShopPage to hooks, it will rerender when any of the props we passed in it change, or if it's parent component (app.js) rerenders. e.g. in this situation, if currentUser updates in app.js it will rerender our ShopPage.

Now, if we don't pass in an array to our new ShopPage useEffect hook, it can cause it to rerender too much. e.g. if we go to the shop page, and then we refresh, it fetches our collection, then it checks whether we are signed in to the session already, then that will change currentUser in app.js which will in turn rerender our shopPage and fetch our collection again. pass in fetchCollectionsStart into the array so it doesn't do that.

## Lecture 216

We can return a function() in useEffect, called a "Clean-Up Function". useEffect calls this function when a component is unmounted.

before, with our collection call to the firestore, we were using a subscription model to listen for any changes. we set initialized it to null, then on mount we would fetch the collection snapshot and set it to a variable which would return a function to unsubscribe which we would call in componentWillUnmount():

```js
unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => {...})
```

We can declare this same function above, inside of our useEffect, to call our snapshot. Then we can unsubscribe by calling that function in the return of our useEffect, which will run when the component unmounts, just like we did before. Then, on unmount, useEffect will run the function we returned inside of it. Don't forget we need to pass in an empty array so that this effect only runs on mount, and we don't get any errors from linting.

```js
const CollectionPage = ({ collection }) => {
    useEffect(() +> {
        console.log('subscribing')
        const unsubscribeFromCollections = firestore
            .collection('collections')
            .onSnapshot(snapshot => console.log(snapshot));

        return () => {          // <== "clean up function"
            console.log('unsubscribing');
            unsubscribeFromCollections();
        };
    }, [])
}
```

`note`: async functions can't be returned...

In this example above when we go to a collection page, we console.log'd subscribing to the snapshot and return the snapshot object, which we set to the variable unsubscribeFrom.... When we call unsubscribe... on componentWillUnmount lifecycle, it will tell firebase that we have logged out. When we go back to the homepage, we will see a console.log of us unsubscribing.

<br>

---

## Lecture 215

---

### Creating your own _Custom Hooks_

---

<br>

We create a separate file to hold all the logic we need to fetch data from an api and pass it into a component without all that mess.
We declare our custom hook 'useFetch' that takes a 'url' as a callback. then we initiate a useState hook to hold the data that we will fetch. Next, we define a useEffect hook with an anonymous function to async fetch the data from the api, and set the state. We then run that function, (depending on what array we pass in as the 2nd argument) and return the useState hook variable 'data', which contains the data that we fetched, and can now be accessed through this new useFetch custom hook that we can pass in to our app component.

useFetch > use-fetch.effect.js

```js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            setData(data[0]);
        };
        fetchData();
    // different render methods depending on array/!array ...

        // update every time the parent component renders or    useFetch is called.
    }, );

        // only update when 'url' updates.
    }, [url]);

        // only update on mount/initialization
    }, []);

    return data; // <--- DONT FORGET TO RETURN THE CLEANUP FUNCTION!!!
};

export default useFetch;
```

We import our new custom hook into the app and use it in this User component which passes in the url to our useFetch custom hook, which will return the fetch data to be accessed by the variable 'user'.

app.js

```js
import useFetch form '../../effects/use-fetch.effect'

const User = ({ userID }) => {
    const user = useFetch(`https://jsondata.us/users?id=${userId}`)
}
return (
    <User>...
```

<br>

---

## Lecture 217

---

### useReducer

---

state management _localized_ inside of a component. Does not affect the global Redux state!?

```js
import { useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    user: null,
    searchQuery: 'John'
}
// reducer switch statement
const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
        case 'SET_SEARCH_QUERY':
            return {...state, searchQuery: action.payload}
        default:
            return state;
    }
};

// User action:
const setUser = user => ({
    type: 'SET_USER',
    payload: user
});

// Search action:
const setSearchQuery = queryString => ({
    type: 'SET_SEARCH_QUERY',
    payload: queryString
});

// Reducer Hook:
const useReducer = () => {
    // destruct. off the currect state and dispatch method from the reducer hook and pass in our reducer and initial state.
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    // destruct. off state from above?
    const { user, searchQuery } = state;

// Effect:
    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            dispatch(setUser(data[0]));
```

Here, we pass in the user data to our action function, now we just need to dispatch it by wrapping it in the dispatch function. cont...

```js
        };
        fetchData();
    }, [url]); // only update when 'url' updates.

    return data; // <--- DONT FORGET!!!
};

export default useFetch;
```

<br>

---

# Section 22: Stripe Backend

## Lecture 224

---

we have to have a separation between our frontend and backend, we need to separate it in two different folders. client and server.

We are going to fully integrate Stripe. In order to do that we need to hold secret information on the backend so it's not as vulnerable as it would be on the frontend.

we moved everything we have now into client folder and created a new package.json and server.js in the e-commerce dir. Copied over the pre-made package.json from Udemy, replaced and installed it.

<br>

---

## Lecture 225

---

Build a new Express server to handle requests between our frontend ( react app ) and backend ( firebase, secret keys).

when our frontend makes a request to the backend, CORS checks to make sure the request is from the same origin, otherwise it denies it.

<br>

---

## Lecture 227

---

Build /payment route.

<br>

---

## Lecture 228

---

Write client-side logic to initiate a payment request to stripe with axios. Axios helps us make complex api requests.
Inside of our stripe-button component the checkout button makes a post request with axios passing in the price and token (passed in by the stripe-checkout component imported from stripe that takes our 'publishable key' and returns the token).
Express receives that request and passes the respective objects into the body object, that we will pass in to stripe.charges

<br>

---

## Lecture 230

---

Deploy to Heroku. Make sure remote is set to Heroku. Check you heroku app names `heroku apps`. Check git remotes `git remote`, if not heroku `heroku git:remote -a jaf-ltd`.
Change _BuildPack_ so that our heroku app now points to our express server backend, which will handle all the routing; Every route except our '/payment' route will be sent to our React app, which will handle any subsequent routing within our client side app. Any request made by our client side app to '/payment' will be handled by express and routed to stripe with the appropriate data and headers.

<br>

---

## Lecture 236

---

implement Context API in our cart component

we initiate the cart.context.js with 'hidden' and 'toggleHidden' props and import it into our Header component. To initiate a function you must set it to an empty anon. function so that it doesnt throw any errors.
We need to incorporate Local State in our Header component so that it can pass it down to it's Child, the cart component, so that it can react to changes to the state.
We pass in the state through the useState hook and intiate 'hidden' and 'setHidden' to useState(true)
we make a new function, when called, will activate the setHidden function and set hidden to the opposite boolean !hidden.
the <CartIcon> component needs access to the toggleHidden function that will update the state of our cart. So we wrap that component (the consumer ) in the Context Provider
In our CartIcon component we no longer need to pass in the props toggleCartHidden, we now use useContext

<br>

---

## lecture 237

---

Redux kind of does the same thing as Context, just under the hood. We wrapped our entire App in the Redux <Provider store={store}> which allows any component within the App to be able to access the store. We can make our own 'store' using a Context state.

We make our own Cart provider and put our cart.utils in there, because we are going to utilize the remove and addItemsToCart there, and we are no longer using Redux.
We are going to move the code we wrote in our cart.context over here in this cart.provider.

We used to be able to set cartItemsCount with Selectors, but not with Context API.

Last time we passed in props that our Cart Icon component needed from the Header to the Cart Component. Were moving some of that logic into our CartProvider component to provide the local state and values our cart icon component needs.

---

```js
// cart.provider.jsx
const CartContext = createContext({
hidden: true,
toggleHidden: () => {},
cartItems = [],
addItem: () => {},
removeItem: () => {},
clearItemFromCart: () => {},
cartItemsCount: 0
});
```

---

```js
const addItem = item => setCartItems(addItemToCart(cartItems, item));
```

this is the same thing we did before with Redux, only condensed here with ContextAPI. we use the context function addItem, which will take in said item, and run the setCartItems useState hook, which will pass the item to our cart.utils function addItemToCart, which returns us a new array with the new cart items and the quantity of cart items.

We then wrap our whole app in the <CartProvider> component in index.js.
We can now replace our older CartContext with our new Cart Provider.

CartContext is not a default export anymore it is a regular { export }. so make sure you export const CartContext.

In the Header we used to pull the hidden value off of our CartContext. Now we don't need the Context.Provider in the Header since it's wrapped around our whole app now.

```js
old way:
        <CartContext.Provider value={{ hidden, toggleHidden }}>
      <CartIcon />
    </CartContext.Provider>
  </div>
  {hidden ? null : <CartDropdown />}
</div>
```

we just pass in the hidden value from the useContext hook at the top of this component and voila:

```js
new way:
const { hidden } = useContext(CartContext);
    ...
    <CartIcon />
  </div>
  {hidden ? null : <CartDropdown />}
</div>
```

Replace values in our Cart Dropdown component. import { useContext } and { CartContext }. make the component an explicit return instead of implicit. We don't need mapStateToProps, Connect, Selectors, reselect, from Redux. We call { CartItems } from useContext(CartContext).

Context State replaces items we got from the Redux state. e.g. mapDispatch

replace our redux addItem with our context addItem

Cart Provider has local state of everything our cart needs to update values in our cart context. Everything we stored in our reducer we now store in the local state of the <CartContext.Provider>. We then wrap it around our entire App, then pass in the variables and functions we need in value={{...}}. Now the entire app has access to what's called a 'consumer' that allows us to use any value or function we need related to the cart.

The Cart Context is a 'vehicle' that allows us to pass values and updates to and from the Cart 'Provider' which holds the local state of the values

<br>

---

## lecture 238

---

Setup `removeItem` and `clearItemFromCart` in `cart.provider`

```js
const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
```

<br>

removeItem is a function that takes in the item and calls the setCartItems useState hook, which in turn, calls the removeItemFromCart function that takes in all the cartItems, and the individual item, then returns a new array with the item removed and updates the cart state.

Now we want to remove the removeItem Redux code since we do it with Context now. we go to the checkout-item.component and we no longer need to pass in removeItem and addItem through as props from redux. Import useContext and more specifically CartContext from our cart.provider. Inside of the CheckoutItem component We already have an _explicit_ return so we can destructure off our new addItem and removeItem from the useContext(CartContext) hook. So we no longer need to dispatch the add/removeItem from mapDispatch or import it from actions

We are still getting our cart items from redux so lets change that here in checkout.component. Now we are getting cartItems from Context. Now cartDropdown is throwing error because it's trying to dispatch a toggleCartHidden action to Redux. Instead we'll pull in toggleHidden from context. (don't forget to pass it in the `<CartContext.Provider>` component).

For clearItemsFromCart, we need to copy that logic from the cart.reducer and move it into out cart.provider

Move the cart items count logic to cart.provider. We need to get the item count logic from our redux cart.selector to our cart.utils. bring it into the provider, then fire a useEffect whenever the cartItemsCount updates. It will call the useState hook setCartItemsCount and call our cart.util getCartItemsCount with the current cartItems. We need to pass in an array with [cartItems] so the useEffect runs whenever that variable is updated. Now bring in the cartItemsCount that we initiated in our cart.provider into the cart-icon.component

<br>

```js
useEffect(() => {
  setCartItemsCount(getCartItemsCount(cartItems));
}, [cartItems]);
```
