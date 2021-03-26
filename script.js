'use strict'

/*Event load - When we refresh the page, it updates*/
window.addEventListener('load', ()=>{
    /*Initialize  the coords */
    let longitud;
    let latitude;
    /*Get the HTML the elements we are going to need in the JS*/
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');

    /*Access to the coordinates position of the computer that uses the application*/
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            /* COORDS */
            longitud= position.coords.longitude;
            latitude=position.coords.latitude;
            /* API */
            //const proxy = `http://cors-anywhere.herokuapp.com/`; /*This API enables cross-origin requests to anywhere.*/
            const api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitud}&units=metric&appid=41fd36b265e4da7c332b2c2cffa735cd`;

            /*Get the information from the api*/
            fetch(api)
            /*Once you got the information, then, do whatever you want with it*/
                .then(response =>{
                    console.log(response);
                    return response.json();
                })/* End function response*/

                .then(data => {
                    console.log(data);
                    /*Filtering the info I need*/
                    const {feels_like} = data.main;
                    const {description,icon}= data.weather[0];
                    const {country} =data.sys;
                    
                    //Set DOM elements from Api*/
                    temperatureDegree.textContent=feels_like;
                    temperatureDescription.textContent=description.toUpperCase();
                    locationTimezone.textContent=country + ' / '+data.name;

                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

            }) /* End function data*/

        }); /*End function position*/
        
    }/*End condicional */

    /* Here we are going to replace the icons of the API for our icons*/
    function setApiIcons(){
        const dict_Icons = {'01d':'CLEAR_DAY', '01n':'CLEAR_NIGHT',
                        '02d':'PARTLY_CLOUDY_DAY', '02n':'PARTLY_CLOUDY_NIGHT',
                        '03d':'CLOUDY', '03n':'CLOUDY',
                        '04d':'CLOUDY', '04n':'CLOUDY',  
                        '09d':'SLEET', '09n':'SLEET' ,
                        '10d':'RAIN', '10n':'RAIN' ,
                        '11d':'WIND', '11n':'WIND' ,
                        '13d':'SNOW', '13n':'SNOW',
                        '50d':'FOG', '50n':'FOG'}
        return dict_Icons;
    }//End of fcuntion setApiIcons

    function setIcons(icon, iconID){
        const skycons=new Skycons({color:'white'});
        const dict_Icons=setApiIcons();
        const currentIcon = dict_Icons[icon];
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    } //End of function setIcon


}); /* END */