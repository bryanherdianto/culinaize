'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PaperclipIcon, ArrowUpIcon } from '@/components/icons'
import { Bot, User, X, Loader2, AlertTriangle, RotateCw, LogIn } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'error'
  imagePreview?: string
}

interface Attempt {
  text: string
  image: string | null
}

const STORAGE_KEY = 'culinaize:chat'

const EXAMPLE_PROMPTS = [
  'What can I make with eggs, rice and gochujang?',
  '30-minute vegetarian dinner, no nuts',
  'What can I use instead of buttermilk?',
  'I have chicken thighs and not much else — ideas?',
]

function ChatPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pastedImage, setPastedImage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Keeps the payload of the last send so an error bubble can offer Retry.
  const lastAttemptRef = useRef<Attempt | null>(null);

  const sendMessageWebhookUrl = 'https://echoes.app.n8n.cloud/webhook/e053181d-499f-45d1-aaa5-bd8c61ba8e06';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => resolve(event.target?.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Restore the conversation on mount. Images are deliberately not persisted —
  // base64 data URIs blow through the ~5 MB sessionStorage quota very quickly.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // Corrupt or unavailable storage is not worth failing the page over.
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      const withoutImages = messages.map(({ imagePreview, ...rest }) => rest);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(withoutImages));
    } catch {
      // Quota exceeded or storage disabled — the chat still works in memory.
    }
  }, [messages]);

  useEffect(() => { autoResize() }, [message]);
  useEffect(() => { scrollToBottom() }, [messages, isLoading]);

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      if (!event.clipboardData) return;
      const imageItem = Array.from(event.clipboardData.items).find(item => item.type.startsWith('image/'));
      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) {
          const base64String = await imageToBase64(file);
          setPastedImage(base64String);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64String = await imageToBase64(file);
      setPastedImage(base64String);
    }
  };

  const handleAttachmentClick = () => fileInputRef.current?.click();

  const pushError = (text: string) => {
    setMessages(prev => [...prev, { id: `${Date.now()}-err`, text, sender: 'error' }]);
  };

  // Sends an already-composed payload. Shared by the composer and by Retry.
  const dispatch = useCallback(async ({ text, image }: Attempt) => {
    setIsLoading(true);
    lastAttemptRef.current = { text, image };

    try {
      // Clerk session tokens are short-lived, so mint a fresh one per request.
      const token = await getToken();
      if (!token) {
        pushError('Your session has expired. Please sign in again.');
        return;
      }

      const n8nResponse = await fetch(sendMessageWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text, image }),
      });

      if (!n8nResponse.ok) {
        pushError(`The kitchen sent back an error (${n8nResponse.status}). Please try again.`);
        return;
      }

      const data = await n8nResponse.json();
      const reply = data.output?.text ?? data.message;

      // Never dress an unexpected response up as an answer from the assistant.
      if (typeof reply !== 'string' || reply.trim() === '') {
        pushError('The kitchen replied, but not in a form we could read. Please try again.');
        return;
      }

      setMessages(prev => [...prev, { id: `${Date.now()}-ai`, text: reply, sender: 'ai' }]);
      lastAttemptRef.current = null;
    } catch (error) {
      console.error('Error in dispatch:', error);
      pushError('Could not reach the kitchen. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!message.trim() && !pastedImage) || isLoading || !isSignedIn) return;

    const text = message.trim();
    const image = pastedImage;

    setMessages(prev => [...prev, {
      id: `${Date.now()}-user`,
      text,
      sender: 'user',
      imagePreview: image ?? undefined,
    }]);
    setMessage('');
    setPastedImage(null);

    await dispatch({ text, image });
  };

  const handleRetry = () => {
    const attempt = lastAttemptRef.current;
    if (!attempt || isLoading) return;
    // Drop the error bubble we are retrying past.
    setMessages(prev => prev.filter((m, i) => !(m.sender === 'error' && i === prev.length - 1)));
    void dispatch(attempt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const applyPrompt = (prompt: string) => {
    setMessage(prompt);
    textareaRef.current?.focus();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  const composerDisabled = isLoading || !isSignedIn;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="absolute top-2 left-2">
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold px-2 hover:bg-gray-800 rounded-md cursor-pointer">
            CulinAIze
          </span>
        </a>
      </div>

      <div className="mt-5 flex-1 flex flex-col px-4 py-8 pb-32">
        <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
          {/* Empty state: a greeting plus prompts that fill the composer. */}
          {messages.length === 0 && !isLoading && (
            <div className="flex h-full flex-col items-center justify-center gap-6 py-12 text-center">
              <Bot className="size-10 text-gray-500" />
              <div>
                <h1 className="text-2xl font-semibold">What are we cooking?</h1>
                <p className="mt-2 max-w-md text-sm text-gray-400">
                  Tell me what is in your kitchen, what you cannot eat, and how long you have got —
                  or paste a photo of your ingredients.
                </p>
              </div>
              {isSignedIn && (
                <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
                  {EXAMPLE_PROMPTS.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => applyPrompt(prompt)}
                      className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-left text-sm text-gray-300 transition-colors hover:border-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-6 pb-4">
            {messages.map((msg) => {
              if (msg.sender === 'error') {
                return (
                  <div key={msg.id} className="flex justify-start gap-3">
                    <AlertTriangle className="size-6 flex-shrink-0 text-red-400" />
                    <div className="max-w-md rounded-lg border border-red-900 bg-red-950/60 px-4 py-2">
                      <p className="text-sm text-red-200">{msg.text}</p>
                      {lastAttemptRef.current && (
                        <button
                          onClick={handleRetry}
                          disabled={isLoading}
                          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-300 hover:text-red-100 disabled:opacity-50"
                        >
                          <RotateCw className="size-3.5" />
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && <Bot className="size-6 flex-shrink-0" />}
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-white'
                    }`}
                  >
                    {msg.imagePreview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={msg.imagePreview} alt="Attached ingredients" className="rounded-lg mb-2 max-h-48" />
                    )}
                    {msg.text && (
                      msg.sender === 'ai' ? (
                        <div className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:mb-2 prose-headings:mt-3">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      )
                    )}
                  </div>
                  {msg.sender === 'user' && <User className="size-6 flex-shrink-0" />}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Bot className="size-6 flex-shrink-0" />
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center">
                  <Loader2 className="size-5 animate-spin mr-2" />
                  <span className="text-sm">Chef is thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 w-full px-4 pb-4 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Real signed-out gate, in place of a fake AI message telling you to sign in. */}
          {!isSignedIn ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 px-4 py-6 text-center">
              <p className="text-sm text-gray-300">
                Sign in to start cooking with CulinAIze.
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
              >
                <LogIn className="size-4" />
                Sign in with GitHub
              </a>
            </div>
          ) : (
            <>
              {pastedImage && (
                <div className="relative size-24 p-2 border border-gray-700 bg-gray-900 rounded-lg mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pastedImage} alt="Attachment preview" className="size-full object-cover rounded" />
                  <button
                    onClick={() => { setPastedImage(null); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    aria-label="Remove attachment"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
              <div className="relative bg-gray-900 rounded-lg border border-gray-900 focus-within:border-gray-800">
                <div className="flex items-center p-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={handleAttachmentClick}
                    disabled={composerDisabled}
                    aria-label="Attach an image"
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors mr-3 self-end disabled:opacity-50"
                  >
                    <PaperclipIcon size={20} />
                  </button>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      autoResize()
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Send a message..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none min-h-[24px] max-h-64 overflow-y-auto disabled:opacity-50"
                    rows={1}
                    disabled={composerDisabled}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="flex-shrink-0 p-2 ml-3 text-black bg-white hover:bg-gray-300 rounded-full transition-colors self-end disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={(!message.trim() && !pastedImage) || composerDisabled}
                    aria-label="Send message"
                  >
                    <ArrowUpIcon size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
