"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var LoginComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _userInput_decorators;
    var _userInput_initializers = [];
    var _passInput_decorators;
    var _passInput_initializers = [];
    var LoginComponent = _classThis = /** @class */ (function () {
        function LoginComponent_1(formBuilder, route, router, authenticationService) {
            this.formBuilder = (__runInitializers(this, _instanceExtraInitializers), formBuilder);
            this.route = route;
            this.router = router;
            this.authenticationService = authenticationService;
            this.userInput = __runInitializers(this, _userInput_initializers, void 0);
            this.passInput = __runInitializers(this, _passInput_initializers, void 0);
            this.loading = false;
            this.submitted = false;
            // redirect to home if already logged in
            if (this.authenticationService.user$) {
                this.router.navigate(['/']);
            }
        }
        LoginComponent_1.prototype.ngOnInit = function () {
            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        };
        Object.defineProperty(LoginComponent_1.prototype, "f", {
            // convenience getter for easy access to form fields
            get: function () { return this.loginForm.controls; },
            enumerable: false,
            configurable: true
        });
        LoginComponent_1.prototype.onSubmit = function () {
            var _this = this;
            this.submitted = true;
            var inputValue0 = this.userInput.nativeElement.value;
            var inputValue1 = this.passInput.nativeElement.value;
            this.loading = true;
            this.authenticationService.login(inputValue0, inputValue1)
                .pipe((0, operators_1.first)())
                .subscribe(function (data) {
                _this.router.navigate([_this.returnUrl]);
            }, function (error) {
                _this.loading = false;
            });
        };
        return LoginComponent_1;
    }());
    __setFunctionName(_classThis, "LoginComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userInput_decorators = [(0, core_1.ViewChild)('userInput', { static: false })];
        _passInput_decorators = [(0, core_1.ViewChild)('passInput', { static: false })];
        __esDecorate(null, null, _userInput_decorators, { kind: "field", name: "userInput", static: false, private: false, access: { has: function (obj) { return "userInput" in obj; }, get: function (obj) { return obj.userInput; }, set: function (obj, value) { obj.userInput = value; } }, metadata: _metadata }, _userInput_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _passInput_decorators, { kind: "field", name: "passInput", static: false, private: false, access: { has: function (obj) { return "passInput" in obj; }, get: function (obj) { return obj.passInput; }, set: function (obj, value) { obj.passInput = value; } }, metadata: _metadata }, _passInput_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
}();
exports.LoginComponent = LoginComponent;
