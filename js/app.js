var ngApp = angular.module('ngApp',['ngResource', 'ngRoute']);

ngApp
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://script.googleusercontent.com**', 'http://drive.google.com/**']);
     }])

    .config(['$locationProvider', function($locationProvider){
      $locationProvider.html5Mode(true).hashPrefix('!');
    }])

    .config(function($routeProvider) {
      $routeProvider
      .when('/',
      {
          controller: 'main',
          templateUrl: 'pages/items.html'
      })
      .otherwise({
          redirectTo: '/'
      })
    });
   

  
ngApp.controller('main', function($scope, $http, $timeout){
	  Tabletop.init({ key: public_spreadsheet_url,
	        callback: createStore,
	  	 	wanted: [sheet],
	        simpleSheet: true
	  })
	  
	function createStore (data,tabletop) {
		$timeout(function() {
		$scope.items = data;
		$scope.sitename = data[0].sitename;
		$scope.pagetitle =  data[0].pagetitle;
		$scope.pagedescription = data[0].pagedescription;
		$scope.siteemail = data[0].siteemail;
		$scope.paypalemail = data[0].paypalemail;
		$scope.sitelogo = data[0].sitelogo;
	  	$scope.paypal_email = data[0].paypalemail;
		
		$('.loading').hide(); // hide spinner
  		
  			console.log("Loading simplecart");
  		  	  simpleCart({
				  	cartColumns: [
				          { attr: "name", label: "Name"},
				          { view: "currency", attr: "price", label: "Price"},
				          { view: "decrement", label: false},
				          { attr: "quantity", label: "Qty"},
				          { view: "increment", label: false},
				          { view: "currency", attr: "total", label: "SubTotal" },
				          { view: "remove", text: "Remove", label: false}
				      ],
				  	cartStyle: "table", 
  		  	    	checkout: {
  		  	      	  	type: "PayPal",
  		  	      		email: $scope.paypal_email
  		  	    	}
  		  	  });
  		}, 400);
	}
  	  	
      
});


ngApp.directive('sizeColumn', function($timeout) {
  return function(scope, element, attrs) {
     if (scope.$last) {
         scope.$watch('item', function(){
          $timeout(function() {
			  reset_itemHeight();
		  },200);
        });
     }   
  };
});

function reset_itemHeight() {
  	$('.items').each(function(){  
          var highestBox = 0;
          $(this).find('.simpleCart_shelfItem').each(function(){
              if($(this).height() > highestBox){  
                  highestBox = $(this).height();  
              }
          })
          $(this).find('.simpleCart_shelfItem').height(highestBox);
      });    
}


