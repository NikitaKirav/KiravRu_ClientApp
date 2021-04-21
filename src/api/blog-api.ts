import { instance } from "./kirav-api";

export const blogAPI = {
    getArticles(pageindex = 1, pageSize = 10, search = '', sort = '-DateChange') {
        return instance.post(`blog/getArticles`, {pageindex, pageSize, sort, search}).then(response => {
            return response.data;
        });
    },

    getArticle(articleId) {
        return instance.get(`blog/getArticle?articleId=${articleId}`).then(response => {
            return response.data;
        });
    },

    getArticleEdit(articleId) {
        return instance.get(`blog/edit?articleId=${articleId}`).then(response => {
            return response.data;
        });
    },

    postArticleEdit(article, roles) {
        return instance.post(`blog/edit`, {article, roles}).then(response => {
            return response.data;
        });
    },

    getArticleDelete(articleId) {
        return instance.get(`blog/delete?id=${articleId}`);
    },

    getCategories() {
        return instance.get(`categories/list`);
    },

    getCategoryEdit(categoryId) {
        return instance.get(`categories/edit?id=${categoryId}`).then(response => {
            return response.data;
        });
    },

    postCategoryEdit(category) {
        return instance.post(`categories/edit`, {category}).then(response => {
            return response.data;
        });
    },

    getCategoryDelete(categoryId) {
        return instance.get(`categories/delete?id=${categoryId}`);
    }
}