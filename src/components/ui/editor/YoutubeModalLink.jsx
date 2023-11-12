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

export function YoutubeModalLink({ editor, isOpen, handleClose, range }) {
  const [link, setLink] = useState("");

  const addYoutubeLink = () => {
    if (link) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setYoutubeVideo({ src: link })
        .run();
    }
    handleClose();
  };

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Youtube URL
            </ModalHeader>
            <ModalBody>
              <div className="pt-5 pb-5 flex gap-x-3">
                <Input
                  name="youtube-link"
                  type="text"
                  placeholder="URL"
                  onChange={(e) => setLink(e.target.value)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addYoutubeLink}
                >
                  ADD
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
