import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule
    ]
})
export class HeaderComponent {
    name = this.getUser();

    constructor(private authService: AuthService, private router: Router) { }

    logout() {
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/inicio']); // Redirigir al home
            })
            .catch(error => {
                console.error(error);
            });
    }

    getUser() {
        var name = this.authService.getCurrentUser()?.displayName;
        if (name == null || undefined) {
            name = this.authService.getCurrentUser()?.email;
        } else {
            name = this.authService.getCurrentUser()?.displayName;
        }
        return name;
    }
}
