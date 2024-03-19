import { defineComponent as We, ref as m, computed as P, onMounted as Ge, onBeforeUnmount as Qe, watchEffect as Ze, resolveComponent as et, openBlock as S, createElementBlock as x, normalizeClass as re, createElementVNode as D, Fragment as Ee, renderList as Ie, withModifiers as ne, normalizeStyle as Pe, renderSlot as y, toDisplayString as w, createCommentVNode as k, createTextVNode as oe, createBlock as tt, withCtx as _, withDirectives as lt, vShow as rt } from "vue";
const Le = (p, B) => {
  if (se(p) && se(B))
    for (const C in B)
      se(B[C]) ? (p[C] || Object.assign(p, { [C]: {} }), Le(p[C], B[C])) : Object.assign(p, { [C]: B[C] });
  return p;
}, se = (p) => p && typeof p == "object" && !Array.isArray(p), nt = {
  ref: "nodes",
  class: "sl-vue-tree-next-nodes-list"
}, ot = ["onMousedown", "onMouseup", "onContextmenu", "onDblclick", "onClick", "onDragover", "onDrop", "path"], st = { class: "sl-vue-tree-next-gap" }, it = {
  key: 0,
  class: "sl-vue-tree-next-branch"
}, at = { key: 0 }, ut = { key: 1 }, ct = { class: "sl-vue-tree-next-title" }, dt = ["onClick"], ft = { class: "sl-vue-tree-next-sidebar" }, gt = /* @__PURE__ */ We({
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
    allowToggleBranch: { type: Boolean, default: !0 },
    multiSelectKey: {},
    scrollAreaHeight: { default: 70 },
    maxScrollSpeed: { default: 20 }
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
  setup(p, { expose: B, emit: C }) {
    const c = p, ie = C, T = m(), ae = m(), F = m(null), A = m(0), X = m(0), V = m(null), Y = m(!1), E = m(!1), j = m({ x: 0, y: 0 }), z = m(!1), g = m([]), f = P(() => !c.level), ue = P(() => {
      const e = [];
      let t = c.level - 1;
      for (c.showBranches || t++; t-- > 0; )
        e.push(t);
      return e;
    }), d = P(() => {
      var t;
      return f.value ? F.value : (t = Z()) == null ? void 0 : t.cursorPosition.value;
    }), ce = P(() => ue.value.length), M = P(() => {
      var t, r, l, o;
      if (f.value) {
        const n = b(g.value);
        return fe(n);
      }
      return c.parentInd === null ? [] : (o = (l = (r = (t = Z()) == null ? void 0 : t.currentNodes) == null ? void 0 : r.value) == null ? void 0 : l[c.parentInd]) == null ? void 0 : o.children;
    }), de = P(() => ye().length);
    P(() => te().length), Ge(() => {
      f.value && document.addEventListener("mouseup", xe);
    }), Qe(() => {
      document.removeEventListener("mouseup", xe);
    }), Ze(() => {
      g.value = c.modelValue;
    });
    const L = (e) => {
      var t;
      if (f.value) {
        F.value = e;
        return;
      }
      (t = Z()) == null || t.setCursorPosition(e);
    }, fe = (e, t = [], r = !0) => e.map((l, o) => {
      const n = t.concat(o);
      return H(n, l, e, r);
    }), H = (e, t = null, r = null, l = null) => {
      const o = e.slice(-1)[0];
      if (r = r || J(g.value, e), t = t || r && r[o] || null, l == null && (l = U == null ? void 0 : U(e)), !t)
        return null;
      const n = t.isExpanded == null ? !0 : !!t.isExpanded, i = t.isDraggable == null ? !0 : !!t.isDraggable, s = t.isSelectable == null ? !0 : !!t.isSelectable;
      return {
        // define the all TreeNodeModel props
        title: t.title,
        isLeaf: !!t.isLeaf,
        children: t.children ? fe(t.children, e, n) : [],
        isSelected: !!t.isSelected,
        isExpanded: n,
        isVisible: l,
        isDraggable: i,
        isSelectable: s,
        data: t.data !== void 0 ? t.data : {},
        // define the all TreeNode computed props
        path: e,
        pathStr: JSON.stringify(e),
        level: e.length,
        ind: o,
        isFirstChild: o == 0,
        isLastChild: o == ((r == null ? void 0 : r.length) ?? 0) - 1
      };
    }, U = (e) => {
      if (e.length < 2)
        return !0;
      let t = g.value;
      for (let r = 0; r < e.length - 1; r++) {
        let l = e[r], o = t[l];
        if (!(o.isExpanded == null ? !0 : !!o.isExpanded))
          return !1;
        t = o.children || [];
      }
      return !0;
    }, O = (e) => {
      g.value = e, u().emit("update:modelValue", e);
    }, He = (e, t) => {
      u().emit("select", e, t);
    }, Te = (e, t, r) => {
      u().emit("beforedrop", e, t, r);
    }, Oe = (e, t, r) => {
      u().emit("drop", e, t, r);
    }, $e = (e, t) => {
      u().emit("toggle", e, t);
    }, Re = (e, t) => {
      u().emit("nodeclick", e, t);
    }, Ae = (e, t) => {
      u().emit("nodedblclick", e, t);
    }, Ve = (e, t) => {
      u().emit("nodecontextmenu", e, t);
    }, Ye = (e, t) => {
      t.preventDefault();
      const r = u(), l = r.getCursorPositionFromCoords(t.clientX, t.clientY);
      r.setCursorPosition(l), r.emit("externaldragover", l, t);
    }, ze = (e, t) => {
      const r = u(), l = r.getCursorPositionFromCoords(t.clientX, t.clientY);
      r.emit("externaldrop", l, t), L(null);
    }, q = (e, t = !1, r = null) => {
      const l = Array.isArray(c.multiselectKey) ? c.multiselectKey : [c.multiselectKey];
      t = (r && !!l.find((h) => r[h]) || t) && c.allowMultiselect;
      const n = H(e);
      if (!n)
        return null;
      const i = b(g.value), s = c.allowMultiselect && r && r.shiftKey && V.value, a = [];
      let v = !1;
      return N((h, I) => {
        var R;
        s ? ((h.pathStr === n.pathStr || h.pathStr === ((R = V.value) == null ? void 0 : R.pathStr)) && (I.isSelected = h.isSelectable, v = !v), v && (I.isSelected = h.isSelectable)) : h.pathStr === n.pathStr ? I.isSelected = h.isSelectable : t || I.isSelected && (I.isSelected = !1), I.isSelected && a.push(h);
      }, i), V.value = n, O(i), He(a, r), n;
    }, pe = (e) => {
      var ke, Be;
      if (!f.value) {
        (ke = u()) == null || ke.onMousemoveHandler(e);
        return;
      }
      if (z.value)
        return;
      const t = E.value, r = t || Y.value && (j.value.x !== e.clientX || j.value.y !== e.clientY), l = t === !1 && r === !0;
      if (j.value = {
        x: e.clientX,
        y: e.clientY
      }, !r)
        return;
      const o = u().ref.value, n = o.getBoundingClientRect(), i = e.clientY - n.top + o.scrollTop - Number(((Be = T.value) == null ? void 0 : Be.style.marginBottom) ?? 0), s = e.clientX - n.left;
      T.value && (T.value.style.top = i + "px", T.value.style.left = s + "px");
      const a = ge(e.clientX, e.clientY), v = a == null ? void 0 : a.node, h = a == null ? void 0 : a.placement;
      if (l && !v.isSelected && q(v.path, !1, e), !te().length) {
        z.value = !0;
        return;
      }
      E.value = r, L({ node: v, placement: h });
      const R = n.bottom - c.scrollAreaHeight, be = (e.clientY - R) / (n.bottom - R), we = n.top + c.scrollAreaHeight, De = (we - e.clientY) / (we - n.top);
      be > 0 ? Ne(be) : De > 0 ? Ne(-De) : G();
    }, ge = (e, t) => {
      const r = document.elementFromPoint(e, t), l = r != null && r.getAttribute("path") ? r : ve(r);
      let o, n;
      if (l) {
        if (!l)
          return;
        o = H(JSON.parse(l.getAttribute("path")));
        const i = l.offsetHeight, s = c.edgeSize, a = t - l.getBoundingClientRect().top;
        o.isLeaf ? n = a >= i / 2 ? "after" : "before" : a <= s ? n = "before" : a >= i - s ? n = "after" : n = "inside";
      } else {
        const s = u().ref.value.getBoundingClientRect();
        t > s.top + s.height / 2 ? (n = "after", o = he()) : (n = "before", o = W());
      }
      return { node: o, placement: n };
    }, ve = (e) => e ? e.getAttribute("path") ? e : ve(e.parentElement) : null, Je = (e) => {
      if (!f.value || !E.value)
        return;
      const r = u().ref.value.getBoundingClientRect();
      if (e.clientY >= r.bottom) {
        const l = structuredClone(M.value);
        L({ node: l[0], placement: "after" });
      } else
        e.clientY < r.top && L({ node: W(), placement: "before" });
    }, Ke = (e) => u().ref.value.querySelector(`[path="${JSON.stringify(e)}"]`), he = () => {
      let e = null;
      return N((t) => {
        e = t;
      }), e;
    }, W = () => H([0]), _e = (e, t) => {
      let r = null;
      return N((l) => {
        if (!(me(l.path, e) < 1) && (!t || t(l)))
          return r = l, !1;
      }), r;
    }, Fe = (e, t) => {
      let r = [];
      N((o) => {
        if (me(o.path, e) >= 0)
          return !1;
        r.push(o);
      });
      let l = r.length;
      for (; l--; ) {
        const o = r[l];
        if (!t || t(o))
          return o;
      }
      return null;
    }, me = (e, t) => {
      for (let r = 0; r < e.length; r++) {
        if (t[r] == null || e[r] > t[r])
          return 1;
        if (e[r] < t[r])
          return -1;
      }
      return t[e.length] == null ? 0 : -1;
    }, Se = (e, t) => {
      if (e.button === 0) {
        if (!f.value) {
          u().onNodeMousedownHandler(e, t);
          return;
        }
        Y.value = !0;
      }
    }, Ne = (e) => {
      const t = u().ref.value;
      X.value !== e && (A.value && G(), X.value = e, A.value = setInterval(() => {
        t.scrollTop += c.maxScrollSpeed * e;
      }, 20));
    }, G = () => {
      clearInterval(A.value), A.value = 0, X.value = 0;
    }, xe = (e) => {
      E.value && Q(e);
    }, Q = (e, t = null) => {
      if (e.button !== 0)
        return;
      if (!f.value) {
        u().onNodeMouseupHandler(e, t);
        return;
      }
      if (Y.value = !1, !E.value && t && !z.value && q(t.path, !1, e), z.value = !1, !d.value) {
        $();
        return;
      }
      const r = te();
      for (let s of r) {
        if (s.pathStr == d.value.node.pathStr) {
          $();
          return;
        }
        if (qe(s, d.value.node)) {
          $();
          return;
        }
      }
      const l = b(g.value), o = [];
      for (let s of r) {
        const v = J(l, s.path)[s.ind];
        o.push(v);
      }
      let n = !1;
      if (Te(r, d.value, () => n = !0), n) {
        $();
        return;
      }
      const i = [];
      for (let s of o)
        i.push(b(s)), s.toBeDeleted = !0;
      Ce(d.value, i, l), le((s, a, v) => {
        s.toBeDeleted && a.splice(v, 1);
      }, l), V.value = null, O(l), Oe(r, d.value, e), $();
    }, Xe = (e, t) => {
      c.allowToggleBranch && (ee({ path: t.path, patch: { isExpanded: !t.isExpanded } }), $e(t, e), e.stopPropagation());
    }, $ = () => {
      E.value = !1, Y.value = !1, L(null), G();
    }, Z = () => c.parentContext, u = () => f.value ? K : c.rootContext, J = (e, t) => t.length === 1 ? e : J(e[t[0]].children, t.slice(1)), ee = ({ path: e, patch: t }) => {
      if (!f.value) {
        ie("updateNode", { path: e, patch: t });
        return;
      }
      const r = JSON.stringify(e), l = b(g.value);
      N((o, n) => {
        if (o.pathStr === r)
          return Le(n, t), !1;
      }, l), O(l);
    }, ye = () => {
      const e = [];
      return N((t) => {
        t.isSelected && e.push(t);
      }), e;
    }, je = (e, t) => JSON.stringify(e.path.slice(0, t.path.length)) === t.pathStr, te = () => {
      const e = [];
      return N((t) => {
        t.isSelected && t.isDraggable && (e.some((l) => je(t, l)) || e.push(t));
      }), e;
    }, N = (e, t = null, r = []) => {
      t || (t = g.value);
      let l = !1;
      const o = [];
      for (let n = 0; n < t.length; n++) {
        const i = t[n], s = r.concat(n), a = H(s, i, t);
        if (l = e(a, i, t) === !1, a && o.push(a), l || i.children && (l = N(e, i.children, s) === !1, l))
          break;
      }
      return l ? !1 : o;
    }, le = (e, t) => {
      let r = t.length;
      for (; r--; ) {
        const l = t[r];
        l.children && le(e, l.children), e(l, t, r);
      }
      return t;
    }, Me = (e) => {
      const t = e.map((l) => JSON.stringify(l)), r = b(g.value);
      N((l, o, n) => {
        for (const i of t)
          l.pathStr === i && (o.toBeDeleted = !0);
      }, r), le((l, o, n) => {
        l.toBeDeleted && o.splice(n, 1);
      }, r), O(r);
    }, Ce = (e, t, r) => {
      const l = b(e), o = l.node, n = J(r, o.path), i = n[o.ind];
      if (l.placement === "inside")
        i.children = i.children || [], i.children.unshift(...t);
      else {
        const s = l.placement === "before" ? o.ind : o.ind + 1;
        n.splice(s, 0, ...t);
      }
    }, Ue = (e, t) => {
      const r = Array.isArray(t) ? t : [t], l = b(g.value);
      Ce(e, r, l), O(l);
    }, qe = (e, t) => {
      const l = b(t).path;
      return JSON.stringify(l.slice(0, e.path.length)) == e.pathStr;
    }, b = (e) => JSON.parse(JSON.stringify(e)), K = {
      getRoot: u,
      setCursorPosition: L,
      currentNodes: M,
      cursorPosition: d,
      emit: ie,
      ref: ae,
      onNodeMousedownHandler: Se,
      onNodeMouseupHandler: Q,
      onMousemoveHandler: pe,
      getCursorPositionFromCoords: ge,
      updateNode: ee,
      getNode: H,
      traverse: N,
      select: q,
      getNodeEl: Ke,
      getFirstNode: W,
      getLastNode: he,
      getNextNode: _e,
      getPrevNode: Fe,
      getSelected: ye,
      insert: Ue,
      remove: Me,
      rootCursorPosition: F,
      selectionSize: de
    };
    return B(K), (e, t) => {
      const r = et("SlVueTreeNext", !0);
      return S(), x("div", {
        ref_key: "rootRef",
        ref: ae,
        class: re(["sl-vue-tree-next", { "sl-vue-tree-next-root": f.value }]),
        onMousemove: pe,
        onMouseleave: Je
      }, [
        D("div", nt, [
          (S(!0), x(Ee, null, Ie(M.value, (l, o) => (S(), x("div", {
            class: re(["sl-vue-tree-next-node", { "sl-vue-tree-next-selected": l.isSelected }])
          }, [
            D("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_before",
              onDragover: t[0] || (t[0] = ne(() => {
              }, ["prevent"])),
              style: Pe({
                visibility: d.value && d.value.node.pathStr === l.pathStr && d.value.placement === "before" ? "visible" : "hidden",
                "--depth": ce.value
              })
            }, null, 36),
            D("div", {
              class: re(["sl-vue-tree-next-node-item", {
                "sl-vue-tree-next-cursor-hover": d.value && d.value.node.pathStr === l.pathStr,
                "sl-vue-tree-next-cursor-inside": d.value && d.value.placement === "inside" && d.value.node.pathStr === l.pathStr,
                "sl-vue-tree-next-node-is-leaf": l.isLeaf,
                "sl-vue-tree-next-node-is-folder": !l.isLeaf
              }]),
              onMousedown: (n) => Se(n, l),
              onMouseup: (n) => Q(n, l),
              onContextmenu: (n) => Ve(l, n),
              onDblclick: (n) => Ae(l, n),
              onClick: (n) => Re(l, n),
              onDragover: (n) => Ye(l, n),
              onDrop: (n) => ze(l, n),
              path: l.pathStr
            }, [
              (S(!0), x(Ee, null, Ie(ue.value, (n) => (S(), x("div", st))), 256)),
              e.level && e.showBranches ? (S(), x("div", it, [
                y(e.$slots, "branch", { node: l }, () => [
                  l.isLastChild ? k("", !0) : (S(), x("span", at, w("├") + w("─") + "  ", 1)),
                  l.isLastChild ? (S(), x("span", ut, w("└") + w("─") + "  ", 1)) : k("", !0)
                ])
              ])) : k("", !0),
              D("div", ct, [
                l.isLeaf ? k("", !0) : (S(), x("span", {
                  key: 0,
                  class: "sl-vue-tree-next-toggle",
                  onClick: (n) => Xe(n, l)
                }, [
                  y(e.$slots, "toggle", { node: l }, () => [
                    D("span", null, w(l.isLeaf ? "" : l.isExpanded ? "-" : "+"), 1)
                  ])
                ], 8, dt)),
                y(e.$slots, "title", { node: l }, () => [
                  oe(w(l.title), 1)
                ]),
                !l.isLeaf && l.children.length == 0 && l.isExpanded ? y(e.$slots, "empty-node", {
                  key: 1,
                  node: l
                }) : k("", !0)
              ]),
              D("div", ft, [
                y(e.$slots, "sidebar", { node: l })
              ])
            ], 42, ot),
            l.children && l.children.length && l.isExpanded ? (S(), tt(r, {
              key: 0,
              "model-value": l.children,
              level: l.level,
              "parent-ind": o,
              "allow-multiselect": e.allowMultiselect,
              "allow-toggle-branch": e.allowToggleBranch,
              "edge-size": e.edgeSize,
              "show-branches": e.showBranches,
              "parent-context": K,
              "root-context": f.value ? K : e.rootContext,
              onUpdateNode: ee,
              onDragover: t[1] || (t[1] = ne(() => {
              }, ["prevent"]))
            }, {
              title: _(({ node: n }) => [
                y(e.$slots, "title", { node: n }, () => [
                  oe(w(n.title), 1)
                ])
              ]),
              toggle: _(({ node: n }) => [
                y(e.$slots, "toggle", { node: n }, () => [
                  D("span", null, w(n.isLeaf ? "" : n.isExpanded ? "-" : "+"), 1)
                ])
              ]),
              sidebar: _(({ node: n }) => [
                y(e.$slots, "sidebar", { node: n })
              ]),
              "empty-node": _(({ node: n }) => [
                !n.isLeaf && n.children.length == 0 && n.isExpanded ? y(e.$slots, "empty-node", {
                  key: 0,
                  node: n
                }) : k("", !0)
              ]),
              _: 2
            }, 1032, ["model-value", "level", "parent-ind", "allow-multiselect", "allow-toggle-branch", "edge-size", "show-branches", "root-context"])) : k("", !0),
            D("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_after",
              onDragover: t[2] || (t[2] = ne(() => {
              }, ["prevent"])),
              style: Pe({
                visibility: d.value && d.value.node.pathStr === l.pathStr && d.value.placement === "after" ? "visible" : "hidden",
                "--depth": ce.value
              })
            }, null, 36)
          ], 2))), 256)),
          f.value ? lt((S(), x("div", {
            key: 0,
            ref_key: "dragInfoRef",
            ref: T,
            class: "sl-vue-tree-next-drag-info"
          }, [
            y(e.$slots, "draginfo", {}, () => [
              oe(" Items: " + w(de.value), 1)
            ])
          ], 512)), [
            [rt, E.value]
          ]) : k("", !0)
        ], 512)
      ], 34);
    };
  }
});
export {
  gt as SlVueTreeNext
};
