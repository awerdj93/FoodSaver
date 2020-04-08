import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
  @Input() product: Product;
  
  constructor(private router: Router) {
    console.log(this.product);
  }

  ngOnInit(): void {
  }

  viewProduct() {
    this.router.navigateByUrl('/product/'+ this.product.id);
  }
}
