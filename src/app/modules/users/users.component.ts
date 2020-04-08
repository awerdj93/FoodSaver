import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.load();
    console.log(this.users);
  }

  load() {
    this.userService.listUsers().subscribe((data)=> {
      this.users = data;
    });
  }

   delete(id: number) {
    

    if (window.confirm('Are you sure, you want to delete?')){
      this.userService.deleteUser(id).subscribe(data => {
        this.load();
      })
    }
  }  

}
