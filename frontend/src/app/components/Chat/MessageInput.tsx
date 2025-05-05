// SPDX-FileCopyrightText: Copyright (c) 2025 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use client";

import { useApp } from "../../context/AppContext";
import Image from "next/image";
interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: () => void;
  onAbort?: () => void;
  isStreaming: boolean;
  onReset: () => void;
}

export default function MessageInput({
  message,
  setMessage,
  onSubmit,
  onAbort,
  isStreaming,
  onReset,
}: MessageInputProps) {
  const { selectedCollection } = useApp();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) {
        onSubmit();
      }
    }
  };

  return (
    <div className="border-t border-gray-300 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg border border-[var(--nv-green)]">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your question"
            className="scrollbar-hide max-h-[200px] min-h-[44px] w-full resize-none bg-white px-4 py-3 text-black focus:outline-none"
            style={{ height: "auto" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
          />

          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="text-sm text-black transition-colors hover:text-gray-600"
              onClick={onReset}
            >
              Reset Chat
            </button>

            {selectedCollection ? (
              <div className="rounded-full bg-white px-4 py-1 text-sm text-black">
                <div className="flex items-center">
                  <Image
                    src="/collection.svg"
                    alt="Upload files"
                    width={24}
                    height={24}
                    className="mr-1"
                  />
                  {selectedCollection}
                </div>
              </div>
            ) : (
              <div className="rounded-full border border-black px-4 py-1 text-sm text-black">
                <div className="flex items-center">
                  <Image
                    src="/collection.svg"
                    alt="Upload files"
                    width={24}
                    height={24}
                    className="mr-1"
                  />
                  No Collection
                </div>
              </div>
            )}
            <button
              onClick={isStreaming ? onAbort : onSubmit}
              disabled={!message.trim() && !isStreaming}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isStreaming
                  ? "bg-white text-black hover:brightness-90"
                  : !message.trim()
                    ? "bg-white text-neutral-600"
                    : "bg-[var(--nv-green)] text-black hover:brightness-90"
              }`}
            >
              {isStreaming ? "Stop" : "Send"}
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-black">
          Model responses may be inaccurate or incomplete. Verify critical
          information before use.
        </p>
      </div>
    </div>
  );
}
