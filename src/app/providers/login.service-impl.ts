import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoginService } from 'app/base/login/login.service';
import { Session } from 'app/base/shared/model/session';
import { HttpResult } from 'app/base/shared/model/http-result';

@Injectable()
export class LoginServiceImpl implements LoginService {

    login(loginData: { login: string; password: string; }): Observable<Session> {
        return new Observable(observer => {
            var demo = this.getDemoSession();
            var invalid = loginData.password !== '123456';
            var role = loginData.login;
            var userCode = '001', userName = '管理员', token = '1234567890';
            if (invalid) {
                observer.error('用户名或密码错误');
            }
            if (role !== 'admin') {
                observer.error('非管理员用户不允许登录后台');
            }
            demo.userCode = userCode;
            demo.userName = userName;
            demo.token = token;
            observer.next(demo);
        });
    }

    logout(token: string): Observable<any> {
        return new Observable(observer => {
            observer.next(null);
        });
    }

    changePassword(data: { token: string; oldPassword: string; newPassword: string; }): Observable<any> {
        return new Observable(observer => {
            observer.next(null);
        });
    }

    private getDemoSession(): Session {
        const result: Session = {
            userCode: null,
            userName: null,
            token: null,
            menus: [
                {
                    title: '控制台',
                    path: '/pannel',
                    icon: 'home',
                    subMenus: []
                },
                {
                    title: '用户管理',
                    path: '',
                    subMenus: [
                        { title: '所有用户', path: '/user/all' }
                    ]
                },
                {
                    title: '火场任务记录',
                    path: '',
                    subMenus: [
                        { title: '所有记录', path: '/taskRecord/all' },
                        { title: '添加记录', path: '/taskRecord/add' }
                    ]
                },
                {
                    title: '风险预警管理',
                    path: '',
                    subMenus: [
                        { title: '所有预警', path: '/riskWarning/all' },
                        { title: '待处理', path: '/riskWarning/wait' }
                    ]
                },
            ],
            permissions: [
                { code: '/role/view', name: '角色查看权' },
                { code: '/role/create', name: '角色新建权' },
                { code: '/role/edit', name: '角色编辑权' },
                { code: '/role/delete', name: '角色删除权' },

                { code: '/user/view', name: '用户查看权' },
                { code: '/user/create', name: '用户新建权' },
                { code: '/user/edit', name: '用户编辑权' },
                { code: '/user/delete', name: '用户删除权' },
                { code: '/user/resetPwd', name: '重置密码权' }
            ]
        };
        return result;
    }
}
