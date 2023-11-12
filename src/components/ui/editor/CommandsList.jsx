"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { Image } from "lucide-react";
import { ImageModalSelector } from "./ImageModalSelector";
import { Button, useDisclosure } from "@nextui-org/react";
import { YoutubeModalLink } from "./YoutubeModalLink";

const CommandsList = ({ items, command, editor, range }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");

  const handleOpen = (title) => {
    onOpen();
    setModalTitle(title);
    const element = commandListContainer.current;
    if (element) {
      element.style.display = "none";
    }
  };

  const handleClose = () => {
    onClose();
    const element = commandListContainer.current;
    if (element) {
      element.style.display = "block";
    }
  };

  const selectItem = useCallback(
    (index, title) => {
      const item = items[index];
      if (item && title !== "Image" && title !== "Youtube") {
        command(item);
      }
      if (title === "Image" || title === "Youtube") {
        handleOpen(title);
      }
    },
    [items, handleOpen]
  );

  const updateScrollView = (container, item) => {
    const containerHeight = container.offsetHeight;
    const itemHeight = item ? item.offsetHeight : 0;

    const top = item.offsetTop;
    const bottom = top + itemHeight;

    if (top < container.scrollTop) {
      container.scrollTop -= container.scrollTop - top + 5;
    } else if (bottom > containerHeight + container.scrollTop) {
      container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
    }
  };

  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex];

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          if (items[selectedIndex].title === "Image") {
            selectItem(selectedIndex, "Image");
          } 
          else if (items[selectedIndex].title === "Youtube") {
            selectItem(selectedIndex, "Youtube");
          } 
          else {
            selectItem(selectedIndex);
          }
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  return (
    <>
      <ImageModalSelector
        editor={editor}
        isOpen={modalTitle === "Image" ? isOpen : false}
        handleClose={handleClose}
        range={range}
      />
      <YoutubeModalLink
        editor={editor}
        isOpen={modalTitle === "Youtube" ? isOpen : false}
        handleClose={handleClose}
        range={range}
      />
      <div
        id="slash-command"
        ref={commandListContainer}
        className="items z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
      >
        {items.map((item, index) => (
          <button
            className={`item flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
              index === selectedIndex
                ? "is-selected bg-stone-100 text-stone-900"
                : ""
            }`}
            key={index}
            onClick={() => selectItem(index, item.title)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
              {item.icon}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-stone-500">{item.description}</p>
            </div>
          </button>
        ))}

        {/* <button
        className={`item flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100`}
        onClick={() => setIsOpenModal(true)}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
          <Image size={18} />
        </div>
        <div>
          <p className="font-medium">Image</p>
          <p className="text-xs text-stone-500">Upload an image</p>
        </div>
      </button> */}
      </div>
    </>
  );
};

export default CommandsList;
