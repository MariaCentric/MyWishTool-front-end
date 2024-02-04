import { HttpClient } from '@angular/common/http';
import {OnInit} from '@angular/core';


export class WishService implements OnInit{
  public Id: Int32List;
  public ChangeId: String;
  public ShortDescription: String;
  public ShortName: String;
  public CreationDate: Date; 
  public LasUpdatedDate: Date;


  constructor(private http: HttpClient) { }

  getAllWishes()
  {
    this.http.get('https://localhost:7298/api/MyWish')
  }

  ngOnInit(){

  }
}
