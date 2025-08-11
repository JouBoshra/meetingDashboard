import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Edit2, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  addComment,
  subscribeToSectionComments,
  updateComment,
  deleteComment,
} from "../../services/commentsService";

const FirebaseComments = ({ sectionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", text: "" });
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pre-fill author from last session
  useEffect(() => {
    const saved = localStorage.getItem("commentsUsername");
    if (saved) setNewComment((p) => ({ ...p, author: saved }));
  }, []);

  // Subscribe to Firestore comments for this section
  useEffect(() => {
    console.log("Subscribing to comments for section:", sectionId);
    const unsubscribe = subscribeToSectionComments(
      sectionId,
      (commentsData) => {
        console.log("Received comments:", commentsData);
        setComments(commentsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error in comments subscription:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [sectionId]);

  const canModifyComment = (c) => {
    return localStorage.getItem("commentsUsername") === c.author;
  };

  const handleEdit = async (id, text) => {
    try {
      await updateComment(id, { text });
      setEditingComment(null);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handlePostClick = async () => {
    console.log("Posting comment for section", sectionId, newComment);
    setError(null);
    if (!newComment.author.trim() || !newComment.text.trim()) return;
    setLoading(true);
    try {
      localStorage.setItem("commentsUsername", newComment.author.trim());
      await addComment({
        author: newComment.author.trim(),
        text: newComment.text.trim(),
        sectionId,
      });
      console.log("Comment successfully posted");
      setNewComment({ author: newComment.author.trim(), text: "" });
    } catch (err) {
      console.error("Error posting comment:", err);
      setError(err.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
        <p className="text-gray-500 mt-2">Loading comments...</p>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          Comments & Notes
        </CardTitle>
        <CardDescription>
          Share your thoughts and feedback about this section
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-700">
                  {comment.author}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {comment.createdAt?.toDate?.()?.toLocaleString() ||
                      "Just now"}
                  </span>
                  {canModifyComment(comment) && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingComment(comment.id)}
                        className="h-6 w-6 p-0 hover:bg-blue-100"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(comment.id)}
                        className="h-6 w-6 p-0 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {editingComment === comment.id ? (
                <EditCommentForm
                  comment={comment}
                  onSave={(text) => handleEdit(comment.id, text)}
                  onCancel={() => setEditingComment(null)}
                />
              ) : (
                <p className="text-gray-700">{comment.text}</p>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No comments yet.</p>
        )}

        <div className="space-y-3">
          <div className="grid md:grid-cols-4 gap-3">
            <Input
              placeholder="Your name"
              value={newComment.author}
              onChange={(e) =>
                setNewComment((p) => ({ ...p, author: e.target.value }))
              }
              className="md:col-span-1"
            />
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment.text}
              onChange={(e) =>
                setNewComment((p) => ({ ...p, text: e.target.value }))
              }
              className="md:col-span-2 min-h-[40px]"
            />
            <Button
              type="button"
              onClick={handlePostClick}
              className="md:col-span-1 bg-blue-600 hover:bg-blue-700"
              disabled={!newComment.author.trim() || !newComment.text.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EditCommentForm = ({ comment, onSave, onCancel }) => {
  const [editText, setEditText] = useState(comment.text);

  const handleSaveClick = () => {
    if (editText.trim()) onSave(editText.trim());
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="min-h-[60px]"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FirebaseComments;
