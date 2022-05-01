import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveryCol: AngularFirestoreCollection = this.afs.collection('deliverys');
  deliverys: Observable<any> = this.deliveryCol.valueChanges();
  constructor(private afs: AngularFirestore, public generalService: GeneralService) {
    this.deliverys.subscribe((ee) => {
      console.log(ee)
    })
  }

  ngOnInit(): void {
  }

}
