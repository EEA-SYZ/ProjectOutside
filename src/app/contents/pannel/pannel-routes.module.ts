import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PannelComponent } from './pannel.component';

const routes: Routes = [
    {
        path: 'pannel',
        children: [
            { path: '', component: PannelComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PannelRoutingModule { }
