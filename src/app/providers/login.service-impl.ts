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
            var invalid = false; // EEA TODO: check loginData.login and loginData.password
            var userCode = '001', userName = '管理员', token = '1234567890'; // EEA TODO: get userCode, userName, token from server
            if (invalid) {
                observer.error('用户名或密码错误');
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
                    path: '/Pannel',
                    icon: 'home',
                    subMenus: []
                },
                {
                    title: '火场任务记录',
                    path: 'taskRecord',
                    subMenus: [
                        { title: '所有记录', path: '/taskRecord/all' }
                    ]
                },
                {
                    title: '基本资料',
                    path: '',
                    subMenus: [
                        { title: '角色', path: '/basic/role', icon: 'user', subMenus: [] },
                        { title: '员工', path: '/basic/user', subMenus: [] },
                        { title: '分队', path: '/basic/team', subMenus: [] },
                        { title: '近期心理健康报告', path: '/basic/report', subMenus: [] },
                    ]
                },
                /*{
                    title: '心理健康测评',
                    path: '',
                    icon: 'home',
                    subMenus: [
                        { title: '心理健康一键测评', path: '/test/directly', subMenus: [] },
                        { title: '心理健康测评报告', path: '/test/report', subMenus: [] },
                        { title: '心理健康测评问卷添加', path: '/test/add', subMenus: [] },
                        { title: '火场压力报告', path: '/test/reportOffire', subMenus: [] },
                    ]
                },
                {
                    title: '训练情况',
                    path: '',
                    subMenus: [
                        { title: '训练情况报告', path: '/training/report', subMenus: [] },
                        { title: '训练情况录入', path: '/training/import', subMenus: [] },
                        { title: '心理训练计划', path: '/training/plan', subMenus: [] },
                        { title: '分队情况汇总', path: '/training/team', subMenus: [] },
                        { title: '分队人员变动配置', path: '/training/memberManagement', subMenus: [] },
                    ]
                },
                {
                    title: '火场情况',
                    path: '',
                    subMenus: [
                        { title: '火场查询', path: '/fire/query', subMenus: [] },
                        { title: '火场数据手动录入', path: '/fire/import', subMenus: [] },
                        { title: '火场心理情况报告', path: '/fire/report', subMenus: [] },
                        { title: '火场心理状态风险评估', path: '/fire/risk', subMenus: [] },
                        { title: '场后心理防控建议', path: '/fire/advice', subMenus: [] },
                        { title: '场前岗位变动建议', path: '/fire/adviceOnManagement', subMenus: [] },
                    ]
                }*/
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
