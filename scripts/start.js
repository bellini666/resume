const concurrently = require('concurrently');
const upath = require('upath');

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

const { result } = concurrently([
    { command: 'node scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' },
    {
        command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
        name: 'SB_BROWSER_SYNC',
        prefixColor: 'bgGreen.bold',
    }
], {
    prefix: 'name',
    killOthersOnFail: true,
});

result.then(
    () => console.log('Success'),
    () => console.log('Failure')
);