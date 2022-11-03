import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/auth.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: User | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.authState$
    .subscribe(user => {
      this.user = user;
    })
  }

  change() {
    this.authService.setAuthState({
      ...this.user as User,
      name: 'NICO'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
