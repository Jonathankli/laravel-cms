import { useEffect } from "react";

export function usePrefillInputs<T>(form: any) {
    useEffect(() => {
        if (!form.isTouched("path")) {
            form.setFieldValue(
                "path",
                form.values.name
                    .replace(/ /g, "-")
                    .replace(/(?![A-Za-z0-9_.\-~])/g, "")
                    .toLowerCase()
            );
            form.setTouched({ path: false });
        }
        if (!form.isTouched("title")) {
            form.setFieldValue("title", form.values.name);
            form.setTouched({ title: false });
        }
    }, [form.values.name]);
}
