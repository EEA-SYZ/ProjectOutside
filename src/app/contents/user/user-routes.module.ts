import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAllComponent } from './user-all/user-all.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: 'all', component: UserAllComponent },
            { path: 'detail/:id', component: UserDetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
