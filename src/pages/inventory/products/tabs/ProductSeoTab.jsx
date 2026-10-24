import {
    TextInput,
} from "../../../../components/ui";

export default function ProductSeoTab({
    formik,
}) {

    return (
        <div className="grid gap-5">
            <div>
                <label className="text-sm font-medium">
                    Slug
                </label>
                <TextInput
                    label="Slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="product Name"
                />
            </div>
            
            <div>
                <label className="text-sm font-medium">
                    SEO Title
                </label>
                <TextInput
                    label="SEO Title"
                    name="seoTitle"
                    value={formik.values.seoTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Product SEO title"
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    SEO Description
                </label>

                <textarea
                    name="seoDescription"
                    value={formik.values.seoDescription}
                    onChange={formik.handleChange}
                    rows={4}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-sm resize-none"
                    placeholder="Product SEO description"
                />

            </div>

            <div>
                <label className="text-sm font-medium">
                    SEO Keywords
                </label>
                <TextInput
                    label="SEO Keywords"
                    name="seoKeywords"
                    value={formik.values.seoKeywords}
                    onChange={formik.handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                />
            </div>
        
        </div>
    );
}