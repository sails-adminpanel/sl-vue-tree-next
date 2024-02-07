import { ComputedRef, Ref } from "vue"

export interface NodeModel {
    title: string
    isLeaf?: boolean
    children?: NodeModel[]
    isExpanded?: boolean
    isSelected?: boolean
    isDraggable?: boolean
    isSelectable?: boolean
    data?: any
}

export interface TreeNode extends NodeModel {
    isVisible?: boolean
    isFirstChild: boolean
    isLastChild: boolean
    ind: number
    level: number
    path: number[]
    pathStr: string
    children: TreeNode[]
}

export interface CursorPosition {
    node: TreeNode
    placement: 'before' | 'inside' | 'after'
}

export interface VueData {
    rootCursorPosition: CursorPosition
    rootDraggingNode: TreeNode
}

export interface SlVueTreeProps {
    modelValue?: NodeModel[]
    edgeSize?: number
    allowMultiselect?: boolean
    showBranches?: boolean
    level?: number
    parentInd?: number
    parentContext?: Context
    rootContext?: any
    allowToggleBranch?: boolean
}

export interface Context {
    getRoot: () => TreeNode
    setCursorPosition: (cursorPosition: CursorPosition) => void
    currentNodes: ComputedRef<TreeNode[]>
    cursorPosition: ComputedRef<CursorPosition>
    emit: (event: string, ...args: any[]) => void
    ref: any
    onNodeMousedownHandler: (event: MouseEvent, node: TreeNode) => void
    onNodeMouseupHandler: (event: MouseEvent, node: TreeNode) => void
    onMousemoveHandler: (event: MouseEvent) => void
    getCursorPositionFromCoords: (x: number, y: number) => CursorPosition
    updateNode: (val: { path: number[], patch: Partial<TreeNode>}) => void
    getNode: (path: number[]) => TreeNode
    traverse: (callback: (node: TreeNode) => void) => void
    select: (path:number[], addToSelection?: boolean) => void
    getNodeEl: (path: number[]) => HTMLElement
    getFirstNode: () => TreeNode
    getLastNode: () => TreeNode
    getNextNode: (path: number[], filter?: ( node: TreeNode) => boolean) => TreeNode
    getPrevNode: (path: number[], filter?: (node: TreeNode) => boolean) => TreeNode
    getSelected: () => TreeNode[]
    insert: (node: TreeNode, data: NodeModel, placement: 'before' | 'inside' | 'after') => void
    remove: (paths?: number[][]) => void
    rootCursorPosition: Ref<CursorPosition>
}
