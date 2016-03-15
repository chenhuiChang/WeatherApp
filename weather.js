function initCoords() {
  if (navigator.geolocation) {
    function callWeatherAPI(position){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="
            +position.coords.latitude.toFixed(2)+"&lon="
            +position.coords.longitude.toFixed(2)+
           "&appid=16ebfe21d57ce05e33a7c9a32a54c4a3", false);
      xhr.send();
      update_HTML(xhr.response);
    }
    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
      }
    }
    navigator.geolocation.getCurrentPosition(callWeatherAPI, showError);
  }
}

function weathericon(id){
  var newid;
  switch(id)
  {
      case 800:
        newid="01d.png";
        break;
      case 801:
        newid="02d.png";
        break;
      case 802:
        newid="03d.png";
        break;
      case 803:
      case 804:
        newid="04d.png";
        break;
      case 200:case 212:
      case 201:case 221:
      case 202:case 230:
      case 210:case 231:
      case 211:case 232:
       newid="11d.png";
       break;
      case 300:case 314:
      case 301:case 321:
      case 302:case 520:
      case 310:case 521:
      case 311:case 522:
      case 312:case 531: 
      case 313:
       newid="09d.png";
       break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
       newid="10d.png";
       break;
      case 511:
      case 600:case 615:
      case 601:case 616:
      case 602:case 620:
      case 611:case 621:
      case 612:case 622:
       newid="13d.png";
       break;
      case 701:case 751:
      case 711:case 761:
      case 721:case 762:
      case 731:case 771:
      case 741:case 781:
       newid="50d.png";
       break;
  }
  return "http://openweathermap.org/img/w/"+newid;
  
}
function update_HTML(responseText) {
  var obj=JSON.parse(responseText);
  //console.log(obj);
  $("#location").html(obj.name+", "+obj.sys.country);
  var temp = obj.main.temp-273.15;
  $('#temperature').html(String(temp.toFixed()));
  $("#weather_discription").html(obj.weather[0].description);
  //console.log(obj.weather[0].description,obj.weather[0].id);
  $("#weather_icon").attr("src",weathericon(obj.weather[0].id));
}

function changeUnit()
{
  var temp = parseInt($("#temperature")[0].innerHTML);
  var unit_now= $("#unit")[0].innerHTML;
  if(unit_now==="C")
  {
    $("#unit").html("F");
    $("#temperature").html(String(Math.round(temp*9/5+32)));
  }
  else
  {
    $("#unit").html("C");
    $("#temperature").html(String(Math.round((temp-32)*5/9)));
  }
}

