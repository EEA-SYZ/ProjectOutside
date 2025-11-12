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
    templateUrl: 'taskRecord-detail.component.html',
    styleUrls: ['taskRecord-detail.component.css']
})
export class TaskRecordDetailComponent implements OnInit {
    data: {} = {
        'id': null,
        'task_date': null,
        'location': null,
        'description': null,
        'severity': null,
        'casualties': null,
        'duration': null,
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: TaskRecordService,
    ) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.getDetail(params['id']);
        });
    }
    backToList(): void {
        this.router.navigate(['/frame/taskRecord/all']);
    }
    getDetail(id: number): void {
        this.service.getDetail(id).subscribe(
            (data: any) => {
                this.data = data;
            },
            (error: any) => {
                alert(error);
            }
        );
    }
}

