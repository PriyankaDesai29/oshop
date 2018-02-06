import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent  {

  @Input('category') category;

  categories$;
  constructor( categoryService : CategoryService) { 
    this.categories$ = categoryService.getAll();
    
  }

  
}
