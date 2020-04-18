import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/services';
import { PageState } from '../shared/model/page-state.model';
import { Product } from 'src/app/api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public productData: Array<Product>;
  public products: Array<Product>;
  public categories: Array<string>;
  public pageState: PageState = new PageState();

  constructor(private productService: ProductService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.categories = new Array<string>();
    this.categories.splice(0, 0, 'All');
    this.refresh();
  }

  refresh() {
    this.productService.listProducts().subscribe((data: Array<Product>) => {
      this.products = data;
      this.productData = data;
      if (this.products) {
        this.pageState.collectionSize = this.products.length;
        this.categories = data.map(i => i.category);
      } else {
        this.pageState.collectionSize = 0;
      }
      this.categories.splice(0, 0, 'All');
    });
  }

  onTypeClick(i: number) {
    let category = this.categories[i];

    // this.productService.listProducts().subscribe(data => {
    //   this.products = data;
    //   this.productNum = data.length;
    // });
    let prods = []
    if (category === 'All') {
      prods = this.productData;
    } else {
      this.productData.forEach(element => {
        if (element.category === category) {
          prods.push(element);
        }
      });
    }
    
    this.products = prods;
    if (this.products) {
     // this.pageState.collectionSize = this.products.length;
    } else {
      this.pageState.collectionSize = 0;
    }
  }
  
  viewProduct(id: number) {
    this.router.navigateByUrl('/product/'+ id);
  }

  onPage(event: number) {
    this.pageState.page = event;
    this.refresh();
  }

  onPageSize(event: number) {
    this.pageState.pageSize = event;
    this.refresh();
  }
}
