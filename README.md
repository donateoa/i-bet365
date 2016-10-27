# i-bet365

Bet365 web crawler. The module return the price of 3 way (1X2) for all soccer matches published on bet365.com.
It cames wiht the following properties: 
- write the output as file.
- call http service passing the output as parameter
- configurable time to pull data
- compatible with i-alert and i-monitor modules
 

## Install

```sh
$ npm install @alessandro.donateo/i-bet365
```

## Configuration

locate the configuration files
  - production.js
  - staging.js
  - development.js


```sh
$ nano node_modules/i-config/development.js
```

Run 
```sh
$ cd i-bet365
$ npm start //start with production configuration 
$ npm start-stage //start with development configuration 
$ npm start-dev //start with development configuration 

```

