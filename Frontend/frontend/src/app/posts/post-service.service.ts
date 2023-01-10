import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { response } from 'express';
import { PostDisplayComponent } from './post-display/post-display.component';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private postdisplay:{_id:string,title:string,description:string,_v:string}[] = [];
  private updatedpostdisplay = new Subject<{_id:string,title:string,description:string,_v:string}[]>();


  constructor(private http: HttpClient) { }

  addPost_service(ptitle: string, pdesc : string){
      this.http.post<{message:string,posts:any}>('https://localhost:3000/api/dash/addPost',{title:ptitle,description:pdesc}).subscribe(theposts =>{
       this.postdisplay.push(theposts.posts);
       this.updatedpostdisplay.next([...this.postdisplay]);

      });
  }

  getPost_service(){
      this.http.get<{message:string, Posts:any}>('https://localhost:3000/api/dash/displayPosts').subscribe((thepost)=>{
        this.postdisplay = thepost.Posts;
        this.updatedpostdisplay.next([...this.postdisplay]);
      });
  }

  deletePost_service(postid: string){
    this.http.delete('https://localhost:3000/api/dash/deletePost/'+postid).subscribe(()=>{
      const updatedpostdisplay = this.postdisplay.filter(post => post._id == postid);
      this.postdisplay = updatedpostdisplay;
      this.updatedpostdisplay.next([...this.postdisplay]);
    });
  }
 
  getUpdateListener(){
    return this.updatedpostdisplay.asObservable();
  }
  
}
