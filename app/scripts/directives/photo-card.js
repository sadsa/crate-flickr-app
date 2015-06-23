'use strict';


/** 
* Photo Card Directive
*/
angular.module('crateFlickrApp')
	.directive('photoCard', [function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'views/directives/photo-card.html',
	    scope: {
	    	title: '=',
	    	link: '=',
	    	imgSrc: '=',
	    	tags: '='
	    }
	  };
}]);