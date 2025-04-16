import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';



@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(
      res => {
        console.log('Added to cart!', res);
      },
      err => {
        console.error('Failed to add to cart', err);
      }
    );
  }
}
