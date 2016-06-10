# frontend-neighbourhood-map

##Run the app

* look at bower.json to see the dependencies used
* install bower and its dependencies
* run gulp in git
* browser will load automatically.

##Gulp file

####Plugins used
  browserSync
  
* watch task watches for any changes in html file in src directory
* if there is a change ,then copy task is called
* copy task copies html files from src to dist
* Since html file at dist changes watch task defined in serve task reloads the browser
