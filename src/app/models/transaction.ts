import * as moment from 'moment';
import * as _ from 'lodash';
import { Expose, Exclude, Transform, classToPlain, Type } from 'class-transformer';

export class Transaction {
    id: string;
    title: string;
    categoryId: string;
    category: string;
    @Transform((value) => moment(value).toISOString(), { toPlainOnly: true })
    date: moment.Moment;
    amount: number;

    constructor(json?: any) {
        if (json) {
            this.deserialize(json);
        }
    }

    /****************************************************************************
     * toInstance
     ****************************************************************************/
    static toInstance(json: any): Transaction {
        const obj = new Transaction();
        obj.deserialize(json);
        return obj;
    }

    /****************************************************************************
     * deserialize
     ****************************************************************************/
    deserialize(json: any) {
        this.id = _.defaultTo(json.id, '');
        this.title = _.defaultTo(json.title, 'n/a');
        this.categoryId = _.defaultTo(json.categoryId, 'n/a');
        this.category = _.defaultTo(json.category, 'n/a');
        this.date = _.defaultTo(moment(json.date), moment());
        this.amount = _.defaultTo(json.amount, 0);
    }

    /****************************************************************************
     * serialize
     ****************************************************************************/
    serialize(): any {
        return classToPlain(this);
    }
}
