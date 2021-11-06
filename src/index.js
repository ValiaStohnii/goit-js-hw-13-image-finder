import './sass/main.scss';
import ApiService from './js/apiService';

const apiService = new ApiService();

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more__button'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchArticles().then(photos=>console.log(photos));

}

function onLoadMore() {
    apiService.fetchArticles().then(photos=>console.log(photos));
}

