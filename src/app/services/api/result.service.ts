import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from '../constant.service';
import { HttpWrapperService } from './http-wrapper.service';
import { BaseResponse } from '../../models/BaseResponse';
import {ListModelItem} from '../../models/listModel';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultService {

    constructor(private _http: HttpWrapperService, private CONSTANT: ConstantService) { }

    getAll(): Observable<ListModelItem[]> {
        const url = `${this.CONSTANT.BASE_URL}WercsExtracts`;
        return this._http.get(url);
    }
}
