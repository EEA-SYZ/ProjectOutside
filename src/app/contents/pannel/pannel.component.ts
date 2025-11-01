import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Session } from 'app/base/shared/model/session';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'app/base/shared/form-util';

import { PannelService } from './pannel.service';
import { r } from '@angular/core/src/render3';

@Component({
    moduleId: module.id,
    templateUrl: 'pannel.component.html',
    styleUrls: ['pannel.component.css']
})
export class PannelComponent implements OnInit, OnDestroy {
    data : {} = {
        "total_users": 0,
        "total_assessments": 0,
        "total_tasks": 0,
        'risk_summary': {
            "high_risk_users": 0,
            "medium_risk_users": 0,
            "low_risk_users": 0,
            "unresolved_warnings": 0,
            "resolved_warnings": 0
        },
        'recent_activity' : {
            "assessments_last_7_days": [0, 0, 0, 0, 0, 0, 0],
            "warnings_last_7_days": [0, 0, 0, 0, 0, 0, 0]
        }
    };
    constructor(
        private router: Router,
        private service: PannelService,
    ) {}

    ngOnInit() {
        this.service.getStatistics().subscribe(
            data => {
               this.data = data;
            },
            error => {
                alert(error);
            }
        );
        this.updateChart();
    }

    updateChart() {
        this.drawRiskDistributionChart();
        this.drawNewAssessmentsChart();
        this.drawNewAlertsChart();
    }

    drawRiskDistributionChart() {
        // 风险分布数据
        const riskData = [
            { value: this.data['risk_summary']['high_risk_users'], label: '高风险用户', color: '#f44336' }, // 高风险
            { value: this.data['risk_summary']['medium_risk_users'], label: '中风险用户', color: '#ff9800' }, // 中风险
            { value: this.data['risk_summary']['low_risk_users'], label: '低风险用户', color: '#4CAF50' }  // 低风险
        ];

        // 获取SVG容器
        const riskSvg = document.getElementById('risk-distribution-chart');
        const svgWidth = 400;
        const svgHeight = 300;
        const centerX = svgWidth / 2;
        const centerY = svgHeight / 2;
        const radius = Math.min(centerX, centerY) - 30; // 饼图半径
        const hoverRadius = radius + 10; // 悬停时的半径

        // 计算总价值和每个扇形的角度
        const total = riskData.reduce((sum, item) => sum + item.value, 0);
        let startAngle = 0;

        // 创建提示框
        const tooltip = document.createElement('div');
        tooltip.style.position = 'fixed'; // 改为fixed定位，相对于视口
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        tooltip.style.zIndex = '1000';
        tooltip.style.maxWidth = '200px';
        tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(tooltip);

        // 当前悬停的扇形数据
        let currentSector = null;

        // 添加鼠标移动事件监听 - 使提示框跟随鼠标
        const handleMouseMove = (e: MouseEvent) => {
            if (currentSector) {
                // 使用clientX和clientY，因为提示框是fixed定位
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY + 10}px`;
            }
        };

        // 添加鼠标移动事件
        document.addEventListener('mousemove', handleMouseMove);

        riskData.forEach(item => {
            // 计算当前扇形的角度（弧度）
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            // 计算扇形的起点和终点坐标
            const startX = centerX + radius * Math.sin(startAngle);
            const startY = centerY - radius * Math.cos(startAngle);
            const endX = centerX + radius * Math.sin(startAngle + sliceAngle);
            const endY = centerY - radius * Math.cos(startAngle + sliceAngle);
            
            // 判断是否为大扇形（用于SVG路径的弧线标记）
            const isLargeArc = sliceAngle > Math.PI ? 1 : 0;
            
            // 创建扇形路径
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', [
                `M ${centerX} ${centerY}`, // 从中心开始
                `L ${startX} ${startY}`,   // 连接到起点
                `A ${radius} ${radius} 0 ${isLargeArc} 1 ${endX} ${endY}`, // 绘制弧线
                'Z' // 闭合路径
            ].join(' '));
            path.setAttribute('fill', item.color);
            path.setAttribute('stroke', '#fff');
            path.setAttribute('stroke-width', '2');
            path.style.transition = 'transform 0.3s ease';
            path.style.cursor = 'pointer';
            
            // 添加悬停效果
            path.addEventListener('mouseenter', (e: MouseEvent) => {
                // 计算扇形中心位置
                const midAngle = startAngle + sliceAngle / 2;
                const offsetX = Math.sin(midAngle) * 10;
                const offsetY = -Math.cos(midAngle) * 10;
                
                // 扇形弹起效果
                path.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                
                // 显示提示框
                const percent = Math.round((item.value / total) * 100);
                tooltip.innerHTML = `
                    <div class="font-bold">${item.label}</div>
                    <div>数量: ${item.value}</div>
                    <div>占比: ${percent}%</div>
                `;
                
                // 更新当前悬停的扇形
                currentSector = item;
                
                // 使用clientX和clientY设置初始位置
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY + 10}px`;
                tooltip.style.opacity = '1';
            });
            
            path.addEventListener('mouseleave', () => {
                // 恢复扇形位置
                path.style.transform = 'translate(0, 0)';
                
                // 隐藏提示框
                tooltip.style.opacity = '0';
                currentSector = null;
            });
            
            // 添加到SVG容器
            riskSvg.appendChild(path);
            
            // 更新起始角度
            startAngle += sliceAngle;
        });

        // 组件销毁时清理事件监听
        const originalNgOnDestroy = this.ngOnDestroy;
        this.ngOnDestroy = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
            if (originalNgOnDestroy) {
                originalNgOnDestroy.call(this);
            }
        };
    }

    drawNewAssessmentsChart() {
        this.drawLineChart(
            this.getLast7Days(), 
            this.data['recent_activity']['assessments_last_7_days'], 'new-assessments-chart', 
            '#4285f4'
        );
    }

    drawNewAlertsChart() {
        this.drawLineChart(
            this.getLast7Days(), 
            this.data['recent_activity']['warnings_last_7_days'], 'new-alerts-chart', 
            '#f44336'
        );
    }

    drawLineChart(days: string[], values: number[], elementId: string, color: string) {
        // 获取新增预警数的SVG容器
        const alertsSvg = document.getElementById(elementId);
        const chartWidth = 600;
        const chartHeight = 250;
        const padding = { top: 30, right: 30, bottom: 40, left: 50 }; // 边距
        const plotWidth = chartWidth - padding.left - padding.right;
        const plotHeight = chartHeight - padding.top - padding.bottom;
        
        // 计算X轴和Y轴比例尺
        const xScale = plotWidth / (days.length - 1); // X轴每个点的间隔
        const maxAlertsValue = Math.max(...values) || 1; // 最大值用于Y轴缩放，避免除以0
        const yScale = plotHeight / maxAlertsValue;

        // 绘制X轴
        const alertsXAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        alertsXAxis.setAttribute('x1', padding.left.toString());
        alertsXAxis.setAttribute('y1', (padding.top + plotHeight).toString());
        alertsXAxis.setAttribute('x2', (padding.left + plotWidth).toString());
        alertsXAxis.setAttribute('y2', (padding.top + plotHeight).toString());
        alertsXAxis.setAttribute('stroke', '#ccc');
        alertsSvg.appendChild(alertsXAxis);

        // 绘制Y轴
        const alertsYAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        alertsYAxis.setAttribute('x1', padding.left.toString());
        alertsYAxis.setAttribute('y1', padding.top.toString());
        alertsYAxis.setAttribute('x2', padding.left.toString());
        alertsYAxis.setAttribute('y2', (padding.top + plotHeight).toString());
        alertsYAxis.setAttribute('stroke', '#ccc');
        alertsSvg.appendChild(alertsYAxis);

        // 添加Y轴刻度和标签
        const yTicks = 5; // Y轴刻度数量
        for (let i = 0; i <= yTicks; i++) {
            const y = padding.top + plotHeight - (i / yTicks) * plotHeight;
            const value = Math.round((i / yTicks) * maxAlertsValue);
            
            // 绘制刻度线
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', (padding.left - 5).toString());
            tick.setAttribute('y1', y.toString());
            tick.setAttribute('x2', padding.left.toString());
            tick.setAttribute('y2', y.toString());
            tick.setAttribute('stroke', '#ccc');
            alertsSvg.appendChild(tick);
            
            // 绘制刻度标签
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', (padding.left - 10).toString());
            label.setAttribute('y', (y + 4).toString());
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#666');
            label.textContent = value.toString();
            alertsSvg.appendChild(label);
        }

        // 创建提示框
        const tooltip = document.createElement('div');
        tooltip.style.position = 'fixed'; // 改为fixed定位
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        tooltip.style.zIndex = '1000';
        tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(tooltip);

        // 当前悬停的数据点索引
        let currentPointIndex = -1;
        let points = []; // 存储所有数据点信息

        // 添加鼠标移动事件监听 - 支持在数据点附近触发
        const handleMouseMove = (e: MouseEvent) => {
            if (currentPointIndex >= 0) {
                // 更新提示框位置
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY + 10}px`;
                
                // 更新提示框内容
                const point = points[currentPointIndex];
                tooltip.innerHTML = `
                    <div class="font-bold">${days[point.index]}</div>
                    <div>预警数: ${point.value}</div>
                `;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        // 绘制折线和数据点
        let alertsPathData = '';
        values.forEach((value, index) => {
            const x = padding.left + index * xScale;
            const y = padding.top + plotHeight - value * yScale; // 反转Y轴（让数值向上增长）

            // 存储点信息
            points.push({ x, y, value, index });

            // 构建折线路径
            if (index === 0) {
                alertsPathData = `M ${x} ${y}`; // 起点
            } else {
                alertsPathData += ` L ${x} ${y}`; // 连线
            }

            // 绘制数据点
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', x.toString());
            point.setAttribute('cy', y.toString());
            point.setAttribute('r', '4');
            point.setAttribute('fill', color); // 预警数用红色系
            point.style.transition = 'r 0.3s';
            
            // 绘制交互区域（不可见的大圆形）- 增大半径至40
            const interactionArea = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            interactionArea.setAttribute('cx', x.toString());
            interactionArea.setAttribute('cy', y.toString());
            interactionArea.setAttribute('r', '40'); // 增大交互区域至40px
            interactionArea.setAttribute('fill', 'transparent');
            interactionArea.style.cursor = 'pointer';
            
            // 添加交互区域悬停效果
            interactionArea.addEventListener('mouseenter', (e: MouseEvent) => {
                // 更新当前悬停的点索引
                currentPointIndex = index;
                
                // 数据点放大效果
                point.setAttribute('r', '6');
                
                // 显示提示框
                tooltip.innerHTML = `
                    <div class="font-bold">${days[index]}</div>
                    <div>预警数: ${value}</div>
                `;
                
                // 设置初始位置
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY + 10}px`;
                tooltip.style.opacity = '1';
            });
            
            interactionArea.addEventListener('mouseleave', () => {
                // 恢复数据点大小
                point.setAttribute('r', '4');
                
                // 隐藏提示框
                tooltip.style.opacity = '0';
                currentPointIndex = -1;
            });

            // 添加到SVG容器（先添加数据点，再添加交互区域，确保交互区域在顶层）
            alertsSvg.appendChild(point);
            alertsSvg.appendChild(interactionArea);

            // 绘制X轴日期标签（与测评数图表日期保持一致）
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x.toString());
            label.setAttribute('y', (padding.top + plotHeight + 20).toString());
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#666');
            label.textContent = days[index];
            alertsSvg.appendChild(label);
        });

        // 添加折线
        const alertsLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        alertsLine.setAttribute('d', alertsPathData);
        alertsLine.setAttribute('fill', 'none');
        alertsLine.setAttribute('stroke', color); // 折线颜色与数据点一致
        alertsLine.setAttribute('stroke-width', '2');
        // 确保折线在数据点和交互区域之间
        alertsSvg.insertBefore(alertsLine, alertsSvg.lastChild);

        // 组件销毁时清理事件监听
        const originalNgOnDestroy = this.ngOnDestroy;
        this.ngOnDestroy = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
            if (originalNgOnDestroy) {
                originalNgOnDestroy.call(this);
            }
        };
    }

    getLast7Days(): string[] {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            const day = date.getDate().toString();
            const month = (date.getMonth() + 1).toString();
            const year = date.getFullYear().toString();
            days.push(`${month}/${day}`);
        }
        return days;
    }

    ngOnDestroy(): void {
        ;
    }
}

