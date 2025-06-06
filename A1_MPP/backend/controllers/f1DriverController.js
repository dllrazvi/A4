"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDriverRaceHistoryOccurrences = exports.generateRandomDriverRaceHistory = exports.deleteDriverRaceHistory = exports.updateDriverRaceHistory = exports.createDriverRaceHistory = exports.getDriverRaceHistoryById = exports.getAllDriverRaceHistory = exports.generateRandomF1Drivers = exports.deleteF1Driver = exports.updateF1Driver = exports.createF1Driver = exports.getF1DriverById = exports.getAllF1Drivers = exports.loginUser = exports.registerUser = exports.authenticateToken = void 0;
var jwt = require("jsonwebtoken");
var mongoose_1 = require("mongoose");
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, 'sorin', function (err, user) {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, existingUser, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, UserModel.findOne({ username: username })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Username already exists' })];
                }
                newUser = new UserModel({
                    username: username,
                    password: password,
                });
                // Save the user to the database
                return [4 /*yield*/, newUser.save()];
            case 3:
                // Save the user to the database
                _b.sent();
                res.status(201).json({ message: 'User registered successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserModel.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid username or password' })];
                }
                // Compare passwords
                if (user.password !== password) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid username or password' })];
                }
                token = jwt.sign({ userId: user._id }, 'sorin', { expiresIn: '1h' });
                // Send the token in the response
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
// Define MongoDB schema for F1Driver
var F1DriverSchema = new mongoose_1.default.Schema({
    DriverName: String,
    Team: String,
    Age: Number,
    UserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});
// Create Mongoose model for F1Driver
var F1DriverModel = mongoose_1.default.model('f1drivers', F1DriverSchema);
// Function to generate a random name
// Route handlers
var getAllF1Drivers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = _req.user) === null || _a === void 0 ? void 0 : _a.userId;
                return [4 /*yield*/, F1DriverModel.find({ UserId: userId })];
            case 1:
                result = _b.sent();
                console.log('Fetched F1 drivers:', result); // Log fetched data
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('Error fetching F1 drivers:', error_3); // Log error
                res.status(500).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllF1Drivers = getAllF1Drivers;
var getF1DriverById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, F1DriverModel.findById(id)];
            case 2:
                result = _a.sent();
                if (!result) {
                    res.status(404).json({ message: 'F1 driver not found' });
                }
                else {
                    res.status(200).json(result);
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getF1DriverById = getF1DriverById;
var createF1Driver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, DriverName, Team, Age, newDriver, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, DriverName = _a.DriverName, Team = _a.Team, Age = _a.Age;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, F1DriverModel.create({ DriverName: DriverName, Team: Team, Age: Age })];
            case 2:
                newDriver = _b.sent();
                res.status(201).json(newDriver);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                res.status(500).json({ message: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createF1Driver = createF1Driver;
var updateF1Driver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, DriverName, Team, Age, updatedDriver, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, DriverName = _a.DriverName, Team = _a.Team, Age = _a.Age;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, F1DriverModel.findByIdAndUpdate(id, { DriverName: DriverName, Team: Team, Age: Age }, { new: true })];
            case 2:
                updatedDriver = _b.sent();
                if (!updatedDriver) {
                    res.status(404).json({ message: 'F1 driver not found' });
                }
                else {
                    res.status(200).json(updatedDriver);
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                res.status(500).json({ message: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateF1Driver = updateF1Driver;
var deleteF1Driver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedDriver, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, F1DriverModel.findByIdAndDelete(id)];
            case 2:
                deletedDriver = _a.sent();
                if (!deletedDriver) {
                    res.status(404).json({ message: 'F1 driver not found' });
                }
                else {
                    res.status(204).end();
                }
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).json({ message: error_7.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteF1Driver = deleteF1Driver;
var generateRandomF1Drivers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var number, numberOfDrivers, drivers, createdDrivers, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                number = req.params.number;
                numberOfDrivers = parseInt(number);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                drivers = Array.from({ length: numberOfDrivers }, function () { return ({
                    DriverName: generateRandomName(),
                    Team: generateRandomTeam(),
                    Age: generateRandomAge()
                }); });
                return [4 /*yield*/, F1DriverModel.create(drivers)];
            case 2:
                createdDrivers = _a.sent();
                res.status(201).json(createdDrivers);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                res.status(500).json({ message: error_8.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateRandomF1Drivers = generateRandomF1Drivers;
// Define MongoDB schema for DriverRaceHistory
// Define MongoDB schema for DriverRaceHistory
var DriverRaceHistorySchema = new mongoose_1.default.Schema({
    DriverId: mongoose_1.default.Types.ObjectId,
    DriverName: String,
    RaceName: String,
    Position: Number,
    Points: Number,
    UserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});
// Create Mongoose model for DriverRaceHistory
var DriverRaceHistoryModel = mongoose_1.default.model('driverracehistories', DriverRaceHistorySchema);
// Route handlers
var getAllDriverRaceHistory = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DriverRaceHistoryModel.find()];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ message: error_9.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllDriverRaceHistory = getAllDriverRaceHistory;
var getDriverRaceHistoryById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, DriverRaceHistoryModel.findById(id)];
            case 2:
                result = _a.sent();
                if (!result) {
                    res.status(404).json({ message: 'Driver race history not found' });
                }
                else {
                    res.status(200).json(result);
                }
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                res.status(500).json({ message: error_10.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDriverRaceHistoryById = getDriverRaceHistoryById;
var createDriverRaceHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, DriverId, DriverName, RaceName, Position, Points, newRaceHistory, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, DriverId = _a.DriverId, DriverName = _a.DriverName, RaceName = _a.RaceName, Position = _a.Position, Points = _a.Points;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, DriverRaceHistoryModel.create({ DriverId: DriverId, DriverName: DriverName, RaceName: RaceName, Position: Position, Points: Points })];
            case 2:
                newRaceHistory = _b.sent();
                res.status(201).json(newRaceHistory);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                res.status(500).json({ message: error_11.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createDriverRaceHistory = createDriverRaceHistory;
var updateDriverRaceHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, DriverId, DriverName, RaceName, Position, Points, updatedRaceHistory, error_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, DriverId = _a.DriverId, DriverName = _a.DriverName, RaceName = _a.RaceName, Position = _a.Position, Points = _a.Points;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, DriverRaceHistoryModel.findByIdAndUpdate(id, { DriverId: DriverId, DriverName: DriverName, RaceName: RaceName, Position: Position, Points: Points }, { new: true })];
            case 2:
                updatedRaceHistory = _b.sent();
                if (!updatedRaceHistory) {
                    res.status(404).json({ message: 'Driver race history not found' });
                }
                else {
                    res.status(200).json(updatedRaceHistory);
                }
                return [3 /*break*/, 4];
            case 3:
                error_12 = _b.sent();
                res.status(500).json({ message: error_12.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateDriverRaceHistory = updateDriverRaceHistory;
var deleteDriverRaceHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedRaceHistory, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, DriverRaceHistoryModel.findByIdAndDelete(id)];
            case 2:
                deletedRaceHistory = _a.sent();
                if (!deletedRaceHistory) {
                    res.status(404).json({ message: 'Driver race history not found' });
                }
                else {
                    res.status(204).end();
                }
                return [3 /*break*/, 4];
            case 3:
                error_13 = _a.sent();
                res.status(500).json({ message: error_13.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteDriverRaceHistory = deleteDriverRaceHistory;
var generateRandomDriverRaceHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var number, numberOfEntries, raceHistoryEntries, createdEntries, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                number = req.params.number;
                numberOfEntries = parseInt(number);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                raceHistoryEntries = Array.from({ length: numberOfEntries }, function () { return ({
                    DriverId: new mongoose_1.default.Types.ObjectId(), // Create a new ObjectId for DriverId
                    DriverName: generateRandomName(),
                    RaceName: generateRandomRaceName(),
                    Position: generateRandomPosition(),
                    Points: generateRandomPoints()
                }); });
                return [4 /*yield*/, DriverRaceHistoryModel.create(raceHistoryEntries)];
            case 2:
                createdEntries = _a.sent();
                res.status(201).json(createdEntries);
                return [3 /*break*/, 4];
            case 3:
                error_14 = _a.sent();
                res.status(500).json({ message: error_14.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateRandomDriverRaceHistory = generateRandomDriverRaceHistory;
var generateRandomName = function () {
    var names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    var surnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    var randomOptions = ['John', 'Jane', 'Michael', 'Emma', 'Oliver', 'Sophia', 'Liam', 'Ava', 'Noah', 'Isabella'];
    var randomIndex = Math.floor(Math.random() * 3); // Random index to choose between options
    var randomName;
    var randomSurname;
    if (randomIndex === 0) {
        // Generate a random name from the names array
        randomName = names[Math.floor(Math.random() * names.length)];
        randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    }
    else if (randomIndex === 1) {
        // Generate a random name from the surnames array
        randomName = surnames[Math.floor(Math.random() * surnames.length)];
        randomSurname = names[Math.floor(Math.random() * names.length)];
    }
    else {
        // Generate a random string
        var randomString = Math.random().toString(36).substring(7);
        randomName = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        randomSurname = randomString.charAt(0).toUpperCase() + randomString.slice(1);
    }
    return "".concat(randomName, " ").concat(randomSurname);
};
var countDriverRaceHistoryOccurrences = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var driverOccurrences, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DriverRaceHistoryModel.aggregate([
                        {
                            $group: {
                                _id: "$DriverId",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $lookup: {
                                from: "f1drivers",
                                localField: "_id",
                                foreignField: "_id",
                                as: "driver"
                            }
                        },
                        {
                            $unwind: "$driver"
                        },
                        {
                            $project: {
                                driverName: "$driver.DriverName",
                                count: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 1:
                driverOccurrences = _a.sent();
                res.status(200).json(driverOccurrences);
                return [3 /*break*/, 3];
            case 2:
                error_15 = _a.sent();
                res.status(500).json({ error: "Error counting occurrences: ".concat(error_15.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.countDriverRaceHistoryOccurrences = countDriverRaceHistoryOccurrences;
// Function to generate a random team
var generateRandomTeam = function () {
    var teams = ['Mercedes', 'Ferrari', 'Red Bull Racing', 'McLaren', 'Alpine', 'Aston Martin', 'Alfa Romeo Racing', 'AlphaTauri', 'Williams', 'Haas'];
    var randomTeamIndex = Math.floor(Math.random() * teams.length);
    return teams[randomTeamIndex];
};
// Function to generate a random age
var generateRandomAge = function () {
    return Math.floor(Math.random() * 28) + 18;
};
// Function to generate a random race name
// Function to generate a random race name
var generateRandomRaceName = function () {
    var races = ['Australian Grand Prix', 'Bahrain Grand Prix', 'Chinese Grand Prix', 'Azerbaijan Grand Prix', 'Spanish Grand Prix', 'Monaco Grand Prix', 'Canadian Grand Prix', 'French Grand Prix', 'Austrian Grand Prix', 'British Grand Prix'];
    var randomIndex = Math.floor(Math.random() * races.length);
    return races[randomIndex];
};
// Function to generate a random position
var generateRandomPosition = function () {
    return Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
};
// Function to generate random points
var generateRandomPoints = function () {
    return Math.floor(Math.random() * 25) + 1; // Random number between 1 and 25
};
