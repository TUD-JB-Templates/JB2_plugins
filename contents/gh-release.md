# Using gh-release

See also the [MyST documentation](https://mystmd.org/guide/plugins-distribute) as well as the [GitHub documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release)

## Single file release

To release a single .mjs file: 

- On the main page of the repository, go to About > Releases > Draft a new release. 

- Add a tag to the release. Tags can be any name, but they're usually version numbers to indicate a release point. 

- Add a title and a description. The published release will include a contributors section with an avatar list of all the @mentioned users.

- Attach .mjs file in the dropbox. 

- To notify users the release is not ready for production and may be unstable, select "This is a pre-release".

- Click "Publish release".

## Multiple files release

### Build plugin using esbuild

To build a plugin using esbuild: 
- set-up folder structure with a src and dist folder and add all .mjs files to the src folder. 

- add build.js file to the root of the plugin.
    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
    entryPoints: ['src/plugin.mjs'],
    bundle: true,          
    outfile: 'dist/plugin.mjs',
    platform: 'node',
    format: 'esm',          // pure ESM output
    external: ['fs', 'fs/promises', 'os'] // <— do NOT bundle these

    }).catch(() => process.exit(1));
    ```

- In build.js, add the entryPoints, and the output file (outfile).

- run node build.js

### release

Same steps as for single file release using the output file (dist/plugin.mjs). 