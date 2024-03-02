update-yarn:
    yarn set version stable
    yarn install

pipeline-simulation:
    yarn install --immutable
    yarn lint
    yarn type-check
    yarn prettier src/ --check
    yarn build