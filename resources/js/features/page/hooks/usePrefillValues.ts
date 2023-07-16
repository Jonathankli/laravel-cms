import { useEffect } from "react";

export function usePrefillInputs(form: any, update?: boolean ) {
    useEffect(() => {
        if(update === false) return;
        let updatedPath = false;
        let updatedTitle = false;
        if (!form.isTouched("path")) {
            form.setFieldValue(
                "path",
                form.values.name
                    .replace(/ /g, "-")
                    .replace(/(?![A-Za-z0-9_.\-~])/g, "")
                    .toLowerCase()
            );
            updatedPath = true;
        }
        if (!form.isTouched("title")) {
            form.setFieldValue("title", form.values.name);
            updatedTitle = true;
        }
        if(updatedPath || updatedTitle) {
            form.setTouched({ title: !updatedTitle, path: !updatedPath });
        }
    }, [form.values.name]);
}
