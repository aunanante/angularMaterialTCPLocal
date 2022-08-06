import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProduitComponent } from '../../products/produit/produit.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id = 0;
  imageUrl = "";
  name = "";
  description ="";
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.productId
  }

  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe(data => {
      this.id = data.id;
      this.imageUrl = data.imageUrl;
      this.name = data.name;
      this.description = data.description;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
