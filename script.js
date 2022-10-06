'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function(data, className=''){
  const html=`

      <article class="country ${className}">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.comman}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
                <p class="country__row"><span></span>${data.languages[0]}</p>
                <p class="country__row"><span></span>${data.currencies.name}</p>
              </div>
            </article>
      `;

      countriesContainer.insertAdjacentHTML('beforeend',html);
      countriesContainer.style.opacity="1";
}

const getCountryData=function(country){

    // const request=new XMLHttpRequest();
    // request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
    // request.send();

      //const [data]=JSON.parse(this.responseText);
      //console.log(data);
    // const getCountryData=function(country){
      fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response =>  response.json(),error => alert(error))
      .then(data => { 
        renderCountry(data[0]);
        const neighbour=data[0].borders?.[0];
        if(! neighbour)
          return;
        return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
      }).then(response => response.json())
      .then(data => renderCountry(data[0],'neighbour'));
  };


  btn.addEventListener('click',function(){
// getCountryData('bharat');
  getCountryData('portugal'); 
  });
  

