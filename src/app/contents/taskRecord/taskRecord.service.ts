import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpResult } from 'app/base/shared/model/http-result';
import { Page } from 'app/base/shared/model/page';
import { Permission } from 'app/base/shared/model/session';
import { SessionService } from 'app/base/shared/session.service';

@Injectable()
export class TaskRecordService {
    getTaskRecordList(pageNumber: number, pageSize: number): Observable<HttpResult<any>> {
        return new Observable<HttpResult<any>>((observer) => {
            var res = {
                "tasks": [
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
                    }
                ]
            }; // EEA TODO: get data from server
            observer.next(new HttpResult<any>(200, 'success', res));
        });
    }
};
