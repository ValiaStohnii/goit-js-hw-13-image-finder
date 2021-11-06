export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchArticles() {
        const option = {
            headers: {
                Authorization: '563492ad6f91700001000001d92c485916fd48c1802ebd8935846f8a',
            }
        };
        const url = `https://api.pexels.com/v1/search?query=${this.searchQuery}?page=${this.page}&per_page=12`;
        
        return fetch(url, option)
        .then(r => r.json())
            .then(data => {
                this.page += 1;
                return data.photos;
        });
        
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



    
