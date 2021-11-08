
import { MatTableDataSource } from '@angular/material/table';
import { Utilities } from '@shared/utilities';

export abstract class CategoryList {
    dataSource:  MatTableDataSource <any>;
    utilities: Utilities;
    
    constructor() {
        this.utilities = new Utilities();
    }  

    abstract delete(number, string) : void;

}
