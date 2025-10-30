import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PannelRoutingModule } from './pannel-routes.module';
import { PannelService } from './pannel.service';
import { PannelComponent } from './pannel.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PannelRoutingModule,
    ],
    declarations: [
        PannelComponent,
    ],
    exports: [],
    entryComponents: [],
    providers: [PannelService]
})
export class Pannel { }
