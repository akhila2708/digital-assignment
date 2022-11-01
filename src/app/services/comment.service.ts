import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  commentsListURL: string;

  constructor(private http: HttpClient) {
    this.commentsListURL = 'https://jsonplaceholder.typicode.com/comments';
  }
  //API call to fetch comments
  getCommentsByPostId(postId: number) {
    return this.http.get<any>(this.commentsListURL, {
      params: { postId: postId },
    });
  }
}
