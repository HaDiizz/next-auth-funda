import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import { FC, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  AlignLeft,
  AlignJustify,
  AlignRight,
  AlignCenter,
} from "lucide-react";
import { NodeSelector } from "./NodeSelector";
import { ColorSelector } from "./ColorSelector";
import { LinkSelector } from "./LinkSelector";
import { cn } from "@/lib/utils";
import { TableDropdown } from "@/components/TableDropdown";
import TableOptions from "./TableOptions";

export const EditorBubbleMenu = (props) => {
  const items = [
    {
      name: "left",
      isActive: () => props.editor.isActive({ textAlign: "left" }),
      command: () => props.editor.chain().focus().setTextAlign("left").run(),
      icon: AlignLeft,
    },
    {
      name: "center",
      isActive: () => props.editor.isActive({ textAlign: "center" }),
      command: () => props.editor.chain().focus().setTextAlign("center").run(),
      icon: AlignCenter,
    },
    {
      name: "right",
      isActive: () => props.editor.isActive({ textAlign: "right" }),
      command: () => props.editor.chain().focus().setTextAlign("right").run(),
      icon: AlignRight,
    },
    {
      name: "justify",
      isActive: () => props.editor.isActive({ textAlign: "justify" }),
      command: () => props.editor.chain().focus().setTextAlign("justify").run(),
      icon: AlignJustify,
    },
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor.isActive("italic"),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor.isActive("underline"),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => props.editor.isActive("strike"),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => props.editor.isActive("code"),
      command: () => props.editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive("image") || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const [isTableOptionOpen, setIsTableOptionOpen] = useState(false);

  return (
    <>
      <BubbleMenu
        {...bubbleMenuProps}
        className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
      >
        <NodeSelector
          editor={props.editor}
          isOpen={isNodeSelectorOpen}
          setIsOpen={() => {
            setIsNodeSelectorOpen(!isNodeSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsLinkSelectorOpen(false);
            setIsTableOptionOpen(false);
          }}
        />
        <LinkSelector
          editor={props.editor}
          isOpen={isLinkSelectorOpen}
          setIsOpen={() => {
            setIsLinkSelectorOpen(!isLinkSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsTableOptionOpen(false);
          }}
        />
        <div className="flex">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
              type="button"
            >
              <item.icon
                className={cn("h-4 w-4", {
                  "text-blue-500": item.isActive(),
                })}
              />
            </button>
          ))}
        </div>
        <ColorSelector
          editor={props.editor}
          isOpen={isColorSelectorOpen}
          setIsOpen={() => {
            setIsColorSelectorOpen(!isColorSelectorOpen);
            setIsNodeSelectorOpen(false);
            setIsLinkSelectorOpen(false);
            setIsTableOptionOpen(false);
          }}
        />
        <TableOptions
          editor={props.editor}
          isOpen={isTableOptionOpen}
          setIsOpen={() => {
            setIsTableOptionOpen(!isTableOptionOpen);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />
      </BubbleMenu>
    </>
  );
};
