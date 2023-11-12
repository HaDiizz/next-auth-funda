import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import CommandsList from "../CommandsList";
import {
  Bold,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Table,
  Youtube,
} from "lucide-react";

const addYoutubeVideo = (editor, range) => {
  const url = prompt("Enter YouTube URL");

  if (url) {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .setYoutubeVideo({
        src: url,
      })
      .run();
  }
};

export default {
  items: ({ query }) => {
    return [
      {
        title: "Heading 1",
        searchTerms: ["main", "h1", "head"],
        description: "Main section heading.",
        icon: <Heading1 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Heading 2",
        searchTerms: ["medium", "h2", "head"],
        description: "Medium section heading.",
        icon: <Heading2 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        title: "Heading 3",
        searchTerms: ["subsection", "h3", "head"],
        description: "Subsection heading.",
        icon: <Heading3 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 3 })
            .run();
        },
      },
      {
        title: "Heading 4",
        searchTerms: ["sub-subsection", "h4", "head"],
        description: "Sub-subsection heading.",
        icon: <Heading4 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 4 })
            .run();
        },
      },
      {
        title: "Heading 5",
        searchTerms: ["small", "h5", "head"],
        description: "Small section heading.",
        icon: <Heading5 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 5 })
            .run();
        },
      },
      {
        title: "Heading 6",
        searchTerms: ["minor", "h6", "head"],
        description: "Minor section heading.",
        icon: <Heading6 size={18} />,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 6 })
            .run();
        },
      },
      {
        title: "Bold",
        searchTerms: ["bold"],
        description: "Text appear thicker and darker.",
        icon: <Bold size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBold().run();
        },
      },
      {
        title: "Italic",
        searchTerms: ["italic"],
        description: "Emphasis a different tone.",
        icon: <Italic size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleItalic().run();
        },
      },
      {
        title: "Strike through",
        searchTerms: ["strike"],
        description: "Add a horizontal line through text.",
        icon: <Strikethrough size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleStrike().run();
        },
      },
      {
        title: "Bullet List",
        searchTerms: ["list", "bullet"],
        description: "Simple bullet list.",
        icon: <List size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: "Numbered List",
        searchTerms: ["ordered", "number", "list"],
        description: "Create a list with numbering.",
        icon: <ListOrdered size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: "Quote",
        searchTerms: ["Quote"],
        description: "Capture a quote.",
        icon: <Quote size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        title: "Code",
        searchTerms: ["code"],
        description: "Capture a code snippet.",
        icon: <CodepenIcon size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: "Table",
        searchTerms: ["table"],
        description: "Insert table.",
        icon: <Table size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        },
      },
      {
        title: "Youtube",
        searchTerms: ["youtube", "video"],
        description: "Insert a youtube video.",
        icon: <Youtube size={18} />,
        command: ({ editor, range }) => {
          addYoutubeVideo(editor, range);
        },
      },
      {
        title: "Image",
        searchTerms: ["image"],
        description: "Upload an image.",
        icon: <Image size={18} />,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run();
          // upload image
          // addImage(editor);
          // const input = document.createElement("input");
          // input.type = "file";
          // input.accept = "image/*";
          // input.onchange = async () => {
          //   if (input.files?.length) {
          //     const file = input.files[0];
          //     const pos = editor.view.state.selection.from;
          //     // startImageUpload(file, editor.view, pos);
          //   }
          // };
          // input.click();
        },
      },
    ].filter((item) => {
      if (typeof query === "string" && query.length > 0) {
        const search = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          (item.searchTerms &&
            item.searchTerms.some((term) => term.includes(search)))
        );
      }
      return true;
    });
  },

  render: () => {
    let component = null;
    let popup = null;

    return {
      onStart: (props) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        });

        // @ts-ignore
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },
      onUpdate: (props) => {
        component?.updateProps(props);

        popup &&
          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
      },
      onKeyDown: (props) => {
        if (props.event.key === "Escape") {
          popup?.[0].hide();

          return true;
        }

        // @ts-ignore
        return component?.ref?.onKeyDown(props);
      },
      onExit: () => {
        popup?.[0].destroy();
        component?.destroy();
      },
    };
  },
};
