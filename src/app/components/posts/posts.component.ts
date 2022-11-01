import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { threadId } from 'worker_threads';
import { Post } from 'src/app/dto/post.data';
import { User } from 'src/app/dto/user.data';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() selectedUser: User;
  postsList: Post[];
  showAllPosts: boolean;
  postSelected: number;
  showLoading: boolean;
  error: boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.showLoading = true;
    //API call to fetch posts
    this.postService.getPostsByUserId(this.selectedUser.id).subscribe({
      next: (data) => {
        this.postsList = data;
        this.postsList.forEach((post: Post) => {
          post.showComments = false;
        });
        this.showLoading = false;
        this.showAllPosts = this.postsList.length > 3 ? false : true;
        this.error = false;
      },
      error: (e) => {
        console.error(e);
        this.showLoading = false;
        this.error = true;
      },
      complete: () => console.info('complete'),
    });
  }
  //shows all records on UI that are fetched when user clicks on load more button
  loadMore() {
    this.showAllPosts = true;
  }
  //fetch comments based on post when user clicks on + icon
  loadComments(post: Post) {
    this.postSelected = post.id;
    post.showComments = !post.showComments;
  }
}
