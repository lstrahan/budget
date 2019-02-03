import * as moment from 'moment';
import * as _ from 'lodash';
import { Expose, Exclude, Transform, classToPlain, Type } from 'class-transformer';

export class Category {
    id: string;
    name: string;
    type: string;

    constructor(json?: any) {
        if (json) {
            this.deserialize(json);
        }
    }

    /****************************************************************************
     * toInstance
     ****************************************************************************/
    static toInstance(json: any): Category {
        const obj = new Category();
        obj.deserialize(json);
        return obj;
    }

    /****************************************************************************
     * deserialize
     ****************************************************************************/
    deserialize(json: any) {
        this.id = _.defaultTo(json.id, '');
        this.name = _.defaultTo(json.name, 'n/a');
        this.type = _.defaultTo(json.type, 'n/a');
    }

    /****************************************************************************
     * serialize
     ****************************************************************************/
    serialize(): any {
        return classToPlain(this);
    }
}
