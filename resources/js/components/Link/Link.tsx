import React from "react";
import { Link as InertiaLink } from '@inertiajs/react'
import { useRouter } from "../../exports";

type InertiaLinkProps = React.ComponentProps<typeof InertiaLink>

interface LinkProps extends InertiaLinkProps {
    noPrefix?: boolean;
    module?: string;
}

export default function Link(props: LinkProps) {
    const router = useRouter();
    const href = router.modifyHref(props.href, props as any);
    const updatedProps: any = router.modifyVisitOptions({...props} as any);
    return (
         <InertiaLink {...updatedProps} href={href} />
    )
}
