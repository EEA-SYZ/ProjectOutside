import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Session } from 'app/base/shared/model/session';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'app/base/shared/form-util';

import { TaskRecordService } from '../taskRecord.service';
import { r } from '@angular/core/src/render3';

@Component({
    moduleId: module.id,
    templateUrl: 'taskRecord-all.component.html',
    styleUrls: ['taskRecord-all.component.css']
})
export class TaskRecordAllComponent implements OnInit {
    list: any[];
    constructor(
        private router: Router,
        private service: TaskRecordService,
    ) {}
    ngOnInit() {
        this.service.getTaskRecordList(1, 1).subscribe((res) => {
            this.list = res.data["tasks"];
        });
    }
}

