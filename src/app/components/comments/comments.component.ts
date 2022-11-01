import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/dto/post.data';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/dto/comment.data';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() postData: Post;
  @Input() postSelected: number;
  commentsList: Comment[];
  showLoading: boolean = true;
  error: boolean = false;
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}
  ngOnChanges() {
    if (
      this.postSelected != undefined &&
      this.postData.id === this.postSelected
    ) {
      //API call to fetch comments based on postId
      this.commentService.getCommentsByPostId(this.postData.id).subscribe({
        next: (data) => {
          this.commentsList = data;
          this.showLoading = false;
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
  }
}
