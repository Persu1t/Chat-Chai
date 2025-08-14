"use client";
import React from "react";
import { generateText, generateAudio } from "./action";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Image from "next/image";

const Page = () => {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input;
    setInput("");

    // 1️⃣ Add user message
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    // 2️⃣ Add loading bubble
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", audio: null, loading: true }
    ]);

    // 3️⃣ Get AI text
    const { text } = await generateText(userInput);

    // Replace loading bubble with text (still no audio yet)
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: "assistant",
        content: text,
        audio: null,
        loading: false
      };
      return updated;
    });

    // 4️⃣ Generate audio (async)
    generateAudio(text).then(({ audio }) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          audio
        };
        return updated;
      });
    });
  };

  return (
    <div className="flex flex-col h-[90vh] bg-base-200">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full text-center p-6">
            <div className="bg-base-200 rounded-xl shadow-lg p-8 max-w-xl flex flex-col items-center">
              <Image
                src="https://github.com/hiteshchoudhary.png"
                alt="Hitesh Choudhary"
                className=" rounded-full shadow-md mb-4"
                width={24}
                height={24}
              />
              <h1 className="text-3xl font-bold text-primary mb-2">
                Your Personal Persona-based AI Coach
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Hitesh Choudhary is here to guide you — start the conversation and get personalized advice!
              </p>
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src={
                    msg.role === "user"
                      ? "https://ui-avatars.com/api/?name=You"
                      : "https://github.com/hiteshchoudhary.png"
                  }
                />
              </div>
            </div>

            <div>
              {/* Audio Button for AI */}
              {msg.role === "assistant" && msg.audio && !msg.loading && (
                <audio controls className="mb-1 w-48">
                  <source src={msg.audio} type="audio/mpeg" />
                </audio>
              )}

              {/* Chat Bubble */}
              <div
                className={`chat-bubble ${
                  msg.role === "user"
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {msg.loading ? (
                  //  Loader animation
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-base-100 flex gap-2 items-center"
      >
        <textarea
          className="textarea textarea-bordered flex-1 resize-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;
