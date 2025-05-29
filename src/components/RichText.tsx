"use client";

import dynamic from "next/dynamic";
import unresetStyleTailwind from "src/components/ui/PerseComponent/unreset.module.css";
import { ComponentProps } from "react";
import Typography from "src/components/ui/Typograph";
import { twMerge } from "tailwind-merge";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const copyStringToClipboard = function (str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation",
];
const inspectionMergeFields = ["InspectionCompleteDate", "InspectionEventType"];
const createOptionGroupElement = (
  mergeFields: string[],
  optionGrouplabel: string
) => {
  const optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
};
const buttonsName = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
] as const;

const insertMergeField = {
  name: "insertMergeField",
  tooltip: "Insert Merge Field",
  iconURL: "images/merge.png",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popup: (editor: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onSelected(e: any) {
      const mergeField = e.target.value;
      if (mergeField) {
        editor.selection.insertNode(
          editor.create.inside.fromHTML("{{" + mergeField + "}}")
        );
      }
    }
    const divElement = editor.create.div("merge-field-popup");

    const labelElement = document.createElement("label");
    labelElement.setAttribute("class", "merge-field-label");
    divElement.appendChild(labelElement);

    const selectElement = document.createElement("select");
    selectElement.setAttribute("class", "merge-field-select");
    selectElement.appendChild(
      createOptionGroupElement(facilityMergeFields, "Facility")
    );
    selectElement.appendChild(
      createOptionGroupElement(inspectionMergeFields, "Inspection")
    );
    selectElement.onchange = onSelected;
    divElement.appendChild(selectElement);

    return divElement;
  },
};

const copyContent = {
  name: "copyContent",
  tooltip: "Copy HTML to Clipboard",
  iconURL: "images/copy.png",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec: function (editor: any) {
    const html = editor.value;
    copyStringToClipboard(html);
  },
};

const buttons = [...buttonsName, insertMergeField, copyContent];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "id",
  toolbarButtonSize: "middle" as
    | "small"
    | "middle"
    | "tiny"
    | "xsmall"
    | "large"
    | undefined,
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  buttons: buttons,
  uploader: { insertImageAsBase64URI: true },
  height: 442,
};

export const processImagesInHTML = async (
  htmlString: string,
  uploadFunction: (formData: FormData) => Promise<{ url: string }>
): Promise<string> => {
  const imgRegex =
    /<img([^>]+)src="(data:image\/(png|jpeg|jpg);base64,([^">]+)|blob:[^">]+)"([^>]*)>/g;
  const matches = Array.from(htmlString.matchAll(imgRegex));

  if (!matches.length) return htmlString; // Tidak ada gambar yang perlu diproses

  // Proses semua gambar Base64 atau Blob URL menjadi file dan unggah
  const uploadedUrls = await Promise.all(
    matches.map(async (match) => {
      const src = match[2]; // Bisa Base64 atau Blob URL
      const base64Type = match[3]; // "png", "jpeg", "jpg" (hanya ada jika base64)
      const isBase64 = !!base64Type;
      const isBlob = src.startsWith("blob:");

      try {
        let file: File;

        if (isBase64) {
          // Konversi Base64 ke File
          const byteArray = Uint8Array.from(atob(match[4]), (c) =>
            c.charCodeAt(0)
          );
          file = new File([byteArray], `image.${base64Type}`, {
            type: `image/${base64Type}`,
          });
        } else if (isBlob) {
          // Ambil Blob dari URL dan konversi ke File
          const blobResponse = await fetch(src);
          const blobData = await blobResponse.blob();
          const mimeType = blobData.type.split("/")[1] || "png"; // Gunakan tipe dari Blob atau default PNG
          file = new File([blobData], `image.${mimeType}`, {
            type: blobData.type,
          });
        } else {
          return src; // Jika bukan base64 atau blob, kembalikan URL asli
        }

        // Buat FormData dan unggah
        const formData = new FormData();
        formData.append("image", file);

        const response = await uploadFunction(formData);
        return `${process.env.IMAGE_PREVIEW}/${response.url}`;
      } catch {
        throw new Error(`Gagal mengunggah gambar: ${match[0]}`);
      }
    })
  );

  // Ganti semua gambar dengan URL yang diunggah
  let updatedHtml = htmlString;
  matches.forEach((match, index) => {
    updatedHtml = updatedHtml.replace(
      match[0],
      `<img${match[1]}src="${uploadedUrls[index]}"${match[5]}>`
    );
  });

  return updatedHtml;
};

interface Props extends ComponentProps<typeof JoditEditor> {
  error?: string;
  classNames?: { root?: string; jodit?: string };
  remmoveButton?: Exclude<(typeof buttonsName)[number], "|">[]; // Eksklusikan '|'
  readOnly?: boolean;
}

export default function RichText(props: Props) {
  const { error, classNames, readOnly, remmoveButton = [], ...rest } = props;
  if (remmoveButton.length > 0) {
    editorConfig.buttons = editorConfig.buttons.filter(
      (b) => typeof b !== "string" || b === "|" || !remmoveButton.includes(b)
    );
  }

  if (readOnly) editorConfig.readonly = readOnly;

  return (
    <div
      className={twMerge(
        "relative",
        unresetStyleTailwind.unreset,
        classNames?.root
      )}
    >
      <style>
        {`
          .jodit_fullsize-box_true {
            margin: 0;
            position: fixed !important
          }
        `}
      </style>

      <JoditEditor
        {...rest}
        config={editorConfig}
        className={twMerge(rest.className, classNames?.jodit)}
      />
      {error && (
        <Typography component="span" variant="caption" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
}
