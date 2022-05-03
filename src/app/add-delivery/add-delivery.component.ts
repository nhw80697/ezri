import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

interface Delivery {
  id: string;
  product: string;
  quantity: number;
  deliveryOrRequest: string;
  city: Array<object>;
  messageData: { date: object, user: string }
  contactInfo: { email: string | null | undefined, phonNumber1: string };
  comment: string;
}

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  products = ["מודולן", "איזי-דרינק", "אנשור-קפה", "אנשור-שוקולד"];
  cities = [
    { id: 0, name: 'ירושלים', bool: true },
    { id: 1, name: 'בני-ברק', bool: true },
    { id: 2, name: 'אשדוד', bool: true },
    { id: 3, name: 'מודיעין-עילית', bool: true },
    { id: 4, name: 'ביתר-עילית', bool: true },
    { id: 5, name: 'בית-שמש', bool: true },
    { id: 6, name: 'אופקים', bool: true },
    { id: 7, name: 'רכסים', bool: true },
    { id: 8, name: 'צפת', bool: true }
  ]

  // cities = ["ירושלים", "בני-ברק", "אשדוד", "מודיעין-עילית", "ביתר-עילית", "בית-שמש", "אופקים", "רכסים"]

  delivery: Delivery = {
    id: "",
    deliveryOrRequest: "למסירה",
    quantity: 1,
    product: this.products[0],
    city: [...this.cities],
    messageData: { date: new Date(), user: "" },
    contactInfo: { email: '', phonNumber1: '' },
    comment: ''
  }

  addDelivery() {
    const id = this.afs.createId();
    this.afs.collection('deliverys').doc(id).set({
      'messageData': {
        user: this.generalService.email,
        date: Date()
      },
      'product': this.delivery.product,
      'id': id,
      'deliveryOrRequest': this.delivery.deliveryOrRequest,
      'quantity': this.delivery.quantity,
      'city': this.cities.filter(city => { return city.bool }),
      'contactInfo': this.delivery.contactInfo,
      'comment': this.delivery.comment
    }).then(() => {
      this.delivery.city = [...this.cities];
      this.delivery.contactInfo = { email: '', phonNumber1: '' };
      this.delivery.quantity = 1;
      this.delivery.comment = '';
    });
  }


  constructor(private afs: AngularFirestore, public router: Router, public generalService: GeneralService) { }

  ngOnInit(): void {
  }

}
