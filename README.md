# React Query tutorial

Tutorial videos from made by [Codevolution](https://www.youtube.com/watch?v=Ev60HKYFM0s&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=3).

Code is separated with different branches. Every video has his own branch.

**First steps:**

1. Clone project by running:
   `git clone https://github.com/nejcrogelsek/react-project-template.git`
2. Delete .git file inside cloned project.
3. Run: `yarn run start:clean`
4. Run: `yarn run husky:postinstall` to install husky git hook (automatically formats the code when pushing code to github)

5. Before running the app you need to serve mock data with: `yarn run serve-json`. If you go to http://localhost:4000/superheroes you will see the data.

## About react-query

1. react-query cache

The first time useQuery is fired for superheros key, isLoading flag is set to true and network request is send to fetch the data. When the request is completed it is cached used the query key (superheroes) and the fetchSuperHeroes function as the unique identifiers.

When we revisit the page react query will check if the data for this query exists in cache. If the data exists in the cache, the cached data is immediately returned without isLoading flag set to true.

React query knows that the server data might be updated and that the cache doesn't contain the latest data. So a background refetch is triggered for the same query and if the response is successful the displayed data is updated in the UI.
As our data in this example is the same as the cached data, we don't see any differences. But you can change the db.json file and see the changes for yourself.

To indicate the background refetch state, react-query provides us with the flag called isFetching.

React query cache the data so we don't need to see the loading indicator every time we visit the page.

The default cache time is set to 5 mintes. We can change it with options cacheTime property

2. react-query stale time

Let's say the data doesn't change that often. We can set the stale time to 30 seconds and the user will see the cached query results or cached data for 30 seconds before refetching it again. The default state time is set to 0 seconds.

0 seconds is possibly the safest value you can set to stale time, which is also the default value.

3. react-query refetchOnMount

If set to true, the query will refetch on mount if the data is stale. If set to false, will disable additional instances of a query to trigger background refetches. If set to 'always', the query will always refetch on mount. If set to a function, the function will be executed with the latest data and query to compute the value Defaults to true.

Default value is set to true.

4. react-query refetchOnWindowFocus

If set to true, the query will refetch on window focus if the data is stale. If set to false, the query will not refetch on window focus. If set to 'always', the query will always refetch on window focus. If set to a function, the function will be executed with the latest data and query to compute the value. Defaults to true.

Default value is set to true.

5. react-query refetchInterval - Polling

Fetching data at regular intervals. For example: If you have component that shows real time price of different stocks, you might want to fetch the data every second so is in sync with UI.

For that react-query provides us with `refetchInterval` flag.

Default value is set to false.

Polling is paused when the window lose focus. To fix that issue we can set `refetchIntervalInBackground` property to true.

## Available Scripts

In the project directory, you can run:

### `yarn start:clean`

Remove `node_modules` & `yarn.lock` & `yarn-error.log` files.
Then it runs: `yarn` to install all packages & finally `yarn start` to run the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn generate:page PageName`

Generates new page with specified name.

### `yarn generate:component ComponentName`

Generates new component with specified name.

### Check for updates

- `yarn update:check` - Check for any packages updates.
- `yarn update:single packageName` - Updates one package.
- `yarn update` - Updates all packages.

### Prettier

- `yarn code:check` - Check for any prettier errors.
- `yarn code:format` - Format code.
- `yarn code:format:specific-file` - Format specific file.

### eslint

- `yarn lint` - Check for any eslint errors.
- `yarn lint:fix` - Fix some of the errors.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
