import { useContext } from "react";
import { InertiaContext } from "../../contexts/InertiaProvider";

const useInertiaProps = () => {
    const props = useContext(InertiaContext);
    return props;
}
 
export default useInertiaProps;