import { transformFileSync } from 'babel-core'
import fs from 'fs'
import path from 'path'

const fixtureTest = (dir, name) => {
  it(`should pass ${name.split('-').join(' ')}`, () => {
    const actualPath = path.join(dir, 'actual.js')
    const expectedPath = path.join(dir, 'expected.js');

    const actual = transformFileSync(actualPath).code
    const expected = fs.readFileSync(expectedPath).toString()

    actual.should.equal(expected)
  })
}

export const fixturesTest = (pluginName) => {
  const fixturesDir = path.join(__dirname, [pluginName, 'fixtures'].join('-'))

  describe('fixtures', () => {
    fs.readdirSync(fixturesDir).forEach((caseName) => {
      const fixtureDir = path.join(fixturesDir, caseName)

      if (fs.lstatSync(fixtureDir).isDirectory()) fixtureTest(fixtureDir, caseName)
    })
  })
}
