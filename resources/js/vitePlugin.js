const path = require("path");
const fs = require("fs");

exports.symlinkWorkspaces = function (path = path.resolve(process.cwd(), "../../package.json")) {
    return {
            name: "symlinkWorkspaces",
            config: async () => ({
                resolve: {
                    preserveSymlinks: true,
                    alias: await getWorkspaceAliases(path)
                },
            }),
    };
}

async function getWorkspaceAliases(rootPkgPath) {

    const rootPkg = require(rootPkgPath);
    if (!rootPkg.workspaces?.length) {
        return [];
    }

    const folders = rootPkg.workspaces.flatMap((workspace) => {
        if (workspace.includes("/*")) {
            const folderWithWorkspaces = workspace.replace("/*", "");
            const workspacesFolders = fs.readdirSync(
                path.resolve(path.dirname(rootPkgPath), folderWithWorkspaces)
            );
            return workspacesFolders.map((folderName) =>
                path.join(folderWithWorkspaces, folderName)
            );
        }
        return workspace;
    });

    const folderPaths = folders.map((folder) =>
        path.resolve(path.dirname(rootPkgPath), folder)
    );

    const packages = [];
    for (let i = 0; i < folderPaths.length; i++) {
        const folderPath = folderPaths[i];
        const packageJson = require(path.resolve(folderPath, "package.json"));

        if(Object.keys(packageJson.exports ?? {}).length) {
            //merge exports with package name
            packages.push(...Object.entries(packageJson.exports)
                .map(([name, _path]) => {
                    if(name === ".") {
                        return {
                            find: packageJson.name,
                            replacement: path.resolve(folderPath, _path)
                        }
                    }
                    return {
                        find: packageJson.name + name.replace("./", "/").replace(".", ""),
                        replacement: path.resolve(folderPath, _path)
                    }
                })
                .sort((a, b) => b.find.length - a.find.length)
            );
        } else {
            packages.push({
                find: packageJson.name,
                replacement: folderPath,
            });
        }
        
        if(packageJson.workspaces?.length) {
            packages.push(...(await getWorkspaceAliases(path.resolve(folderPath, "package.json"))));
        }
    }

    //filter duplicates out of packages
    const uniquePackages = [];
    for (let i = 0; i < packages.length; i++) {
        const pkg = packages[i];
        if(!uniquePackages.find(p => p.find === pkg.find)) {
            uniquePackages.push(pkg);
        }
    }

    return uniquePackages;
}

// async function resolveSymlink(folderPath) {
//     const stat = await fs.promises.lstat(folderPath);
//     if (!stat.isSymbolicLink()) {
//         return folderPath;
//     }
//     return path.resolve(folderPath, "..", await fs.promises.readlink(folderPath))
// }
