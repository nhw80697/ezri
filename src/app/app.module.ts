import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard, LoginGuard } from './auth.guard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'messages', component: MessageComponent, canActivate: [AuthGuard] },
  { path: 'add-message', component: AddMessageComponent },
  { path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuard] },
  { path: '**', component: MessageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    NavbarComponent,
    MessageComponent,
    AddMessageComponent,
    DeliveryComponent,
    AddDeliveryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
