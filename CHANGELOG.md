#v0.6.7
###Fixes
set angular-aria version as  "1.6.1" to prevent error on "1.6.2" - [2bcf1bc](https://github.hpe.com/hpe-hub/hubangular/commit/2bcf1bc)

#v0.6.6
###Fixes
hub-wizard progress show infinite before register errors - [e5e147b](https://github.hpe.com/hpe-hub/hubangular/commit/e5e147b)

#v0.6.5
###Fixes
hub-collapse not expand if initial value is true - [11de0cf](https://github.hpe.com/hpe-hub/hubangular/commit/11de0cf)

#v0.6.4
###Fixes
fix some bower version to be sure always are the same - [b6d83d5](https://github.hpe.com/hpe-hub/hubangular/commit/b6d83d5)
wizard was only updated when user input changes and never watch angular changes. - [07a56f3](https://github.hpe.com/hpe-hub/hubangular/commit/07a56f3)

#v0.6.3
###Fixes
hub-table can't set columns in minified code - [05a1b6e](https://github.hpe.com/hpe-hub/hubangular/commit/05a1b6e)

#v0.6.2
###Features
create "hub-row". It's internal helper directive to hold row information and do accessible to other components - [6b9aa6c](https://github.hpe.com/hpe-hub/hubangular/commit/6b9aa6c)

###Fixes
hide action column if there are any action configured on "hub-table" - [e403bd2](https://github.hpe.com/hpe-hub/hubangular/commit/e403bd2)

#v0.6.1
###Features
add hub-column-action, can put n instances of this to create action per row - [7f59b7b](https://github.hpe.com/hpe-hub/hubangular/commit/7f59b7b)  

###Fixes
number column style and add support to show original number without round decimals. - [006f072](https://github.hpe.com/hpe-hub/hubangular/commit/006f072)  
break long words to avoid overflow text on hub-table in responsive mode - [d66e3fb](https://github.hpe.com/hpe-hub/hubangular/commit/d66e3fb)  
hub-table never change to responsive mode if not assign any breakpoint - [ea69a2d](https://github.hpe.com/hpe-hub/hubangular/commit/ea69a2d)  

###Test
test: add verification to avoid check 'action' as columns in hub-table tests - [d2e0e82](https://github.hpe.com/hpe-hub/hubangular/commit/d2e0e82)  

#v0.6.0
###Features
create table directive and delete old hub-table directive - [2c67e3b](https://github.hpe.com/hpe-hub/hubangular/commit/2c67e3b)  
create hub-column, use this directive to represent basic text columns -  [ec66eef](https://github.hpe.com/hpe-hub/hubangular/commit/ec66eef)  
create hub-column-id, use this directive to represent the id column. -  [f95184e](https://github.hpe.com/hpe-hub/hubangular/commit/f95184e)  
create hub-column-boolean, use this directive to represent boolean columns -  [43061a6](https://github.hpe.com/hpe-hub/hubangular/commit/43061a6)  
create hub-column-menu, use this directive to represent columns with multiple options -  [8588063](https://github.hpe.com/hpe-hub/hubangular/commit/8588063)  
create hub-column-number, use this directive to represent number columns -  [60a76f9](https://github.hpe.com/hpe-hub/hubangular/commit/60a76f9)  
create pagination for responsive table - [82960f4](https://github.hpe.com/hpe-hub/hubangular/commit/82960f4)  
create hub-infinite-scroll - [6332e38](https://github.hpe.com/hpe-hub/hubangular/commit/6332e38)  
create changesEmitter to use as a Observable pattern to changes that not occur or not on angular context -  [4276af3](https://github.hpe.com/hpe-hub/hubangular/commit/4276af3)  

###Fixes
add ng-doc for hub-color - [aae838a](https://github.hpe.com/hpe-hub/hubangular/commit/aae838a)  

###Test
modify test tasks to add generated template cache for testing - [9d58ef3](https://github.hpe.com/hpe-hub/hubangular/commit/9d58ef3)  
use same window resolution to all tests, except IE because not support it -  [9a5fc79](https://github.hpe.com/hpe-hub/hubangular/commit/9a5fc79)  
create tests for hub-table - [79e4af1](https://github.hpe.com/hpe-hub/hubangular/commit/79e4af1)  
create tests for hub-column related directives - [5b830a5](https://github.hpe.com/hpe-hub/hubangular/commit/5b830a5)  
create karma test for hub-infinite-scroll directive - [27b0356](https://github.hpe.com/hpe-hub/hubangular/commit/27b0356)  
