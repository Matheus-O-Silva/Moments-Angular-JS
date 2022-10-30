import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { Moment } from 'src/app/moment';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Response } from 'src/app/Response';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes;
  faEdit  = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private commentService: CommentService
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })  
  }

  get text(){
    return this.commentForm.get("text");
  }

  get username(){
    return this.commentForm.get("username");
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.coments!.push(comment.data));

    this.messageService.add(`Comentário adicionado!`);

    this.commentForm.reset();

    formDirective.resetForm();
  }

  async removeHandler(id: number) {
    if (id) {
      await this.momentService.removeMoment(id).subscribe();

      this.messageService.add(`Momento excluído com sucesso!`);

      this.router.navigate(['/']);
    }
  }

}
