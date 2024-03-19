<template>
    <h2>Vue 3 Tree</h2>
    <div class="last-event row">Last event: {{ lastEvent }}</div>

    <div class="row">
        <div class="col-6">
            <sl-vue-tree-next
                v-model="nodes"
                ref="slVueTree"
                :allow-multiselect="true"
                :max-scroll-speed="10"
                :scroll-area-height="20"
                @select="nodeSelected"
                @drop="nodeDropped"
                @toggle="nodeToggled"
            >
                <template #title="{ node }">
                    <span class="item-icon">
                        <i class="fa-solid fa-file" v-if="node.isLeaf"></i>
                        <i class="fa-solid fa-folder" v-if="!node.isLeaf"></i>
                    </span>

                    {{ node.title }}
                </template>
                <template #toggle="{ node }">
                    <span v-if="!node.isLeaf">
                        <i v-if="node.isExpanded" class="fa fa-chevron-down"></i>
                        <i v-if="!node.isExpanded" class="fa fa-chevron-right"></i>
                    </span>
                </template>

                <template #sidebar="{ node }">
                    <span class="visible-icon" @click="(event) => toggleVisibility(event, node)">
                        <i v-if="!node.data || node.data.visible !== false" class="fa fa-eye"></i>
                        <i v-if="node.data && node.data.visible === false" class="fa fa-eye-slash"></i>
                    </span>
                </template>
            </sl-vue-tree-next>
        </div>

        <div class="col-6">
            <div class="json-preview">
                <pre>{{ JSON.stringify(nodes, null, 4) }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SlVueTreeNext } from './components/SlVueTreeNext'
import type { Context, TreeNode } from './components/SlVueTreeNext'

interface DataType {
    visible?: boolean
}

const nodes = ref<TreeNode<DataType>[]>([
    { title: 'Item1', isLeaf: true },
    { title: 'Item2', isLeaf: true, data: { visible: false } },
    { title: 'Folder1' },
    {
        title: 'Folder2',
        isExpanded: true,
        children: [
            { title: 'Item3', isLeaf: true },
            { title: 'Item4', isLeaf: true },
            {
                title: 'Folder3',
                children: [{ title: 'Item5', isLeaf: true }],
            },
        ],
    },
    { title: 'Folder5', isExpanded: false },
    { title: 'Item6', isLeaf: true },
    { title: 'Item7', isLeaf: true, data: { visible: false } },
    {
        title: 'Folder6',
        children: [
            {
                title: 'Folder7',
                children: [
                    { title: 'Item8', isLeaf: true },
                    { title: 'Item9', isLeaf: true },
                ],
            },
        ],
    },
])

// data
const selectedNodesTitle = ref('')
const lastEvent = ref('No last event')
const slVueTree = ref<Context<DataType> | null>(null)

//methods
const nodeSelected = (nodes, event) => {
    selectedNodesTitle.value = nodes.map((node) => node.title).join(', ')
    lastEvent.value = `Select nodes: ${selectedNodesTitle}`
}

const nodeToggled = (node, event) => {
    lastEvent.value = `Node ${node.title} is ${node.isExpanded ? 'expanded' : 'collapsed'}`
}

const nodeDropped = (nodes, position, event) => {
    lastEvent.value = `Nodes: ${nodes
        .map((node) => node.title)
        .join(', ')} are dropped ${position.placement} ${position.node.title}`
}

const removeNode = () => {
    const paths = slVueTree.value?.getSelected().map((node) => node.path)
    slVueTree.value?.remove(paths)
}

const toggleVisibility = (event, node) => {
    event.stopPropagation()
    const visible = !node.data || node.data.visible !== false
    slVueTree.value.updateNode({ path: node.path, patch: { data: { visible: !visible } } })
    lastEvent.value = `Node ${node.title} is ${!visible ? 'visible' : 'invisible'} now`
}

onMounted(() => {
    window.addEventListener('keydown', onArrowDownHandler)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onArrowDownHandler)
})

const onArrowDownHandler = (event) => {
    event.preventDefault()
    const keyCode = event.code

    if (slVueTree.value.selectionSize === 1) {
        const selectedNode = slVueTree.value.getSelected()[0]
        let nodeToSelect

        if (keyCode === 'ArrowDown') {
            nodeToSelect = slVueTree.value.getNextNode(selectedNode.path, (node) => node.isVisible)
        } else if (keyCode === 'ArrowUp') {
            nodeToSelect = slVueTree.value.getPrevNode(selectedNode.path, (node) => node.isVisible)
        } else if (keyCode === 'Enter' || keyCode === 'Space') {
            if (selectedNode.isLeaf) return
            slVueTree.value.updateNode({ path: selectedNode.path, patch: { isExpanded: !selectedNode.isExpanded } })
        }

        if (!nodeToSelect) return

        slVueTree.value.select(nodeToSelect.path)
    } else if (keyCode === 'ArrowDown') {
        slVueTree.value.select(slVueTree.value.getFirstNode().path)
    } else if (keyCode === 'ArrowUp') {
        slVueTree.value.select(slVueTree.value.getLastNode().path)
    }
}
</script>

<style>
@import '/sl-vue-tree-next-minimal.css';
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.row {
    display: flex;
}

.col-6 {
    flex-grow: 1;
    max-width: 50%;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
}

.json-preview {
    padding: 1em;
    background-color: #f8f9fa;
    border-radius: 0.25em;
    overflow: auto;
}

.last-event {
    color: white;
    background-color: rgba(100, 100, 255, 0.5);
    padding: 10px;
    border-radius: 2px;
    margin-bottom: 10px;
}
</style>
