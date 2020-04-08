import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/services';
import { PageState } from '../shared/model/page-state.model';
import { Product } from 'src/app/api/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public productData: Array<Product>;
  public products: Array<Product>;
  public types: Array<string>;
  public pageState: PageState = new PageState();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.types = new Array<string>();
    this.types.splice(0, 0, 'All');
    this.refresh();
  }

  refresh() {
    this.productService.listProducts().subscribe(data => {
      this.products = data;
      this.productData = data;
      this.pageState.collectionSize = data.length;
      this.types = data.map(data => data.type);
      this.types.splice(0, 0, 'All');
    });
  }

  onTypeClick(i: number) {
    let type = this.types[i];

    // this.productService.listProducts().subscribe(data => {
    //   this.products = data;
    //   this.productNum = data.length;
    // });
    let prods = []
    if (type === 'All') {
      prods = this.productData;
    } else {
      this.productData.forEach(element => {
        if (element.type === type) {
          prods.push(element);
        }
      });
    }
    
    this.products = prods;
    this.pageState.collectionSize = prods.length;
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
