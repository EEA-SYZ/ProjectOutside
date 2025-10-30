import { Component, Input, OnInit } from '@angular/core';
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
export class PannelComponent implements OnInit {
    constructor(
        private router: Router,
        private service: PannelService,
    ) {}
    ngOnInit() {
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
            { value: 328, label: '高风险用户', color: '#f44336' }, // 高风险
            { value: 845, label: '中风险用户', color: '#ff9800' }, // 中风险
            { value: 1257, label: '低风险用户', color: '#4CAF50' }  // 低风险
        ];

        // 获取SVG容器
        const riskSvg = document.getElementById('risk-distribution-chart');
        const svgWidth = 400;
        const svgHeight = 300;
        const centerX = svgWidth / 2;
        const centerY = svgHeight / 2;
        const radius = Math.min(centerX, centerY) - 30; // 饼图半径

        // 计算总价值和每个扇形的角度
        const total = riskData.reduce((sum, item) => sum + item.value, 0);
        let startAngle = 0;

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
            
            // 添加到SVG容器
            riskSvg.appendChild(path);
            
            // 更新起始角度
            startAngle += sliceAngle;
        });
    }
    drawNewAssessmentsChart() {
        // 近7天新增测评数数据（示例）
        const assessmentsData = {
            days: ['10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '10/30'],
            values: [120, 150, 130, 180, 160, 200, 190]
        };

        // 获取SVG容器
        const assessmentsSvg = document.getElementById('new-assessments-chart');
        const chartWidth = 600;
        const chartHeight = 250;
        const padding = { top: 30, right: 30, bottom: 40, left: 50 };
        const plotWidth = chartWidth - padding.left - padding.right;
        const plotHeight = chartHeight - padding.top - padding.bottom;

        // 计算X轴和Y轴的比例尺
        const xScale = plotWidth / (assessmentsData.days.length - 1);
        const maxValue = Math.max(...assessmentsData.values);
        const yScale = plotHeight / maxValue;

        // 绘制X轴和Y轴
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', padding.left.toString());
        xAxis.setAttribute('y1', padding.top + plotHeight.toString());
        xAxis.setAttribute('x2', padding.left + plotWidth.toString());
        xAxis.setAttribute('y2', padding.top + plotHeight.toString());
        xAxis.setAttribute('stroke', '#ccc');
        assessmentsSvg.appendChild(xAxis);

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', padding.left.toString());
        yAxis.setAttribute('y1', padding.top.toString());
        yAxis.setAttribute('x2', padding.left.toString());
        yAxis.setAttribute('y2', (padding.top + plotHeight).toString());
        yAxis.setAttribute('stroke', '#ccc');
        assessmentsSvg.appendChild(yAxis);

        // 绘制折线
        let pathData = '';
        assessmentsData.values.forEach((value, index) => {
            const x = padding.left + index * xScale;
            const y = padding.top + plotHeight - value * yScale; // Y轴向下为正，需要反转
            
            // 记录折线路径
            if (index === 0) {
                pathData = `M ${x} ${y}`; // 起点
            } else {
                pathData += ` L ${x} ${y}`; // 连线
            }
            
            // 绘制数据点
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', x.toString());
            point.setAttribute('cy', y.toString());
            point.setAttribute('r', '4');
            point.setAttribute('fill', '#4285f4');
            assessmentsSvg.appendChild(point);
            
            // 绘制X轴标签（日期）
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x.toString());
            label.setAttribute('y', (padding.top + plotHeight + 20).toString());
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#666');
            label.textContent = assessmentsData.days[index];
            assessmentsSvg.appendChild(label);
        });

        // 添加折线路径
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', pathData);
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', '#4285f4');
        line.setAttribute('stroke-width', '2');
        assessmentsSvg.appendChild(line);
    }
    drawNewAlertsChart() {
        // 近7天新增预警数数据（示例数据，可根据实际情况修改）
        const alertsData = {
            days: ['10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '10/30'], // 日期与测评数保持一致
            values: [45, 38, 52, 40, 65, 58, 42] // 每天的新增预警数
        };

        // 获取新增预警数的SVG容器
        const alertsSvg = document.getElementById('new-alerts-chart');
        const chartWidth = 600;
        const chartHeight = 250;
        const padding = { top: 30, right: 30, bottom: 40, left: 50 }; // 边距（与测评数图表保持一致）
        const plotWidth = chartWidth - padding.left - padding.right;
        const plotHeight = chartHeight - padding.top - padding.bottom;

        // 计算X轴和Y轴比例尺
        const xScale = plotWidth / (alertsData.days.length - 1); // X轴每个点的间隔
        const maxAlertsValue = Math.max(...alertsData.values); // 最大值用于Y轴缩放
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

        // 绘制折线和数据点
        let alertsPathData = '';
        alertsData.values.forEach((value, index) => {
            const x = padding.left + index * xScale;
            const y = padding.top + plotHeight - value * yScale; // 反转Y轴（让数值向上增长）

            // 构建折线路径
            if (index === 0) {
                alertsPathData = `M ${x} ${y}`; // 起点
            } else {
                alertsPathData += ` L ${x} ${y}`; // 连线
            }

            // 绘制数据点（使用不同颜色区分预警数和测评数）
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', x.toString());
            point.setAttribute('cy', y.toString());
            point.setAttribute('r', '4');
            point.setAttribute('fill', '#f44336'); // 预警数用红色系（与风险预警颜色呼应）
            alertsSvg.appendChild(point);

            // 绘制X轴日期标签（与测评数图表日期保持一致）
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x.toString());
            label.setAttribute('y', (padding.top + plotHeight + 20).toString());
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#666');
            label.textContent = alertsData.days[index];
            alertsSvg.appendChild(label);
        });

        // 添加折线
        const alertsLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        alertsLine.setAttribute('d', alertsPathData);
        alertsLine.setAttribute('fill', 'none');
        alertsLine.setAttribute('stroke', '#f44336'); // 折线颜色与数据点一致
        alertsLine.setAttribute('stroke-width', '2');
        alertsSvg.appendChild(alertsLine);
    }
}

