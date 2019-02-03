export class Category {
    id: string;
    title: string;

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
        this.id = _.defaultTo(json.id, 'n/a');
        this.title = _.defaultTo(json.title, 'n/a');
    }

    /****************************************************************************
     * serialize
     ****************************************************************************/
    serialize(): any {
        return classToPlain(this);
    }
}
