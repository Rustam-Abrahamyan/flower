!(function (e) {
    function n() {
        for (
            var e = "",
                n = ["-o-", "-ms-", "-moz-", "-webkit-"],
                t = document.createElement("div"),
                o = 0;
            o < n.length;
            o++
        )
            (t.style.background = n[o] + "radial-gradient(#000000, #ffffff)"),
                t.style.background && (e = n[o]);
        return (t = null), delete t, e;
    }
    function t(e) {
        return (
            (oe = 2 * Math.random() * e - e),
            (zlim = Math.sqrt(e * e - oe * oe)),
            (re = 2 * Math.random() * zlim - zlim),
            [oe, re]
        );
    }
    function o(e, n, t) {
        var o = Math.random() * n + e;
        return (
            (t || "undefined" == typeof t) &&
                (o *= 1 == Math.floor(2 * Math.random()) ? 1 : -1),
            o
        );
    }
    function a(e) {
        return "" != e ? !0 : void document.body.classList.add("error");
    }
    function r(e) {
        return encodeURIComponent(e);
    }
    function i(e, n) {
        var t = new THREE.Vector3();
        t.set(
            (e / window.innerWidth) * 2 - 1,
            2 * -(n / window.innerHeight) + 1,
            0.5
        ),
            t.unproject(F);
        var o = t.sub(F.position).normalize(),
            a = -F.position.z / o.z,
            r = F.position.clone().add(o.multiplyScalar(a));
        return r;
    }
    function s(e) {
        "undefined" != typeof _ &&
            ((E = e),
            (_.material.materials[1].color = new THREE.Color("#" + E)));
    }
    function d(e) {
        (w = e),
            (document.body.style.backgroundImage =
                n() + "radial-gradient(#" + e + " 0%,#222 100%)");
    }
    function l(e) {
        var n = 0.75 * p.getDelta();
        "undefined" != typeof f &&
            f.children.forEach(function (n, t) {
                n.update(e);
            }),
            _.update(e),
            THREE.AnimationHandler.update(n / y);
    }
    var c = {
            gras: "assets/json/gras.json",
            hearts: "assets/json/heart.json",
            flower: "assets/json/flower.json",
            flowerTexture: "assets/textures/flower.png",
        },
        h = !0,
        m = (function le() {
            for (
                var e = {},
                    n = window.location.search.substring(1),
                    t = n.split("&"),
                    o = 0;
                o < t.length;
                o++
            ) {
                var a = t[o].split("=");
                if ("undefined" == typeof e[a[0]])
                    e[a[0]] = decodeURIComponent(a[1]);
                else if ("string" == typeof e[a[0]]) {
                    var r = [e[a[0]], decodeURIComponent(a[1])];
                    e[a[0]] = r;
                } else e[a[0]].push(decodeURIComponent(a[1]));
            }
            return e;
        })(),
        E,
        u,
        w,
        f,
        p = new THREE.Clock(),
        g = 0,
        T = 3,
        H = 3,
        y = T / H,
        R,
        v = { x: 0, y: 0, z: 0 },
        M = 16777215,
        b = window.innerHeight,
        x = window.innerWidth,
        _,
        z = document.getElementById("greeting_send"),
        C = document.getElementById("colorRange"),
        I = document.getElementById("colorBGRange"),
        k = document.getElementById("name_from"),
        N = document.getElementById("name_to"),
        P = document.getElementById("send"),
        S = document.getElementById("toName"),
        L = document.getElementById("fromName"),
        B = new THREE.TextureLoader(),
        A = new THREE.JSONLoader(),
        W = new THREE.Scene();
    if (
        ((W.fog = new THREE.Fog(16375789, 10, 90)),
        "fromName" in m && "toName" in m && "flowerColor" in m)
    ) {
        (document.body.className += "receive"),
            (S.innerHTML = m.toName),
            (L.innerHTML = m.fromName),
            (E = m.flowerColor);
        var j = window.location.href;
        j = j.split("?");
        var D = document.getElementsByTagName("title");
        (D[0].innerHTML = "A flower for " + m.fromName + " from " + m.toName),
            send_own_message.setAttribute("href", j[0]),
            d(m.bgColor),
            (h = !1);
    } else (h = !0), (document.body.className += "send"), (E = "ffffff");
    C.addEventListener("change", function () {
        s(this.jscolor);
    }),
        I.addEventListener("change", function () {
            d(this.jscolor);
        });
    var F = new THREE.PerspectiveCamera(55, x / b, 0.1, 1e3);
    F.position.set(25, 12, 14), W.add(F);
    var U = new THREE.WebGLRenderer({
        alpha: !0,
        antialias: !0,
        transparent: !0,
    });
    U.setSize(x, b),
        (U.shadowMap.enabled = !0),
        (U.shadowMap.type = THREE.PCFSoftShadowMap),
        document.body.appendChild(U.domElement),
        (window.onresize = function () {
            (b = window.innerHeight),
                (x = window.innerWidth),
                (F.aspect = x / b),
                F.updateProjectionMatrix(),
                U.setSize(x, b);
        }),
        (controls = new THREE.OrbitControls(F)),
        (controls.damping = 0.2),
        (controls.target = new THREE.Vector3(0, 12.5, 0)),
        (controls.maxPolarAngle = Math.PI / 2),
        (controls.minPolarAngle = (50 * Math.PI) / 180),
        (controls.minDistance = 15),
        (controls.maxDistance = 30),
        window.innerWidth < 800 && (controls.enabled = !1);
    var G = new THREE.AmbientLight(6710886, 1);
    W.add(G);
    var O = new THREE.SpotLight(16777215);
    O.position.set(0, 500, 500),
        (O.intensity = 1),
        (O.castShadow = !0),
        (O.shadowCameraNear = 10),
        (O.shadowCameraFar = 1500),
        (O.shadowBias = 1e-4),
        (O.shadowDarkness = 0.8),
        (O.shadowMapWidth = 1024),
        (O.shadowMapHeight = 1024),
        W.add(O),
        B.load(c.flowerTexture, function (e) {
            function n(n, t) {
                return (
                    console.log(E),
                    n.forEach(function (n, o) {
                        (n.color = new THREE.Color(16777215)),
                            (n.specular = new THREE.Color(16646091)),
                            (n.shininess = 0.01),
                            (n.map = e),
                            (n.side = THREE.DoubleSide),
                            (n.bumpMap = e),
                            (n.bumpScale = 0.2),
                            (n.needsUpdate = !0),
                            (n.transparent = !0),
                            (n.depthTest = !0),
                            (n.depthWrite = !0),
                            (n.alphaTest = 0.35),
                            t && ((n.morphTargets = !0), (n.skinning = !0));
                    }),
                    n
                );
            }
            A.load(c.flower, function (e, t) {
                (t = n(t, !0)),
                    (t[1].color = new THREE.Color("#" + E)),
                    (t[1].color = new THREE.Color("#" + E)),
                    (t[1].alphaTest = 0.8);
                var o = new THREE.MeshFaceMaterial(t);
                (_ = new THREE.SkinnedMesh(e, o)),
                    (_.castShadow = !0),
                    (u = new THREE.MorphAnimation(_)),
                    W.add(_),
                    (_.morphTargetInfluences[1] = 0.9),
                    _.scale.set(0, 0, 0),
                    (_.update = function (e) {
                        (this.skeleton.bones[4].rotation._x +=
                            0.25 *
                            (F.rotation._x -
                                this.skeleton.bones[4].rotation._x)),
                            (this.skeleton.bones[4].rotation._y +=
                                0.25 *
                                (F.rotation._y -
                                    this.skeleton.bones[4].rotation._y)),
                            (this.skeleton.bones[4].rotation._z +=
                                0.25 *
                                (F.rotation._z -
                                    this.skeleton.bones[4].rotation._z)),
                            (this.skeleton.bones[4].rotation.x =
                                this.skeleton.bones[4].rotation._x),
                            (this.skeleton.bones[4].rotation.y =
                                this.skeleton.bones[4].rotation._y),
                            (this.skeleton.bones[4].rotation.z =
                                this.skeleton.bones[4].rotation._z);
                    }),
                    (grow = new TWEEN.Tween({ x: 0 })
                        .to({ x: 1 }, 1500)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(function () {
                            _.scale.set(this.x, this.x, this.x);
                        })
                        .onComplete(function () {
                            document.body.className += " halm";
                        })),
                    (R = new TWEEN.Tween({ x: 0.9 })
                        .to({ x: 0 }, 1500)
                        .easing(TWEEN.Easing.Bounce.Out)
                        .onUpdate(function () {
                            _.morphTargetInfluences[1] = this.x;
                        })
                        .onComplete(function () {
                            document.body.className += " complete";
                        })),
                    grow.chain(R),
                    grow.start(),
                    se(g);
            }),
                A.load(c.hearts, function (e, n) {
                    (n[0].shininess = 1),
                        (n[0].color = new THREE.Color(16208924)),
                        (n[0].specular = new THREE.Color(15567721)),
                        (n[0].opacity = 0.5),
                        (n[0].transparent = !0),
                        (n[0].blending = THREE.AdaptiveBlending),
                        (f = new THREE.Group());
                    var t = new THREE.MeshFaceMaterial(n),
                        a = new THREE.Mesh(e, t);
                    f.add(a);
                    for (var r = 0; 50 > r; r++) {
                        (f.children[r] = new THREE.Mesh(e, t)),
                            (f.children[r]._own = {
                                indexer: 0,
                                max: 50 * Math.random() + 150,
                                random: {
                                    x: o(0.01, 0.05, !0),
                                    y: o(0.01, 0.05, !1),
                                    z: o(0.01, 0.05, !0),
                                },
                                last: { x: 0, y: 0, z: 0 },
                            }),
                            (f.children[r].rotation.x =
                                (o(0, 10, !0) * Math.PI) / 180),
                            (f.children[r].rotation.y =
                                (o(0, 360, !0) * Math.PI) / 180),
                            (f.children[r].rotation.z =
                                (o(0, 10, !0) * Math.PI) / 180);
                        var i = o(0.9, 1.1, !1);
                        f.children[r].update = function (e) {
                            var n = Math.max(
                                ((100 * this._own.indexer) / this._own.max) *
                                    0.01,
                                0.01
                            );
                            this.scale.set(n, n, n),
                                this.rotateY(0.01),
                                0 == this._own.indexer
                                    ? ((this._own.last.x = v.x),
                                      (this._own.last.y = v.y),
                                      (this._own.last.z = v.z))
                                    : ((this._own.last.x += this._own.random.x),
                                      (this._own.last.y += this._own.random.y),
                                      (this._own.last.z += this._own.random.z)),
                                this.position.set(
                                    this._own.last.x,
                                    this._own.last.y,
                                    this._own.last.z
                                ),
                                this._own.indexer <= this._own.max
                                    ? this._own.indexer++
                                    : (this._own.indexer = 0);
                        };
                    }
                    W.add(f);
                }),
                A.load(c.gras, function (e, a) {
                    for (
                        var r = new THREE.MeshFaceMaterial(n(a, !1)), i, s = 0;
                        50 > s;
                        s++
                    ) {
                        var d = new THREE.Mesh(e, r);
                        (i = t(12)),
                            (d.position.x = i[0]),
                            (d.position.z = i[1]),
                            (d.rotation.y = (o(0, 360, !1) * Math.PI) / 180),
                            d.updateMatrix(),
                            (d.matrixAutoUpdate = !1),
                            (d.receiveShadow = !0),
                            W.add(d);
                    }
                });
        });
    var V = new THREE.MeshPhongMaterial({
            color: 4542505,
            specular: 0,
            shininess: 0,
            side: THREE.DoubleSide,
        }),
        q = 21,
        Y = 32,
        J = new THREE.RingGeometry(0, q, Y, Y, 0, 2 * Math.PI),
        Q = new THREE.Mesh(J, V);
    (Q.rotation.x = (90 * Math.PI) / 180), (Q.receiveShadow = !0), W.add(Q);
    var X = new THREE.MeshPhongMaterial({
            color: 16777215,
            specular: 15658734,
            shininess: 0,
            side: THREE.DoubleSide,
            shading: THREE.FlatShading,
        }),
        K = new THREE.TorusGeometry(21.5, 4, 8, 180),
        Z = new THREE.Mesh(K, X);
    (Z.rotation.x = (90 * Math.PI) / 180), W.add(Z);
    for (
        var ee = new THREE.Geometry(),
            ne = new THREE.PointsMaterial({
                color: 16777215,
                size: 0.1,
                sizeAttenuation: !1,
                transparent: !0,
                opacity: 0.25,
            }),
            te = 0;
        1e4 > te;
        te++
    ) {
        var oe = 40 * (Math.random() - 0.5),
            ae = 40 * (Math.random() - 0.5),
            re = 40 * (Math.random() - 0.5);
        ee.vertices.push(new THREE.Vector3(oe, ae, re));
    }
    var ie = new THREE.Points(ee, ne);
    W.add(ie);
    var se = function (e) {
        requestAnimationFrame(se),
            l(e),
            controls.update(),
            TWEEN.update(e),
            U.render(W, F);
    };
    document.body.addEventListener("mousemove", function (e) {
        var n = i(e.pageX, e.pageY);
        (v.x = n.x), (v.y = n.y), (v.z = n.z);
    }),
        z.addEventListener("mouseenter", function () {
            controls.enabled = !1;
        }),
        z.addEventListener("mouseleave", function () {
            controls.enabled = !0;
        });
    var de = document.getElementById("sharerlink");
    P.addEventListener("click", function (e) {
        e.preventDefault(e);
        var n = k.value,
            t = N.value;
        if (a(n) && a(t)) {
            document.body.classList.remove("error");
            var o =
                window.location +
                "?&fromName=" +
                r(n) +
                "&toName=" +
                r(t) +
                "&flowerColor=" +
                r(E) +
                "&bgColor=" +
                r(w);
            P.setAttribute("aria-label", o),
                new Clipboard("#send", {
                    text: function (e) {
                        return (
                            (document.body.className += " linkCopied"),
                            e.getAttribute("aria-label")
                        );
                    },
                }),
                (de.innerHTML = "<p>" + o);
        }
    });
})();
