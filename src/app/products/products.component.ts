import { ShoppingCart } from './../models/shopping-cart';

import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';


import 'rxjs/add/operator/switchMap';
import {  Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  
  category;
  filteredProducts : Product[]=[];

  cart$ : Observable<ShoppingCart>;

  constructor( private route : ActivatedRoute ,
               private productService : ProductService,
               private shoppingCartService : ShoppingCartService 
              ) {
   
  }

  async ngOnInit()
  {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
   
  }

  private populateProducts()
  {
    this.productService.getAll().switchMap( p =>
      {
              this.products = p ;
              return this.route.queryParamMap;
      })
              .subscribe( params =>
              {
                this.category = params.get('category');
                this.applyFilter();
              }); 

  }

  private applyFilter()
  {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category ) : 
    this.products;
  }
  

}
