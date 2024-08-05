"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let NewsService = class NewsService {
    async getAllNewsOnePage(page) {
        try {
            const response = await axios_1.default.get(`${process.env.API_URL}newest/${page}.json`);
            return response.data;
        }
        catch (error) {
            throw new Error('Ошибка при получении данных из внешнего API');
        }
    }
    async getAllNews() {
        try {
            const n = Math.ceil(100 / 30);
            const promises = [];
            for (let i = 1; i <= n; i++) {
                promises.push(this.getAllNewsOnePage(i));
            }
            const limitedResults = (await Promise.all(promises))
                .flatMap((result) => result)
                .slice(0, 100);
            return limitedResults.map((news) => ({
                id: news.id,
                title: news.title,
                points: news.points,
                user: news.user,
                time: news.time,
                timeAgo: news.time_ago,
                commentsCount: news.comments_count,
                type: news.type,
                url: news.url,
                domain: news.domain,
            }));
        }
        catch (error) {
            throw new Error('Ошибка при получении 100 новостей из внешнего API');
        }
    }
    async getNewById(id) {
        try {
            const response = await axios_1.default.get(`${process.env.API_URL}/item/${id}.json`);
            const newData = response.data;
            const transformedData = {
                id: newData.id,
                title: newData.title,
                points: newData.points,
                user: newData.user,
                time: newData.time,
                timeAgo: newData.time_ago,
                content: newData.content,
                commentsCount: newData.comments_count,
            };
            return transformedData;
        }
        catch (error) {
            throw new Error('Ошибка при получении данных для одной записи из внешнего API');
        }
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)()
], NewsService);
//# sourceMappingURL=news.service.js.map