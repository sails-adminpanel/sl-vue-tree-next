import { SlVueTreeNext } from '@/components/SlVueTreeNext'

const install = () => {
    globalThis.SlVueTreeNext = SlVueTreeNext
}

if (globalThis.Vue) {
    install()
}

export { install }

export default { SlVueTreeNext }
