let apiKey="38d05b6fd8ed04fddad1ab5a2f1c79a4";
        // let url="https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric";

        let city=document.querySelector("#cityInput");
        let form =document.querySelector("form");
        let weather=document.querySelector('#fetchData');
        let searchedCity=document.querySelector(".searchedCities");

        let history = [];

        try {
            let stored = localStorage.getItem("cities");
            history = stored ? JSON.parse(stored) : [];
        } catch (err) {
            localStorage.removeItem("cities");
            history = [];
        }
        displayHistory();

        async function getWeatherInfo(cityName){
    if(!cityName) return;

    try{
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        let data = await response.json();

        if(data.cod !== 200){
            alert("City not found");
            return;
        }

        let card=document.createElement("div");
        card.innerHTML=`<div> 🌆 City : ${data.name}, ${data.sys.country}</div>
                        <div> 🌡️ Temp : ${data.main.temp} °C</div>
                        <div> 🌤️ Weather : ${data.weather[0].main}</div>
                        <div> 💧 Humidity : ${data.main.humidity}%</div>
                        <div> 💨 Wind : ${data.wind.speed} m/s</div>`;

        card.classList.add("card");
        weather.innerHTML="";
        weather.append(card);

        addToHistory(data.name);

    } catch(err){
        console.log(err);
        alert("Something went wrong");
    }
}

        function addToHistory(cityName){
            history=history.filter(item=> item!==cityName);
            history.unshift(cityName);
            history = history.slice(0,5);
            localStorage.setItem("cities",JSON.stringify(history));
            displayHistory();
        }

        function displayHistory(){
            searchedCity.innerHTML="";
            history.forEach(cityName=>{
                let button=document.createElement("button");
                button.textContent=cityName;
                searchedCity.appendChild(button);
            });
        }
        searchedCity.addEventListener('click',(e)=>{
            if(e.target.tagName==="BUTTON"){
                getWeatherInfo(e.target.textContent);
            }
        })

        document.getElementById("clearHistoryBtn").addEventListener("click", () => {
            localStorage.removeItem("cities");
            history = [];
             displayHistory();
        });
       
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            getWeatherInfo(city.value.trim());
            city.value="";
        });
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            logEventLoop(citySearch())
            
        });