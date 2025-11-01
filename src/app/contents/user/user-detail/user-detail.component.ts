import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Session } from 'app/base/shared/model/session';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'app/base/shared/form-util';

import { UserService } from '../user.service';
import { r } from '@angular/core/src/render3';
import { User } from '../user.module';

@Component({
    moduleId: module.id,
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    data: {} = {
        'user': {
            'id': null,
            'username': null,
            'role': null,
            'email': null,
            'created_at': null
        },
        'assessments': [],
        'task_records': [],
        'active_warnings': [],
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: UserService,
    ) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.getDatailInfomation(params['id']);
        });
    }
    // 返回上一级
    backToList() {
        this.router.navigate(['/frame/user/all']);
    }
    getDatailInfomation(id: number) {
        this.service.getUserDatail(id).subscribe(
            (data: any) => {
                this.data = data;
            },
            (error: any) => {
                alert(error);
            }
        );
    }
}

