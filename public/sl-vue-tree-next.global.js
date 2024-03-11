const Ue = window.Vue.defineComponent, be = window.Vue.renderList, Ve = window.Vue.Fragment, h = window.Vue.openBlock, w = window.Vue.createElementBlock, ee = window.Vue.withModifiers, De = window.Vue.normalizeStyle, y = window.Vue.createElementVNode, N = window.Vue.renderSlot, C = window.Vue.toDisplayString, b = window.Vue.createCommentVNode, te = window.Vue.createTextVNode, oe = window.Vue.normalizeClass, je = window.Vue.resolveComponent, A = window.Vue.withCtx, qe = window.Vue.createBlock, We = window.Vue.vShow, Ge = window.Vue.withDirectives, Qe = {
  ref: "nodes",
  class: "sl-vue-tree-next-nodes-list"
}, Ze = ["onMousedown", "onMouseup", "onContextmenu", "onDblclick", "onClick", "onDragover", "onDrop", "path"], et = { class: "sl-vue-tree-next-gap" }, tt = {
  key: 0,
  class: "sl-vue-tree-next-branch"
}, ot = { key: 0 }, nt = { key: 1 }, lt = { class: "sl-vue-tree-next-title" }, rt = ["onClick"], st = { class: "sl-vue-tree-next-sidebar" }, m = window.Vue.ref, it = window.Vue.onMounted, at = window.Vue.onBeforeUnmount, ut = window.Vue.watchEffect, k = window.Vue.computed, ct = /* @__PURE__ */ Ue({
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
  setup(ke, { expose: Be, emit: Ee }) {
    const c = ke, ne = Ee, _ = m(), le = m(), O = m(null), H = m(0), F = m(0), T = m(null), $ = m(!1), V = m(!1), J = m({ x: 0, y: 0 }), R = m(!1), p = m([]), f = k(() => !c.level), re = k(() => {
      const e = [];
      let t = c.level - 1;
      for (c.showBranches || t++; t-- > 0; )
        e.push(t);
      return e;
    }), d = k(() => {
      var t;
      return f.value ? O.value : (t = W()) == null ? void 0 : t.cursorPosition.value;
    }), se = k(() => re.value.length), K = k(() => {
      var t, n, o, r;
      if (f.value) {
        const l = x(p.value);
        return ae(l);
      }
      return c.parentInd === null ? [] : (r = (o = (n = (t = W()) == null ? void 0 : t.currentNodes) == null ? void 0 : n.value) == null ? void 0 : o[c.parentInd]) == null ? void 0 : r.children;
    }), ie = k(() => me().length);
    k(() => Q().length), it(() => {
      f.value && document.addEventListener("mouseup", he);
    }), at(() => {
      document.removeEventListener("mouseup", he);
    }), ut(() => {
      p.value = c.modelValue;
    });
    const B = (e) => {
      var t;
      if (f.value) {
        O.value = e;
        return;
      }
      (t = W()) == null || t.setCursorPosition(e);
    }, ae = (e, t = [], n = !0) => e.map((o, r) => {
      const l = t.concat(r);
      return E(l, o, e, n);
    }), E = (e, t = null, n = null, o = null) => {
      const r = e.slice(-1)[0];
      if (n = n || z(p.value, e), t = t || n && n[r] || null, o == null && (o = X == null ? void 0 : X(e)), !t)
        return null;
      const l = t.isExpanded == null ? !0 : !!t.isExpanded, i = t.isDraggable == null ? !0 : !!t.isDraggable, s = t.isSelectable == null ? !0 : !!t.isSelectable;
      return {
        // define the all TreeNodeModel props
        title: t.title,
        isLeaf: !!t.isLeaf,
        children: t.children ? ae(t.children, e, l) : [],
        isSelected: !!t.isSelected,
        isExpanded: l,
        isVisible: o,
        isDraggable: i,
        isSelectable: s,
        data: t.data !== void 0 ? t.data : {},
        // define the all TreeNode computed props
        path: e,
        pathStr: JSON.stringify(e),
        level: e.length,
        ind: r,
        isFirstChild: r == 0,
        isLastChild: r == ((n == null ? void 0 : n.length) ?? 0) - 1
      };
    }, X = (e) => {
      if (e.length < 2)
        return !0;
      let t = p.value;
      for (let n = 0; n < e.length - 1; n++) {
        let o = e[n], r = t[o];
        if (!(r.isExpanded == null ? !0 : !!r.isExpanded))
          return !1;
        t = r.children || [];
      }
      return !0;
    }, I = (e) => {
      p.value = e, u().emit("update:modelValue", e);
    }, _e = (e, t) => {
      u().emit("select", e, t);
    }, Ie = (e, t, n) => {
      u().emit("beforedrop", e, t, n);
    }, Pe = (e, t, n) => {
      u().emit("drop", e, t, n);
    }, Le = (e, t) => {
      u().emit("toggle", e, t);
    }, He = (e, t) => {
      u().emit("nodeclick", e, t);
    }, Te = (e, t) => {
      u().emit("nodedblclick", e, t);
    }, $e = (e, t) => {
      u().emit("nodecontextmenu", e, t);
    }, Re = (e, t) => {
      t.preventDefault();
      const n = u(), o = n.getCursorPositionFromCoords(t.clientX, t.clientY);
      n.setCursorPosition(o), n.emit("externaldragover", o, t);
    }, ze = (e, t) => {
      const n = u(), o = n.getCursorPositionFromCoords(t.clientX, t.clientY);
      n.emit("externaldrop", o, t), B(null);
    }, M = (e, t = !1, n = null) => {
      const o = Array.isArray(c.multiselectKey) ? c.multiselectKey : [c.multiselectKey];
      t = (n && !!o.find((v) => n[v]) || t) && c.allowMultiselect;
      const l = E(e);
      if (!l)
        return null;
      const i = x(p.value), s = c.allowMultiselect && n && n.shiftKey && T.value, a = [];
      let g = !1;
      return S((v, D) => {
        var L;
        s ? ((v.pathStr === l.pathStr || v.pathStr === ((L = T.value) == null ? void 0 : L.pathStr)) && (D.isSelected = v.isSelectable, g = !g), g && (D.isSelected = v.isSelectable)) : v.pathStr === l.pathStr ? D.isSelected = v.isSelectable : t || D.isSelected && (D.isSelected = !1), D.isSelected && a.push(v);
      }, i), T.value = l, I(i), _e(a, n), l;
    }, ue = (e) => {
      var Ce, ye;
      if (!f.value) {
        (Ce = u()) == null || Ce.onMousemoveHandler(e);
        return;
      }
      if (R.value)
        return;
      const t = V.value, n = t || $.value && (J.value.x !== e.clientX || J.value.y !== e.clientY), o = t === !1 && n === !0;
      if (J.value = {
        x: e.clientX,
        y: e.clientY
      }, !n)
        return;
      const r = u().ref.value, l = r.getBoundingClientRect(), i = e.clientY - l.top + r.scrollTop - Number(((ye = _.value) == null ? void 0 : ye.style.marginBottom) ?? 0), s = e.clientX - l.left;
      _.value && (_.value.style.top = i + "px", _.value.style.left = s + "px");
      const a = ce(e.clientX, e.clientY), g = a == null ? void 0 : a.node, v = a == null ? void 0 : a.placement;
      if (o && !g.isSelected && M(g.path, !1, e), !Q().length) {
        R.value = !0;
        return;
      }
      V.value = n, B({ node: g, placement: v });
      const L = l.bottom - c.scrollAreaHeight, we = (e.clientY - L) / (l.bottom - L), Ne = l.top + c.scrollAreaHeight, xe = (Ne - e.clientY) / (Ne - l.top);
      we > 0 ? ve(we) : xe > 0 ? ve(-xe) : j();
    }, ce = (e, t) => {
      const n = document.elementFromPoint(e, t), o = n != null && n.getAttribute("path") ? n : de(n);
      let r, l;
      if (o) {
        if (!o)
          return;
        r = E(JSON.parse(o.getAttribute("path")));
        const i = o.offsetHeight, s = c.edgeSize, a = t - o.getBoundingClientRect().top;
        r.isLeaf ? l = a >= i / 2 ? "after" : "before" : a <= s ? l = "before" : a >= i - s ? l = "after" : l = "inside";
      } else {
        const s = u().ref.value.getBoundingClientRect();
        t > s.top + s.height / 2 ? (l = "after", r = fe()) : (l = "before", r = U());
      }
      return { node: r, placement: l };
    }, de = (e) => e ? e.getAttribute("path") ? e : de(e.parentElement) : null, Ye = (e) => {
      if (!f.value || !V.value)
        return;
      const n = u().ref.value.getBoundingClientRect();
      if (e.clientY >= n.bottom) {
        const o = structuredClone(K.value);
        B({ node: o[0], placement: "after" });
      } else
        e.clientY < n.top && B({ node: U(), placement: "before" });
    }, Ae = (e) => u().ref.value.querySelector(`[path="${JSON.stringify(e)}"]`), fe = () => {
      let e = null;
      return S((t) => {
        e = t;
      }), e;
    }, U = () => E([0]), Oe = (e, t) => {
      let n = null;
      return S((o) => {
        if (!(pe(o.path, e) < 1) && (!t || t(o)))
          return n = o, !1;
      }), n;
    }, Fe = (e, t) => {
      let n = [];
      S((r) => {
        if (pe(r.path, e) >= 0)
          return !1;
        n.push(r);
      });
      let o = n.length;
      for (; o--; ) {
        const r = n[o];
        if (!t || t(r))
          return r;
      }
      return null;
    }, pe = (e, t) => {
      for (let n = 0; n < e.length; n++) {
        if (t[n] == null || e[n] > t[n])
          return 1;
        if (e[n] < t[n])
          return -1;
      }
      return t[e.length] == null ? 0 : -1;
    }, ge = (e, t) => {
      if (e.button === 0) {
        if (!f.value) {
          u().onNodeMousedownHandler(e, t);
          return;
        }
        $.value = !0;
      }
    }, ve = (e) => {
      const t = u().ref.value;
      F.value !== e && (H.value && j(), F.value = e, H.value = setInterval(() => {
        t.scrollTop += c.maxScrollSpeed * e;
      }, 20));
    }, j = () => {
      clearInterval(H.value), H.value = 0, F.value = 0;
    }, he = (e) => {
      V.value && q(e);
    }, q = (e, t = null) => {
      if (e.button !== 0)
        return;
      if (!f.value) {
        u().onNodeMouseupHandler(e, t);
        return;
      }
      if ($.value = !1, !V.value && t && !R.value && M(t.path, !1, e), R.value = !1, !d.value) {
        P();
        return;
      }
      const n = Q();
      for (let s of n) {
        if (s.pathStr == d.value.node.pathStr) {
          P();
          return;
        }
        if (Me(s, d.value.node)) {
          P();
          return;
        }
      }
      const o = x(p.value), r = [];
      for (let s of n) {
        const g = z(o, s.path)[s.ind];
        r.push(g);
      }
      let l = !1;
      if (Ie(n, d.value, () => l = !0), l) {
        P();
        return;
      }
      const i = [];
      for (let s of r)
        i.push(x(s)), s.toBeDeleted = !0;
      Se(d.value, i, o), Z((s, a, g) => {
        s.toBeDeleted && a.splice(g, 1);
      }, o), T.value = null, I(o), Pe(n, d.value, e), P();
    }, Je = (e, t) => {
      c.allowToggleBranch && (G({ path: t.path, patch: { isExpanded: !t.isExpanded } }), Le(t, e), e.stopPropagation());
    }, P = () => {
      V.value = !1, $.value = !1, B(null), j();
    }, W = () => c.parentContext, u = () => f.value ? Y : c.rootContext, z = (e, t) => t.length === 1 ? e : z(e[t[0]].children, t.slice(1)), G = ({ path: e, patch: t }) => {
      if (!f.value) {
        ne("updateNode", { path: e, patch: t });
        return;
      }
      const n = JSON.stringify(e), o = x(p.value);
      S((r, l) => {
        if (r.pathStr === n)
          return Object.assign(l, t), !1;
      }, o), I(o);
    }, me = () => {
      const e = [];
      return S((t) => {
        t.isSelected && e.push(t);
      }), e;
    }, Q = () => {
      const e = [];
      return S((t) => {
        t.isSelected && t.isDraggable && e.push(t);
      }), e;
    }, S = (e, t = null, n = []) => {
      t || (t = p.value);
      let o = !1;
      const r = [];
      for (let l = 0; l < t.length; l++) {
        const i = t[l], s = n.concat(l), a = E(s, i, t);
        if (o = e(a, i, t) === !1, a && r.push(a), o || i.children && (o = S(e, i.children, s) === !1, o))
          break;
      }
      return o ? !1 : r;
    }, Z = (e, t) => {
      let n = t.length;
      for (; n--; ) {
        const o = t[n];
        o.children && Z(e, o.children), e(o, t, n);
      }
      return t;
    }, Ke = (e) => {
      const t = e.map((o) => JSON.stringify(o)), n = x(p.value);
      S((o, r, l) => {
        for (const i of t)
          o.pathStr === i && (r.toBeDeleted = !0);
      }, n), Z((o, r, l) => {
        o.toBeDeleted && r.splice(l, 1);
      }, n), I(n);
    }, Se = (e, t, n) => {
      const o = x(e), r = o.node, l = z(n, r.path), i = l[r.ind];
      if (o.placement === "inside")
        i.children = i.children || [], i.children.unshift(...t);
      else {
        const s = o.placement === "before" ? r.ind : r.ind + 1;
        l.splice(s, 0, ...t);
      }
    }, Xe = (e, t) => {
      const n = Array.isArray(t) ? t : [t], o = x(p.value);
      Se(e, n, o), I(o);
    }, Me = (e, t) => {
      const o = x(t).path;
      return JSON.stringify(o.slice(0, e.path.length)) == e.pathStr;
    }, x = (e) => JSON.parse(JSON.stringify(e)), Y = {
      getRoot: u,
      setCursorPosition: B,
      currentNodes: K,
      cursorPosition: d,
      emit: ne,
      ref: le,
      onNodeMousedownHandler: ge,
      onNodeMouseupHandler: q,
      onMousemoveHandler: ue,
      getCursorPositionFromCoords: ce,
      updateNode: G,
      getNode: E,
      traverse: S,
      select: M,
      getNodeEl: Ae,
      getFirstNode: U,
      getLastNode: fe,
      getNextNode: Oe,
      getPrevNode: Fe,
      getSelected: me,
      insert: Xe,
      remove: Ke,
      rootCursorPosition: O,
      selectionSize: ie
    };
    return Be(Y), (e, t) => {
      const n = je("SlVueTreeNext", !0);
      return h(), w("div", {
        ref_key: "rootRef",
        ref: le,
        class: oe(["sl-vue-tree-next", { "sl-vue-tree-next-root": f.value }]),
        onMousemove: ue,
        onMouseleave: Ye
      }, [
        y("div", Qe, [
          (h(!0), w(Ve, null, be(K.value, (o, r) => (h(), w("div", {
            class: oe(["sl-vue-tree-next-node", { "sl-vue-tree-next-selected": o.isSelected }])
          }, [
            y("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_before",
              onDragover: t[0] || (t[0] = ee(() => {
              }, ["prevent"])),
              style: De({
                visibility: d.value && d.value.node.pathStr === o.pathStr && d.value.placement === "before" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36),
            y("div", {
              class: oe(["sl-vue-tree-next-node-item", {
                "sl-vue-tree-next-cursor-hover": d.value && d.value.node.pathStr === o.pathStr,
                "sl-vue-tree-next-cursor-inside": d.value && d.value.placement === "inside" && d.value.node.pathStr === o.pathStr,
                "sl-vue-tree-next-node-is-leaf": o.isLeaf,
                "sl-vue-tree-next-node-is-folder": !o.isLeaf
              }]),
              onMousedown: (l) => ge(l, o),
              onMouseup: (l) => q(l, o),
              onContextmenu: (l) => $e(o, l),
              onDblclick: (l) => Te(o, l),
              onClick: (l) => He(o, l),
              onDragover: (l) => Re(o, l),
              onDrop: (l) => ze(o, l),
              path: o.pathStr
            }, [
              (h(!0), w(Ve, null, be(re.value, (l) => (h(), w("div", et))), 256)),
              e.level && e.showBranches ? (h(), w("div", tt, [
                N(e.$slots, "branch", { node: o }, () => [
                  o.isLastChild ? b("", !0) : (h(), w("span", ot, C("├") + C("─") + "  ", 1)),
                  o.isLastChild ? (h(), w("span", nt, C("└") + C("─") + "  ", 1)) : b("", !0)
                ])
              ])) : b("", !0),
              y("div", lt, [
                o.isLeaf ? b("", !0) : (h(), w("span", {
                  key: 0,
                  class: "sl-vue-tree-next-toggle",
                  onClick: (l) => Je(l, o)
                }, [
                  N(e.$slots, "toggle", { node: o }, () => [
                    y("span", null, C(o.isLeaf ? "" : o.isExpanded ? "-" : "+"), 1)
                  ])
                ], 8, rt)),
                N(e.$slots, "title", { node: o }, () => [
                  te(C(o.title), 1)
                ]),
                !o.isLeaf && o.children.length == 0 && o.isExpanded ? N(e.$slots, "empty-node", {
                  key: 1,
                  node: o
                }) : b("", !0)
              ]),
              y("div", st, [
                N(e.$slots, "sidebar", { node: o })
              ])
            ], 42, Ze),
            o.children && o.children.length && o.isExpanded ? (h(), qe(n, {
              key: 0,
              "model-value": o.children,
              level: o.level,
              "parent-ind": r,
              "allow-multiselect": e.allowMultiselect,
              "allow-toggle-branch": e.allowToggleBranch,
              "edge-size": e.edgeSize,
              "show-branches": e.showBranches,
              "parent-context": Y,
              "root-context": f.value ? Y : e.rootContext,
              onUpdateNode: G,
              onDragover: t[1] || (t[1] = ee(() => {
              }, ["prevent"]))
            }, {
              title: A(({ node: l }) => [
                N(e.$slots, "title", { node: l }, () => [
                  te(C(l.title), 1)
                ])
              ]),
              toggle: A(({ node: l }) => [
                N(e.$slots, "toggle", { node: l }, () => [
                  y("span", null, C(l.isLeaf ? "" : l.isExpanded ? "-" : "+"), 1)
                ])
              ]),
              sidebar: A(({ node: l }) => [
                N(e.$slots, "sidebar", { node: l })
              ]),
              "empty-node": A(({ node: l }) => [
                !l.isLeaf && l.children.length == 0 && l.isExpanded ? N(e.$slots, "empty-node", {
                  key: 0,
                  node: l
                }) : b("", !0)
              ]),
              _: 2
            }, 1032, ["model-value", "level", "parent-ind", "allow-multiselect", "allow-toggle-branch", "edge-size", "show-branches", "root-context"])) : b("", !0),
            y("div", {
              class: "sl-vue-tree-next-cursor sl-vue-tree-next-cursor_after",
              onDragover: t[2] || (t[2] = ee(() => {
              }, ["prevent"])),
              style: De({
                visibility: d.value && d.value.node.pathStr === o.pathStr && d.value.placement === "after" ? "visible" : "hidden",
                "--depth": se.value
              })
            }, null, 36)
          ], 2))), 256)),
          f.value ? Ge((h(), w("div", {
            key: 0,
            ref_key: "dragInfoRef",
            ref: _,
            class: "sl-vue-tree-next-drag-info"
          }, [
            N(e.$slots, "draginfo", {}, () => [
              te(" Items: " + C(ie.value), 1)
            ])
          ], 512)), [
            [We, V.value]
          ]) : b("", !0)
        ], 512)
      ], 34);
    };
  }
});
export {
  ct as SlVueTreeNext
};
