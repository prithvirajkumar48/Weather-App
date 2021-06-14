let weather = {
"apiKey": "ac76eaa7c36861e7018a85b7bbe04d40",
fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      +city 
      +"&units=metric&appid=" 
      +this.apiKey
    )
    .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));

},
displayWeather: function(data) {
    const { name } = data;
    const { icon,description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "wind speed: " + speed +  "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
},
search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
}
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Hydearbad");