import { describe, test, expect } from 'vitest'
import { sum } from '@/sum'

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('adds 4 + 2 to equal 6', () => {
    expect(sum(4, 2)).toBe(6)
  })
})
