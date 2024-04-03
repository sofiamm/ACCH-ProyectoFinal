import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from '../footer/footer.component';
import { ContentPageComponent } from "../../content-page/content-page.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        FooterComponent,
        ContentPageComponent,
        MatMenuModule
    ]
})
export class HeaderComponent {

}
