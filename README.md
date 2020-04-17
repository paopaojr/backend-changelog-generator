# backend-changelog-generator

## Installing

```bash
$ npm install
```

## How to use

```bash
$ npx ts-node ./src/script.ts -v ${VERSION} -t ${GITHUB_TOKEN}
```

**GITHUB_TOKEN** need `read_access` to `tw-backend`

### Example

```bash
$ npx ts-node ./src/script.ts -v 6.2.0 -t a18bcafa1c551cdef195456f2c8130cb1ec999

# 6.2.0 (17 April 2020)

**Feature**

- Reply to message [#3734](https://api.github.com/repos/taskworld/tw-backend/pulls/3734)

**Bug fixes**

- Fix download calendar [#3739](https://api.github.com/repos/taskworld/tw-backend/pulls/3739)

**Internal system improvements**

- Disable trace and make function tracable [#3740](https://api.github.com/repos/taskworld/tw-backend/pulls/3740)
- Update version of VPC admin frontend [#3742](https://api.github.com/repos/taskworld/tw-backend/pulls/3742)
- Bump dependencies [#3741](https://api.github.com/repos/taskworld/tw-backend/pulls/3741)
```
