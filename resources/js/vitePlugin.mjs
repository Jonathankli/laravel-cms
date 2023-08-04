import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default function() {
    return [
        react(),
        laravel({
            input: ["resources/js/cms.ts", "resources/js/live.ts", "resources/css/app.css"],
        }),
        {
            name: "laravel-cms",
            config: async () => ({
                resolve: {
                    preserveSymlinks: true,
                    alias: await getWorkspaceAliases()
                },
            }),
        },
    ];
}

async function getWorkspaceAliases(rootPkgPath = path.resolve(process.cwd(), "package.json")) {

    const rootPkg = JSON.parse(fs.readFileSync(fileURLToPath(new URL(rootPkgPath, import.meta.url)), 'utf8'));
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
        const pkgPath = path.resolve(folderPath, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(fileURLToPath(new URL(pkgPath, import.meta.url)), 'utf8'));

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
