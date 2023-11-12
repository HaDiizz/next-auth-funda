"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Highlighter } from "lucide-react";

export function HightLightDropdown({ editor }) {
  const [position, setPosition] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={editor.isActive("highlight") ? "is-active" : ""}>
          {" "}
          <Highlighter className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Highlight Colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={
            editor.isActive("highlight", { color: "#d78bfd" })
              ? "secondary"
              : editor.isActive("highlight", { color: "#86e1ff" })
              ? "primary"
              : editor.isActive("highlight", { color: "#7bff8f" })
              ? "success"
              : editor.isActive("highlight", { color: "#ffe066" })
              ? "warning"
              : editor.isActive("highlight", { color: "#ff7a7a" })
              ? "danger"
              : ""
          }
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#d78bfd" }).run()
            }
            value="secondary"
          >
            Secondary
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#86e1ff" }).run()
            }
            value="primary"
          >
            Primary
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#7bff8f" }).run()
            }
            value="success"
          >
            Success
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleHighlight({ color: "#ffe066" })
                .run();
            }}
            value="warning"
          >
            Warning
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#ff7a7a" }).run()
            }
            value="danger"
          >
            Danger
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
