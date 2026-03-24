
"use client";

import { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";


export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#7c090c] px-5 py-4 text-white shadow-lg"
      >
        Chat
      </button>
    </>
  );
}
