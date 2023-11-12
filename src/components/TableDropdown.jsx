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
import { Table } from "lucide-react";

export function TableDropdown({ editor }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Table className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Table Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
        >
          <DropdownMenuRadioItem
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            value="insert"
          >
            Insert
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
            value="addColumnBefore"
          >
            Add column before
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            value="addColumnAfter"
          >
            Add column after
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
            value="deleteColumn"
          >
            Delete column
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
            value="addRowBefore"
          >
            Add row before
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            value="addRowAfter"
          >
            Add row after
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
            value="deleteRow"
          >
            Delete row
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
            value="mergeCells"
          >
            Merge cells
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
            value="splitCell"
          >
            Split cell
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
            value="deleteTable"
          >
            Delete table
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
