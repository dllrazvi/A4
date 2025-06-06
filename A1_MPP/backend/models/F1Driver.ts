export class F1Driver {
    static nextId: number = 1;

    public _id: number;
    public _name: string;
    public _team: string;
    public _age: number;

    constructor(name: string, team: string, age: number) {
        this._id = F1Driver.nextId++;
        this._name = name;
        this._team = team;
        this._age = age;
    }

    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get team(): string {
        return this._team;
    }
    get age(): number {
        return this._age;
    }

    set id(id: number) {
        this._id = id;
    }
    set name(name: string) {
        this._name = name;
    }
    set team(team: string) {
        this._team = team;
    }
    set age(age: number) {
        this._age = age;
    }

    public toString = (): string => {
        return 'F1 Driver: ' + this._name + ' Team: ' + this._team + ' Age: ' + this._age + '\n';
    }
}
