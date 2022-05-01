import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';


interface Message {
  id: string
  title: string;
  content: string;
  messageData: { date: object, user: string }
  platoons: Array<string>
}

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

  messageCol: AngularFirestoreCollection<Message> = this.afs.collection('messages');
  messages: Observable<Message[]> = this.messageCol.valueChanges();
  title = "";
  content = "";
  platoons = [
    { id: 0, name: "גברים", bool: true },
    { id: 1, name: "נשים", bool: true },
    { id: 2, name: "בחורים", bool: true },
    { id: 3, name: "נערות", bool: true },
  ];
  constructor(private afs: AngularFirestore, public router: Router, public generalService: GeneralService) { }

  addMessage() {
    const id = this.afs.createId();
    this.afs.collection('messages').doc(id).set({
      'messageData': {
        user: this.generalService.email,
        date: Date()
      },
      'id': id,
      'title': this.title,
      'content': this.content,
      'platoons': this.platoons.map(platoon => platoon.bool)

    });
    this.router.navigateByUrl('/messages');
  }
  ngOnInit(): void {
  }

}
