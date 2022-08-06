import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { ProduitComponent } from '../../products/produit/produit.component';

@Component({
  selector: 'app-commerce-details',
  templateUrl: './commerce-details.component.html',
  styleUrls: ['./commerce-details.component.css']
})
export class CommerceDetailsComponent implements OnInit {

  id = 0;
  commerceName = '';
  proprietaireName = '';
  adresse = '';
  telephone = '';
  email = '';

  constructor(
    private commerceService: CommerceService,
    private dialogRef: MatDialogRef<ProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.commerceId
  }


  ngOnInit(): void {
    this.commerceService.getCommerceById(this.id).subscribe(data => {
      this.id = data.id;
      this.commerceName = data.commerceName;
      this.proprietaireName = data.proprietaireName;
      this.adresse = data.adresse;
      this.telephone = data.telephone;
      this.email = data.email;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
