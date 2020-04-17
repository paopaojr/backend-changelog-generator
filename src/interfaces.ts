export interface IPullRequestInfo {
  readonly title: string
  readonly url: string
  readonly pullNumber: number
  readonly labels: readonly string[]
}

export interface IJobOptions {
  readonly owner: string
  readonly repo: string
}

export interface ICliArgument {
  readonly token?: string
  readonly version?: string
}
