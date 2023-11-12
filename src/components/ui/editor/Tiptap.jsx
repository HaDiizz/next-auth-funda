"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { defaultExtensions } from "@/lib/default-extensions";
import TipTapMenuBar from "./MenuBar";
import "@/styles/global.scss";
import { ImageResizer } from "./extensions/image-resizer";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import BubbleMenuList from "./BubbleMenuList";
import { EditorBubbleMenu } from "./Bubble";

const Tiptap = ({ editor, defaultValue, disableLocalStorage, hydrated, content, saveStatus }) => {
//   let defaultValue = `
//   <h2>
//     Hi there,
//   </h2>
//   <p>
//   That’s a boring paragraph followed by a fenced code block:
//   </p>
//       <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
//     {
//     if (i % 15 == 0)
//     console.log("FizzBuzz");
//     else if (i % 3 == 0)
//     console.log("Fizz");
//     else if (i % 5 == 0)
//     console.log("Buzz");
//     else
//     console.log(i);
//     }</code></pre>
//   <p>
//     Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
//   </p>
//   <ul data-type="taskList">
//     <li data-type="taskItem" data-checked="true">A list item</li>
//     <li data-type="taskItem" data-checked="false">And another one</li>
//   </ul>
//   <p>
//     this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
//   </p>
//   <ul>
//     <li>
//       That’s a bullet list with one …
//     </li>
//     <li>
//       … or two list items.
//     </li>
//   </ul>
//   <p>
//     Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
//   </p>
// <pre><code class="language-css">body {
// display: none;
// }</code></pre>
//   <p>
//     I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
//   </p>
//   <blockquote>
//     Wow, that’s amazing. Good work, boy! 👏
//     <br />
//     — Mom
//   </blockquote>
// `
//   let disableLocalStorage = false
  // const [editorState, setEditorState] = useState();
  // const [hydrated, setHydrated] = useState(false);
  // const [content, setContent] = useLocalStorage("next__content", defaultValue);
//   const editor = useEditor({
//     onUpdate: ({ editor }) => {
//       setEditorState(editor.getHTML());
//       setContent(editor.getHTML())
//     },
//     extensions: defaultExtensions,
// //     content: `
// //     <h2>
// //       Hi there,
// //     </h2>
// //     <p>
// //     That’s a boring paragraph followed by a fenced code block:
// //     </p>
// //         <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
// //       {
// //       if (i % 15 == 0)
// //       console.log("FizzBuzz");
// //       else if (i % 3 == 0)
// //       console.log("Fizz");
// //       else if (i % 5 == 0)
// //       console.log("Buzz");
// //       else
// //       console.log(i);
// //       }</code></pre>
// //     <p>
// //       Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
// //     </p>
// //     <ul data-type="taskList">
// //       <li data-type="taskItem" data-checked="true">A list item</li>
// //       <li data-type="taskItem" data-checked="false">And another one</li>
// //     </ul>
// //     <p>
// //       this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// //     </p>
// //     <ul>
// //       <li>
// //         That’s a bullet list with one …
// //       </li>
// //       <li>
// //         … or two list items.
// //       </li>
// //     </ul>
// //     <p>
// //       Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// //     </p>
// // <pre><code class="language-css">body {
// //   display: none;
// // }</code></pre>
// //     <p>
// //       I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// //     </p>
// //     <blockquote>
// //       Wow, that’s amazing. Good work, boy! 👏
// //       <br />
// //       — Mom
// //     </blockquote>
// //   `,
//     editorProps: {
//       attributes: {
//         class:
//           "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
//       },
//     },
//   });

  if (!editor) return null;

  // useEffect(() => {
  //   if (!editor || hydrated) return;

  //   const value = disableLocalStorage ? defaultValue : content;

  //   if (value) {
  //     editor.commands.setContent(value);
  //     setHydrated(true);
  //   }
  // }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

  return (
    <>
      {editor && <TipTapMenuBar editor={editor} />}
      {/* <BubbleMenuList editor={editor} /> */}
      <EditorBubbleMenu editor={editor} />
      {editor?.isActive("image") && <ImageResizer editor={editor} />}
      <div className="relative w-full">
        <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
          {saveStatus}
        </div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
