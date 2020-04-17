import { IPullRequestInfo } from './interfaces'

const compose = (...functions: Function[]) => (args: any) =>
  functions.reduceRight((arg, fn) => fn(arg), args)

function getPrCategory(category: string, info: readonly IPullRequestInfo[]) {
  return info.filter((i) => i.labels.includes(category))
}

const labelsCategories = {
  feature: '🏷Category: Feature',
  bug: '🏷 Category: Bug',
  engineer: '🏷 Category: Engineering',
  dependencies: 'dependencies',
}

const getFeatures = getPrCategory.bind(null, labelsCategories.feature)
const getBugFixes = getPrCategory.bind(null, labelsCategories.bug)
const getInternalImprovements = getPrCategory.bind(
  null,
  labelsCategories.engineer
)
const getDependencies = getPrCategory.bind(null, labelsCategories.dependencies)
function getOthers(info: readonly IPullRequestInfo[]) {
  const categories = Object.values(labelsCategories)

  return info.filter((i) => i.labels.every((l) => !categories.includes(l)))
}
function includeHeader(header: string, titles: readonly string[]) {
  return titles.length ? ['', `**${header}**`, '', ...titles] : []
}
const includeFeaturesHeader = includeHeader.bind(null, 'Feature')
const includeBugsHeader = includeHeader.bind(null, 'Bug fixes')
const includeInternalImprovementsHeader = includeHeader.bind(
  null,
  'Internal system improvements'
)
const includeOthersHeader = includeHeader.bind(null, 'Others')

function buildPrLines(info: readonly IPullRequestInfo[]) {
  return info.map((i) => `- ${i.title} [#${i.pullNumber}](${i.url})`)
}

function buildDependenciesLine(info: readonly IPullRequestInfo[]) {
  return [
    '- Bump dependencies ' +
      info.map((i) => `[#${i.pullNumber}](${i.url})`).join(' '),
  ]
}

const buildFeatures = compose(includeFeaturesHeader, buildPrLines, getFeatures)
const buildBugFixes = compose(includeBugsHeader, buildPrLines, getBugFixes)
const buildInternalImprovements = compose(
  includeInternalImprovementsHeader,
  buildPrLines,
  getInternalImprovements
)
const buildDependencies = compose(buildDependenciesLine, getDependencies)
const buildOthers = compose(includeOthersHeader, buildPrLines, getOthers)

function getTitleDate(version: string): string {
  const now = new Date()
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(now)
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(now)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(now)

  return `# ${version} (${day} ${month} ${year})`
}

export function buildChangeLogMessages(
  version: string,
  info: readonly IPullRequestInfo[]
) {
  return [
    getTitleDate(version),
    ...buildFeatures(info),
    ...buildBugFixes(info),
    ...buildInternalImprovements(info),
    ...buildDependencies(info),
    ...buildOthers(info),
    '',
  ].join('\n')
}
