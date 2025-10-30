import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpResult } from 'app/base/shared/model/http-result';
import { Page } from 'app/base/shared/model/page';
import { Permission } from 'app/base/shared/model/session';
import { SessionService } from 'app/base/shared/session.service';

@Injectable()
export class UserService {
    // 获取总记录数
    getRecordNumber() : Observable<number> {
        return new Observable<number>(observer => {
            observer.next(this.getList().length);
        });
    }
    // 获取分页信息
    getUsersList(page: number, size: number): Observable<any> {
        return new Observable<any>(observer => {
            var begin = (page - 1) * size;
            var end = begin + size;
            var res = [];
            for (var i = begin; i < end; i++) {
                if (i < this.getList().length) {
                    res.push(this.getList()[i]);
                }
            }
            observer.next(res);
        });
    }
    private getList() : any[] {
        const list = [
            {
                'id': 1,
                'username': '管理员',
                'role': 'admin',
                'email': null,
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 2,
                'username': '张三',
                'role': 'user',
                'email': 'zhangsan@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 3,
                'username': '李四',
                'role': 'user',
                'email': 'lisi@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 4,
                'username': '王五',
                'role': 'user',
                'email': 'wangwu@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 5,
                'username': '赵六',
                'role': 'user',
                'email': 'zhaoliu@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 6,
                'username': '田七',
                'role': 'user',
                'email': 'tianqi@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 7,
                'username': '周八',
                'role': 'user',
                'email': 'zhouba@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 8,
                'username': '吴九',
                'role': 'user',
                'email': 'wujiu@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 9,
                'username': '郑十',
                'role': 'user',
                'email': 'zhengshi@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 10,
                'username': 'Peter',
                'role': 'user',
                'email': 'peter@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 11,
                'username': 'John',
                'role': 'user',
                'email': 'john@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 12,
                'username': 'Mary',
                'role': 'user',
                'email': 'mary@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 13,
                'username': 'Tom',
                'role': 'user',
                'email': 'tom@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 14,
                'username': 'Lily',
                'role': 'user',
                'email': 'lily@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 15,
                'username': 'Jane',
                'role': 'user',
                'email': 'jane@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
            {
                'id': 16,
                'username': 'Jack',
                'role': 'user',
                'email': 'jack@123.com',
                'created_at': '2025-10-29 11:51:00'
            },
        ];
        return list;
    }
};
