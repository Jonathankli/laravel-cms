import { usePage } from "@inertiajs/inertia-react";

const useInertiaProps = () => {;
    return usePage().props;
}
 
export default useInertiaProps;