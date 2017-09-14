# Fullstack React App Example

Using Node, Express, React, ReactRouter, Redux, Mongo.

## A. Create README and GitIgnore

1. $ `touch README.md .gitignore`
2. In __README.md__ write details about this project.
3. In __.gitignore__ copy and paste standard ignore files from Github for both Express and React.
4. $ `git init`, `git add .`, `git remote add origin <your remote repo>`, `git push`.

## B. Get Express Up and Running

1. $ `mkdir app`, `mkdir server`, `touch server/index.js`
2. $ `npm init -y`
3. $ `npm install --save express`
4. $ `npm install --save-dev babel-core babel-cli babel-preset-es2015`
5. $ `touch .babelrc`
6. Add  the following into __.babelrc__  
```json
{
  "presets": ["es2015"],
}
```  
7. In __package.json__  
```json
"scripts": {
  "start": "babel-node server/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```  
8. In __server/index.js__  
```javascript
import express from 'express';

let app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => console.log('Running on localhost:3000'));
```  
9. Test with $ `npm start` open browser and head to `localhost:3000` should report "Hello world".

## C. Setup HTML Rendering

1. $ `mkdir server/public`
2. $ `touch server/public/index.html`
1. In __server/index.js__ add the following `import path from 'path';` and replace the following  
```javascript
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
```  
2. In __public/index.html__ insert boilerplate html code  
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Fullstack React App</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```  
3. Then restart server to test.

## D. Setup Server Live Reload on File Changes

1. $ `npm --save-dev nodemon`
2. Update __package.json__ with  
```json
"scripts": {
  "start": "nodemon --watch server --exec babel-node -- server/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```  
3. After restarting server now changes can be seen by refreshing and no need to stop/start server again.

## E. Setup React & WebPack for client

1. $ `npm install --save react react-dom`
2. $ `npm install --save-dev webpack webpack-dev-middleware babel-loader babel-preset-react`
3. $ `mkdir client`
4. $ `mkdir client/actions client/components client/containers client/reducers`
5. $ `touch client/index.js client/containers/App.js webpack.config.dev.js`
6. In __server/index.html__ change body content to `<div id="root"></div>` add just before bottom of body `<script src="bundle.js"></script>`
7. In __client/index.js__ put  
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
```  
8. In __client/containers/App.js__ put  
```javascript
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <h1>Hello from React</h1>
    );
  }
}

export default App;
```  
9. In __webpack.config.dev.js__ put  
```javascript
import path from 'path';

export default {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: './client/index.js',
  output: {
    path: '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader']
      }
    ]
  }
}
```  
10. In __.babelrc__ add react preset `{"presets": ["es2015", "react"]}`
11. In __server/index.js__ add  
```javascript
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

...
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
```  
12. Restart server and test you see "Hello From React"

## F. Setup Hot Reload for React File Changes

1. $ `npm install --save-dev webpack-hot-middleware react-hot-loader`
2. Update __webpack.config.dev.js__ to include devtool, context, and additional entry point from webpack-hot-middleware, add publicPath to output to the desired folder inside /public, add plugins, and add react-hot-loader to module loaders :  
```javascript
import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/index.js'
  ],
  output: {
    path: '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  }
}
```  
5. Update __server/index.js__ to iunclude and configure hot middleware:  
```javascript
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

let app = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(3000, (err) => err ? console.log(err) : console.log('Running on localhost:3000'));
```  
6. Stop and restart server pressing Ctrl+c and the `npm start` again. Thenn make an update to __client/containers/App.js__ then save and browser should automatically update.

## G. Setup Bootstrap (sans-jquery)

1. $ `npm install --save react-bootstrap` will give you the JavaScript only without any dependencies such as jQuery. Learn more at: [https://react-bootstrap.github.io](https://react-bootstrap.github.io)
2. $ `npm install --save bootstrap-only-css` will get you the bootstrap css only!
3. In __webpack.config.dev.js__ add the flowwing loaders:  
```JavaScript
module: {
  loaders: [
    { test: /\.js$/, include: path.join(__dirname, 'client'), exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
  ]
}
```  
4. In __client/containers/App.js__ import in the css with `import 'bootstrap-only-css';`
5. Stop and restart server and head to browser and the text should now be Helvetica.

## H.

1. ...
