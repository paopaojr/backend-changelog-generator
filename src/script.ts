import { Octokit } from '@octokit/rest'
import { IPullRequestInfo, IJobOptions, ICliArgument } from './interfaces'
import { buildChangeLogMessages } from './utils'
import { getPrInfosBetween } from './services'
import { parseArguments } from './cli-params'

async function run(version: string, auth: string, repoOwner: IJobOptions) {
  const octokit: Octokit = new Octokit({
    auth,
  })

  try {
    const info: readonly IPullRequestInfo[] = await getPrInfosBetween(
      octokit,
      repoOwner,
      'master',
      'dev'
    )
    const changeLog: string = buildChangeLogMessages(version, info)

    console.log(changeLog)
  } catch (error) {
    console.error(error)
  }
}

const args: ICliArgument = parseArguments()
run(args.version, args.token, {
  owner: 'taskworld',
  repo: 'tw-backend',
})
