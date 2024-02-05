import { defineComponent as Fe, ref as m, computed as E, onMounted as Je, onBeforeUnmount as Ke, watchEffect as Xe, resolveComponent as je, openBlock as S, createElementBlock as N, normalizeClass as q, createElementVNode as p, Fragment as be, renderList as Ce, withModifiers as G, normalizeStyle as ye, renderSlot as b, toDisplayString as C, createCommentVNode as y, createTextVNode as Q, createBlock as Me, withCtx as Ue, withDirectives as We, vShow as qe } from "vue";
const Ge = ["onMousedown", "onMouseup", "onContextmenu", "onDblclick", "onClick", "onDragover", "onDrop", "path"], Qe = { class: "sl-vue-tree-gap" }, Ze = {
  key: 0,
  class: "sl-vue-tree-branch"
}, et = { key: 0 }, tt = { key: 1 }, lt = { class: "sl-vue-tree-title" }, st = ["onClick"], ot = { class: "sl-vue-tree-sidebar" }, rt = {
  slot: "title",
  "slot-scope": "{ node }"
}, nt = {
  slot: "toggle",
  "slot-scope": "{ node }"
}, at = {
  slot: "sidebar",
  "slot-scope": "{ node }"
}, it = {
  slot: "empty-node",
  "slot-scope": "{ node }"
}, ct = /* @__PURE__ */ Fe({
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
  setup(we, { expose: De, emit: ke }) {
    const u = we, Z = ke, B = m(), ee = m(), te = m(null), H = m(0), O = m(0), R = m(null), $ = m(!1), w = m(!1), F = m({ x: 0, y: 0 }), Y = m(!1), g = m([]), f = E(() => !u.level), le = E(() => {
      const e = [];
      let t = u.level - 1;
      for (u.showBranches || t++; t-- > 0; )
        e.push(t);
      return e;
    }), c = E(() => {
      var t;
      return f.value ? te.value : (t = j()) == null ? void 0 : t.cursorPosition.value;
    }), se = E(() => le.value.length), V = E(() => {
      var t, s, l, r;
      if (f.value) {
        const o = k(g.value);
        return oe(o);
      }
      return u.parentInd === null ? [] : (r = (l = (s = (t = j()) == null ? void 0 : t.nodes) == null ? void 0 : s.value) == null ? void 0 : l[u.parentInd]) == null ? void 0 : r.children;
    }), xe = E(() => pe().length);
    E(() => U().length), Je(() => {
      f.value && document.addEventListener("mouseup", fe);
    }), Ke(() => {
      document.removeEventListener("mouseup", fe);
    }), Xe(() => {
      g.value = u.modelValue;
    });
    const I = (e) => {
      var t;
      if (f.value) {
        te.value = e;
        return;
      }
      (t = j()) == null || t.setCursorPosition(e);
    }, oe = (e, t = [], s = !0) => e.map((l, r) => {
      const o = t.concat(r);
      return L(o, l, e, s);
    }), L = (e, t = null, s = null, l = !1) => {
      const r = e.slice(-1)[0];
      if (s = s || z(g.value, e), t = t || s && s[r] || null, l == null && (l = J == null ? void 0 : J(e)), !t)
        return null;
      const o = t.isExpanded == null ? !0 : !!t.isExpanded, a = t.isDraggable == null ? !0 : !!t.isDraggable, n = t.isSelectable == null ? !0 : !!t.isSelectable;
      return {
        // define the all ISlTreeNodeModel props
        title: t.title,
        isLeaf: !!t.isLeaf,
        children: t.children ? oe(t.children, e, o) : [],
        isSelected: !!t.isSelected,
        isExpanded: o,
        visible: l,
        isDraggable: a,
        isSelectable: n,
        data: t.data !== void 0 ? t.data : {},
        // define the all ISlTreeNode computed props
        path: e,
        pathStr: JSON.stringify(e),
        level: e.length,
        ind: r,
        isFirstChild: r == 0,
        isLastChild: r == ((s == null ? void 0 : s.length) ?? 0) - 1
      };
    }, J = (e) => {
      if (e.length < 2)
        return !0;
      let t = g.value;
      for (let s = 0; s < e.length - 1; s++) {
        let l = e[s], r = t[l];
        if (!(r.isExpanded == null ? !0 : !!r.isExpanded))
          return !1;
        t = r.children || [];
      }
      return !0;
    }, P = (e) => {
      Object.assign(g.value, e), d().emit("update:modelValue", e);
    }, Ee = (e, t) => {
      d().emit("select", e, t);
    }, Ie = (e, t, s) => {
      d().emit("beforedrop", e, t, s);
    }, Be = (e, t, s) => {
      d().emit("drop", e, t, s);
    }, Le = (e, t) => {
      d().emit("toggle", e, t);
    }, Pe = (e, t) => {
      d().emit("nodeclick", e, t);
    }, Te = (e, t) => {
      d().emit("nodedblclick", e, t);
    }, _e = (e, t) => {
      d().emit("nodecontextmenu", e, t);
    }, He = (e, t) => {
      t.preventDefault();
      const s = d(), l = s.getCursorPositionFromCoords(t.clientX, t.clientY);
      s.setCursorPosition(l), s.emit("externaldragover", l, t);
    }, Re = (e, t) => {
      const s = d(), l = s.getCursorPositionFromCoords(t.clientX, t.clientY);
      s.emit("externaldrop", l, t), I(null);
    }, re = (e, t = !1, s = null) => {
      const l = Array.isArray(u.multiselectKey) ? u.multiselectKey : [u.multiselectKey];
      t = (s && !!l.find((h) => s[h]) || t) && u.allowMultiselect;
      const o = L(e);
      if (!o)
        return null;
      const a = k(g.value), n = u.allowMultiselect && s && s.shiftKey && R.value, i = [];
      let v = !1;
      return D((h, x) => {
        var _;
        n ? ((h.pathStr === o.pathStr || h.pathStr === ((_ = R.value) == null ? void 0 : _.pathStr)) && (x.isSelected = h.isSelectable, v = !v), v && (x.isSelected = h.isSelectable)) : h.pathStr === o.pathStr ? x.isSelected = h.isSelectable : t || x.isSelected && (x.isSelected = !1), x.isSelected && i.push(h);
      }, a), R.value = o, P(a), Ee(i, s), o;
    }, ne = (e) => {
      var Se, Ne;
      if (!f.value) {
        (Se = d()) == null || Se.onMousemoveHandler(e);
        return;
      }
      if (Y.value)
        return;
      const t = w.value, s = t || $.value && (F.value.x !== e.clientX || F.value.y !== e.clientY), l = t === !1 && s === !0;
      if (F.value = {
        x: e.clientX,
        y: e.clientY
      }, !s)
        return;
      const r = d().ref.value, o = r.getBoundingClientRect(), a = e.clientY - o.top + r.scrollTop - Number(((Ne = B.value) == null ? void 0 : Ne.style.marginBottom) ?? 0), n = e.clientX - o.left;
      B.value && (B.value.style.top = a + "px", B.value.style.left = n + "px");
      const i = ae(e.clientX, e.clientY), v = i == null ? void 0 : i.node, h = i == null ? void 0 : i.placement;
      if (l && !v.isSelected && re(v.path, !1, e), !U().length) {
        Y.value = !0;
        return;
      }
      w.value = s, I({ node: v, placement: h });
      const _ = o.bottom - u.scrollAreaHeight, ve = (e.clientY - _) / (o.bottom - _), he = o.top + u.scrollAreaHeight, me = (he - e.clientY) / (he - o.top);
      ve > 0 ? de(ve) : me > 0 ? de(-me) : K();
    }, ae = (e, t) => {
      const s = document.elementFromPoint(e, t), l = s != null && s.getAttribute("path") ? s : ie(s);
      let r, o;
      if (l) {
        if (!l)
          return;
        r = L(JSON.parse(l.getAttribute("path")));
        const a = l.offsetHeight, n = u.edgeSize, i = t - l.getBoundingClientRect().top;
        r.isLeaf ? o = i >= a / 2 ? "after" : "before" : i <= n ? o = "before" : i >= a - n ? o = "after" : o = "inside";
      } else {
        const n = d().ref.value.getBoundingClientRect();
        t > n.top + n.height / 2 ? (o = "after", r = Ye()) : (o = "before", r = ue());
      }
      return { node: r, placement: o };
    }, ie = (e) => e ? e.getAttribute("path") ? e : ie(e.parentElement) : null, $e = (e) => {
      if (!f.value || !w.value)
        return;
      const s = d().ref.value.getBoundingClientRect();
      e.clientY >= s.bottom ? I({ node: V.value.slice(-1)[0], placement: "after" }) : e.clientY < s.top && I({ node: ue(), placement: "before" });
    }, Ye = () => {
      let e = null;
      return D((t) => {
        e = t;
      }), e;
    }, ue = () => L([0]), ce = (e, t) => {
      if (e.button === 0) {
        if (!f.value) {
          d().onNodeMousedownHandler(e, t);
          return;
        }
        $.value = !0;
      }
    }, de = (e) => {
      const t = d().ref.value;
      O.value !== e && (H.value && K(), O.value = e, H.value = setInterval(() => {
        t.scrollTop += u.maxScrollSpeed * e;
      }, 20));
    }, K = () => {
      clearInterval(H.value), H.value = 0, O.value = 0;
    }, fe = (e) => {
      w.value && X(e);
    }, X = (e, t = null) => {
      if (e.button !== 0)
        return;
      if (!f.value) {
        d().onNodeMouseupHandler(e, t);
        return;
      }
      if ($.value = !1, !w.value && t && !Y.value && re(t.path, !1, e), Y.value = !1, !c.value) {
        T();
        return;
      }
      const s = U();
      for (let n of s) {
        if (n.pathStr == c.value.node.pathStr) {
          T();
          return;
        }
        if (Oe(n, c.value.node)) {
          T();
          return;
        }
      }
      const l = k(g.value), r = [];
      for (let n of s) {
        const v = z(l, n.path)[n.ind];
        r.push(v);
      }
      let o = !1;
      if (Ie(s, c.value, () => o = !0), o) {
        T();
        return;
      }
      const a = [];
      for (let n of r)
        a.push(k(n)), n._markToDelete = !0;
      ge(c.value, a, l), W((n, i, v) => {
        n._markToDelete && i.splice(v, 1);
      }, l), R.value = null, P(l), Be(s, c.value, e), T();
    }, Ve = (e, t) => {
      u.allowToggleBranch && (M({ path: t.path, patch: { isExpanded: !t.isExpanded } }), Le(t, e), e.stopPropagation());
    }, T = () => {
      w.value = !1, $.value = !1, I(null), K();
    }, j = () => u.parentContext, d = () => f.value ? A : u.rootContext, z = (e, t) => t.length === 1 ? e : z(e[t[0]].children, t.slice(1)), M = ({ path: e, patch: t }) => {
      f.value || Z("updateNode", { path: e, patch: t });
      const s = JSON.stringify(e), l = k(g.value);
      D((r, o) => {
        r.pathStr === s && Object.assign(o, t);
      }, l), P(l);
    }, pe = () => {
      const e = [];
      return D((t) => {
        t.isSelected && e.push(t);
      }), e;
    }, U = () => {
      const e = [];
      return D((t) => {
        t.isSelected && t.isDraggable && e.push(t);
      }), e;
    }, D = (e, t = null, s = []) => {
      t || (t = g.value);
      let l = !1;
      const r = [];
      for (let o = 0; o < t.length; o++) {
        const a = t[o], n = s.concat(o), i = L(n, a, t);
        if (l = e(i, a, t) === !1, i && r.push(i), l || a.children && (l = D(e, a.children, n) === !1, l))
          break;
      }
      return l ? !1 : r;
    }, W = (e, t) => {
      let s = t.length;
      for (; s--; ) {
        const l = t[s];
        l.children && W(e, l.children), e(l, t, s);
      }
      return t;
    }, ze = (e) => {
      const t = e.map((l) => JSON.stringify(l)), s = k(g.value);
      D((l, r, o) => {
        for (const a of t)
          l.pathStr === a && (r._markToDelete = !0);
      }, s), W((l, r, o) => {
        l._markToDelete && r.splice(o, 1);
      }, s), P(s);
    }, ge = (e, t, s) => {
      const l = e.node, r = z(s, l.path), o = r[l.ind];
      if (e.placement === "inside")
        o.children = o.children || [], o.children.unshift(...t);
      else {
        const a = e.placement === "before" ? l.ind : l.ind + 1;
        r.splice(a, 0, ...t);
      }
    }, Ae = (e, t) => {
      const s = Array.isArray(t) ? t : [t], l = k(g.value);
      ge(e, s, l), P(l);
    }, Oe = (e, t) => {
      const s = t.path;
      return JSON.stringify(s.slice(0, e.path.length)) == e.pathStr;
    }, k = (e) => JSON.parse(JSON.stringify(e)), A = {
      getRoot: d,
      setCursorPosition: I,
      nodes: V,
      cursorPosition: c,
      emit: Z,
      ref: ee,
      onNodeMousedownHandler: ce,
      onNodeMouseupHandler: X,
      onMousemoveHandler: ne,
      getCursorPositionFromCoords: ae,
      updateNode: M,
      getSelected: pe,
      insert: Ae,
      remove: ze
    };
    return De(A), (e, t) => {
      const s = je("SlVueTreeNext", !0);
      return S(), N("div", {
        ref_key: "rootRef",
        ref: ee,
        class: q(["sl-vue-tree", { "sl-vue-tree-root": f.value }]),
        onMousemove: ne,
        onMouseleave: $e
      }, [
        p("div", {
          ref_key: "nodes",
          ref: V,
          class: "sl-vue-tree-nodes-list"
        }, [
          (S(!0), N(be, null, Ce(V.value, (l, r) => (S(), N("div", {
            class: q(["sl-vue-tree-node", { "sl-vue-tree-selected": l.isSelected }])
          }, [
            p("div", {
              class: "sl-vue-tree-cursor sl-vue-tree-cursor_before",
              onDragover: t[0] || (t[0] = G(() => {
              }, ["prevent"])),
              style: ye({
                visibility: c.value && c.value.node.pathStr === l.pathStr && c.value.placement === "before" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36),
            p("div", {
              class: q(["sl-vue-tree-node-item", {
                "sl-vue-tree-cursor-hover": c.value && c.value.node.pathStr === l.pathStr,
                "sl-vue-tree-cursor-inside": c.value && c.value.placement === "inside" && c.value.node.pathStr === l.pathStr,
                "sl-vue-tree-node-is-leaf": l.isLeaf,
                "sl-vue-tree-node-is-folder": !l.isLeaf
              }]),
              onMousedown: (o) => ce(o, l),
              onMouseup: (o) => X(o, l),
              onContextmenu: (o) => _e(l, o),
              onDblclick: (o) => Te(l, o),
              onClick: (o) => Pe(l, o),
              onDragover: (o) => He(l, o),
              onDrop: (o) => Re(l, o),
              path: l.pathStr
            }, [
              (S(!0), N(be, null, Ce(le.value, (o) => (S(), N("div", Qe))), 256)),
              e.level && e.showBranches ? (S(), N("div", Ze, [
                b(e.$slots, "branch", { node: l }, () => [
                  l.isLastChild ? y("", !0) : (S(), N("span", et, C("├") + C("─") + "  ", 1)),
                  l.isLastChild ? (S(), N("span", tt, C("└") + C("─") + "  ", 1)) : y("", !0)
                ])
              ])) : y("", !0),
              p("div", lt, [
                l.isLeaf ? y("", !0) : (S(), N("span", {
                  key: 0,
                  class: "sl-vue-tree-toggle",
                  onClick: (o) => Ve(o, l)
                }, [
                  b(e.$slots, "toggle", { node: l }, () => [
                    p("span", null, C(l.isLeaf ? "" : l.isExpanded ? "-" : "+"), 1)
                  ])
                ], 8, st)),
                b(e.$slots, "title", { node: l }, () => [
                  Q(C(l.title), 1)
                ]),
                !l.isLeaf && l.children.length == 0 && l.isExpanded ? b(e.$slots, "empty-node", {
                  key: 1,
                  node: l
                }) : y("", !0)
              ]),
              p("div", ot, [
                b(e.$slots, "sidebar", { node: l })
              ])
            ], 42, Ge),
            l.children && l.children.length && l.isExpanded ? (S(), Me(s, {
              key: 0,
              "model-value": l.children,
              level: l.level,
              "parent-ind": r,
              "allow-multiselect": e.allowMultiselect,
              "allow-toggle-branch": e.allowToggleBranch,
              "edge-size": e.edgeSize,
              "show-branches": e.showBranches,
              "parent-context": A,
              "root-context": f.value ? A : e.rootContext,
              onUpdateNode: M,
              onDragover: t[1] || (t[1] = G(() => {
              }, ["prevent"]))
            }, {
              default: Ue(() => [
                p("template", rt, [
                  b(e.$slots, "title", { node: l }, () => [
                    Q(C(l.title), 1)
                  ])
                ]),
                p("template", nt, [
                  b(e.$slots, "toggle", { node: l }, () => [
                    p("span", null, C(l.isLeaf ? "" : l.isExpanded ? "-" : "+"), 1)
                  ])
                ]),
                p("template", at, [
                  b(e.$slots, "sidebar", { node: l })
                ]),
                p("template", it, [
                  !l.isLeaf && l.children.length == 0 && l.isExpanded ? b(e.$slots, "empty-node", {
                    key: 0,
                    node: l
                  }) : y("", !0)
                ])
              ]),
              _: 2
            }, 1032, ["model-value", "level", "parent-ind", "allow-multiselect", "allow-toggle-branch", "edge-size", "show-branches", "root-context"])) : y("", !0),
            p("div", {
              class: "sl-vue-tree-cursor sl-vue-tree-cursor_after",
              onDragover: t[2] || (t[2] = G(() => {
              }, ["prevent"])),
              style: ye({
                visibility: c.value && c.value.node.pathStr === l.pathStr && c.value.placement === "after" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36)
          ], 2))), 256)),
          f.value ? We((S(), N("div", {
            key: 0,
            ref_key: "dragInfoRef",
            ref: B,
            class: "sl-vue-tree-drag-info"
          }, [
            b(e.$slots, "draginfo", {}, () => [
              Q(" Items: " + C(xe.value), 1)
            ])
          ], 512)), [
            [qe, w.value]
          ]) : y("", !0)
        ], 512)
      ], 34);
    };
  }
});
export {
  ct as SlVueTreeNext
};
