import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  @Input() price: number;
  @Input() value: number;
  total: number;

  constructor(private modalCtrl: ModalController, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.total = this.price + this.value;
    console.log(this.total);
  }

  closeTripFinalModal(){
    this.modalCtrl.dismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create(
    );
    await actionSheet.present();
  }

}
