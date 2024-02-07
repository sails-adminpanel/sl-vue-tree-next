<template>
    <h2>Vue 3 Tree</h2>
    <sl-vue-tree-next
        :model-value="nodes"
        ref="slVueTree"
        :allow-multiselect="true"
        @select="nodeSelected"
        @drop="nodeDropped"
        @toggle="nodeToggled"
    >
    </sl-vue-tree-next>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SlVueTreeNext } from './components/SlVueTreeNext'

const nodes = [
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
]

// data
const selectedNodesTitle = ref('')
const lastEvent = ref('No last event')
const slVueTree = ref<InstanceType<typeof SlVueTreeNext> | null>(null)

//methods

const toggleVisibility = (event, node) => {
    event.stopPropagation()
    const visible = !node.data || node.data.visible !== false
    slVueTree.value?.updateNode({ path: node.path, patch: { data: { visible: !visible } } })
    lastEvent.value = `Node ${node.title} is ${visible ? 'visible' : 'invisible'} now`
}

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
</style>
@/components/SlVueTree
