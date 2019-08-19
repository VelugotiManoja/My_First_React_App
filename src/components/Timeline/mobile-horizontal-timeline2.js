var $ = require('jquery');
module.exports = function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 21)
}([function(e, t, n) {
    e.exports = n(19)()
}, function(e, t) {
    e.exports = require("react")
}, function(e, t) {
    e.exports = require("radium")
}, function(e, t, n) {
    "use strict";
    e.exports = {
        LEFT: "left",
        RIGHT: "right",
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        UP_KEY: 38,
        DOWN_KEY: 40,
        DAY: 864e5,
        MIN_TIMELINE_WIDTH: 750,
        MIN_EVENT_PADDING: 20,
        MAX_EVENT_PADDING: 120,
        DATE_WIDTH: 85,
        TIMELINE_PADDING: 100,
        KEYMAP: {
            37: "left",
            39: "right"
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        o = !0,
                        r = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                    } catch (e) {
                        r = !0, i = e
                    } finally {
                        try {
                            !o && s.return && s.return()
                        } finally {
                            if (r) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        r = t.daydiff = function(e, t) {
            return Math.round(t - e)
        },
        i = t.zip = function(e) {
            return e[0].map(function(t, n) {
                return e.map(function(e) {
                    return e[n]
                })
            })
        },
        a = t.dateDistanceExtremes = function(e) {
            var t = i([e.slice(0, -1), e.slice(1)]).map(function(e) {
                var t = o(e, 2),
                    n = t[0],
                    i = t[1];
                return r(n, i)
            });
            return {
                min: Math.min.apply(null, t),
                max: Math.max.apply(null, t)
            }
        };
    t.cummulativeSeperation = function(e, t, n, o, i) {
        var s = new Array(e.length);
        s[0] = i;
        for (var l = a(e), u = l.max - l.min, d = o - n, c = 1; c < s.length; c += 1) {
            var f = r(e[c - 1], e[c]),
                p = 0 === u ? o : Math.round((f - l.min) * d / u + n);
            s[c] = s[c - 1] + t + p
        }
        return s
    }
}, function(e, t) {
    e.exports = require("react-motion")
}, function(e, t) {
    e.exports = require("react-icons/lib/fa/angle-right")
}, function(e, t) {
    e.exports = require("react-icons/lib/fa/angle-left")
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = l(n(1)),
        r = (l(n(0)), l(n(2))),
        i = l(n(3)),
        a = l(n(7)),
        s = l(n(6));

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var d = function(e) {
            return {
                position: "absolute",
                top: "49px",
                bottom: "auto",
                transform: "translateY(-50%)",
                height: 34,
                width: 34,
                borderRadius: "50%",
                border: "2px solid " + e.outline,
                overflow: "hidden",
                textIndent: "100%",
                whiteSpace: "nowrap",
                transition: "border-color 0.3s"
            }
        },
        c = function(e, t) {
            return {
                position: "absolute",
                left: 0,
                top: "50%",
                bottom: "auto",
                transform: "translateY(-50%)",
                height: 20,
                width: 29,
                overflow: "hidden",
                textIndent: "100%",
                whiteSpace: "nowrap",
                fill: t ? e.foreground : e.outline
            }
        },
        f = function(e) {
            return {
                color: e.outline,
                cursor: "not-allowed",
                ":hover": {
                    border: "2px solid " + e.outline
                }
            }
        },
        p = function(e) {
            return {
                cursor: "pointer",
                ":hover": {
                    border: "2px solid " + e.foreground,
                    color: e.foreground
                }
            }
        };
    t.default = (0, r.default)(function(e) {
        var t = Math.round(e.position) < 0,
            n = Math.round(e.position) > Math.round(e.maxPosition);
        d(e.styles);
        return o.default.createElement("ul", {
            className: "buttons"
        }, o.default.createElement("li", {
            className: "button-back " + (t ? "enabled" : "disabled"),
            key: i.default.LEFT,
            onClick: function() {
                return e.updateSlide(i.default.LEFT)
            },
            style: [d(e.styles), t ? p(e.styles) : f(e.styles), u({}, i.default.LEFT, 0)]
        }, o.default.createElement(a.default, {
            style: c(e.styles, t)
        })), o.default.createElement("li", {
            className: "button-forward " + (n ? "enabled" : "disabled"),
            key: i.default.RIGHT,
            onClick: function() {
                return e.updateSlide(i.default.RIGHT)
            },
            style: [d(e.styles), n ? p(e.styles) : f(e.styles), u({}, i.default.RIGHT, 0)]
        }, o.default.createElement(s.default, {
            style: c(e.styles, n)
        })))
    })
}, function(e, t) {
    e.exports = require("color")
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(1)),
        r = (a(n(0)), a(n(2))),
        i = a(n(9));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var l = {
        base: {
            top: "50%",
            position: "absolute",
            bottom: "auto",
            transform: "translateY(-50%)",
            height: "100%",
            width: 2,
            overflow: "hidden"
        },
        specific: function(e, t, n) {
            var o;
            return s(o = {}, t, 40), s(o, "backgroundImage", "none"), o
        }
    };
    t.default = (0, r.default)(function(e) {
        return o.default.createElement("ul", {
            style: {
                listStyle: "none"
            }
        }, o.default.createElement("li", {
            style: [l.base, l.specific(e.styles, "left", "right")]
        }), o.default.createElement("li", {
            style: [l.base, l.specific(e.styles, "right", "left")]
        }))
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i(n(1)),
        r = (i(n(0)), n(5));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.default = function(e) {
        var t = e.left,
            n = e.width,
            i = e.fillingMotion,
            a = e.backgroundColor;
        return o.default.createElement(r.Motion, {
            style: {
                tWidth: (0, r.spring)(n, i),
                tLeft: (0, r.spring)(t, i)
            }
        }, function(e) {
            var t = e.tWidth,
                n = e.tLeft;
            return o.default.createElement("span", {
                "aria-hidden": "true",
                className: "timeline-eventline",
                style: {
                    position: "absolute",
                    left: "auto",
                    top: 0,
                    height: "100%",
                    width: "0px",
                    transformOrigin: "left center",
                    backgroundColor: a
                }
            })
        })
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        r = a(n(1)),
        i = (a(n(0)), a(n(2)));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }
    var l = {
            links: {
                position: "absolute",
                bottom: 0,
                textAlign: "center",
                paddingBottom: 15
            },
            base: {
                position: "absolute",
                bottom: -5,
                height: 12,
                width: 12,
                borderRadius: "50%",
                transition: "background-color 0.3s, border-color 0.3s",
                ":hover": {}
            },
            future: function(e) {
                return {
                    backgroundColor: e.background,
                    border: "2px solid " + e.outline
                }
            },
            past: function(e) {
                return {
                    backgroundColor: e.background,
                    border: "2px solid " + e.foreground
                }
            },
            present: function(e) {
                return {
                    backgroundColor: e.foreground,
                    border: "2px solid " + e.foreground
                }
            }
        },
        u = function(e) {
			
            function t() {
					var eventswrapperwidth=$(".events-wrapper").outerWidth();
                var e, n, o;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                for (var r = arguments.length, a = Array(r), u = 0; u < r; u++) a[u] = arguments[u];
                return n = o = s(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), o.__getDotStyles__ = function(e, t) {
                    var n = {
                        backgroundColor: o.props.styles.foreground,
                        border: "2px solid " + o.props.styles.foreground
                    };
					
                    return [l.base, {
						
                        left:  eventswrapperwidth - (o.props.index * 100 ) //o.props.labelWidth / 2 - l.base.width / 2
                    }, l[e](o.props.styles), i.default.getState(o.state, t, ":hover") || i.default.getState(o.state, "dot-dot", ":hover") ? n : void 0]
                }, s(o, n)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, r.default.Component), o(t, [{
                key: "render",
                value: function() {
						var eventswrapperwidth=$(".events-bar").outerWidth();
                    var e = this,
                        t = "future";
                    return this.props.index < this.props.selected ? t = "past" : this.props.index === this.props.selected && (t = "present"), r.default.createElement("li", {
                        key: this.props.date,
                        id: "timeline-dot-" + this.props.index ,
                        className: t + " dot-label",
                        onClick: function() {
                            return e.props.onClick(e.props.index)
                        },
                        style: [l.links, {
                            left: eventswrapperwidth - ((5 - this.props.index)* (eventswrapperwidth / 5 )),
                            cursor: "pointer",
                            width: this.props.labelWidth,
                            ":hover": {}
                        }]
                    },  r.default.createElement("span", {
                        key: "dot-dot",
                        style: this.__getDotStyles__(t, this.props.date)
                    }))
                }
            }]), t
        }();
    t.default = (0, i.default)(u)
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i(n(1)),
        r = (i(n(0)), n(4), i(n(12)));
		

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.default = function(e) {
        var t = e.events,
            n = e.selectedIndex,
            i = e.styles,
            a = e.handleDateClick,
            s = e.labelWidth;
        return o.default.createElement("ol", {
            className: "events-bar",
            style: {
                listStyle: "none"
            }
        }, t.map(function(e, t) {
            return o.default.createElement(r.default, {
                distanceFromOrigin: e.distance,
                label: e.label,
                date: e.date,
                index: t,
                key: t,
                onClick: a,
                selected: n,
                styles: i,
                labelWidth: s
            })
        }))
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        },
        r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        i = f(n(1)),
        a = n(5),
        s = (f(n(0)), f(n(13))),
        l = f(n(11)),
        u = f(n(10)),
        d = f(n(8)),
        c = f(n(3));

    function f(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var p = function(e) {
            function t(e) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return h.call(n), n.state = {
                    position: 0,
                    maxPosition: Math.min(e.visibleWidth - e.totalWidth, 0)
                }, n.touch = {
                    coors: {
                        x: 0,
                        y: 0
                    },
                    isSwiping: !1,
                    started: !1,
                    threshold: 3
                }, n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, i.default.Component), r(t, [{
                key: "componentWillMount",
                value: function() {
                    document.body.addEventListener("keydown", this.handleKeydown)
                }
            }, {
                key: "componentDidMount",
                value: function() {
                    var e = this.props.events[this.props.index];
                    this.slideToPosition(-(e.distance - this.props.visibleWidth / 2), this.props)
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    document.body.removeEventListener("keydown", this.handleKeydown)
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    var t = e.events[e.index],
                        n = -this.state.position,
                        o = n + e.visibleWidth;
                    t.distance > n + 10 && t.distance < o - 10 ? this.slideToPosition(this.state.position, e) : this.slideToPosition(-(t.distance - e.visibleWidth / 2), e)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props.isTouchEnabled ? {
                            onTouchStart: this.handleTouchStart,
                            onTouchMove: this.handleTouchMove,
                            onTouchEnd: this.handleTouchEnd
                        } : {},
                        n = this.props.events[this.props.index].distance - this.props.barPaddingLeft,
                        r = this.props.totalWidth - this.props.barPaddingLeft - this.props.barPaddingRight;
                    return i.default.createElement("div", o({
                        style: {
                            width: this.props.width + "px",
                            height: this.props.height + "px"
                        }
                    }, t), i.default.createElement("div", {
                        className: "events-wrapper",
						id: "events-wrapper",
                        style: {
                            position: "relative",
                            height: "100%",
                            margin: "0 40px",
                            overflow: "hidden"
                        }
                    }, i.default.createElement(a.Motion, {
                        style: {
                            X: (0, a.spring)(this.state.position, this.slidingMotion)
                        }
                    }, function(t) {
                        var o = t.X;
                        return i.default.createElement("div", {
                            className: "events",
                            style: {
                                position: "absolute",
                                left: 0,
                                top: 49,
                                height: 2,
                                width: e.props.totalWidth,
                                WebkitTransform: "translate3d(" + o + ", 0, 0)px",
                                transform: "translate3d(" + o + "px, 0, 0)"
                            }
                        }, i.default.createElement(l.default, {
                            left: e.props.barPaddingLeft,
                            width: r,
                            fillingMotion: e.props.fillingMotion,
                            backgroundColor: e.props.styles.outline
                        }), i.default.createElement(l.default, {
                            left: e.props.barPaddingLeft,
                            width: n,
                            fillingMotion: e.props.fillingMotion,
                            backgroundColor: e.props.styles.foreground
                        }), i.default.createElement(s.default, {
                            events: e.props.events,
                            selectedIndex: e.props.index,
                            styles: e.props.styles,
                            handleDateClick: e.props.indexClick,
                            labelWidth: e.props.labelWidth
                        }))
                    })), i.default.createElement(u.default, {
                        styles: this.props.styles
                    }), i.default.createElement(d.default, {
                        maxPosition: this.state.maxPosition,
                        position: this.state.position,
                        styles: this.props.styles,
                        updateSlide: this.updateSlide
                    }))
					
				
                }
				
            }]), t
        }(),
        h = function() {
            var e = this;
            this.handleKeydown = function(t) {
                e.props.isKeyboardEnabled && (t.keyCode === c.default.LEFT_KEY || t.keyCode === c.default.RIGHT_KEY ? e.updateSlide(c.default.KEYMAP[t.keyCode]) : t.keyCode === c.default.UP_KEY ? e.props.indexClick(Math.min(e.props.selectedIndex + 1, e.props.events.length - 1)) : t.keyCode === c.default.DOWN_KEY && e.props.indexClick(Math.max(e.props.selectedIndex - 1, 0)))
            }, this.handleTouchStart = function(t) {
                var n = t.touches[0];
                e.touch.coors.x = n.pageX, e.touch.coors.y = n.pageY, e.touch.isSwiping = !1, e.touch.started = !0
            }, this.handleTouchMove = function(t) {
                if (e.touch.started) {
                    var n = t.touches[0],
                        o = Math.abs(e.touch.coors.x - n.pageX),
                        r = Math.abs(e.touch.coors.y - n.pageY),
                        i = o > r && o > e.touch.threshold;
                    if (!0 === i || o > e.touch.threshold || r > e.touch.threshold) {
                        e.touch.isSwiping = i;
                        var a = e.touch.coors.x - n.pageX;
                        e.touch.coors.x = n.pageX, e.setState({
                            position: e.state.position - a
                        })
                    }!0 === e.touch.isSwiping && t.preventDefault()
                } else e.handleTouchStart(t)
            }, this.handleTouchEnd = function(t) {
                e.slideToPosition(e.state.position), e.touch.coors.x = 0, e.touch.coors.y = 0, e.touch.isSwiping = !1, e.touch.started = !1
            }, this.slideToPosition = function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.props,
                    o = Math.min(n.visibleWidth - n.totalWidth, 0);
                e.setState({
                    position: Math.max(Math.min(0, t), o),
                    maxPosition: o
                })
            }, this.updateSlide = function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.props;
                t === c.default.RIGHT ? e.slideToPosition(e.state.position - n.visibleWidth + n.labelWidth, n) : t === c.default.LEFT && e.slideToPosition(e.state.position + n.visibleWidth - n.labelWidth, n)
            }, this.centerEvent = function(t) {
                var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.props).events[t];
                e.slideToPosition(-n.distance)
            }
        };
    t.default = p
}, function(e, t) {
    e.exports = require("react-dimensions")
}, function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}, function(e, t, n) {
    "use strict";
    var o = function(e) {};
    e.exports = function(e, t, n, r, i, a, s, l) {
        if (o(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var d = [n, r, i, a, s, l],
                    c = 0;
                (u = new Error(t.replace(/%s/g, function() {
                    return d[c++]
                }))).name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return function() {
            return e
        }
    }
    var r = function() {};
    r.thatReturns = o, r.thatReturnsFalse = o(!1), r.thatReturnsTrue = o(!0), r.thatReturnsNull = o(null), r.thatReturnsThis = function() {
        return this
    }, r.thatReturnsArgument = function(e) {
        return e
    }, e.exports = r
}, function(e, t, n) {
    "use strict";
    var o = n(18),
        r = n(17),
        i = n(16);
    e.exports = function() {
        function e(e, t, n, o, a, s) {
            s !== i && r(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
        }

        function t() {
            return e
        }
        e.isRequired = e;
        var n = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t
        };
        return n.checkPropTypes = o, n.PropTypes = n, n
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        r = d(n(1)),
        i = (d(n(0)), d(n(2))),
        a = d(n(15)),
        s = d(n(14)),
        l = n(4),
        u = d(n(3));

    function d(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c = function(e) {
        function t() {
            return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, r.default.Component), o(t, [{
            key: "render",
            value: function() {
                var e = this.props;
                if (!e.containerWidth) return !1;
                var t = e.values.map(function(e) {
                        return new Date(e)
                    }),
                    n = (0, l.cummulativeSeperation)(t, e.labelWidth, e.minEventPadding, e.maxEventPadding, e.linePadding).map(function(t, n) {
                        return {
                            distance: t,
                            label: e.getLabel(e.values[n], n),
                            date: e.values[n]
                        }
                    }),
                    o = this.props.containerWidth - 80,
                    i = Math.max(n[n.length - 1].distance + this.props.linePadding, o),
                    a = 0,
                    u = 0;
                return this.props.isOpenEnding || (a = i - n[n.length - 1].distance), this.props.isOpenBeginning || (u = n[0].distance), r.default.createElement(s.default, {
                    width: e.containerWidth,
                    height: e.containerHeight,
                    events: n,
                    isTouchEnabled: e.isTouchEnabled,
                    totalWidth: '100%',
                    visibleWidth: o,
                    index: e.index,
                    styles: e.styles,
                    indexClick: e.indexClick,
                    labelWidth: e.labelWidth,
                    fillingMotion: e.fillingMotion,
                    barPaddingRight: a,
                    barPaddingLeft: u
                })
            }
        }]), t
    }();
    c.defaultProps = {
        getLabel: function(e, t) {
            return new Date(e).toDateString().substring(4)
        },
        minEventPadding: u.default.MIN_EVENT_PADDING,
        maxEventPadding: u.default.MAX_EVENT_PADDING,
        linePadding: u.default.TIMELINE_PADDING,
        labelWidth: u.default.DATE_WIDTH,
        styles: {
            outline: "#dfdfdf",
            background: "#f8f8f8",
            foreground: "#7b9d6f"
        },
        fillingMotion: {
            stiffness: 150,
            damping: 25
        },
        slidingMotion: {
            stiffness: 150,
            damping: 25
        },
        isOpenEnding: !0,
        isOpenBeginning: !0,
        isTouchEnabled: !0,
        isKeyboardEnabled: !0
    }, t.default = (0, i.default)((0, a.default)({
        elementResize: !0
    })(c))
}, function(e, t, n) {
    e.exports = n(20)
}]);