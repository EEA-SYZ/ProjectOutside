import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpResult } from 'app/base/shared/model/http-result';
import { Page } from 'app/base/shared/model/page';
import { Permission } from 'app/base/shared/model/session';
import { SessionService } from 'app/base/shared/session.service';

@Injectable()
export class TaskRecordService {
    // 获取总记录数
    getRecordNumber() : Observable<number> {
        return new Observable<number>(observer => {
            observer.next(this.getList().length);
        });
    }
    // 获取分页信息
    getRecordsList(page: number, size: number): Observable<any[]> {
        return new Observable<any[]>(observer => {
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
        const res = [
            {
                "id": 21,
                "task_ date": "2025-09-10 09:00:00",
                "location": "宁江区居民楼火灾",
                "severity": "一般",
                "duration": 45,
            },
            {
                "id": 25,
                "task_ date": "2025-10-20 14:30:00",
                "location": "江南区仓库火灾现场",
                "severity": "较高",
                "duration": 120,
            },
            {
                "id": 29,
                "task_ date": "2025-11-15 12:00:00",
                'location': '北京',
                "severity": "紧急",
                "duration": 30,
            },
            {
                "id": 33,
                "task_ date": "2025-12-25 18:30:00",
                'location': '上海',
                "severity": "一般",
                "duration": 60,
            },
            {
                "id": 37,
                "task_ date": "2026-01-10 10:00:00",
                'location': '深圳',
                "severity": "较低",
                "duration": 90,
            },
            {
                "id": 41,
                "task_ date": "2026-02-15 16:30:00",
                'location': '广州',
                "severity": "一般",
                "duration": 15,
            },
            {
                "id": 45,
                "task_ date": "2026-03-25 12:00:00",
                'location': '成都',
                "severity": "紧急",
                "duration": 180,
            },
            {
                "id": 49,
                "task_ date": "2026-04-10 18:30:00",
                'location': '南昌',
                "severity": "一般",
                "duration": 240,
            },
            {
                "id": 53,
                "task_ date": "2026-05-20 14:00:00",
                'location': '天津',
                "severity": "较高",
                "duration": 120,
            },
            {
                "id": 57,
                "task_ date": "2026-06-15 10:30:00",
                'location': '武汉',
                "severity": "一般",
                "duration": 30,
            },
            {
                "id": 61,
                "task_ date": "2026-07-25 16:00:00",
                'location': '西安',
                "severity": "紧急",
                "duration": 60,
            },
            {
                "id": 65,
                "task_ date": "2026-08-10 12:30:00",
                'location': '苏州',
                "severity": "一般",
                "duration": 90,
            },
            {
                "id": 69,
                "task_ date": "2026-09-20 18:00:00",
                'location': '杭州',
                "severity": "较低",
                "duration": 15,
            },
            {
                "id": 73,
                "task_ date": "2026-10-15 14:30:00",
                'location': '南京',
                "severity": "一般",
                "duration": 180,
            },
            {
                "id": 77,
                "task_ date": "2026-11-25 10:00:00",
                'location': '济宁',
                "severity": "紧急",
                "duration": 240,
            },
            {
                "id": 81,
                "task_ date": "2026-12-10 16:30:00",
                'location': '郑州',
                "severity": "一般",
                "duration": 30,
            },
            {
                "id": 85,
                "task_ date": "2027-01-20 12:00:00",
                'location': '长沙',
                "severity": "较高",
                "duration": 60,
            },
            {
                "id": 89,
                "task_ date": "2027-02-15 18:30:00",
                'location': '合肥',
                "severity": "一般",
                "duration": 90,
            },
            {
                "id": 93,
                "task_ date": "2027-03-25 14:00:00",
                'location': '福州',
                "severity": "紧急",
                "duration": 15,
            },
            {
                "id": 97,
                "task_ date": "2027-04-10 10:30:00",
                'location': '厦门',
                "severity": "一般",
                "duration": 180,
            },
            {
                "id": 101,
                "task_ date": "2027-05-20 16:00:00",
                'location': '济南',
                "severity": "较低",
                "duration": 240,
            },
            {
                "id": 105,
                "task_ date": "2027-06-15 12:30:00",
                'location': '青岛',
                "severity": "一般",
                "duration": 30,
            },
            {
                "id": 109,
                "task_ date": "2027-07-25 18:00:00",
                'location': '沈阳',
                "severity": "紧急",
                "duration": 60,
            },
            {
                "id": 113,
                "task_ date": "2027-08-10 14:30:00",
                'location': '大连',
                "severity": "一般",
                "duration": 90,
            },
            {
                "id": 117,
                "task_ date": "2027-09-20 10:00:00",
                'location': '石家庄',
                "severity": "较高",
                "duration": 15,
            },
            {
                "id": 121,
                "task_ date": "2027-10-15 16:30:00",
                'location': '哈尔滨',
                "severity": "一般",
                "duration": 180,
            },
            {
                "id": 125,
                "task_ date": "2027-11-25 12:00:00",
                'location': '长春',
                "severity": "紧急",
                "duration": 240,
            },
        ];
        return res;
    }
};
