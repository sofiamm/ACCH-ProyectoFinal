import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        CommonModule
    ]
})
export class HeaderComponent implements OnInit {
    user: Usuario | null = null;
    userTmp: Usuario | null = null;
    name: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private usuarioService: UsuarioService
    ) { }

    logout() {
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/inicio']); // Redirigir al home
            })
            .catch(error => {
                console.error(error);
            });
    }

    private async loadUserData(): Promise<void> {
        try {
            if (localStorage !== null) {
                this.user = JSON.parse(localStorage.getItem('usuario') || '');
                if (this.user!.id) {
                    this.userTmp = await this.usuarioService.getUserId(this.user!.id);
                    this.name = this.userTmp?.nombre || null;
                }
            }
        } catch (error) {
            console.log();
        }
    }

    async ngOnInit(): Promise<void> {
        await this.loadUserData();
    }
}
