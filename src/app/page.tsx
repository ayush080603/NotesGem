import { redirect } from "next/navigation";
import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import HomeToast from "@/components/HomeToast";
import { prisma } from "@/db/prisma";
import { NextPage } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const HomePage: NextPage<Props> = async ({ searchParams }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const noteIdParam = searchParams.noteId;
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  let note = null;

  if (noteId) {
    note = await prisma.note.findUnique({
      where: { id: noteId, authorId: user.id },
      select: { id: true, text: true, title: true, createdAt: true, updatedAt: true },
    });
  }

  if (!note) {
    const newestNote = await prisma.note.findFirst({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    if (newestNote) {
      redirect(`/?noteId=${newestNote.id}`);
    } else {
      const newNote = await prisma.note.create({
        data: { authorId: user.id, text: "", title: "Untitled" },
        select: { id: true },
      });
      redirect(`/?noteId=${newNote.id}`);
    }
  }

  // ✅ safeguard
  if (!note) {
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={note.id} startingNoteText={note.text || ""} />
      <HomeToast />
    </div>
  );
};

export default HomePage;
