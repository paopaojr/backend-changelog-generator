import { Octokit } from '@octokit/rest'
import { IJobOptions, IPullRequestInfo } from './interfaces'

export async function getPrInfosBetween(
  octokit: Octokit,
  repoOwner: IJobOptions,
  base: string,
  head: string
): Promise<readonly IPullRequestInfo[]> {
  const commits = await octokit.repos.compareCommits({
    ...repoOwner,
    base,
    head,
  })

  const promises: readonly Promise<IPullRequestInfo>[] = commits.data.commits
    .map((c) => c.commit.message)
    .filter((m) => /\(?#[\d]+\)?/.test(m))
    .map((m) => {
      const pullNumber = m.match(/\(?#([\d]+)\)?/)[1]

      return {
        pullNumber: Number(pullNumber),
      }
    })
    .map((m) =>
      octokit.pulls
        .get({
          ...repoOwner,
          pull_number: m.pullNumber,
        })
        .then(({ data }) => ({
          title: data.title,
          url: data.url,
          pullNumber: m.pullNumber,
          labels: data.labels.map((m) => m.name),
        }))
    )

  return Promise.all(promises)
}
