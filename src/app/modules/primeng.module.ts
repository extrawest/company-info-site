import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Don't import anything from 'primeng/primeng'. It require unused libraries which brake SSR (quill)

const primeNgModules: any[] = [
    ProgressSpinnerModule,
    PanelModule,
    TableModule,
    DropdownModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    ToastModule
];

@NgModule({
    providers: [MessageService],
    imports: primeNgModules,
    exports: primeNgModules
})
export class PrimengModule {}
