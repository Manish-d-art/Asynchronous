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

// const geCountryAndNeighbour = function(countryName) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country
//         renderCountry(data);

//         // Get neighbour country
//         const [neighbour] = data.borders;
//         console.log(neighbour);

//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         });
//     });
// };
// geCountryAndNeighbour('usa');


// const getCountryData=function(country){

//     // const request=new XMLHttpRequest();
//     // request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
//     // request.send();

//       //const [data]=JSON.parse(this.responseText);
//       //console.log(data);
//     // const getCountryData=function(country){
//       fetch(`https://restcountries.com/v3.1/name/${country}`)
//       .then(response =>  {
//         console.log(response);
//         if(! response.ok)
//         throw new Error(`Country not found(${response.status})`)
//         return response.json()
//       })
//       .then(data => { 
//         renderCountry(data[0]);
//         const neighbour=data[0].borders?.[0];
//         // const neighbour='jdfhgfjjf';
//         if(! neighbour)
//           return;
//         return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
//       }).then(response => {
//         if(! response.ok)
//           throw new Error(`Country not found(${response.status})`)
//         return response.json()
//       } )
//       .then(data => renderCountry(data[0],'neighbour'))
//       .catch(error => {
//         renderError(`Something went wrong 😢😢😢${error.message}.Try Again !`);
//       }) .finally(() => {
//         countriesContainer.style.opacity = 1;
//       });
//   };

const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        // console.log(response);

        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

        return response.json();
    });
};

const getCountryData=function(country){

  // const request=new XMLHttpRequest();
  // request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
  // request.send();

    //const [data]=JSON.parse(this.responseText);
    //console.log(data);
  // const getCountryData=function(country){
    return getJSON(`https://restcountries.com/v3.1/name/${country}`,'Country not found')
    // fetch(`https://restcountries.com/v3.1/name/${country}`)
    // .then(response =>  {
    //   console.log(response);
    //   if(! response.ok)
    //   throw new Error(`Country not found(${response.status})`)
    //   return response.json()
    // })
    .then(data => { 
      renderCountry(data[0]);
      const neighbour=data[0].borders?.[0];
      // const neighbour='jdfhgfjjf';
      if(! neighbour)
       throw new Error(`No neighbour found !🥲🥲`)
      // return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
      return getJSON(`https://restcountries.com/v3.1/name/${neighbour}`,'Country not found')
    // }).then(response => {
    //   throw new Error(`Country not found(${response.status})`)
    //   return response.json()
    } )
    .then(data => renderCountry(data[0],'neighbour'))
    .catch(error => {
      renderError(`Something went wrong 😢😢😢${error.message}.Try Again !`);
    }) .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};


// btn.addEventListener('click',function(){
// // getCountryData('bharat');
//   // getCountryData('portugal'); 

// });
// getCountryData('fjkhgkgkj'); 

// const renderError = function(msg) {
//     countriesContainer.insertAdjacentText('beforeend', msg); 
//     // countriesContainer.style.opacity = 1;
// };


  
// const whereAmI = function(lat,lng){
//   fetch(`https://www.geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => 
//       {
//         if(! res.ok) throw new Error(`problem with geocoding ${res.status}`);
//         return res.json();
//       })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);

//     })
//     .then(response => {
//                   if (!response.ok) throw new Error(`Country not found (${response.status})`);
//                   // console.log(response);
//                   return response.json();
//               })
//     .then(data => 
//       {
//         renderCountry(data[0])
//         // console.log(data);
//       })
//     .catch(error => console.log(`${error.message} 😒😒😒`))
//     .finally(() => (countriesContainer.style.opacity = 1));

// }

// whereAmI(52.508,13.381);
// whereAmI(56.508,13.381);
// whereAmI(59.508,13.381);


// const lotteryPromise=new Promise(function (resolve,reject){
//   console.log('Lotter is happening 🔮');
//   setTimeout(function(){
//     if(Math.random() >= 0.5){
//       resolve ('You WIN 💶💷🤑');
//     }else{
//       reject(new Error('You lost your money 😭😭'));
//     }
//   },2000);
// });

// lotteryPromise.then(res => console.log(res))
// .catch(err =>console.log(err));

//promisifying setTimeout
// const wait =function(seconds){
//   return new Promise(function(resolve){
//     setTimeout(resolve,seconds*1000);
//   });
// };

// wait(2)
//   .then( () => {
//     console.log('I waited for 2 second');
//     return wait(1);
//   })
//     .then( () => console.log('I waited for 1 second'));


// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));  


// promisifying the geolocation API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// const getPosition=function(){
//   return new Promise(function(resolve,reject){
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve,reject);
//   });
// };
getPosition().then(pos => console.log(pos));


const whereAmI = function(){
  getPosition().then(pos => {
    const {latitude:lat,longitude:lng}=pos.coords;

    return  fetch(`https://www.geocode.xyz/${lat},${lng}?geoit=json`)

  })
    .then(res => 
      {
        if(! res.ok) throw new Error(`problem with geocoding ${res.status}`);
        return res.json();
      })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);

    })
    .then(response => {
                  if (!response.ok) throw new Error(`Country not found (${response.status})`);
                  // console.log(response);
                  return response.json();
              })
    .then(data => 
      {
        renderCountry(data[0])
        // console.log(data);
      })
    .catch(error => console.log(`${error.message} 😒😒😒`))
    .finally(() => (countriesContainer.style.opacity = 1));

};
// whereAmI();


// coding challenge2
const imgContainer=document.querySelector('.images');

const createImage=function(imgPath){
  return new Promise(function(resolve,reject){
    const img=document.createElement('img');
    img.src=imgPath;

    img.addEventListener('load',function(){
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error',function(){
      reject(new Error('Image not found'))
    })
  });
};

const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

let currImg;
createImage('./img/img-1.jpg')
    .then(img => {
        currImg = img;
        console.log('img1 loaded');
        return wait(2);
    })
    .then(() => {
        currImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(img => {
        currImg = img;
        console.log('img2 loaded');
        return wait(2);
    })
    .then(() => {
        currImg.style.display = 'none';
        console.log('final display');
        return wait(2);
    })
    .then(() => (currImg.style.display = 'block'))
    .catch(err => console.error(err));

    
    // Async/Await
const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};