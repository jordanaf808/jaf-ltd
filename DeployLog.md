running into errors from mismatched Node/NPM versions and the packages installed for this project. 

I added an .npmrc and .nvmrc to help note which versions to use, however you still have to actively change them if node and npm versions installed differ from those files. After creating the files I ran `nvm use` and it installed the correct version of node for this project, then I ran `npm install npm@8.4.0` to use the correct npm. This allowed the project to deploy on my dev server but the webpage did not load, just a blank screen. Console noted wrong API key or no Auth.

Fixed, auth wasn't able to find env values.


I'm getting the build to work on Render but the server is not running. Netlify is not working either, they do have a guide on serverless Express App or something. 
I could try Vercel.
I could update React to 17
I could update the whole app to the current course version, using serverless Stripe.