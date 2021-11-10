import './sass/main.scss';
import ApiService from './js/apiService';
import photoCardTpl from './partials/photo-card.hbs';
import LoadButton from './js/load-button';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const apiService = new ApiService();
const loadButton = new LoadButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);
loadButton.refs.button.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;

    if (apiService.query === '') {
       return error({
                text: "You must enter query parameters!"
            });
    }

    loadButton.show();
    clearGaleryContainer();
    
    window.addEventListener('keydown', onEnterKeyPress);
    apiService.resetPage();
    loadPhotos();
    elementScrollIntoView();
}

function onLoadMore() {
    loadPhotos();
    elementScrollIntoView();
}

function loadPhotos() {
    loadButton.disable();
    apiService.fetchArticles().then(photos => {
        console.log(photos);
        if (photos.length === 0) {
       return error({
                text: "Please enter a more specific query!"
            });
        }
        photosMarkup(photos);
        loadButton.enable();
    });
}

function photosMarkup(photos) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(photos));
}

function clearGaleryContainer() {
    refs.galleryContainer.innerHTML = '';
}

function onEnterKeyPress(event) {
  if (event.code === 'Enter') {
    onSearch();
  }
}

function elementScrollIntoView () {
    const element = document.getElementById('gallery_box');
    element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
}