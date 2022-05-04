import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import * as firestore from 'firebase/firestore';
import Timestamp = firestore.Timestamp;
import { formatDate } from "@angular/common";
import { Message } from '../interfaces';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageCol: AngularFirestoreCollection<Message> = this.afs.collection('messages', ref => ref.orderBy('messageData.date', 'desc'));
  messageDoc: AngularFirestoreDocument<Message> | undefined;
  messages: Observable<Message[]> = this.messageCol.valueChanges();
  constructor(private afs: AngularFirestore, public generalService: GeneralService) { }

  deleteMessage(messageId: string) {
    // this.messageDoc?.collection('messages').doc(messageId).delete();
    this.afs.doc('messages/' + messageId).delete()
    console.log(messageId)
  }

  ngOnInit(): void {
    this.messages.subscribe(res => {
      console.log(res)
    })
  }

}
