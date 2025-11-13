import { take } from "rxjs/operator/take";

export class ListManager {
    update: (manager: ListManager)=>void = ()=>{}; // 刷新页面的回调函数    
    total: number = 0;             // 总记录数
    list : any[] = [];             // 当前页面显示的记录列表
    _pageCount: number = 1;

    _target: HTMLInputElement;

    index: number = 1;             // 当前页码
    size: number = 1;              // 每页显示的数量
    
    setUpdate(func: (manager: ListManager)=>void) {
        this.update = func;
        func(this);
    }
    setTotal(total: number) {
        this.total = total;
        this._updatePageCount();
    }
    setList(list: any[]) {
        this.list = list;
    }
    _updatePageCount() {
        this._pageCount = Math.max(Math.ceil(this.total / this.size), 1);
        if (this.index > this._pageCount) this.turnToPage(this._pageCount);
        if (this.index < 1) this.turnToPage(1);
    }

    _setTarget(target: HTMLInputElement) {
        this._target = target;
    }
    _turnToPage() {
        var index = this._target.value;
        if (index) {
            var intIndex = parseInt(index);
            this.turnToPage(intIndex);
        } else {
            alert("请输入正确的页码");
        }
        this._target.value = "";
    }

    turnToPage(target: number) {
        if (target < 1) target = 1;
        if (target > this._pageCount) target = this._pageCount;
        this.index = target;
        this.update(this);
    }
    turnPage(delta: number) {
        this.turnToPage(this.index + delta);
    }
    changeSize(size: number) {
        this.size = size;
        this._updatePageCount();
        this.update(this);
    }
};


