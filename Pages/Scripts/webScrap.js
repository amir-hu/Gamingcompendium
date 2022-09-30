//const bing = require('bing-image-search-api-scraper');

    //foo is now loaded.
//define(['require', 'bing-image-search-api-scraper'], function (require) {
const bing = require('bing-image-search-api-scraper ');
const axios = require('axios');
const cheerio = require('cheerio');
//});

const image = document.createElement('img');

//let bing = bing-image-search-api-scraper()
var search = bing.search('god of war box cover').then((res) => {
    var image = res[0].photo;
    console.log("hrlooooooooooooo");
    //console.log(decodeURIComponent(image.split("&mediaurl=")[1].split("&")[0]));
    newthing = decodeURIComponent(image.split("&mediaurl=")[1].split("&")[0]);
    console.log(image);
    image.setAttribute(
        'src',
        newthing,
    );
});


image.setAttribute('alt', 'nature');


image.setAttribute('width', 400);

const box = document.getElementById('info');
    box.appendChild(image);
