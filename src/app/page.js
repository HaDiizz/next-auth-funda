"use client";

import { useSession, signOut } from "next-auth/react";
import User from "@/components/User";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/ui/editor/Tiptap";
import Editor from "@/components/ui/editor/Editor";
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "@/lib/default-extensions";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { useDebounce } from "@/hooks/use-debounce";
import { DialogDemo } from "@/components/ui/editor/ImageModalSelector";
import { defaultEditorProps } from "@/lib/default-props";

export default function Home() {
  let defaultValue = `
    <h2>
      Hi there,
    </h2>
    <p>
    That’s a boring paragraph followed by a fenced code block:
    </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
      {
      if (i % 15 == 0)
      console.log("FizzBuzz");
      else if (i % 3 == 0)
      console.log("Fizz");
      else if (i % 5 == 0)
      console.log("Buzz");
      else
      console.log(i);
      }</code></pre>
    <p>
      Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
    </p>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <p>
      this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
  <pre><code class="language-css">body {
  display: none;
  }</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `;
  let disableLocalStorage = false;
  const [hydrated, setHydrated] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [base64ImageCount, setBase64ImageCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [content, setContent] = useLocalStorage("next__content", defaultValue);
  const { data: session } = useSession();
  const [editorState, setEditorState] = useState();
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      setSaveStatus("Saving");
      setTimeout(() => {
        setEditorState(editor.getHTML());
        setContent(editor.getHTML());
        setSaveStatus("Saved");
      }, 2000);
      // const count = editor.getHTML().match(/<img/g)?.length || 0;
      // console.log("count", count);
      // setImageCount(count);
      const contentHTML = editor.getHTML();
      const base64ImageCount = countBase64Images(contentHTML);
      setBase64ImageCount(base64ImageCount);
    },
    // onTransaction: ({ transaction, editor }) => {
    //   // Check if the transaction involves adding an image
    //   console.log(transaction);
    //   // if(imageCount > 3) {
    //   //   editor.commands.undo();
    //   // }
    //   // if (transaction.steps.some((step) => step.json().type === 'image')) {
    //   //   const newImageCount = imageCount + 1;
    //   //   if (newImageCount > 3) {
    //   //     // Cancel the transaction if the image count exceeds the limit
    //   //     transaction.rollback();
    //   //   } else {
    //   //     setImageCount(newImageCount);
    //   //   }
    //   // }
    // },
    autofocus: true,
    extensions: defaultExtensions,
    // content: `<h1>Hello World</h1>`,
    //     content: `
    //     <h2>
    //       Hi there,
    //     </h2>
    //     <p>
    //     That’s a boring paragraph followed by a fenced code block:
    //     </p>
    //         <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
    //       {
    //       if (i % 15 == 0)
    //       console.log("FizzBuzz");
    //       else if (i % 3 == 0)
    //       console.log("Fizz");
    //       else if (i % 5 == 0)
    //       console.log("Buzz");
    //       else
    //       console.log(i);
    //       }</code></pre>
    //     <p>
    //       Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
    //     </p>
    //     <ul data-type="taskList">
    //       <li data-type="taskItem" data-checked="true">A list item</li>
    //       <li data-type="taskItem" data-checked="false">And another one</li>
    //     </ul>
    //     <p>
    //       this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    //     </p>
    //     <ul>
    //       <li>
    //         That’s a bullet list with one …
    //       </li>
    //       <li>
    //         … or two list items.
    //       </li>
    //     </ul>
    //     <p>
    //       Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    //     </p>
    // <pre><code class="language-css">body {
    //   display: none;
    // }</code></pre>
    //     <p>
    //       I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    //     </p>
    //     <blockquote>
    //       Wow, that’s amazing. Good work, boy! 👏
    //       <br />
    //       — Mom
    //     </blockquote>
    //   `,
    editorProps: {
      // attributes: {
      //   class:
      //     "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      // },
      ...defaultEditorProps,
    },
  });

  useEffect(() => {
    const handleImageInsert = ({ editor }) => {
      const contentHTML = editor.getHTML();
      const base64ImageCount = countBase64Images(contentHTML);
      if (base64ImageCount > 3) {
        editor.commands.undo();
        alert("You can upload 3 images")
      } else {
        setBase64ImageCount(base64ImageCount);
        // setImageCount(newImageCount);
      }
    };

    editor?.on('transaction', handleImageInsert);

    return () => {
      editor?.off('transaction', handleImageInsert);
    };
  }, [editor]);

  const countBase64Images = (content) => {
    const base64ImageRegex = /<img[^>]+src="data:image[^"]+"/g;
    const matches = content.match(base64ImageRegex);
    return matches ? matches.length : 0;
  };

  useEffect(() => {
    if (!editor || hydrated) return;

    const value = disableLocalStorage ? defaultValue : content;

    if (value) {
      setTimeout(() => {
        editor.commands.setContent(value);
      });
      setHydrated(true);
    }
  }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

  const debouncedEditorState = useDebounce(editorState, 500);
  useEffect(() => {
    if (debouncedEditorState === "<p></p>") return;
  }, [debouncedEditorState]);

  return (
    <>
      <h1 className="text-red-500">
        Hello World {session ? <User session={session} /> : "GUEST"}
      </h1>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </Button>
      <br />
      <br />
      <Tiptap
        editor={editor}
        defaultValue={defaultValue}
        disableLocalStorage={disableLocalStorage}
        hydrated={hydrated}
        content={content}
        saveStatus={saveStatus}
      />
      {/* <Editor/> */}
    </>
  );
}
