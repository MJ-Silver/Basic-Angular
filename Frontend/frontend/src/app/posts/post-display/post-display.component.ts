import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  posts:{_id:string,title:string,description:string,_v:string} [] = []
  
  constructor(public postservice: PostServiceService) { }

  private postsub! :Subscription;

  ngOnInit(): void {

    this.postservice.getPost_service();
    this.postsub = this.postservice.getUpdateListener().subscribe(( posts:{_id:string,title:string,description:string,_v:string} [])=>{
    this.posts = posts; 
    });

  }

  ngOnDestroy(){
    this.postsub.unsubscribe();
  }

  ondelete(theposts : string){
    this.postservice.deletePost_service(theposts);
    this.postservice.getUpdateListener();
  }

}
