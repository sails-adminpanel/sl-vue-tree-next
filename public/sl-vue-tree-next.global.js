const Me = window.Vue.defineComponent, xe = window.Vue.renderList, ye = window.Vue.Fragment, m = window.Vue.openBlock, N = window.Vue.createElementBlock, Z = window.Vue.withModifiers, be = window.Vue.normalizeStyle, p = window.Vue.createElementVNode, C = window.Vue.renderSlot, y = window.Vue.toDisplayString, b = window.Vue.createCommentVNode, ee = window.Vue.createTextVNode, te = window.Vue.normalizeClass, Ue = window.Vue.resolveComponent, je = window.Vue.withCtx, qe = window.Vue.createBlock, We = window.Vue.vShow, Ge = window.Vue.withDirectives, Qe = {
  ref: "nodes",
  class: "sl-vue-tree-next-nodes-list"
}, Ze = ["onMousedown", "onMouseup", "onContextmenu", "onDblclick", "onClick", "onDragover", "onDrop", "path"], et = { class: "sl-vue-tree-next-gap" }, tt = {
  key: 0,
  class: "sl-vue-tree-next-branch"
}, ot = { key: 0 }, nt = { key: 1 }, lt = { class: "sl-vue-tree-next-title" }, st = ["onClick"], rt = { class: "sl-vue-tree-next-sidebar" }, it = {
  slot: "title",
  "slot-scope": "{ node }"
}, at = {
  slot: "toggle",
  "slot-scope": "{ node }"
}, ut = {
  slot: "sidebar",
  "slot-scope": "{ node }"
}, ct = {
  slot: "empty-node",
  "slot-scope": "{ node }"
}, S = window.Vue.ref, dt = window.Vue.onMounted, ft = window.Vue.onBeforeUnmount, pt = window.Vue.watchEffect, D = window.Vue.computed, gt = /* @__PURE__ */ Me({
  __name: "SlVueTreeNext",
  props: {
    modelValue: { default: () => [] },
    edgeSize: { default: 3 },
    allowMultiselect: { type: Boolean, default: !0 },
    showBranches: { type: Boolean, default: !1 },
    level: { default: 0 },
    parentInd: { default: void 0 },
    parentContext: {},
    rootContext: {},
    allowToggleBranch: { type: Boolean, default: !0 }
  },
  emits: [
    "update:modelValue",
    "select",
    "beforedrop",
    "drop",
    "toggle",
    "nodeclick",
    "nodedblclick",
    "updateNode",
    "nodecontextmenu",
    "externaldragover",
    "externaldrop"
  ],
  setup(_e, { expose: Ve, emit: De }) {
    const c = _e, oe = De, B = S(), ne = S(), A = S(null), T = S(0), O = S(0), H = S(null), $ = S(!1), _ = S(!1), F = S({ x: 0, y: 0 }), R = S(!1), g = S([]), f = D(() => !c.level), le = D(() => {
      const e = [];
      let t = c.level - 1;
      for (c.showBranches || t++; t-- > 0; )
        e.push(t);
      return e;
    }), d = D(() => {
      var t;
      return f.value ? A.value : (t = q()) == null ? void 0 : t.cursorPosition.value;
    }), se = D(() => le.value.length), J = D(() => {
      var t, n, o, s;
      if (f.value) {
        const l = x(g.value);
        return re(l);
      }
      return c.parentInd === null ? [] : (s = (o = (n = (t = q()) == null ? void 0 : t.currentNodes) == null ? void 0 : n.value) == null ? void 0 : o[c.parentInd]) == null ? void 0 : s.children;
    }), ke = D(() => ve().length);
    D(() => G().length), dt(() => {
      f.value && document.addEventListener("mouseup", ge);
    }), ft(() => {
      document.removeEventListener("mouseup", ge);
    }), pt(() => {
      g.value = c.modelValue;
    });
    const k = (e) => {
      var t;
      if (f.value) {
        A.value = e;
        return;
      }
      (t = q()) == null || t.setCursorPosition(e);
    }, re = (e, t = [], n = !0) => e.map((o, s) => {
      const l = t.concat(s);
      return E(l, o, e, n);
    }), E = (e, t = null, n = null, o = !1) => {
      const s = e.slice(-1)[0];
      if (n = n || z(g.value, e), t = t || n && n[s] || null, o == null && (o = K == null ? void 0 : K(e)), !t)
        return null;
      const l = t.isExpanded == null ? !0 : !!t.isExpanded, i = t.isDraggable == null ? !0 : !!t.isDraggable, r = t.isSelectable == null ? !0 : !!t.isSelectable;
      return {
        // define the all TreeNodeModel props
        title: t.title,
        isLeaf: !!t.isLeaf,
        children: t.children ? re(t.children, e, l) : [],
        isSelected: !!t.isSelected,
        isExpanded: l,
        isVisible: o,
        isDraggable: i,
        isSelectable: r,
        data: t.data !== void 0 ? t.data : {},
        // define the all TreeNode computed props
        path: e,
        pathStr: JSON.stringify(e),
        level: e.length,
        ind: s,
        isFirstChild: s == 0,
        isLastChild: s == ((n == null ? void 0 : n.length) ?? 0) - 1
      };
    }, K = (e) => {
      if (e.length < 2)
        return !0;
      let t = g.value;
      for (let n = 0; n < e.length - 1; n++) {
        let o = e[n], s = t[o];
        if (!(s.isExpanded == null ? !0 : !!s.isExpanded))
          return !1;
        t = s.children || [];
      }
      return !0;
    }, I = (e) => {
      g.value = e, u().emit("update:modelValue", e);
    }, Ee = (e, t) => {
      u().emit("select", e, t);
    }, Be = (e, t, n) => {
      u().emit("beforedrop", e, t, n);
    }, Ie = (e, t, n) => {
      u().emit("drop", e, t, n);
    }, Pe = (e, t) => {
      u().emit("toggle", e, t);
    }, Le = (e, t) => {
      u().emit("nodeclick", e, t);
    }, Te = (e, t) => {
      u().emit("nodedblclick", e, t);
    }, He = (e, t) => {
      u().emit("nodecontextmenu", e, t);
    }, $e = (e, t) => {
      t.preventDefault();
      const n = u(), o = n.getCursorPositionFromCoords(t.clientX, t.clientY);
      n.setCursorPosition(o), n.emit("externaldragover", o, t);
    }, Re = (e, t) => {
      const n = u(), o = n.getCursorPositionFromCoords(t.clientX, t.clientY);
      n.emit("externaldrop", o, t), k(null);
    }, X = (e, t = !1, n = null) => {
      const o = Array.isArray(c.multiselectKey) ? c.multiselectKey : [c.multiselectKey];
      t = (n && !!o.find((h) => n[h]) || t) && c.allowMultiselect;
      const l = E(e);
      if (!l)
        return null;
      const i = x(g.value), r = c.allowMultiselect && n && n.shiftKey && H.value, a = [];
      let v = !1;
      return w((h, V) => {
        var L;
        r ? ((h.pathStr === l.pathStr || h.pathStr === ((L = H.value) == null ? void 0 : L.pathStr)) && (V.isSelected = h.isSelectable, v = !v), v && (V.isSelected = h.isSelectable)) : h.pathStr === l.pathStr ? V.isSelected = h.isSelectable : t || V.isSelected && (V.isSelected = !1), V.isSelected && a.push(h);
      }, i), H.value = l, I(i), Ee(a, n), l;
    }, ie = (e) => {
      var Ne, Ce;
      if (!f.value) {
        (Ne = u()) == null || Ne.onMousemoveHandler(e);
        return;
      }
      if (R.value)
        return;
      const t = _.value, n = t || $.value && (F.value.x !== e.clientX || F.value.y !== e.clientY), o = t === !1 && n === !0;
      if (F.value = {
        x: e.clientX,
        y: e.clientY
      }, !n)
        return;
      const s = u().ref.value, l = s.getBoundingClientRect(), i = e.clientY - l.top + s.scrollTop - Number(((Ce = B.value) == null ? void 0 : Ce.style.marginBottom) ?? 0), r = e.clientX - l.left;
      B.value && (B.value.style.top = i + "px", B.value.style.left = r + "px");
      const a = ae(e.clientX, e.clientY), v = a == null ? void 0 : a.node, h = a == null ? void 0 : a.placement;
      if (o && !v.isSelected && X(v.path, !1, e), !G().length) {
        R.value = !0;
        return;
      }
      _.value = n, k({ node: v, placement: h });
      const L = l.bottom - c.scrollAreaHeight, me = (e.clientY - L) / (l.bottom - L), Se = l.top + c.scrollAreaHeight, we = (Se - e.clientY) / (Se - l.top);
      me > 0 ? pe(me) : we > 0 ? pe(-we) : U();
    }, ae = (e, t) => {
      const n = document.elementFromPoint(e, t), o = n != null && n.getAttribute("path") ? n : ue(n);
      let s, l;
      if (o) {
        if (!o)
          return;
        s = E(JSON.parse(o.getAttribute("path")));
        const i = o.offsetHeight, r = c.edgeSize, a = t - o.getBoundingClientRect().top;
        s.isLeaf ? l = a >= i / 2 ? "after" : "before" : a <= r ? l = "before" : a >= i - r ? l = "after" : l = "inside";
      } else {
        const r = u().ref.value.getBoundingClientRect();
        t > r.top + r.height / 2 ? (l = "after", s = ce()) : (l = "before", s = M());
      }
      return { node: s, placement: l };
    }, ue = (e) => e ? e.getAttribute("path") ? e : ue(e.parentElement) : null, ze = (e) => {
      if (!f.value || !_.value)
        return;
      const n = u().ref.value.getBoundingClientRect();
      if (e.clientY >= n.bottom) {
        const o = structuredClone(J.value);
        k({ node: o[0], placement: "after" });
      } else
        e.clientY < n.top && k({ node: M(), placement: "before" });
    }, Ye = (e) => u().ref.value.querySelector(`[path="${JSON.stringify(e)}"]`), ce = () => {
      let e = null;
      return w((t) => {
        e = t;
      }), e;
    }, M = () => E([0]), Ae = (e, t) => {
      let n = null;
      return w((o) => {
        if (!(de(o.path, e) < 1) && (!t || t(o)))
          return n = o, !1;
      }), n;
    }, Oe = (e, t) => {
      let n = [];
      w((s) => {
        if (de(s.path, e) >= 0)
          return !1;
        n.push(s);
      });
      let o = n.length;
      for (; o--; ) {
        const s = n[o];
        if (!t || t(s))
          return s;
      }
      return null;
    }, de = (e, t) => {
      for (let n = 0; n < e.length; n++) {
        if (t[n] == null || e[n] > t[n])
          return 1;
        if (e[n] < t[n])
          return -1;
      }
      return t[e.length] == null ? 0 : -1;
    }, fe = (e, t) => {
      if (e.button === 0) {
        if (!f.value) {
          u().onNodeMousedownHandler(e, t);
          return;
        }
        $.value = !0;
      }
    }, pe = (e) => {
      const t = u().ref.value;
      O.value !== e && (T.value && U(), O.value = e, T.value = setInterval(() => {
        t.scrollTop += c.maxScrollSpeed * e;
      }, 20));
    }, U = () => {
      clearInterval(T.value), T.value = 0, O.value = 0;
    }, ge = (e) => {
      _.value && j(e);
    }, j = (e, t = null) => {
      if (e.button !== 0)
        return;
      if (!f.value) {
        u().onNodeMouseupHandler(e, t);
        return;
      }
      if ($.value = !1, !_.value && t && !R.value && X(t.path, !1, e), R.value = !1, !d.value) {
        P();
        return;
      }
      const n = G();
      for (let r of n) {
        if (r.pathStr == d.value.node.pathStr) {
          P();
          return;
        }
        if (Xe(r, d.value.node)) {
          P();
          return;
        }
      }
      const o = x(g.value), s = [];
      for (let r of n) {
        const v = z(o, r.path)[r.ind];
        s.push(v);
      }
      let l = !1;
      if (Be(n, d.value, () => l = !0), l) {
        P();
        return;
      }
      const i = [];
      for (let r of s)
        i.push(x(r)), r._markToDelete = !0;
      he(d.value, i, o), Q((r, a, v) => {
        r._markToDelete && a.splice(v, 1);
      }, o), H.value = null, I(o), Ie(n, d.value, e), P();
    }, Fe = (e, t) => {
      c.allowToggleBranch && (W({ path: t.path, patch: { isExpanded: !t.isExpanded } }), Pe(t, e), e.stopPropagation());
    }, P = () => {
      _.value = !1, $.value = !1, k(null), U();
    }, q = () => c.parentContext, u = () => f.value ? Y : c.rootContext, z = (e, t) => t.length === 1 ? e : z(e[t[0]].children, t.slice(1)), W = ({ path: e, patch: t }) => {
      f.value || oe("updateNode", { path: e, patch: t });
      const n = JSON.stringify(e), o = x(g.value);
      w((s, l) => {
        s.pathStr === n && Object.assign(l, t);
      }, o), I(o);
    }, ve = () => {
      const e = [];
      return w((t) => {
        t.isSelected && e.push(t);
      }), e;
    }, G = () => {
      const e = [];
      return w((t) => {
        t.isSelected && t.isDraggable && e.push(t);
      }), e;
    }, w = (e, t = null, n = []) => {
      t || (t = g.value);
      let o = !1;
      const s = [];
      for (let l = 0; l < t.length; l++) {
        const i = t[l], r = n.concat(l), a = E(r, i, t);
        if (o = e(a, i, t) === !1, a && s.push(a), o || i.children && (o = w(e, i.children, r) === !1, o))
          break;
      }
      return o ? !1 : s;
    }, Q = (e, t) => {
      let n = t.length;
      for (; n--; ) {
        const o = t[n];
        o.children && Q(e, o.children), e(o, t, n);
      }
      return t;
    }, Je = (e) => {
      const t = e.map((o) => JSON.stringify(o)), n = x(g.value);
      w((o, s, l) => {
        for (const i of t)
          o.pathStr === i && (s._markToDelete = !0);
      }, n), Q((o, s, l) => {
        o._markToDelete && s.splice(l, 1);
      }, n), I(n);
    }, he = (e, t, n) => {
      const o = x(e), s = o.node, l = z(n, s.path), i = l[s.ind];
      if (o.placement === "inside")
        i.children = i.children || [], i.children.unshift(...t);
      else {
        const r = o.placement === "before" ? s.ind : s.ind + 1;
        l.splice(r, 0, ...t);
      }
    }, Ke = (e, t) => {
      const n = Array.isArray(t) ? t : [t], o = x(g.value);
      he(e, n, o), I(o);
    }, Xe = (e, t) => {
      const o = x(t).path;
      return JSON.stringify(o.slice(0, e.path.length)) == e.pathStr;
    }, x = (e) => JSON.parse(JSON.stringify(e)), Y = {
      getRoot: u,
      setCursorPosition: k,
      currentNodes: J,
      cursorPosition: d,
      emit: oe,
      ref: ne,
      onNodeMousedownHandler: fe,
      onNodeMouseupHandler: j,
      onMousemoveHandler: ie,
      getCursorPositionFromCoords: ae,
      updateNode: W,
      getNode: E,
      traverse: w,
      select: X,
      getNodeEl: Ye,
      getFirstNode: M,
      getLastNode: ce,
      getNextNode: Ae,
      getPrevNode: Oe,
      getSelected: ve,
      insert: Ke,
      remove: Je,
      rootCursorPosition: A
    };
    return Ve(Y), (e, t) => {
      const n = Ue("SlVueTreeNext", !0);
      return m(), N("div", {
        ref_key: "rootRef",
        ref: ne,
        class: te(["sl-vue-tree-next", { "sl-vue-tree-next-root": f.value }]),
        onMousemove: ie,
        onMouseleave: ze
      }, [
        p("div", Qe, [
          (m(!0), N(ye, null, xe(J.value, (o, s) => (m(), N("div", {
            class: te(["sl-vue-tree-next-node", { "sl-vue-tree-next-selected": o.isSelected }])
          }, [
            p("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_before",
              onDragover: t[0] || (t[0] = Z(() => {
              }, ["prevent"])),
              style: be({
                visibility: d.value && d.value.node.pathStr === o.pathStr && d.value.placement === "before" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36),
            p("div", {
              class: te(["sl-vue-tree-next-node-item", {
                "sl-vue-tree-next-cursor-hover": d.value && d.value.node.pathStr === o.pathStr,
                "sl-vue-tree-next-cursor-inside": d.value && d.value.placement === "inside" && d.value.node.pathStr === o.pathStr,
                "sl-vue-tree-next-node-is-leaf": o.isLeaf,
                "sl-vue-tree-next-node-is-folder": !o.isLeaf
              }]),
              onMousedown: (l) => fe(l, o),
              onMouseup: (l) => j(l, o),
              onContextmenu: (l) => He(o, l),
              onDblclick: (l) => Te(o, l),
              onClick: (l) => Le(o, l),
              onDragover: (l) => $e(o, l),
              onDrop: (l) => Re(o, l),
              path: o.pathStr
            }, [
              (m(!0), N(ye, null, xe(le.value, (l) => (m(), N("div", et))), 256)),
              e.level && e.showBranches ? (m(), N("div", tt, [
                C(e.$slots, "branch", { node: o }, () => [
                  o.isLastChild ? b("", !0) : (m(), N("span", ot, y("├") + y("─") + "  ", 1)),
                  o.isLastChild ? (m(), N("span", nt, y("└") + y("─") + "  ", 1)) : b("", !0)
                ])
              ])) : b("", !0),
              p("div", lt, [
                o.isLeaf ? b("", !0) : (m(), N("span", {
                  key: 0,
                  class: "sl-vue-tree-next-toggle",
                  onClick: (l) => Fe(l, o)
                }, [
                  C(e.$slots, "toggle", { node: o }, () => [
                    p("span", null, y(o.isLeaf ? "" : o.isExpanded ? "-" : "+"), 1)
                  ])
                ], 8, st)),
                C(e.$slots, "title", { node: o }, () => [
                  ee(y(o.title), 1)
                ]),
                !o.isLeaf && o.children.length == 0 && o.isExpanded ? C(e.$slots, "empty-node", {
                  key: 1,
                  node: o
                }) : b("", !0)
              ]),
              p("div", rt, [
                C(e.$slots, "sidebar", { node: o })
              ])
            ], 42, Ze),
            o.children && o.children.length && o.isExpanded ? (m(), qe(n, {
              key: 0,
              "model-value": o.children,
              level: o.level,
              "parent-ind": s,
              "allow-multiselect": e.allowMultiselect,
              "allow-toggle-branch": e.allowToggleBranch,
              "edge-size": e.edgeSize,
              "show-branches": e.showBranches,
              "parent-context": Y,
              "root-context": f.value ? Y : e.rootContext,
              onUpdateNode: W,
              onDragover: t[1] || (t[1] = Z(() => {
              }, ["prevent"]))
            }, {
              default: je(() => [
                p("template", it, [
                  C(e.$slots, "title", { node: o }, () => [
                    ee(y(o.title), 1)
                  ])
                ]),
                p("template", at, [
                  C(e.$slots, "toggle", { node: o }, () => [
                    p("span", null, y(o.isLeaf ? "" : o.isExpanded ? "-" : "+"), 1)
                  ])
                ]),
                p("template", ut, [
                  C(e.$slots, "sidebar", { node: o })
                ]),
                p("template", ct, [
                  !o.isLeaf && o.children.length == 0 && o.isExpanded ? C(e.$slots, "empty-node", {
                    key: 0,
                    node: o
                  }) : b("", !0)
                ])
              ]),
              _: 2
            }, 1032, ["model-value", "level", "parent-ind", "allow-multiselect", "allow-toggle-branch", "edge-size", "show-branches", "root-context"])) : b("", !0),
            p("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_after",
              onDragover: t[2] || (t[2] = Z(() => {
              }, ["prevent"])),
              style: be({
                visibility: d.value && d.value.node.pathStr === o.pathStr && d.value.placement === "after" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36)
          ], 2))), 256)),
          f.value ? Ge((m(), N("div", {
            key: 0,
            ref_key: "dragInfoRef",
            ref: B,
            class: "sl-vue-tree-next-drag-info"
          }, [
            C(e.$slots, "draginfo", {}, () => [
              ee(" Items: " + y(ke.value), 1)
            ])
          ], 512)), [
            [We, _.value]
          ]) : b("", !0)
        ], 512)
      ], 34);
    };
  }
});
export {
  gt as SlVueTreeNext
};
