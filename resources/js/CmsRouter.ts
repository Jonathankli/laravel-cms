import { router } from "@inertiajs/react";

type CmsVisitOptions<T> = T & {
    useModuleScope?: boolean;
    usePagePath?: boolean; //TODO
}
type CmsRouterState = {
    node?: CmsNode | null;
    module?: Module | null
}

type InertiaVisitArgs = Parameters<typeof router.visit>;
type InertiaGetArgs = Parameters<typeof router.get>;
type InertiaPostArgs = Parameters<typeof router.post>;
type InertiaPutArgs = Parameters<typeof router.put>;
type InertiaPatchArgs = Parameters<typeof router.patch>;
type InertiaDeleteArgs = Parameters<typeof router.delete>;
type InertiaReloadArgs = Parameters<typeof router.reload>;

export class CmsRouter {

    state: CmsRouterState; 

    constructor(state: CmsRouterState = {}) {
        this.state = state;
    }


    modifyHref(href: Parameters<typeof router.visit>[0], options?: CmsVisitOptions<InertiaVisitArgs[1]>): InertiaVisitArgs[0]
    {
        const visit = options ?? {};
        const useModuleScope = visit.useModuleScope === undefined ? true : visit.useModuleScope; 
        if(useModuleScope && this.state.module) {
            let path = href;
            if(typeof path !== "string") {
                path = path.hostname;
            }
            if(!path.startsWith(this.state.module.full_slug)) {
                if(path.startsWith("/")) path = path.substring(1, path.length)
                path = this.state.module.full_slug + "/" + path;
            }
            return path;
        }
        return href;
    }

    modifyVisitOptions(options?: CmsVisitOptions<InertiaVisitArgs[1]>): InertiaVisitArgs[1]
    {
        const visit:  CmsVisitOptions<InertiaVisitArgs[1]> = options ?? {};
        if(this.state.node) {
            visit.headers = {
                ...visit.headers,
                "X-CMS-NODE-SCOPE": this.state.node.id,
            }
        }
        if(this.state.module) {
            visit.headers = {
                ...visit.headers,
                "X-CMS-MODULE-SCOPE": this.state.module.type
            }
        }
        return visit;
    }

    get(href: InertiaGetArgs[0], data?: InertiaGetArgs[1], options?: CmsVisitOptions<InertiaGetArgs[2]>) {
        console.log(this);
        
        router.get(this.modifyHref(href, options), data, this.modifyVisitOptions(options))
    }

    post(href: InertiaPostArgs[0], data?: InertiaPostArgs[1], options?: CmsVisitOptions<InertiaPostArgs[2]>) {
        router.post(this.modifyHref(href, options), data, this.modifyVisitOptions(options))
    }

    patch(href: InertiaPatchArgs[0], data?: InertiaPatchArgs[1], options?: CmsVisitOptions<InertiaPatchArgs[2]>) {
        router.patch(this.modifyHref(href, options), data, this.modifyVisitOptions(options))
    }

    put(href: InertiaPutArgs[0], data?: InertiaPutArgs[1], options?: CmsVisitOptions<InertiaPutArgs[2]>) {
        router.put(this.modifyHref(href, options), data, this.modifyVisitOptions(options))
    }

    visit(href: InertiaVisitArgs[0], options?: CmsVisitOptions<InertiaVisitArgs[1]>) {
        router.visit(this.modifyHref(href, options), this.modifyVisitOptions(options))
    }

    delete(href: InertiaDeleteArgs[0], options?: CmsVisitOptions<InertiaDeleteArgs[1]>) {
        router.delete(this.modifyHref(href, options), this.modifyVisitOptions(options))
    }

    reload(options?: CmsVisitOptions<InertiaReloadArgs[0]>) {
        router.reload(this.modifyVisitOptions(options))
    }

};