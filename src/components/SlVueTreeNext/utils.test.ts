import { deepMerge } from './utils'
import { describe, it, expect } from 'vitest'

describe('deepMerge', () => {
    it('should merge two objects', () => {
        const target = { a: 1, b: 2 }
        const source = { b: 3, c: 4 }
        const result = deepMerge(target, source)
        expect(result).toEqual({ a: 1, b: 3, c: 4 })
    })

    it('should merge nested objects', () => {
        const target = { a: { b: 1, c: 2 } }
        const source = { a: { c: 3, d: 4 } }
        const result = deepMerge(target, source)
        expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } })
    })

    it('should merge deeply nested objects', () => {
        const target = { a: { b: { c: 1, d: 2 } } }
        const source = { a: { b: { d: 3, e: 4 } } }
        const result = deepMerge(target, source)
        expect(result).toEqual({ a: { b: { c: 1, d: 3, e: 4 } } })
    })
})
