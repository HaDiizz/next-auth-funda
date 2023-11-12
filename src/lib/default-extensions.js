import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import { InputRule } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import Document from "@tiptap/extension-document";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { common, createLowlight } from "lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import { WebrtcProvider } from "y-webrtc";
// import * as Y from "yjs";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Youtube from "@tiptap/extension-youtube";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import BubbleMenu from '@tiptap/extension-bubble-menu'

import CodeBlockComponent from "@/components/CodeBlockComponent";
import suggestion from "@/components/ui/editor/extensions/suggestion";

// const ydoc = new Y.Doc();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const provider = new WebrtcProvider('tiptap-collaboration-extension', ydoc)

// const provider = new HocuspocusProvider({
//   url: "ws://127.0.0.1:1234",
//   name: "example-document",
// });

const lowlight = createLowlight(common);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const UpdatedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
});

const Commands = Extension.create({
  name: "slash-command",

  addOptions: {
    suggestion: {
      char: "/",
      command: ({ editor, range, props }) => {
        props.command({ editor, range });
      },
    },
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const defaultExtensions = [
  // BubbleMenu.configure({
  //   element: document.querySelector('.menu'),
  // }),
  Commands.configure({
    suggestion,
  }),
  // Collaboration.configure({
  //   document: provider.document,
  // }),
  // CollaborationCursor.configure({
  //   provider,
  //   user: {
  //     name: "Cyndi Lauper",
  //     color: "#f783ac",
  //   },
  // }),
  StarterKit.configure({
    history: true,
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    // codeBlock: {
    //   HTMLAttributes: {
    //     class:
    //       "rounded-sm bg-stone-100 p-10 font-mono font-medium text-stone-800",
    //   },
    // },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300",
    },
  }),
  TiptapLink.configure({
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: {
      class:
        "text-indigo-400 underline underline-offset-[3px] hover:text-indigo-600 transition-colors cursor-pointer",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
  UpdatedImage.configure({
    allowBase64: true,
    inline: false,
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200 ml-auto mr-auto",
    },
  }),
  Youtube.configure({
    width: 520,
    height: 350,
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  TiptapUnderline,
  TextStyle.configure({ types: [ListItem.name] }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Highlight.configure({
    multicolor: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({ lowlight }),
  // Document,
  // Markdown.configure({
  //   html: true,
  //   transformCopiedText: true,
  // }),
];
