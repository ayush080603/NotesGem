"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Edit3 } from "lucide-react";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { renameNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  currentTitle: string;
  renameNoteLocally: (noteId: string, newTitle: string) => void;
};

export default function RenameNoteButton({ noteId, currentTitle, renameNoteLocally }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle || "");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) setTitle(currentTitle || "");
  };

  const handleRename = () => {
    const newTitle = (title || "Untitled Note").trim();
    startTransition(async () => {
      const { errorMessage } = await renameNoteAction(noteId, newTitle);
      if (!errorMessage) {
        toast({
          title: "Renamed",
          description: "Note title updated",
          variant: "success",
        });
        renameNoteLocally(noteId, newTitle);
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-10 top-1/2 size-7 -translate-y-1/2 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
          aria-label="Rename note"
        >
          <Edit3 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename note</AlertDialogTitle>
          <AlertDialogDescription>Enter a new title for this note.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New title" />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRename} className="w-24">
            {isPending ? "Renaming..." : "Rename"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
