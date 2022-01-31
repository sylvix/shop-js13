import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const productData: ProductData = this.form.value;
    this.productsService.createProduct(productData).subscribe(() => {
      void this.router.navigate(['/']);
    });
  }
}
