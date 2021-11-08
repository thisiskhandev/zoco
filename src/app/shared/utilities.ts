import { Environment } from './../../environments/environment';
import { PhotoGalleryModel } from '@commons/photo-gallery/shared/photo-gallery-model';

export class Utilities {

    onlyNumberErrorText = 'Only numeric caracters';
    invalidEmailErrorText= 'Provide a valid email';
    placeHolderText: string = 'Select an Option';
    placeHolderDash: string = '- -';
    static nullString: string = 'null';
    public emptyString: string = '';
    static trueString: string = 'true';
    static falseString: string = 'false';
    static urlRouteSeparator: string = '/';
    static emptyLengthString: string = '0';
    static postMethod: string = 'POST';
    static putMethod : string= 'PUT';
    static zero: number = 0;
    static first: number = 1;
    emptyLength: number = 0;
    one: number = 1;
    two: number = 2;

    public static log(...args: any[]): void {
        if(Environment.production !== true) {
            console.log(args);
        }
    }
}