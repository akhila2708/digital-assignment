import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsListURL: string;

  constructor(private http: HttpClient) {
    this.postsListURL = 'https://jsonplaceholder.typicode.com/posts';
  }
  //API call to fetch posts
  getPostsByUserId(userId: number) {
    return this.http.get<any>(this.postsListURL, {
      params: { userId: userId },
    });
  }
}
