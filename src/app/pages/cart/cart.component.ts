import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  // ngOnInit(): void {
  //   this.cartService.getCartItems().subscribe({
  //     next: (data) => {
  //       this.cartItems = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data.items; // Access the `items` key in the cart object
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }
  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => {
      return total + +item.product.price * item.quantity;
    }, 0);
  }
  
  
}
