## Testing

```bash
npm run test
```

## Publish single executable

```bash
./node_modules/typescript/bin/tsc -p tsconfig.json
# in parent directory
# makeself ./hn-job ./hn-run.sh "Pushbullet for HN" ./run.sh
makeself --tar-extra "--exclude=test --exclude=.vscode --exclude=coverage --exclude=./types  --exclude=*.MD --exclude=*.ts --exclude=jest.config.js" ./hn-job ./hn-run.sh "Pushbullet for HN" ./run.sh
```

## TODO

- Setup GitHub action for running tests
