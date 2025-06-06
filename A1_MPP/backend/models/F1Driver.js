"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1Driver = void 0;
var F1Driver = /** @class */ (function () {
    function F1Driver(name, team, age) {
        var _this = this;
        this.toString = function () {
            return 'F1 Driver: ' + _this._name + ' Team: ' + _this._team + ' Age: ' + _this._age + '\n';
        };
        this._id = F1Driver.nextId++;
        this._name = name;
        this._team = team;
        this._age = age;
    }
    Object.defineProperty(F1Driver.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(F1Driver.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(F1Driver.prototype, "team", {
        get: function () {
            return this._team;
        },
        set: function (team) {
            this._team = team;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(F1Driver.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (age) {
            this._age = age;
        },
        enumerable: false,
        configurable: true
    });
    F1Driver.nextId = 1;
    return F1Driver;
}());
exports.F1Driver = F1Driver;
