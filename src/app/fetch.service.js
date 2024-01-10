"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var FetchService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FetchService = _classThis = /** @class */ (function () {
        function FetchService_1(http, router) {
            this.http = http;
            this.router = router;
            this.token = '';
            this.timer = null;
            this._user = new rxjs_1.BehaviorSubject(null);
            this.user$ = this._user.asObservable();
        }
        FetchService_1.prototype.getTable = function () {
            var url = 'https://localhost:7237/api/Pivot/PivotShow';
            var reqHeader = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(this.token)
            });
            var options = {
                headers: reqHeader,
            };
            return this.http.get(url, options);
        };
        FetchService_1.prototype.login = function (username, password) {
            var _this = this;
            return this.http
                .post('https://localhost:7237/api/user/login', { username: username, password: password })
                .pipe((0, operators_1.map)(function (x) {
                _this._user.next({
                    username: x.username,
                    role: x.role,
                    originalUserName: x.originalUserName,
                });
                _this.token = x.accessToken;
                _this.startTokenTimer();
                return x;
            }));
        };
        FetchService_1.prototype.logout = function () {
            var _this = this;
            this.http
                .post('https://localhost:7237/api/user/logout', {})
                .pipe((0, operators_1.finalize)(function () {
                _this._user.next(null);
                _this.stopTokenTimer();
                _this.router.navigate(['login']);
            }))
                .subscribe();
        };
        FetchService_1.prototype.stopTokenTimer = function () {
            var _a;
            (_a = this.timer) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        FetchService_1.prototype.getTokenRemainingTime = function () {
            var accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                return 0;
            }
            var jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
            var expires = new Date(jwtToken.exp * 1000);
            return expires.getTime() - Date.now();
        };
        FetchService_1.prototype.refreshToken = function () {
            var refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                return (0, rxjs_1.of)(null);
            }
        };
        FetchService_1.prototype.startTokenTimer = function () {
            var _this = this;
            var timeout = this.getTokenRemainingTime();
            this.timer = (0, rxjs_1.of)(true)
                .pipe((0, operators_1.delay)(timeout), (0, operators_1.tap)({
                next: function () { return _this.refreshToken().subscribe(); },
            }))
                .subscribe();
        };
        return FetchService_1;
    }());
    __setFunctionName(_classThis, "FetchService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FetchService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FetchService = _classThis;
}();
exports.FetchService = FetchService;
