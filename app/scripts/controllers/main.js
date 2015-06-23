'use strict';

/** 
* Flickr Feed Controller
*/
angular.module('crateFlickrApp')
  .controller('MainCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    /// View collections and vars
    var regex;
    $scope.isLoading = false;
    $scope.errorMessage  = '';
    $scope.photos = [];
    $scope.search = '';

    /// Functions
    $scope.filterBySearch = function(photo) {
		/** 
		* <summary>Makes a request to the Flickr API via JSONP</summary>
		* <param name="photo" type="Object">The photo object passed from the filter binding</param>
		* <returns type="Array">returns an array of photo objects</returns>
		*/
        if (!$scope.search){ 
        	return true;
        }
        var tags = photo.tags.join();
        return regex.test(tags);
    };

    $scope.fetchPhotos = function(){
    /** 
		* <summary>Fetch new results from API and store in photos</summary>
		*/	

		// Note: the callback param 'jsoncallback' must contain a value of JSON_CALLBACK for cross-domain authentication
  	var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
   
		$scope.isLoading = true;

    $http.jsonp(url)
    	.success(function(data) {

    		var photos = [];

        	angular.forEach(data.items, function(item) {
        		var photo = {
							title: item.title,
							link: item.link,
							imgSrc: item.media.m,
							description: $sce.trustAsHtml(item.description)
						};

						// remove tags with empty string
						function getValidTags(tags){
							var tagList = [];
							angular.forEach(tags, function(tag) {
								if(tag !== ''){
									tagList.push(tag);
								}
							});
							return tagList;
						}

						photo.tags = getValidTags(item.tags.split(' '));

        		photos.push(photo);
					});

					$scope.photos = photos;
					$scope.isLoading = false;

        });
    };

    $scope.reload = function(){
		/** 
		* <summary>Refresh page results</summary>
		*/    	
    	$scope.fetchPhotos();
    };    

    $scope.photos = $scope.fetchPhotos();


    /// Watchers
    $scope.$watch('search', function (value) {
        regex = new RegExp(value, 'i');
    });
    

  }]);
