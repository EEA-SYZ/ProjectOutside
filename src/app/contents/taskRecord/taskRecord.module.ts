import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { TaskRecordRoutingModule } from './taskRecord-routes.module';
import { TaskRecordService } from './taskRecord.service';
import { TaskRecordAllComponent } from './taskRecord-all/taskRecord-all.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        TaskRecordRoutingModule
    ],
    declarations: [
        TaskRecordAllComponent,
    ],
    exports: [],
    entryComponents: [],
    providers: [TaskRecordService]
})
export class TaskRecord { }
