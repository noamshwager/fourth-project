import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dialog-example',
    templateUrl: './dialog-example.component.html',
    styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

    public quantity: number;
    public isLegal: string;

    constructor() {
        this.quantity = 1;
    }

    ngOnInit(): void {
    }
    public validate() {//validation
        if (JSON.stringify(this.quantity).indexOf(".") !== -1 || this.quantity === null) {
            this.isLegal = "no";
        }
        else {
            this.isLegal = "yes";
        }
    }

}
