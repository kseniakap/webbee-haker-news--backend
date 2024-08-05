"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let CommentsService = class CommentsService {
    transformComments(comments) {
        return comments.map((comment) => {
            const { time_ago, comments_count, ...rest } = comment;
            const transformedComment = {
                ...rest,
                timeAgo: time_ago,
                commentsCount: comments_count,
                comments: comment.comments
                    ? this.transformComments(comment.comments)
                    : [],
            };
            return transformedComment;
        });
    }
    async getAllComments(id) {
        try {
            const response = await axios_1.default.get(`${process.env.API_URL}/item/${id}.json`);
            const { comments } = response.data;
            const rootComments = this.transformComments(comments);
            return rootComments;
        }
        catch (error) {
            throw new Error('Ошибка при получении комментариев из внешнего API');
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)()
], CommentsService);
//# sourceMappingURL=comments.service.js.map