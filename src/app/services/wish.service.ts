import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { wishes } from 'src/models/wish-properties';

@Injectable({
    providedIn: 'root'
})
export class WishService{

  constructor(private http: HttpClient) { }

  getAllWishes()
  {
    this.http.get('https://localhost:7298/api/MyWish') 
  }
  addWishes(wishes: wishes[])
  {
    const httpOptions = {
        //Posting data in Json format
        headers: new HttpHeaders ({
            "Content-Type": "application/json"
        })
    }
    return this.http.post('https://localhost:7298/api/MyWish', wishes, httpOptions)
  }

}