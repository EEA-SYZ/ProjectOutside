import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskRecordAllComponent } from './taskRecord-all/taskRecord-all.component';
import { TaskRecordDetailComponent } from './taskRecord-detail/taskRecord-detail.component';

const routes: Routes = [
    {
        path: 'taskRecord',
        children: [
            { path: 'all', component: TaskRecordAllComponent },
            { path: 'detail/:id', component: TaskRecordDetailComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRecordRoutingModule { }
