"use client";

import { useForm } from "react-hook-form";
import RichText from "src/components/RichText";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import { ArticleInput } from "src/lib/type";
import { z } from "zod";

const articleFormSchema = z.object({
  userId: z.string().min(1, "User ID wajib diisi"),
  categoryId: z.string().min(1, "Category ID wajib diisi"),
  title: z.string().min(1, "Title wajib diisi"),
  content: z.string().min(1, "Content wajib diisi"),
  imageUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export default function ArticleForm({
  onClose,
  onSubmitForm,
  modalMode,
  defaultValues,
}: {
  onClose: () => void;
  onSubmitForm: (data: ArticleInput) => void;
  modalMode: "create" | "edit";
  defaultValues?: Partial<ArticleInput>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<ArticleInput>({ defaultValues, mode: "onBlur" });

  const handleFormSubmit = () => {
    const values = getValues();
    const result = articleFormSchema.safeParse(values);
    if (!result.success) {
      for (const err of result.error.errors) {
        setError(err.path[0] as keyof ArticleInput, {
          message: err.message,
        });
      }
      return;
    }

    onSubmitForm(result.data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
      {/* userId */}
      <div>
        <Input
          label="User ID"
          type="text"
          id="userId"
          {...register("userId")}
          variant="bordered"
          fullWidth
          error={Boolean(errors.userId && touchedFields.userId)}
          helperText={errors.userId && String(errors.userId.message)}
        />
      </div>

      {/* categoryId */}
      <div>
        <label className="block mb-1 font-semibold" htmlFor="categoryId">
          Category ID
        </label>
        <Input
          type="text"
          id="categoryId"
          {...register("categoryId")}
          variant="bordered"
          fullWidth
          error={Boolean(errors.userId && touchedFields.userId)}
          helperText={errors.userId && String(errors.userId.message)}
        />
      </div>

      {/* title */}
      <div>
        <label className="block mb-1 font-semibold" htmlFor="title">
          Title
        </label>
        <Input
          type="text"
          id="title"
          {...register("title")}
          variant="bordered"
          fullWidth
          error={Boolean(errors.userId && touchedFields.userId)}
          helperText={errors.userId && String(errors.userId.message)}
        />
      </div>

      {/* content */}
      <div>
        <label className="block mb-1 font-semibold" htmlFor="content">
          Content (HTML)
        </label>
        <RichText
          id="content"
          onChange={(val) => setValue("content", val, { shouldDirty: true })}
          error={
            Boolean(errors.content && touchedFields.content)
              ? String(errors.content)
              : undefined
          }
        />
      </div>

      {/* imageUrl */}
      <div>
        <label className="block mb-1 font-semibold" htmlFor="imageUrl">
          Image URL
        </label>
        <Input
          type="text"
          id="imageUrl"
          {...register("imageUrl")}
          variant="bordered"
          fullWidth
          error={Boolean(errors.userId && touchedFields.userId)}
          helperText={errors.userId && String(errors.userId.message)}
        />
      </div>

      {/* buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button type="reset" variant="text" color="warning">
          Reset
        </Button>
        <Button type="submit">
          {modalMode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
}
