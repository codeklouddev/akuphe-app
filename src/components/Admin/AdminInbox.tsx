'use client'

import { useEffect, useState } from 'react'
import { getMessages, markAsRead, deleteMessage } from '@/actions/get-messages'
import { MsgIcon } from '@/utils/icons'

type Message = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminInbox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    const data = await getMessages()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    const result = await markAsRead(id)
    if (result.success) {
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ))
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: true })
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const result = await deleteMessage(id)
      if (result.success) {
        setMessages(messages.filter(msg => msg._id !== id))
        if (selectedMessage?._id === id) {
          setSelectedMessage(null)
        }
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const unreadCount = messages.filter(msg => !msg.read).length

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
      {/* Message List */}
      <div className="lg:w-96 bg-secondary border border-border rounded-lg flex flex-col h-full">
        <div className="px-4 py-3 border-b border-border flex-shrink-0">
          <h3 className="text-sm font-medium text-neutral flex items-center justify-between">
            INBOX
            {unreadCount > 0 && (
              <span className="bg-accent text-primary text-xs px-1.5 py-0.5 rounded font-normal">
                {unreadCount}
              </span>
            )}
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-tertiary-content text-center py-8 text-sm">No messages yet</p>
          ) : (
            <div className="divide-y divide-border">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`px-3 py-2.5 cursor-pointer transition-all ${
                    selectedMessage?._id === msg._id
                      ? 'bg-primary border-l-2 border-l-accent ml-[-2px]'
                      : 'hover:bg-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm truncate ${!msg.read ? 'font-medium text-neutral' : 'text-tertiary-content'}`}>
                      {msg.name}
                    </p>
                    {!msg.read && (
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p className={`text-xs truncate ${!msg.read ? 'text-neutral' : 'text-tertiary-content'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-tertiary-content mt-1">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 bg-secondary border border-border rounded-lg flex flex-col h-full">
        {selectedMessage ? (
          <>
            <div className="px-4 py-3 border-b border-border flex-shrink-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium text-neutral">{selectedMessage.subject}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-tertiary-content mt-1">
                    <span>{selectedMessage.name}</span>
                    <span>•</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-accent hover:underline">
                      {selectedMessage.email}
                    </a>
                    <span>•</span>
                    <span>{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage._id)}
                      className="px-2.5 py-1 bg-accent text-primary rounded text-xs font-medium hover:opacity-90"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-2.5 py-1 text-red-500 border border-red-500 rounded text-xs font-medium hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-neutral whitespace-pre-wrap text-sm leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-tertiary-content">
            <div>
              <MsgIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}