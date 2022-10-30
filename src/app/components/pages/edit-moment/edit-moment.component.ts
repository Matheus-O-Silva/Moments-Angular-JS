import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(momentData: Moment){
    const id = this.moment.id
    const formData = new FormData();
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image){
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messageService.add(`O Momento ${id} foi atualizado com sucesso`)

    this.router.navigate(['/']);
  }

}
