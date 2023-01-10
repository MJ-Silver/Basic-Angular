import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postservice: PostServiceService) { }

  ngOnInit(): void {
  }

  onaddPost(postform: NgForm){
    if(postform.invalid){
      alert("Invalid")
      return
    }
    alert(postform.value.title+" : "+postform.value.desc);

    this.postservice.addPost_service(postform.value.title,postform.value.desc);
    postform.resetForm();
  }

}
