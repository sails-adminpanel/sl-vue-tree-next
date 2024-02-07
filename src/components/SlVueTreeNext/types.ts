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
    parentContext?: any
    rootContext?: any
    allowToggleBranch?: boolean
}

