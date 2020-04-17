import { ICliArgument } from './interfaces'

export function parseArguments(): ICliArgument {
  return process.argv
    .slice(2)
    .reduce(
      (
        accumulate: object,
        current: string,
        index: number,
        array: readonly string[]
      ): object => {
        switch (current) {
          case '-t':
          case '--token':
            return { ...accumulate, token: array[index + 1] }
          case '-v':
          case '--version':
            return { ...accumulate, version: array[index + 1] }
        }

        return accumulate
      },
      {}
    )
}
