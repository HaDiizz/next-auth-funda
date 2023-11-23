"use client"

import { generateHTML } from "@tiptap/html";
import React, { useMemo } from "react";
import { defaultEditorContent } from "@/lib/default-content";
import { defaultExtensions } from "@/lib/default-extensions";
import useLocalStorage from "@/hooks/use-local-storage";

const json = defaultEditorContent;
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
export default function PreviewPage() {
  const [content, setContent] = useLocalStorage("next__content", defaultValue);
  // const output = useMemo(() => {
  //   return generateHTML(json, content);
  // }, [json]);

  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}
