// array of objects (cards) with different values

let cardsArray = [{
        'name': 'biggie',
        'img': 'https://ih0.redbubble.net/image.298511809.4550/poster%2C210x230%2Cf8f8f8-pad%2C210x230%2Cf8f8f8.lite-1u4.jpg',
    },
    {
        'name': 'tupac',
        'img': 'https://i.ytimg.com/vi/ymb-j9wFdvk/maxresdefault.jpg',
    },
    {
        'name': 'snoop',
        'img': 'https://pbs.twimg.com/profile_images/943933166015803392/jvjasD7v_400x400.jpg',
    },
    {
        'name': 'jayZ',
        'img': 'https://www.avtora.com/userfiles/content/2028507/original/djei-zi-e-nai-bogatiiat-rapar-spored-klasaciiata-na-forbes.jpg',
    },
    {
        'name': 'eminem',
        'img': 'https://i.pinimg.com/736x/f6/92/bc/f692bc60b9a7c7d9568b7d7026e73e80--eminem.jpg',
    },
    {
        'name': 'tooShort',
        'img': 'https://static1.squarespace.com/static/52caf22ee4b05977ab043ee9/t/5a03721724a694f5e24d7f72/1510175257460/IMG_5899+%281%29.JPG',
    },
];  

// this is what will sort the cards randomly, choosing them from the array // 

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });
  

  //store the first and second guesses // 
  var firstGuess = '';
  var secondGuess = '';
  var count = 0;
  var previousTarget = null;
  var delay = 2000;

  //displays the cards by getting the element (div), create a new section and append the cards to it
  
  var gameBoard = document.getElementById('gameBoard');
  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  gameBoard.appendChild(grid);
  

  // creates new card div for each object in the array, and give them a back, front, and a card property which will allow us to display the front/backs
  
  gameGrid.forEach(function (item) {
    var name = item.name,
        img = item.img;
  
  
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    var front = document.createElement('div');
    front.classList.add('front');
  
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';
  
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  //check to see if cards match // 
  
  var match = function match() {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.add('match');
    });
  };

  // allows us to make multiple guesses by resetting the count after two guesses // 
  var resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
  
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.remove('selected');
    });
  };
  

  //here is the event listener to add a click function to the elements so that each time they are clicked the selected class is applied// 
  grid.addEventListener('click', function (event) {
  
    var clicked = event.target;
  // need to make sure cards that have been matched cannot be clicked again // 
    if (clicked.nodeName === 'section' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return;
    }

    // here makes sure that only two of the sections (cards) can be selected at the same time // 
  
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected');
      }
  
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
      previousTarget = clicked;
    }
  });