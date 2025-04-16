import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'http://localhost:8000/api/cart/';

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    const payload = {
      product_id: productId,
      quantity: quantity
    };
    return this.http.post(this.cartUrl, payload);
  }

  getCartItems(): Observable<any> {
    return this.http.get(this.cartUrl);
  }

  // Optional: remove item or clear cart methods can go here
}
