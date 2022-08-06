import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Commerce } from 'src/app/common/commerce';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { Ville } from 'src/app/common/ville';
import { CategorieService } from 'src/app/services/categorie.service';
import { VilleService } from 'src/app/services/ville.service';
import { CommerceService } from 'src/app/services/commerce.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CommerceDetailsComponent } from '../../Details/commerce-details/commerce-details.component';
import { MatTabBodyPortal } from '@angular/material/tabs';
import { ProductDetailsComponent } from '../../Details/product-details/product-details.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  villes!: Ville[];
  categories!: ProductCategory[];
  categorieId: number = 0;

  productsList: Product[] = [];
  pagedList: Product[] = [];
  breakpoint: number = 3;  //to adjust to screen
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];

  dataSourceOne: MatTableDataSource<Commerce>;
  displayedColumnsOne: string[] = ['id', 'commerceName', 'proprietaireName', 'adresse', 'telephone', 'Action'];
  @ViewChild('TableOnePaginator', { static: true }) tableOnePaginator!: MatPaginator;
  @ViewChild('TableOneSort', { static: true }) tableOneSort!: MatSort;

  dataSourceTwo: MatTableDataSource<Product>;
  displayedColumnsTwo: string[] = ['imageUrl', 'name', 'unitPrice', 'action'];
  @ViewChild('TableTwoPaginator', { static: true }) tableTwoPaginator!: MatPaginator;
  @ViewChild('TableTwoSort', { static: true }) tableTwoSort!: MatSort;

  constructor(
    private categorieService: CategorieService,
    private commerceService: CommerceService,
    private productService: ProductService,
    private villeService: VilleService,
    private dialog: MatDialog) {
    this.dataSourceOne = new MatTableDataSource<Commerce>();
    this.dataSourceTwo = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {

    this.listVilles();
    /* this.listCommercesByVilles(1);
    this.listCategoriesByCommerces(1);
    this.listProduitsByCategories(1); */


    //this.dataSourceOne.data = ELEMENT_DATA;
    this.dataSourceOne.paginator = this.tableOnePaginator;
    this.dataSourceOne.sort = this.tableOneSort;

    //this.dataSourceTwo.data = ELEMENT_DATA;
    this.dataSourceTwo.paginator = this.tableTwoPaginator;
    this.dataSourceTwo.sort = this.tableTwoSort;

  }

  listVilles() {
    console.log("je cherche toutes les villes ")
    this.villeService.getAllVilles().subscribe(
      data => {
        //console.log('Liste des Villes =' + JSON.stringify(data));
        this.villes = data;
      }
    );
  }

  listCommercesByVilles(arg0: number) {
    this.commerceService.getCommerceByVilleId(arg0).subscribe(
      data => {
        //console.log('Liste des commerces =' + JSON.stringify(data));
        this.dataSourceOne.data = data as Commerce[];
      }
    );
  }

  listCategoriesByCommerces(arg0: number) {
    this.categorieService.getCategoryByCommerceId(arg0).subscribe(
      data => {
        //console.log('Liste des Categories=' + JSON.stringify(data));
        this.categories = data;
        this.categorieId = data[0].id
        //console.log( this.categorieId = data[0].id);

      }
    );

  }

  listeCategoriesParCommerces(n: number): ProductCategory[] {
    var mydata!: ProductCategory[];
    this.categorieService.getCategoryByCommerceId(n).subscribe(
      data => {
        mydata = data;
      }

    );
    return mydata;
  }
  listProduitsByCategories(arg0: number) {
    this.productService.getProductByCategoryId(arg0).subscribe(
      data => {
        //console.log('Liste des Produits =' + JSON.stringify(data));
        this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
        this.productsList = data;
        this.pagedList = this.productsList.slice(0, 3);
        this.length = this.productsList.length;
        this.dataSourceTwo.data = data as Product[];
      }
    );
  }

  applyFilterOne(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceOne.paginator) {
      this.dataSourceOne.paginator.firstPage();
    }
  }

  applyFilterOne1(filterValue: string) {
    //console.log(+filterValue);
    this.listCommercesByVilles(+filterValue);
    this.listCategoriesByCommerces(-1);
    this.listProduitsByCategories(-1);
    //this.dataSourceOne.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceOne.paginator) {
      this.dataSourceOne.paginator.firstPage();
    }
  }

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    }
  }

  applyFilterTwo1(filterValue: string) {
    //console.log(+filterValue);
    //console.log('je suis passé ici');
    this.listProduitsByCategories(+filterValue);
    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    }

    /* this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    } */
  }

  onRowClicked(row: Commerce) {
    //console.log(row.id)
    this.listCategoriesByCommerces(row.id);
    this.listProduitsByCategories(-1);

  }
  onRowClicked1(row: Product) {

  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedList = this.productsList.slice(startIndex, endIndex);
  }

  onResize(event: any) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  addItemToCard(product: Product) {

  }

  openDialog(mydata: Commerce) {
    console.log(mydata.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '100px',
      'left': '500px'
    };
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
      commerceId: mydata.id
    };

    this.dialog.open(CommerceDetailsComponent, dialogConfig);
  }

  openDialog1(mydata:Product) {
    console.log(mydata.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '100px',
      'left': '500px'
    };
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
      productId: mydata.id
    };

    this.dialog.open(ProductDetailsComponent, dialogConfig);
  }


}
