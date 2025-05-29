"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import RichText from "src/components/RichText";
import AutoComplete from "src/components/ui/Autocomplete";
import Button from "src/components/ui/Button";
import Dialog from "src/components/ui/Dialog";
import ImageEditor, { ImageEditorModal } from "src/components/ui/ImageEditor";
import Input from "src/components/ui/Input";
import Skeleton from "src/components/ui/Skeleton";
import { ArticleInput, GetCategory } from "src/lib/type";
import { z } from "zod";

const CategoriesField = ({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ArticleInput, any, ArticleInput>;
}) => {
  const [categories, setCategories] = useState<GetCategory["data"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get<GetCategory>(
          `https://test-fe.mysellerpintar.com/api/categories?limit=999`
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Gagal fetch kategori", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading && categories.length === 0) {
    return (
      <Skeleton variant="rounded" height={40} width={"100%"} className="my-4" />
    );
  }

  const categoryId = categories.map((v) => ({ _id: v.id, ...v }));

  return (
    <Controller
      name="categoryId"
      control={control}
      render={({ field, fieldState }) => {
        const currentValue = categoryId.find((v) => v._id === field.value);

        // Handle deleted value
        const options = [...categoryId];
        if (field.value && !currentValue) {
          options.push({
            _id: `${field.value}`,
            name: `Dihapus oleh NeoFeeder`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);
        }

        return (
          <AutoComplete
            id="categoryId"
            name="categoryId"
            fullWidth
            variant="bordered"
            required
            field={currentValue}
            setFieldValue={(v) => {
              field.onChange(!Array.isArray(v) ? v?._id : "");
            }}
            onBlur={field.onBlur}
            options={options}
            isClearable
            renderOption={(option, props) => (
              <li {...props} key={option._id}>
                {option.name}
              </li>
            )}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        );
      }}
    />
  );
};

const articleFormSchema = z.object({
  userId: z.string().optional().or(z.literal("")),
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
    control,
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
  const selectedImage = getValues("imageUrl") || null;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (dataUrl: string) => {
    setValue("imageUrl", dataUrl, { shouldDirty: true });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
        {/* categoryId */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="categoryId">
            Category ID
          </label>
          <CategoriesField control={control} />
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
          <ImageEditor
            width={862}
            height={343}
            shape="square"
            image={selectedImage}
            onImageSelect={(imageData) => {
              setValue("imageUrl", imageData, { shouldDirty: true });
              setIsDialogOpen(true);
            }}
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
            {modalMode === "create" ? "Create" : "Update"} a
          </Button>
        </div>
      </form>

      {/* Dialog untuk editing */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Edit Avatar"
        fullWidth
        maxWidth="lg"
        closeButtom
      >
        <div className="px-4 pb-4">
          <ImageEditorModal
            width={862}
            height={343}
            shape="square"
            image={selectedImage}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </Dialog>
    </>
  );
}
