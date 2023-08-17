(function () {
    'use strict';

    var env = /** @class */ (function () {
        function env() {
        }
        env.GOTIFY_SERVER_URL = "push.wudge.pengin";
        // Live server
        env.GOTIFY_TOKEN = "AVEuQn2hbDMXx7p";
        return env;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
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
    }

    var ArtType;
    (function (ArtType) {
        ArtType[ArtType["Random"] = 0] = "Random";
        ArtType[ArtType["Cached"] = 1] = "Cached";
        ArtType[ArtType["Favorited"] = 2] = "Favorited";
        ArtType[ArtType["Videos"] = 3] = "Videos";
    })(ArtType || (ArtType = {}));

    var Api = /** @class */ (function () {
        function Api() {
        }
        var _a;
        _a = Api;
        Api.getArt = function (type) { return __awaiter(void 0, void 0, void 0, function () {
            var action;
            return __generator(_a, function (_b) {
                switch (type) {
                    case ArtType.Cached:
                        action = "randomArt";
                        break;
                    case ArtType.Favorited:
                        action = "favorites";
                        break;
                    case ArtType.Videos:
                        action = "video";
                        break;
                    case ArtType.Random:
                    default:
                        action = "randomNewArt";
                        break;
                }
                return [2 /*return*/, fetch("action.php?action=" + action).then(function (response) {
                        return response.json();
                    })];
            });
        }); };
        Api.deleteArt = function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_a, function (_b) {
                return [2 /*return*/, fetch("action.php?action=deleteArt&id=" + id)];
            });
        }); };
        Api.favoriteArt = function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_a, function (_b) {
                return [2 /*return*/, fetch("action.php?action=favorite&id=" + id).then(function (response) {
                        return response.json();
                    })];
            });
        }); };
        return Api;
    }());

    var DomElement = /** @class */ (function () {
        /* eslint-disable no-useless-escape */
        function DomElement(creationString) {
            var _this = this;
            this.elType = creationString.match(/^(\w)*/g);
            this.classes = creationString.match(/(?<!\[[^\]]*)\.(?![^\[]*\])([^\s\.\#\[]*)/g);
            this.id = creationString.match(/\#([^\s\.\[]*)/g);
            this.attributes = creationString.match(/\[([^\]]*)/g);
            if (this.elType) {
                this.el = document.createElement(this.elType[0]);
                if (this.classes && this.classes.length > 0) {
                    this.classes.forEach(function (className) {
                        _this.el.classList.add(className.replace(".", ""));
                    });
                }
                if (this.attributes && this.attributes.length > 0) {
                    this.attributes.forEach(function (attributeString) {
                        var attribute = attributeString.split("=");
                        if (attribute.length === 1) {
                            attribute.push("");
                        }
                        else {
                            var fullAttribute = attribute.length > 2
                                ? attribute.slice(1).join("=")
                                : attribute[1];
                            attribute[1] = fullAttribute.replace(/"/g, "");
                        }
                        attribute[0] = attribute[0].replace("[", "");
                        if (attribute[0] === "innerText") {
                            _this.el.innerText = attribute[1];
                        }
                        else {
                            _this.el.setAttribute(attribute[0], attribute[1]);
                        }
                    });
                }
                if (this.id && this.id.length === 1) {
                    this.el.id = this.id[0].replace("#", "");
                }
            }
        }
        DomElement.create = function (creationString) {
            return new DomElement(creationString).el;
        };
        return DomElement;
    }());

    var NotificationType;
    (function (NotificationType) {
        NotificationType["NEWART"] = "newArt";
        NotificationType["RANDOMART"] = "randomArt";
        NotificationType["CACHEDART"] = "cachedArt";
        NotificationType["FAVORITEDART"] = "favoritedArt";
        NotificationType["VIDEOS"] = "videos";
    })(NotificationType || (NotificationType = {}));
    var Main = /** @class */ (function () {
        function Main() {
            var _this = this;
            this.currentType = ArtType.Videos;
            this.switch = true;
            this.connectToSocket = function () {
                var socket = new WebSocket("wss://".concat(env.GOTIFY_SERVER_URL, "/stream?token=C8Xi7C5QAOEyKLW"));
                socket.addEventListener("message", function (event) {
                    if (event) {
                        var message = JSON.parse(event.data);
                        if (message.title === "client:command") {
                            switch (message.message) {
                                case "next":
                                    _this.randomSwitch();
                                    break;
                                case "delete":
                                    _this.deleteArt();
                                    break;
                                case "favorite":
                                    _this.favoriteArt();
                                    break;
                                case "type-random":
                                    _this.switchType(ArtType.Random);
                                    _this.switch = true;
                                    break;
                                case "type-cached":
                                    _this.switchType(ArtType.Cached);
                                    _this.switch = false;
                                    break;
                                case "type-favorited":
                                    _this.switchType(ArtType.Favorited);
                                    _this.switch = false;
                                    break;
                                case "type-videos":
                                    _this.switchType(ArtType.Videos);
                                    _this.switch = false;
                                    break;
                                case "refresh":
                                    window.location.reload();
                                    break;
                            }
                        }
                    }
                });
            };
            this.deleteArt = function () {
                if (_this.currentType !== ArtType.Videos) {
                    Api.deleteArt(_this.currentArt.id);
                    _this.randomSwitch();
                }
            };
            this.notify = function (type) {
                var notification = DomElement.create("div.notification.".concat(type));
                document.body.append(notification);
                setTimeout(function () { return notification.remove(); }, 3200);
            };
            this.setInterval = function () {
                if (_this.interval) {
                    clearInterval(_this.interval);
                }
                _this.interval = setInterval(function () {
                    _this.randomSwitch();
                }, 750000);
            };
            this.getNewArt = function (notify) {
                if (notify === void 0) { notify = false; }
                if (_this.currentType !== ArtType.Videos) {
                    if (notify) {
                        _this.notify(NotificationType.NEWART);
                    }
                    Api.getArt(_this.currentType).then(function (art) {
                        var _a;
                        if (art && art.id && art.id !== ((_a = _this.currentArt) === null || _a === void 0 ? void 0 : _a.id)) {
                            _this.currentArt = art;
                            _this.renderArt();
                        }
                    });
                }
                else {
                    Api.getArt(_this.currentType).then(function (video) {
                        _this.renderVideo(video);
                    });
                }
            };
            this.listenForInstructions = function () {
                _this.connectToSocket();
                document.body.addEventListener("keyup", function (e) {
                    switch (e.key) {
                        case "d":
                            _this.deleteArt();
                            break;
                        case "v":
                            _this.switchType(ArtType.Videos);
                            _this.switch = false;
                            break;
                        case "ArrowRight":
                            _this.randomSwitch();
                            break;
                        case "ArrowUp":
                            _this.switchType(ArtType.Cached);
                            _this.switch = false;
                            break;
                        case "ArrowDown":
                            _this.switchType(ArtType.Random);
                            _this.switch = true;
                            break;
                        case "ArrowLeft":
                            _this.switchType(ArtType.Favorited);
                            _this.switch = false;
                            break;
                        case "f":
                        case "Enter":
                            _this.favoriteArt();
                            break;
                    }
                });
            };
            this.favoriteArt = function () {
                if (_this.currentType !== ArtType.Videos) {
                    Api.favoriteArt(_this.currentArt.id).then(function (art) { });
                    var heart_1 = DomElement.create('span.heart[innerText="❤️"]');
                    document.body.append(heart_1);
                    setTimeout(function () { return heart_1.remove(); }, 4000);
                }
            };
            this.hideCurrentArt = function () {
                var artOnPage = document.querySelector(".frame");
                if (artOnPage) {
                    setTimeout(function () {
                        artOnPage === null || artOnPage === void 0 ? void 0 : artOnPage.remove();
                        artOnPage = null;
                    }, 4000);
                }
            };
            this.renderArt = function () {
                _this.hideCurrentArt();
                var frame = DomElement.create("div.frame");
                var mat = DomElement.create("div.mat");
                var art = DomElement.create("img.art[style=\"background-image:url(/images/".concat(_this.currentArt.id, ".jpg);\"]"));
                frame.append(mat);
                frame.append(art);
                document.body.append(frame);
                setTimeout(function () { return frame.classList.add("fade-in"); }, 2000);
            };
            this.renderVideo = function (videoResponse) {
                _this.hideCurrentArt();
                var frame = DomElement.create("div.frame.video");
                var mat = DomElement.create("div.mat");
                var container = DomElement.create("div.container");
                var video = DomElement.create("video[autoplay=true][loop=true][muted][src=\"/videos/".concat(videoResponse.video, "\"]"));
                video.muted = true;
                container.append(mat);
                container.append(video);
                frame.append(container);
                document.body.append(frame);
                setTimeout(function () { return frame.classList.add("fade-in"); }, 2000);
            };
            this.setInterval();
            this.getNewArt();
            this.listenForInstructions();
        }
        Main.prototype.randomSwitch = function () {
            if (this.switch) {
                this.setInterval();
                var randomNum = Math.floor(Math.random() * 4) + 1;
                switch (randomNum) {
                    case 1:
                        this.switchType(ArtType.Random);
                        break;
                    case 2:
                        this.switchType(ArtType.Cached);
                        break;
                    case 3:
                        this.switchType(ArtType.Favorited);
                        break;
                    case 4:
                        this.switchType(ArtType.Videos);
                        break;
                }
            }
        };
        Main.prototype.switchType = function (type) {
            this.currentType = type;
            switch (type) {
                case ArtType.Cached:
                    this.notify(NotificationType.CACHEDART);
                    break;
                case ArtType.Random:
                    this.notify(NotificationType.RANDOMART);
                    break;
                case ArtType.Favorited:
                    this.notify(NotificationType.FAVORITEDART);
                    break;
                case ArtType.Videos:
                    this.notify(NotificationType.VIDEOS);
                    break;
            }
            this.getNewArt();
        };
        return Main;
    }());
    new Main();

})();
