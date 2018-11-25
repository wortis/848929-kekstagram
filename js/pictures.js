'use strict';

var picturesSectionEl = document.querySelector('.pictures');
var userPhotoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');

var photos = [];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFromArray = function (array) {
  if (!Array.isArray()) {
    return null;
  }
  return array[Math.floor(Math.random() * (array.length))];
};

var getArrayPart = function (array, newLength) {
  var helpArray = array.slice();
  var newArray = [];
  for (var i = 0; i < newLength; i++) {
    var randomIndex = Math.floor(Math.random() * helpArray.length);
    var randomElem = helpArray[randomIndex];
    helpArray.splice(randomIndex, 1);
    newArray.push(randomElem);
  }
  return newArray;
};

var generateCards = function (count) {
  for (var i = 0; i < count; i++) {
    var card = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(15, 200),
      comments: getArrayPart(comments, getRandomInteger(1, 2)),
      description: getRandomFromArray(description)
    };
    photos.push(card);
  }
};

var createElement = function (item) {
  var element = userPhotoTemplateEl.cloneNode(true);

  var image = element.querySelector('.picture__img');
  var likes = element.querySelector('.picture__likes');
  var commentsCount = element.querySelector('.picture__comments');

  image.src = item.url;
  likes.textContent = item.likes;
  commentsCount.textContent = item.comments.length;

  return element;
};

generateCards(25);

var fillPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createElement(array[i]));
  }
};

fillPhotos(photos);
picturesSectionEl.appendChild(fragment);

var createComment = function (commentText) {
  var listItem = document.createElement('li');
  listItem.classList.add('social__comment');

  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = 35;
  img.height = 35;
  listItem.appendChild(img);

  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentText;
  listItem.appendChild(text);

  fragment.appendChild(listItem);
};

var pushInfo = function (item) {
  var image = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var descriptionText = bigPicture.querySelector('.social__caption');

  var commentsCounter = bigPicture.querySelector('.social__comment-count');
  var newComments = bigPicture.querySelector('.comments-loader');

  commentsCounter.classList.add('visually-hidden');
  newComments.classList.add('visually-hidden');

  image.src = item.url;
  likes.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  descriptionText.textContent = item.description;

  for (var i = 0; i <= commentsBlock.children.length; i++) {
    commentsBlock.removeChild(commentsBlock.children[0]);
  }

  for (var j = 0; j < item.comments.length; j++) {
    createComment(item.comments[j]);
  }

  commentsBlock.appendChild(fragment);
};

pushInfo(photos[0]);
bigPicture.classList.remove('hidden');
