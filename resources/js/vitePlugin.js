const react = require("@vitejs/plugin-react");
const {default: laravel} = require("laravel-vite-plugin");
const path = require("path");
const fs = require("fs");

module.exports = function laravelCms() {
    return [
        react(),
        laravel({
            input: ["resources/js/cms.ts", "resources/js/live.ts"],
        }),
        {
            name: "laravel-cms",
            config: async () => {
                console.log(await getWorkspaceAliases());
                return {
                resolve: {
                    preserveSymlinks: true,
                    alias: await getWorkspaceAliases()
                },
            }},
        },
    ];
}

async function getWorkspaceAliases(rootPkgPath = path.resolve(process.cwd(), "package.json")) {

    const rootPkg = require(rootPkgPath);
    if (!rootPkg.workspaces?.length) {
        return [];
    }

    const folders = rootPkg.workspaces.flatMap((workspace) => {
        if (workspace.includes("/*")) {
            const folderWithWorkspaces = workspace.replace("/*", "");
            const workspacesFolders = fs.readdirSync(
                path.resolve(process.cwd(), folderWithWorkspaces)
            );
            return workspacesFolders.map((folderName) =>
                path.join(folderWithWorkspaces, folderName)
            );
        }
        return workspace;
    });

    const folderPaths = folders.map((folder) =>
        path.resolve(process.cwd(), folder)
    );

    const packages = [];
    for (let i = 0; i < folderPaths.length; i++) {
        const folderPath = folderPaths[i];
        const packageJson = require(path.resolve(folderPath, "package.json"));

        if(Object.keys(packageJson.exports ?? {}).length) {
            //merge exports with package name
            packages.push(...Object.entries(packageJson.exports).map(([name, _path]) => ({
                find: packageJson.name + name.replace("./", "/"),
                replacement: path.resolve(folderPath, _path)
            })));
        }
        
        packages.push({
            find: packageJson.name,
            replacement: folderPath,
        });

        if(packageJson.workspaces?.length) {
            packages.push(...(await getWorkspaceAliases(path.resolve(folderPath, "package.json"))));
        }
    }
    return packages;
}

// async function resolveSymlink(folderPath) {
//     const stat = await fs.promises.lstat(folderPath);
//     if (!stat.isSymbolicLink()) {
//         return folderPath;
//     }
//     return path.resolve(folderPath, "..", await fs.promises.readlink(folderPath))
// }
