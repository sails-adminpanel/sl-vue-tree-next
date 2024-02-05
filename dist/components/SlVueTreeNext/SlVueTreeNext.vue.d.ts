import type { NodeModel, TreeNode, SlVueTreeProps } from './types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SlVueTreeProps>, {
    modelValue: () => any[];
    edgeSize: number;
    showBranches: boolean;
    level: number;
    parentInd: any;
    allowMultiselect: boolean;
    allowToggleBranch: boolean;
    multiselectKey: () => string[];
    scrollAreaHeight: number;
    maxScrollSpeed: number;
}>, {
    getRoot: () => any;
    setCursorPosition: (pos: any) => void;
    nodes: import("vue").ComputedRef<any>;
    cursorPosition: import("vue").ComputedRef<any>;
    emit: (event: "update:modelValue" | "select" | "beforedrop" | "drop" | "toggle" | "nodeclick" | "nodedblclick" | "updateNode" | "nodecontextmenu" | "externaldragover" | "externaldrop", ...args: any[]) => void;
    ref: import("vue").Ref<HTMLDivElement>;
    onNodeMousedownHandler: (event: any, node: any) => void;
    onNodeMouseupHandler: (event: any, targetNode?: TreeNode) => void;
    onMousemoveHandler: (event: any) => void;
    getCursorPositionFromCoords: (x: any, y: any) => {
        node: any;
        placement: any;
    };
    updateNode: ({ path, patch }: {
        path: any;
        patch: any;
    }) => void;
    getSelected: () => TreeNode[];
    insert: (cursorPosition: any, nodeModel: any) => void;
    remove: (paths: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    select: (...args: any[]) => void;
    beforedrop: (...args: any[]) => void;
    drop: (...args: any[]) => void;
    toggle: (...args: any[]) => void;
    nodeclick: (...args: any[]) => void;
    nodedblclick: (...args: any[]) => void;
    updateNode: (...args: any[]) => void;
    nodecontextmenu: (...args: any[]) => void;
    externaldragover: (...args: any[]) => void;
    externaldrop: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SlVueTreeProps>, {
    modelValue: () => any[];
    edgeSize: number;
    showBranches: boolean;
    level: number;
    parentInd: any;
    allowMultiselect: boolean;
    allowToggleBranch: boolean;
    multiselectKey: () => string[];
    scrollAreaHeight: number;
    maxScrollSpeed: number;
}>>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onBeforedrop?: (...args: any[]) => any;
    onDrop?: (...args: any[]) => any;
    onToggle?: (...args: any[]) => any;
    onNodeclick?: (...args: any[]) => any;
    onNodedblclick?: (...args: any[]) => any;
    onUpdateNode?: (...args: any[]) => any;
    onNodecontextmenu?: (...args: any[]) => any;
    onExternaldragover?: (...args: any[]) => any;
    onExternaldrop?: (...args: any[]) => any;
}, {
    modelValue: NodeModel[];
    edgeSize: number;
    allowMultiselect: boolean;
    showBranches: boolean;
    level: number;
    parentInd: number;
    allowToggleBranch: boolean;
}, {}>, {
    branch?(_: {
        node: any;
    }): any;
    toggle?(_: {
        node: any;
    }): any;
    title?(_: {
        node: any;
    }): any;
    "empty-node"?(_: {
        node: any;
    }): any;
    sidebar?(_: {
        node: any;
    }): any;
    draginfo?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
