import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpResult } from 'app/base/shared/model/http-result';
import { Page } from 'app/base/shared/model/page';
import { Permission } from 'app/base/shared/model/session';
import { SessionService } from 'app/base/shared/session.service';

@Injectable()
export class PannelService {
    // 获取统计数据
    getStatistics() : Observable<{}> {
        return new Observable(observer => {
            observer.next({
                "total_users": 50,
                "total_assessments": 120,
                "total_tasks": 200,
                'risk_summary': {
                    "high_risk_users": 5,
                    "medium_risk_users": 8,
                    "low_risk_users": 37,
                    "unresolved_warnings": 6,
                    "resolved_warnings": 10
                },
                'recent_activity' : {
                    "assessments_last_7_days": [5, 8, 10, 7, 9, 4, 6],
                    "warnings_last_7_days": [0, 1, 2, 1, 0, 0, 1]
                }
            });
        });
    }
};
