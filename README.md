<p align="center">
  <a>
    <img height="93" width="149" src="https://raw.githubusercontent.com/brion25/rackjs/master/assets/rack-logo.png">
  </a>
</p>

# Rack
**One endpoint to rule them all**

The main purpose of Rack is to serve 1 endpoint for all your endpoints:

![Rack overview](https://raw.github.com/brion25/rackjs/master/assets/rack-desc-exp.png)

## Installation

First you need to install it globally to have access to the command

```
npm install -g rackjs
```

To access to the `rack` options install it using the command:

```
npm install rackjs
```

And finally, create a file named: `rackfile.js`, because that file is the one that is going to be executed, when you run the command `rack`.

Type `--help` to see the commands available:

```
rack --help
```
## How is this possible?

Basically, you name each one of your endpoints, this name will be the master path, then the rest of the path will be passed to the specified endpoint, ex:

| SERVER NAME | SERVER ENDPOINT | RACK URL | PATH |
|-------------|-----|----------|------|
| domain | http://www.domain.com | http://www.rack.com/domain | /custom/path |

So instead to access directly to `http://www.domain.com/custom/path` you will use the URL : `http://www.rack.com/domain/custom/path`. Now Rack has the control over your endpoint

## How to use it

It's easy to use, you just need to declare your `rackfile.js` similar to the following and the execute the command `rack` on the same folder your `rackfile.js` is:

```
var rack = require('rackjs');

var proxy = new rack({
  port : 3000
});

proxy
  .route('domain',{
    url : 'http://localhost:8000'
  })
  .route('test',{
    url : 'http://localhost:7000'
  });

/*
Now to access to the server http://localhost:8000,
you just need to access to: http://localhost:3000/domain
and to access to http://localhost:7000, you need to
access to: http://localhost:3000/test
*/
```
### Rack Options
 - `port` - Port where to run Raxk js

### Rack Functions
 - `route` - `function` which takes 2 parameters : `serverName` and `serverOptions`
   - `serverName` - `string` which is going to be name of the server and it's going to be the parent path on your rack, the remaining options: `path`, `querystring`, `headers`, etc. is going to pass to the server instance.
   - `serverOptions` - `object`which is going to have the options for that server
     - `url` - URL of the server to wrap into rack

## Comments

 - **[2016 - 02 - 12]** - Logging was improved
 - **[2016 - 01 - 30]** - Module still under development, it's not recommended to use it on production.
