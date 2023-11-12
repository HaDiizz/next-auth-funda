import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "../input";
import DropZone from "@/components/DropZone";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export function ImageModalSelector({ editor, isOpen, handleClose, range }) {
  const [link, setLink] = useState("");

  const addImageLink = () => {
    if (link) {
        editor.chain().focus().deleteRange(range).setImage({ src: link }).run();
    }
    handleClose();
  };

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Image Options
            </ModalHeader>
            <ModalBody>
              <Tabs defaultValue="link-selector" className="w-100">
                <TabsList>
                  <TabsTrigger value="link-selector">Link</TabsTrigger>
                  <TabsTrigger value="upload-selector">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="link-selector">
                  <div className="pt-5 pb-5 flex gap-x-3">
                    <Input
                      name="image-link"
                      type="text"
                      placeholder="URL"
                      onChange={(e) => setLink(e.target.value)}
                    />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={addImageLink}
                      >
                        ADD
                      </Button>
                  </div>
                </TabsContent>
                <TabsContent value="upload-selector">
                  <div className="pt-5 pb-5">
                    <DropZone className="p-16 mt-10 border border-neutral-200" editor={editor} />
                  </div>
                </TabsContent>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// export function ImageModalSelector({ editor }) {
//   const [link, setLink] = useState("");
//   const addImageLink = () => {
//     console.log(link);
//     if (link) {
//       editor.chain().focus().setImage({ src: link }).run();
//     }
//   };
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button
//           className={`item flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100`}
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
//             <Image size={18} />
//           </div>
//           <div>
//             <p className="font-medium">Image</p>
//             <p className="text-xs text-stone-500">Upload an image</p>
//           </div>
//         </button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>Image Options</DialogHeader>
//         <Tabs defaultValue="link-selector" className="w-100">
//           <TabsList>
//             <TabsTrigger value="link-selector">Link</TabsTrigger>
//             <TabsTrigger value="upload-selector">Upload</TabsTrigger>
//           </TabsList>
//           <TabsContent value="link-selector">
//             <div className="pt-5 pb-5 flex gap-x-3">
//               <Input
//                 name="image-link"
//                 type="text"
//                 placeholder="URL"
//                 onChange={(e) => setLink(e.target.value)}
//               />
//               <DialogClose asChild>
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={addImageLink}
//                 >
//                   ADD
//                 </Button>
//               </DialogClose>
//             </div>
//           </TabsContent>
//           <TabsContent value="upload-selector">
//             <div className="pt-5 pb-5">
//               <DropZone className="p-16 mt-10 border border-neutral-200" />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// }
