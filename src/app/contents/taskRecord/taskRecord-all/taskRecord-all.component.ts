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
    index: number;                 // 当前页码
    size: number;                  // 每页显示的数量
    total: number;                 // 总记录数
    pageCount: number = 1;         // 总页数
    list : any[] = [];             // 当前页面显示的任务记录列表
    constructor(
        private router: Router,
        private service: TaskRecordService,
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
    // 查看任务记录详情
    detailOfRecord(recordId: number) {
        this.router.navigate(['/frame/taskRecord/detail', recordId]);
    }
    _jumpToPage(index: number) {
        if (index < 1 || index > this.pageCount) return;
        this.index = index;
        document.getElementById('pageIndex').textContent = this.index.toString();
        this.updateList();
    }
    updateList() {
        this.service.getRecordsList(this.index, this.size).subscribe(
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

