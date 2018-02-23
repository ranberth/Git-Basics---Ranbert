(function() {
    if (!("position" in document.createElement("progress"))) {
        var h;
        h = Object.defineProperty ? function(a, c, b) {
            b.enumerable = !0;
            b.configurable = !0;
            try {
                Object.defineProperty(a, c, b)
            } catch (e) {
                if (e.number === -2146823252) b.enumerable = !1, Object.defineProperty(a, c, b)
            }
        } : "__defineSetter__" in document.body ? function(a, b, d) {
            a.__defineGetter__(b, d.get);
            d.set && a.__defineSetter__(b, d.set)
        } : function(a, b, d) {
            a[b] = d.get.call(a)
        };
        try {
            [].slice.apply(document.images);
            var i = function(a) {
                return [].slice.apply(a)
            }
        } catch (j) {
            i =
                function(a) {
                    for (var b = [], d = a.length, e = 0; e < d; e++) b[e] = a[e];
                    return b
                }
        }
        for (var f = function() {
                var a = document.createElement("div");
                a.foo = "bar";
                return a.getAttribute("foo") === "bar"
            }(), b = window.ProgressPolyfill = {
                DOMInterface: {
                    max: {
                        get: function() {
                            return parseFloat(this.getAttribute("aria-valuemax")) || 1
                        },
                        set: function(a) {
                            this.setAttribute("aria-valuemax", a);
                            f || this.setAttribute("max", a);
                            b.redraw(this)
                        }
                    },
                    value: {
                        get: function() {
                            return parseFloat(this.getAttribute("aria-valuenow")) || 0
                        },
                        set: function(a) {
                            this.setAttribute("aria-valuenow",
                                a);
                            f || this.setAttribute("value", a);
                            b.redraw(this)
                        }
                    },
                    position: {
                        get: function() {
                            return this.hasAttribute("aria-valuenow") ? this.value / this.max : -1
                        }
                    },
                    labels: {
                        get: function() {
                            for (var a = this.parentNode; a && a.nodeName !== "LABEL";) a = a.parentNode;
                            a = a ? [a] : [];
                            if (this.id && document.querySelectorAll) {
                                var b = i(document.querySelectorAll('label[for="' + this.id + '"]'));
                                b.length && (a = a.concat(b))
                            }
                            return a
                        }
                    }
                },
                redraw: function(a) {
                    b.isInited(a) ? b.init(a) : f || (a.setAttribute("aria-valuemax", parseFloat(a.getAttribute("max")) || 1), a.hasAttribute("value") ?
                        a.setAttribute("aria-valuenow", parseFloat(a.getAttribute("value")) || 0) : a.removeAttribute("aria-valuenow"));
                    if (a.position !== -1) a.style.paddingRight = a.offsetWidth * (1 - a.position) + "px"
                },
                isInited: function(a) {
                    return a.getAttribute("role") === "progressbar"
                },
                init: function(a) {
                    if (!b.isInited(a)) {
                        a.setAttribute("role", "progressbar");
                        a.setAttribute("aria-valuemin", "0");
                        a.setAttribute("aria-valuemax", parseFloat(a.getAttribute("max")) || 1);
                        a.hasAttribute("value") && a.setAttribute("aria-valuenow", parseFloat(a.getAttribute("value")) ||
                            0);
                        for (var c in b.DOMInterface) h(a, c, {
                            get: b.DOMInterface[c].get,
                            set: b.DOMInterface[c].set
                        });
                        b.redraw(a)
                    }
                },
                progresses: document.getElementsByTagName("progress")
            }, g = b.progresses.length - 1; g >= 0; g--) b.init(b.progresses[g]);
        document.addEventListener && (document.addEventListener("DOMAttrModified", function(a) {
            var c = a.target,
                a = a.attrName;
            c.nodeName === "PROGRESS" && (a === "max" || a === "value") && b.redraw(c)
        }, !1), document.addEventListener("DOMNodeInserted", function(a) {
            a = a.target;
            a.nodeName === "PROGRESS" && b.init(a)
        }, !1))
    }
})();