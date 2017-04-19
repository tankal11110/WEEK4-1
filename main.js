(function(){

	var button = document.querySelector("#button");

	var latitude = 0, longitude = 0;

	var a = document.querySelector("#geo_link");

	function getLocation(){

		if (navigator.geolocation){

			navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
				
		}
	};

	function geoSuccess(position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		showLink(createLink());
	}

	function geoError(errorObject){
		alert("Error");
	}

	var options = {};

	function createLink(){
		return  "http://bing.com/maps/default.aspx?cp=" + latitude + "~" + longitude;

	};

	function showLink(link){

	
		a.innerHTML = link;
		a.setAttribute("href", link);
	};

	button.onclick = function(){

		a.innerHTML = "";
		getLocation();

		
	};


})();