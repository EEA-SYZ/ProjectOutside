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
    templateUrl: 'user-all.component.html',
    styleUrls: ['user-all.component.css']
})
export class UserAllComponent implements OnInit {
    index: number;           // 当前页码
    size: number;            // 每页显示的数量
    total: number;           // 总记录数
    pageCount: number = 1;   // 总页数
    list : any[] = [];       // 当前页面显示的用户列表
    constructor(
        private router: Router,
        private service: UserService,
    ) {}
    ngOnInit() {
        this.index = parseInt(document.getElementById('pageIndex').textContent)
        this.size = parseInt(document.getElementById('pageSize').textContent)
        this.service.getRecordNumber().subscribe(
            result => {
                this.total = result;
                this.updatePageCount();
                this.updateList();
            },
            error => {
                alert(error);
            }
        );
    }
    // 改变每页显示数量
    changePageSize(size: number) {
        this.size = size;
        this.updatePageCount();
        this.updateList();
    }
    // 翻页
    changePageIndex(delta: number) {
        this._jumpToPage(this.index + delta);
    }
    // 跳转到指定页
    jumpToPage() {
        var index = (document.getElementById("jumpToPage") as HTMLInputElement).value;
        if (index) {
            var intIndex = parseInt(index);
            if (intIndex < 1) intIndex = 1;
            if (intIndex > this.pageCount) intIndex = this.pageCount;
            this._jumpToPage(intIndex);
        } else {
            alert("请输入正确的页码");
        }
        (document.getElementById("jumpToPage") as HTMLInputElement).value = "";
    }
    // 查看用户详情
    detailOfUser(userId: number) {
        ;
    }
    _jumpToPage(index: number) {
        if (index < 1 || index > this.pageCount) return;
        this.index = index;
        document.getElementById('pageIndex').textContent = this.index.toString();
        this.updateList();
    }
    updateList() {
        this.service.getUsersList(this.index, this.size).subscribe(
            result => {
                this.list = result;
            },
            error => {
                alert(error);
            }
        );
    }
    updatePageCount() {
        this.pageCount = Math.ceil(this.total / this.size);
        if (this.index > this.pageCount) {
            this._jumpToPage(this.pageCount);
        }
    }
}

