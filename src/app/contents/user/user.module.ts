import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserRoutingModule } from './user-routes.module';
import { UserService } from './user.service';
import { UserAllComponent } from './user-all/user-all.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        UserRoutingModule
    ],
    declarations: [
        UserAllComponent,
        UserDetailComponent,
    ],
    exports: [],
    entryComponents: [],
    providers: [UserService]
})
export class User { }
