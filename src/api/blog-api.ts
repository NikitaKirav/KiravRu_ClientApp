import { instance } from "./kirav-api";

export const blogAPI = {
    getArticles(pageindex = 1, pageSize = 10, search = '', sort = '-DateChange') {
        return instance.post(`notes/getAllWithFilter`, {pageindex, pageSize, sort, search}).then(response => {
            return response.data;
        });
    },

    getArticle(articleId) {
        return instance.get(`notes/${articleId}`).then(response => {
            return response.data;
        });
    },

    getArticleForEditing(articleId) {
        return instance.get(`notes/editing/${articleId}`).then(response => {
            return response.data;
        });
    },

    postArticleEdit(article, roles) {
        return instance.post(`notes/editing`, {article, roles}).then(response => {
            return response.data;
        });
    },

    articleDelete(articleId) {
        return instance.delete(`notes/${articleId}`);
    },

    getCategories() {
        return instance.get(`categories/`);
    },

    getCategoryForEditing(categoryId) {
        return instance.get(`categories/editing/${categoryId}`).then(response => {
            return response.data;
        });
    },

    postCategoryEdit(category) {
        return instance.post(`categories/editing`, {category}).then(response => {
            return response.data;
        });
    },

    categoryDelete(categoryId) {
        return instance.delete(`categories/${categoryId}`);
    }
}