# HangBot9000

Hangbot9000 is a fully functioning hangman game, where the user plays head to head with a custom AI.


![gameOne](https://raw.githubusercontent.com/gmarkay/HangBot9000/master/images/sn-1.png)

![gameOne](https://raw.githubusercontent.com/gmarkay/HangBot9000/master/images/sn-2.png)

## Technologies
 
 -Angularjs
 
 -HTML canvas
 
 -WordnikAPI
 
 http://developer.wordnik.com/docs.html
 
 ## Thanks to the following
 
 - http://www.sharkfeeder.com/hangman/ and http://www.datagenetics.com/blog/april12012/index.html
    for helping me understand hangman strategy.
  
  - Stix on codepen https://codepen.io/stix/pen/vgYwzG, 
    for some excellent buttons
 
  
  ### Feel free to run this locally and challenge Hangbot-9000
  ```
  $ git clone https://github.com/gmarkay/HangBot9000.git
  $ npm install 
  $ http-server
  
  (in new cmd window)
  $ cd lib && grunt

  You will need to apply for a wordnikapi license. They are very quick,  got back to me within a few hours 
  http://www.wordnik.com/signup.
  
  After aquiring  api key:
  $  cd app && mkdir values && cd $_ && touch api-creds.js

  ```
  
```javascript
  api-cred.js should contain this 

'use strict';
angular.module('Hangman').constant('APICreds', {
  apiKey: "{{your api key}}"
});


```  

  
