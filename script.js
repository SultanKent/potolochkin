//     fetch('api.php')
// .then(response => response.json()) 
// .then(data => {
//     var region = data.region_name || 'Unknown'; 
//     console.log("Received city name:", region);
//     var parsedResponse = JSON.parse(response); 

   
//     var regionName = decodeURIComponent(JSON.stringify(parsedResponse.region_name).replace(/\\u([\d\w]{4})/gi, function (match, grp) {
//     return String.fromCharCode(parseInt(grp, 16));
// }));

// console.log(regionName); 
// })
// .catch(error => {
//     console.error('Error:', error);
// });




// map



// Инициализация карты с начальным видом на Москву
var map = L.map('map').setView([55.751244, 37.618423], 13);

// Добавление слоя карты от OpenStreetMap с применением фильтра CSS для светлого стиля
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Определение изображений и их границ
var imageUrl1 = './assets/icons/truck.png'; // Укажите путь к вашему первому изображению
var imageUrl2 = './assets/icons/noun-hard-hat-32851 3.png'; // Укажите путь к вашему второму изображению

// Массив координат и границ для 5 мест первой картинки с увеличенными размерами
var locations1 = [
    {
        bounds: [[55.751827, 37.543272], [55.755827, 37.551272]], // Ваганьковское кладбище
        name: "Ваганьковское кладбище"
    },
    {
        bounds: [[55.756911, 37.614242], [55.760911, 37.622242]], // Театральная
        name: "Театральная"
    },
    {
        bounds: [[55.740444, 37.602707], [55.744444, 37.610707]], // Государственный музей изобразительных искусств имени А.С. Пушкина
        name: "Государственный музей изобразительных искусств имени А.С. Пушкина"
    },
    {
        bounds: [[55.740500, 37.649056], [55.744500, 37.657056]], // Курский вокзал
        name: "Курский вокзал"
    },
    {
        bounds: [[55.755500, 37.746000], [55.759500, 37.754000]], // Шоссе Энтузиастов
        name: "Шоссе Энтузиастов"
    }
];

// Массив координат и границ для 5 мест второй картинки с увеличенными размерами
var locations2 = [
    {
        bounds: [[55.750244, 37.581921], [55.753244, 37.587921]], // Ул. Новый Арбат
        name: "Ул. Новый Арбат"
    },
    {
        bounds: [[55.735301, 37.609126], [55.738301, 37.615126]], // Крымская набережная
        name: "Крымская набережная"
    },
    {
        bounds: [[55.745922, 37.679284], [55.748922, 37.685284]], // Площадь Ильича
        name: "Площадь Ильича"
    },
    {
        bounds: [[55.751315, 37.714034], [55.754315, 37.720034]], // Авиамоторная ул.
        name: "Авиамоторная ул."
    },
    {
        bounds: [[55.750382, 37.714644], [55.753382, 37.720644]], // МЦД рядом с Андроновка
        name: "МЦД рядом с Андроновка"
    }
];

// Функция для добавления изображений в заданные места
function addImageOverlays() {
    locations1.forEach(location => {
        L.imageOverlay(imageUrl1, location.bounds).addTo(map);
    });
    locations2.forEach(location => {
        L.imageOverlay(imageUrl2, location.bounds).addTo(map);
    });
}

// Функция для обновления карты по городу
function updateMap(city) {
    fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`${city}`)
                    .openPopup();
                // Добавление изображений после обновления карты
                addImageOverlays();
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
        });
}

// Изначальное добавление изображений на карту
addImageOverlays();




// selector



let jsonData = [
  {
      "id": "1",
      "city_name": "Москва",
      "phone_number": "+7 495 123-45-67",
      "address": "ул. Ленина, 1",
      "sq_meter_price": 1000,
      "light_point_price": 500
  },
  {
      "id": "2",
      "city_name": "Ташкент",
      "phone_number": "+998 71 123-45-67",
      "address": "ул. Амира Темура, 2",
      "sq_meter_price": 900,
      "light_point_price": 450
  }
];

// let jsonData = <?php echo $json_data; ?>;

console.log(jsonData);

let userCity = "Ташкент"; 
let currentCityName = userCity; // Изначально устанавливаем город из переменной userCity

function changeCity(id) {
  let city = jsonData.find(city => city.id === id);
  if (city) {
    currentCityName = city.city_name; // Обновляем текущий выбранный город
    document.querySelector('.header_info p').innerText = city.phone_number;
    document.querySelector('.map_footer-title h1').innerHTML = 'г. ' + city.city_name + ', ' + city.address +
      '<div class="d-flex align-items-center">' +
      city.phone_number +
      '<div class=" mx-4">' +
      '<img class="map-icons" loading="lazy" src="./assets/Group 1520 (1).png" alt="">' +
      '<img class="map-icons" loading="lazy" src="./assets/Group 1521 (1).png" alt="">' +
      '</div></div>';
    
    let bannerTitleSpan = document.querySelector('.banner_title span:last-child');
    let cityName = city.city_name;
    if (cityName.endsWith('а')) {
      cityName = cityName.slice(0, -1) + 'е';
    } else if (!cityName.endsWith('е')) {
      cityName += 'е';
    }
    bannerTitleSpan.innerText = cityName;

    let logoText = document.querySelector('.logo_text');
    logoText.innerText = city.city_name;
    if (!logoText.innerText.endsWith('а')) {
      logoText.innerText += 'а';
    }
    let selectedCity = document.querySelector('.selected-city');
    selectedCity.innerText = city.city_name;
    if (!selectedCity.innerText.endsWith('а')) {
      selectedCity.innerText += 'а';
    }

    let mapCity = document.querySelector('.map-body h5 span');
    if (cityName.endsWith('а')) {
      cityName = cityName.slice(0, -1) + 'е';
    } else if (!cityName.endsWith('е')) {
      cityName += 'е';
    }
    mapCity.innerText = cityName;

    let mapCity2 = document.querySelector('.map-title p span');
    if (cityName.endsWith('а')) {
      cityName = cityName.slice(0, -1) + 'е';
    } else if (!cityName.endsWith('е')) {
      cityName += 'е';
    }
    mapCity2.innerText = cityName;
  } else {
    console.log("Выбран другой город.");
  }
}

function fillSelect() {
  let cities = jsonData;
  let select = document.querySelector('.logo_text');
  for(let i = 0; i < cities.length; i++) {
    let option = document.createElement('option');
    option.value = cities[i].id;
    option.text = cities[i].city_name;
    select.appendChild(option);
  }
}

function changeCityByName(userCity) {
  let city = jsonData.find(city => city.city_name === userCity);
  if (city) {
    changeCity(city.id);
  } else {
    console.log("Выбран другой город.");
  }
}

let select = document.querySelector('.logo_text');
select.addEventListener('change', function() {
  changeCity(this.value);
});

let dropdown = document.querySelector('.dropdown-content');
let changeBtn = document.querySelector('.change-btn');
let cityList = document.querySelector('.city-list');
let dropbtn = document.querySelector('.dropbtn');
let confirmBtn = document.querySelector('.confirm-btn');

for(let i = 0; i < jsonData.length; i++) {
  let city = document.createElement('a');
  city.href = "#";
  city.innerText = jsonData[i].city_name;
  city.onclick = function() {
    changeCity(jsonData[i].id);
    dropbtn.innerText = jsonData[i].city_name;
    let logoText = document.querySelector('.logo_text');
    logoText.innerText = jsonData[i].city_name;
    if (!logoText.innerText.endsWith('а')) {
      logoText.innerText += 'а';
    }
    let selectedCity = document.querySelector('.selected-city');
    selectedCity.innerText = jsonData[i].city_name;
    if (!selectedCity.innerText.endsWith('а')) {
      selectedCity.innerText += 'а';
    }
    cityList.style.display = 'none'; 
    dropdown.style.display = 'none';
  };
  cityList.appendChild(city);
}

changeBtn.onclick = function() {
  if (cityList.style.display === 'none') {
    cityList.style.display = 'block';
  } else {
    cityList.style.display = 'none';
  }
};

dropbtn.onclick = function() {
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
};

confirmBtn.onclick = function() {
  dropdown.style.display = 'none';
};

changeCity(jsonData[0].id);
changeCityByName(userCity);

// Получаем ссылки на элементы DOM
var firstNumberInput = document.getElementById('first_number'); // количество кв. м.
var secondNumberInput = document.getElementById('second_number'); // количество точек освещения
var resultElement = document.getElementById('price_text');
var citySelect = document.querySelector('.logo_text'); // выбор города
var secondFirstNumberInput = document.getElementById('second_first_number'); // количество кв. м.
var secondSecondNumberInput = document.getElementById('second_second_number'); // количество точек освещения
var secondResultElement = document.getElementById('second_price_text');

// Обработчик события для поля ввода первого числа
firstNumberInput.addEventListener('input', function () {
  updateResult();
});

// Обработчик события для поля ввода второго числа
secondNumberInput.addEventListener('input', function () {
  updateResult();
});

// Обработчик события для поля ввода первого числа для второго калькулятора
secondFirstNumberInput.addEventListener('input', function () {
  updateSecondResult();
});

// Обработчик события для поля ввода второго числа для второго калькулятора
secondSecondNumberInput.addEventListener('input', function () {
  updateSecondResult();
});

// Обработчик события для выбора города
citySelect.addEventListener('change', function () {
  updateResult();
  updateSecondResult()
});

// Функция для обновления результата калькуляции
function updateResult() {
  // Получаем значения из полей ввода
  var sqMeters = parseFloat(firstNumberInput.value) || 0;
  var lightPoints = parseFloat(secondNumberInput.value) || 0;

  // Получаем данные для текущего выбранного города
  var cityData = jsonData.find(city => city.city_name === currentCityName);
  // Получаем цены из данных города
  var sqMeterPrice = parseFloat(cityData.sq_meter_price);
  var lightPointPrice = parseFloat(cityData.light_point_price);

  // Выполняем калькуляцию
  var result = (sqMeters * sqMeterPrice) + (lightPoints * lightPointPrice);

  // Обновляем результат калькуляции
  resultElement.textContent = result;
}

// Функция для обновления результата калькуляции для второго калькулятора
function updateSecondResult() {
  // Получаем значения из полей ввода для второго калькулятора
  var sqMeters = parseFloat(secondFirstNumberInput.value) || 0;
  var lightPoints = parseFloat(secondSecondNumberInput.value) || 0;

  // Получаем данные для текущего выбранного города
  var cityData = jsonData.find(city => city.city_name === currentCityName);
  // Получаем цены из данных города
  var sqMeterPrice = parseFloat(cityData.sq_meter_price);
  var lightPointPrice = parseFloat(cityData.light_point_price);

  // Выполняем калькуляцию
  var result = (sqMeters * sqMeterPrice) + (lightPoints * lightPointPrice);

  // Обновляем результат калькуляции
  secondResultElement.textContent = result;
}

// Используем переменную userCity для выбора города при загрузке страницы
var cityData = jsonData.find(city => city.city_name === userCity);
if (cityData) {
  currentCityName = cityData.city_name;
  citySelect.value = cityData.id;
  updateResult();
  updateSecondResult();
}




// Обработчик события



// add favorite


document.addEventListener('DOMContentLoaded', function() {
    var addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');
    addToFavoritesButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var card = this.closest('.card');
            // Изменяем изображение в кнопке 'like'
            var likeButtonImage = this.querySelector('img');
            likeButtonImage.src = "./assets/icons/red_heart.png"; // Замените на путь к вашему новому изображению
            addToFavorites(card);
        });
    });

    function addToFavorites(card) {
        var favoriteProductsContainer = document.querySelector('.card__images_items');
        // Создаем новый блок для добавления сверху карточки
        var newBlock = document.createElement('div');
        newBlock.innerHTML = '<div class="card__images_item1 d-flex align-items-center gap-3"><img src="./assets/icons/close_open.png" loading="lazy" alt=""><p>Потолок вот такой</p></div>';
        // Клонируем карточку и добавляем её в favoriteProductsContainer
        var newFavoriteProduct = card.cloneNode(true);
        // Добавляем новый блок и карточку в favoriteProductsContainer
        favoriteProductsContainer.appendChild(newBlock);
        favoriteProductsContainer.appendChild(newFavoriteProduct);
    }
});


// slider

document.addEventListener('DOMContentLoaded', () => {
  initializeSlider('slides', 'dots', 'prev', 'next'); 
  initializeSlider('slides2', 'dots2', 'prev2', 'next2'); 
  initializeSlider('slides3', 'dots3', 'prev3', 'next3'); 
});

function initializeSlider(slidesClassName, dotsClassName, prevClassName, nextClassName) {
  const slidesContainer = document.querySelector(`.${slidesClassName}`);
  const slides = slidesContainer.querySelectorAll('.slide');
  const dotsContainer = document.querySelector(`.${dotsClassName}`);
  const dots = dotsContainer.querySelectorAll('.dot');
  let startX = 0;
  let endX = 0;

  function updateDots(index) {
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      dots[index].classList.add('active');
  }

  function showSlide(index) {
      slides.forEach((slide, i) => {
          if (i === index) {
              slide.style.display = 'flex';
          } else {
              slide.style.display = 'none';
          }
      });
      updateDots(index);
  }

  function nextSlide() {
      let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
      let nextIndex = currentIndex + 1;

      if (nextIndex >= slides.length) {
          nextIndex = 0;
      }
      showSlide(nextIndex);
  }

  function prevSlide() {
      let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
      let prevIndex = currentIndex - 1;

      if (prevIndex < 0) {
          prevIndex = slides.length - 1;
      }
      showSlide(prevIndex);
  }

  document.querySelector(`.${prevClassName}`).addEventListener('click', prevSlide);
  document.querySelector(`.${nextClassName}`).addEventListener('click', nextSlide);
  if (window.innerWidth <= 1000) { 
    dotsContainer.addEventListener('click', nextSlide);
}
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showSlide(index);
      });
  });

  slidesContainer.addEventListener('dragstart', (e) => {
      startX = e.clientX;
  });

  slidesContainer.addEventListener('dragend', (e) => {
      endX = e.clientX;
      if (startX - endX > 100) {
          nextSlide();
      } else if (startX - endX < -100) {
          prevSlide();
      }
  });

  showSlide(0);
}



    

// modal window


let expandedCard
let initialProperties = []
let finalProperties = []
let cardClip


function getAnimatableElements() {
  if (!expandedCard) return
  return expandedCard.querySelectorAll('.js-animatable')
}

function getCardContent() {
  if (!expandedCard) return
  return expandedCard.querySelector('.card__content')
}

function setup() {
  document.addEventListener('click', (e) => {
    if (expandedCard) return

    if (e.target.matches('.js-card')) {
      expandedCard = e.target
    } else if (e.target.closest('.js-card')) {
      expandedCard = e.target.closest('.js-card')
    }

    if (!expandedCard) return

    const closeButton = expandedCard.querySelector('.js-close-button')
    closeButton.addEventListener('click', collapse)

    expand()
  })
}


function expand() {
  getCardContent().addEventListener('transitionend', onExpandTransitionEnd)

  disablePageScroll()
  collectInitialProperties()

  expandedCard.classList.add('card--expanded')

  collectFinalProperties()

  setInvertedTransformAndOpacity()
  clipCardContent()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      expandedCard.classList.add('card--animatable')
      startExpanding()
    })
  })
}


function collectInitialProperties() {
  for (const element of getAnimatableElements()) {
    initialProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity)
    })
  }

  const cardRect = expandedCard.getBoundingClientRect()
  cardClip = {
    top: cardRect.top,
    right: window.innerWidth - cardRect.right,
    bottom: window.innerHeight - cardRect.bottom,
    left: cardRect.left
  }
}

function collectFinalProperties() {
  const elements = getAnimatableElements()
  for (const element of elements) {
    finalProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity)
    })
  }
}

function setInvertedTransformAndOpacity() {
  const elements = getAnimatableElements()
  for (const [i, element] of elements.entries()) {
    element.style.transform = `translate(${
      initialProperties[i].rect.left - finalProperties[i].rect.left
    }px, ${
      initialProperties[i].rect.top - finalProperties[i].rect.top
    }px) scale(${
      initialProperties[i].rect.width / finalProperties[i].rect.width
    })`

    element.style.opacity = `${initialProperties[i].opacity}`
  }
}

function clipCardContent() {
  getCardContent().style.clipPath = `
    inset(${cardClip.top}px ${cardClip.right}px ${cardClip.bottom}px ${cardClip.left}px round 5px)
  `
}

function startExpanding() {
  for (const [i, element] of getAnimatableElements().entries()) {
    element.style.transform = 'translate(0, 0) scale(1)'
    element.style.opacity = `${finalProperties[i].opacity}`
  }

  getCardContent().style.clipPath = 'inset(0)'
}

function onExpandTransitionEnd(e) {
  const cardContent = getCardContent()
  if (e.target !== cardContent) return

  expandedCard.classList.remove('card--animatable')
  cardContent.removeEventListener('transitionend', onExpandTransitionEnd)
  removeStyles()
}

function removeStyles() {
  for (const element of getAnimatableElements()) {
    element.style = null
  }

  getCardContent().style = null
}

function collapse() {
  getCardContent().addEventListener('transitionend', onCollapseTransitionEnd)

  setCollapsingInitialStyles()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      expandedCard.classList.add('card--animatable')
      startCollapsing()
    })
  })
  const cardHeader = expandedCard.querySelector('.card__header')
}



function setCollapsingInitialStyles() {
  for (const element of getAnimatableElements()) {
    element.style.transform = `translate(0, 0) scale(1)`
  }

  getCardContent().style.clipPath = 'inset(0)'
}

function startCollapsing() {
  setInvertedTransformAndOpacity()
  clipCardContent()
}

function onCollapseTransitionEnd(e) {
  const cardContent = getCardContent()
  if (e.target !== cardContent) return

  expandedCard.classList.remove('card--animatable')
  expandedCard.classList.remove('card--expanded')

  cardContent.removeEventListener('transitionend', onCollapseTransitionEnd)

  removeStyles()
  enablePageScroll()

  cleanup()
}

function disablePageScroll() {
  document.body.style.overflow = 'hidden'
}

function enablePageScroll() {
  document.body.style.overflow = ''
}


function cleanup() {
  expandedCard = null
  cardClip = null
  initialProperties = []
  finalProperties = []
}

setup()

// scroll

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scrollUp').addEventListener('click', function() {
        document.getElementById('scrollableDiv').scrollTop -= 100;
    });

    document.getElementById('scrollDown').addEventListener('click', function() {
        document.getElementById('scrollableDiv').scrollTop += 100;
    });
});


// form

let form = document.querySelector('.form__cart__buttons');
let lastWidget = document.querySelector('.widget2');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (form.checkValidity()) {
        lastWidget.style.display = 'block';
    }
});

// modal article

function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = (modal.style.display == "none" ? "flex" : "none");
}