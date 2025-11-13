import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Session } from 'app/base/shared/model/session';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'app/base/shared/form-util';

import { TaskRecordService } from '../taskRecord.service';
import { r } from '@angular/core/src/render3';

import { ListManager } from 'app/base/shared/model/list-manager';

@Component({
    moduleId: module.id,
    templateUrl: 'taskRecord-all.component.html',
    styleUrls: ['taskRecord-all.component.css']
})
export class TaskRecordAllComponent implements OnInit {
    listManager = new ListManager();
    constructor(
        private router: Router,
        private service: TaskRecordService,
    ) {}
    ngOnInit() {
        this.listManager._setTarget(document.getElementById('jumpToPage') as HTMLInputElement);
        this.listManager.changeSize(parseInt(document.getElementById('pageSize').textContent));
        this.listManager.setUpdate((maneger) => {
            this.service.getRecordNumber().subscribe(
                result => {
                    maneger.setTotal(result);
                },
                error => {
                    alert(error);
                }
            );
            this.service.getRecordsList(maneger.index, maneger.size).subscribe(
                result => {
                    maneger.setList(result);
                },
                error => {
                    alert(error);
                }
            );
        });
    }
    // 查看任务记录详情
    detailOfRecord(recordId: number) {
        this.router.navigate(['/frame/taskRecord/detail', recordId]);
    }
}

