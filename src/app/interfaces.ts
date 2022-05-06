import * as firestore from 'firebase/firestore';
import Timestamp = firestore.Timestamp;

export interface Message {
    id: string
    title: string;
    content: string;
    messageData: { date: Timestamp, user: string };
    platoons: Array<string>
}

export interface Delivery {
    id: string;
    product: string;
    quantity: number;
    deliveryOrRequest: string;
    city: Array<object>;
    messageData: { date: object, user: string }
    contactInfo: { email: string | null | undefined, phonNumber1: string };
    comment: string;
}

export interface User {
    id: string;
    displayName: string;
    email: string;
    phonNumber?: string;

}