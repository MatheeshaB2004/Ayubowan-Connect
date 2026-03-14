'use client';

import React, { useEffect, useState } from 'react';
import { Camera, ShieldCheck, Star, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import './review.css';

type ReviewMedia = {
  id: number;
  mediaType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  displayOrder: number;
};

type Review = {
  id: number;
  listingId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  reply?: string;
  media: ReviewMedia[];
  createdAt: string;
  updatedAt: string;
};

type ReviewsResponse = {
  total: number;
  averageRating: number;
  reviews: Review[];
};

type ReviewSectionProps = {
  listingId: number;
  ratingAverage: number;
  onListingUpdate?: React.Dispatch<React.SetStateAction<any>>;
  hideTitle?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';


export default function ReviewSection({ listingId, ratingAverage, onListingUpdate, hideTitle  }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Write-new-review state
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ comment: '' });
  const [reviewMediaFiles, setReviewMediaFiles] = useState<File[]>([]);
  const [reviewMediaPreviews, setReviewMediaPreviews] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // My existing review state
  const [myReview, setMyReview] = useState<Review | null | undefined>(undefined); // undefined = loading
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit-form media state
  const [editExistingMedia, setEditExistingMedia] = useState<ReviewMedia[]>([]);
  const [editNewFiles, setEditNewFiles] = useState<File[]>([]);
  const [editNewPreviews, setEditNewPreviews] = useState<string[]>([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');

  const inputId = `review-media-input-${listingId}`;

  const loadReviews = async (signal?: AbortSignal) => {
    setReviewsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/marketplace/${listingId}/reviews`, { signal });
      if (!response.ok) {
        throw new Error('Unable to load reviews');
      }
      const data = (await response.json()) as ReviewsResponse;
      setReviews(data.reviews);
      setTotalReviews(data.total);
      setAverageRating(data.averageRating);
    } catch (err) {
      if (!isAbortError(err)) {
        console.error('Failed to load reviews:', err);
      }
    } finally {
      if (!signal?.aborted) {
        setReviewsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!listingId) return;
    const controller = new AbortController();
    loadReviews(controller.signal);
    return () => controller.abort();
  }, [listingId]);

  useEffect(() => {
    return () => {
      reviewMediaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [reviewMediaPreviews]);

  useEffect(() => {
    return () => {
      editNewPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [editNewPreviews]);

  // Fetch the current user's existing review for this listing
  useEffect(() => {
    if (!listingId || !user?.email) { setMyReview(null); return; }
    fetch(`${API_BASE}/marketplace/${listingId}/my-review?userEmail=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => setMyReview(data ?? null))
      .catch(() => setMyReview(null));
  }, [listingId, user?.email]);

  const openEdit = () => {
    if (!myReview) return;
    setEditRating(myReview.rating);
    setEditComment(myReview.comment);
    setEditExistingMedia(myReview.media ?? []);
    setEditNewFiles([]);
    setEditNewPreviews([]);
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myReview || !user?.email || !editRating || !editComment.trim()) return;
    setIsUpdating(true);
    try {
      let newUrls: string[] = [];
      if (editNewFiles.length > 0) {
        const formData = new FormData();
        editNewFiles.forEach((file) => formData.append('files', file));
        const uploadRes = await fetch(`${API_BASE}/marketplace/upload-review-media`, {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('Failed to upload media');
        const uploadData = await uploadRes.json();
        newUrls = uploadData.urls || [];
      }

      const mediaUrls = [
        ...editExistingMedia.map((m) => m.mediaUrl),
        ...newUrls,
      ];

      const res = await fetch(`${API_BASE}/marketplace/reviews/${myReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, rating: editRating, comment: editComment, mediaUrls }),
      });
      if (!res.ok) throw new Error();
      const updated: Review = await res.json();
      setMyReview(updated);
      setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      editNewPreviews.forEach((url) => URL.revokeObjectURL(url));
      setEditNewFiles([]);
      setEditNewPreviews([]);
      setIsEditing(false);
    } catch {
      alert('Failed to update review. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!myReview || !user?.email) return;
    if (!window.confirm('Delete your review? This cannot be undone.')) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${API_BASE}/marketplace/reviews/${myReview.id}?userEmail=${encodeURIComponent(user.email)}`,
        { method: 'DELETE' },
      );
      if (!res.ok) throw new Error();
      setMyReview(null);
      setReviews((prev) => prev.filter((r) => r.id !== myReview.id));
      setTotalReviews((n) => Math.max(0, n - 1));
      if (onListingUpdate) await loadReviews();
    } catch {
      alert('Failed to delete review. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalFiles = reviewMediaFiles.length + files.length;

    if (totalFiles > 5) {
      alert('Maximum 5 photos/videos allowed');
      return;
    }

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length !== files.length) {
      alert('Only image and video files are allowed');
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setReviewMediaFiles((prev) => [...prev, ...validFiles]);
    setReviewMediaPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveMedia = (index: number) => {
    URL.revokeObjectURL(reviewMediaPreviews[index]);
    setReviewMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setReviewMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const editTotalCount = editExistingMedia.length + editNewFiles.length;
  const editInputId = `edit-media-input-${listingId}`;

  const handleEditRemoveExisting = (index: number) => {
    setEditExistingMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - editTotalCount;
    if (files.length > remaining) {
      alert(`You can only add ${remaining} more photo(s)/video(s) (max 5 total)`);
      return;
    }
    const validFiles = files.filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
    if (validFiles.length !== files.length) alert('Only image and video files are allowed');
    const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
    setEditNewFiles((prev) => [...prev, ...validFiles]);
    setEditNewPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const handleEditRemoveNew = (index: number) => {
    URL.revokeObjectURL(editNewPreviews[index]);
    setEditNewFiles((prev) => prev.filter((_, i) => i !== index));
    setEditNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingId || !reviewRating || !reviewForm.comment.trim()) {
      alert('Please provide a rating and comment');
      return;
    }

    setIsSubmittingReview(true);
    try {
      let mediaUrls: string[] = [];

      if (reviewMediaFiles.length > 0) {
        const formData = new FormData();
        reviewMediaFiles.forEach((file) => {
          formData.append('files', file);
        });

        const uploadResponse = await fetch(`${API_BASE}/marketplace/upload-review-media`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload media');
        }

        const uploadData = await uploadResponse.json();
        mediaUrls = uploadData.urls || [];
      }

      const response = await fetch(`${API_BASE}/marketplace/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          rating: reviewRating,
          comment: reviewForm.comment,
          mediaUrls,
          ...(user?.email ? { userEmail: user.email, userName: user.name } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview: Review = await response.json();
      setMyReview(newReview);
      reviewMediaPreviews.forEach((url) => URL.revokeObjectURL(url));
      setReviewForm({ comment: '' });
      setReviewRating(0);
      setReviewMediaFiles([]);
      setReviewMediaPreviews([]);

      await loadReviews();

      if (onListingUpdate) {
        const listingResponse = await fetch(`${API_BASE}/marketplace/${listingId}`);
        if (listingResponse.ok) {
          const listingData = await listingResponse.json();
          onListingUpdate(listingData);
        }
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      <section className="review-section">
        <div className="review-header">
          {!hideTitle && <h2 className="section-title">Reviews</h2>}
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(true)}
              className="view-all-link review-view-all"
            >
              View all
            </button>
          )}
        </div>

        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <>
            <div className="review-summary">
              <div className="review-summary-score">
                <Star size={20} fill="#fbbf24" className="review-star" />
                <span className="review-average">
                  {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
                </span>
              </div>
              <span className="review-count">
                ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            <div className="review-rating-bars">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="review-rating-row">
                    <div className="review-stars-label">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} size={12} fill="#fbbf24" className="review-star" />
                      ))}
                    </div>
                    <div className="review-bar-track">
                      <div
                        className="review-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="review-bar-count">{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="review-cards">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{(review.userName || '?')[0]}</div>
                      <div>
                        <h4 className="reviewer-name">{review.userName}</h4>
                        <p className="review-date">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="review-stars">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" className="review-star" />
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {review.reply && (
                    <div className="vendor-reply">
                      <strong>Vendor Reply:</strong>
                      <p>{review.reply}</p>
                    </div>
                  )}

                  {review.media && review.media.length > 0 && (
                    <div className="review-media-grid">
                      {review.media.map((media) => (
                        <div key={media.id} className="review-media-item">
                          {media.mediaType === 'IMAGE' ? (
                            <img
                              src={media.mediaUrl}
                              alt="Review"
                              className="review-media-image"
                              onClick={() => {
                                setLightboxImage(media.mediaUrl);
                                setLightboxOpen(true);
                              }}
                            />
                          ) : (
                            <video
                              src={media.mediaUrl}
                              controls
                              className="review-media-video"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        <div className="review-form-card">
          <h3 className="review-form-title">Write a Review</h3>
          {!user ? (
            /* ── Guest: prompt to log in ── */
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <ShieldCheck size={48} className="text-[#0d9488]" />
              <p className="text-gray-600 text-sm">
                You need to be signed in to leave a review.
              </p>
              <a
                href="/auth/login"
                className="inline-block bg-[#0d9488] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0b7a70] transition-colors"
              >
                Sign in to write a review
              </a>
            </div>
          ) : myReview && !isEditing ? (
            /* ── User's existing review: view with edit/delete ── */
            <div>
              <div className="review-card" style={{ boxShadow: '0 0 0 2px #0d9488' }}>
                <div className="review-card-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{(myReview.userName || '?')[0]}</div>
                    <div>
                      <h4 className="reviewer-name">{myReview.userName || 'You'} <span className="text-xs text-[#0d9488] font-normal">(Your review)</span></h4>
                      <p className="review-date">{new Date(myReview.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={14} fill={myReview.rating >= s ? '#fbbf24' : 'none'} className={myReview.rating >= s ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="review-comment">{myReview.comment}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={openEdit}
                  className="flex-1 text-sm font-semibold text-[#0d9488] border border-[#0d9488] rounded-lg px-4 py-2 hover:bg-[#0d9488] hover:text-white transition-colors"
                >
                  Edit Review
                </button>
                <button
                  onClick={handleDeleteReview}
                  disabled={isDeleting}
                  className="flex-1 text-sm font-semibold text-red-600 border border-red-300 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Review'}
                </button>
              </div>
            </div>
          ) : myReview && isEditing ? (
            /* ── Edit form ── */
            <form onSubmit={handleEditSubmit}>
              <div className="review-form-group">
                <label className="review-form-label">Your Rating</label>
                <div className="review-star-input">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} type="button"
                      onClick={() => setEditRating(star)}
                      onMouseEnter={() => setEditHoverRating(star)}
                      onMouseLeave={() => setEditHoverRating(0)}
                      className="review-star-button"
                    >
                      <Star size={32}
                        fill={(editHoverRating || editRating) >= star ? '#fbbf24' : 'none'}
                        className={(editHoverRating || editRating) >= star ? 'review-star-active' : 'review-star-inactive'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="review-form-group">
                <label className="review-form-label">Your Review</label>
                <textarea
                  className="review-form-textarea"
                  rows={4}
                  placeholder="Share your experience..."
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  required
                />
              </div>
              <div className="review-form-group">
                <label className="review-form-label">Photos / Videos ({editTotalCount}/5)</label>
                {/* Existing media */}
                {(editExistingMedia.length > 0 || editNewFiles.length > 0) && (
                  <div className="review-preview-grid">
                    {editExistingMedia.map((media, index) => (
                      <div key={`existing-${media.id}`} className="review-preview-item">
                        {media.mediaType === 'IMAGE' ? (
                          <img src={media.mediaUrl} alt={`Photo ${index + 1}`} className="review-preview-media" />
                        ) : (
                          <video src={media.mediaUrl} className="review-preview-media" />
                        )}
                        <button type="button" onClick={() => handleEditRemoveExisting(index)} className="review-preview-remove">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {editNewPreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="review-preview-item">
                        {editNewFiles[index]?.type.startsWith('image/') ? (
                          <img src={preview} alt={`New photo ${index + 1}`} className="review-preview-media" />
                        ) : (
                          <video src={preview} className="review-preview-media" />
                        )}
                        <button type="button" onClick={() => handleEditRemoveNew(index)} className="review-preview-remove">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleEditNewFileChange}
                  style={{ display: 'none' }}
                  id={editInputId}
                  disabled={editTotalCount >= 5}
                />
                <label
                  htmlFor={editInputId}
                  className={`review-upload-label ${editTotalCount >= 5 ? 'disabled' : ''}`}
                >
                  <Camera size={20} />
                  {editTotalCount >= 5 ? 'Max 5 reached' : 'Add Photos/Videos'}
                </label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1" disabled={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => {
                  editNewPreviews.forEach((url) => URL.revokeObjectURL(url));
                  setEditNewFiles([]);
                  setEditNewPreviews([]);
                  setIsEditing(false);
                }}
                  className="flex-1 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : isSubmitted ? (
            <div className="review-success">
              <ShieldCheck size={56} className="review-success-icon" />
              <h4 className="review-success-title">Thank you for your review!</h4>
              <p className="review-success-text">
                Your feedback helps others make better decisions.
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsSubmitted(false)}
              >
                Write Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit}>
              <div className="review-form-group">
                <label className="review-form-label">Your Rating</label>
                <div className="review-star-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="review-star-button"
                    >
                      <Star
                        size={32}
                        fill={(hoverRating || reviewRating) >= star ? '#fbbf24' : 'none'}
                        className={(hoverRating || reviewRating) >= star ? 'review-star-active' : 'review-star-inactive'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="review-form-group">
                <label className="review-form-label">Your Review</label>
                <textarea
                  rows={5}
                  placeholder="Share your experience..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ comment: e.target.value })}
                  required
                  className="review-textarea"
                />
              </div>

              <div className="review-form-group">
                <label className="review-form-label">Add Photos or Videos (Max 5)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaFileChange}
                  style={{ display: 'none' }}
                  id={inputId}
                  disabled={reviewMediaFiles.length >= 5}
                />
                <label
                  htmlFor={inputId}
                  className={`review-upload-label ${reviewMediaFiles.length >= 5 ? 'disabled' : ''}`}
                >
                  <Camera size={20} />
                  {reviewMediaFiles.length === 0
                    ? 'Add Photos/Videos'
                    : `${reviewMediaFiles.length}/5 Selected`}
                </label>

                {reviewMediaPreviews.length > 0 && (
                  <div className="review-preview-grid">
                    {reviewMediaPreviews.map((preview, index) => (
                      <div key={index} className="review-preview-item">
                        {reviewMediaFiles[index]?.type.startsWith('image/') ? (
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="review-preview-media"
                          />
                        ) : (
                          <video
                            src={preview}
                            className="review-preview-media"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(index)}
                          className="review-preview-remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </section>

      {lightboxOpen && (
        <div className="review-lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="review-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="review-lightbox-close" onClick={() => setLightboxOpen(false)}>
              <X size={24} />
            </button>
            <img src={lightboxImage} alt="Review full size" className="review-lightbox-image" />
          </div>
        </div>
      )}

      {showAllReviews && (
        <div className="review-modal-overlay" onClick={() => setShowAllReviews(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <h3 className="review-modal-title">All Reviews ({totalReviews})</h3>
              <button className="review-modal-close" onClick={() => setShowAllReviews(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="review-modal-body">
              <div className="review-modal-summary">
                <div className="review-summary">
                  <div className="review-summary-score">
                    <Star size={20} fill="#fbbf24" className="review-star" />
                    <span className="review-average">
                      {ratingAverage > 0 ? ratingAverage.toFixed(1) : '0.0'}
                    </span>
                  </div>
                  <span className="review-count">
                    ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                <div className="review-rating-bars">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = reviews.filter((r) => r.rating === stars).length;
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={stars} className="review-rating-row">
                        <div className="review-stars-label">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} size={12} fill="#fbbf24" className="review-star" />
                          ))}
                        </div>
                        <div className="review-bar-track">
                          <div className="review-bar-fill" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="review-bar-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="review-cards">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{(review.userName || '?')[0]}</div>
                        <div>
                          <h4 className="reviewer-name">{review.userName}</h4>
                          <p className="review-date">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="review-stars">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={16} fill="#fbbf24" className="review-star" />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    {review.reply && (
                      <div className="vendor-reply">
                        <strong>Vendor Reply:</strong>
                        <p>{review.reply}</p>
                      </div>
                    )}

                    {review.media && review.media.length > 0 && (
                      <div className="review-media-grid">
                        {review.media.map((media) => (
                          <div key={media.id} className="review-media-item">
                            {media.mediaType === 'IMAGE' ? (
                              <img
                                src={media.mediaUrl}
                                alt="Review"
                                className="review-media-image"
                                onClick={() => {
                                  setLightboxImage(media.mediaUrl);
                                  setLightboxOpen(true);
                                }}
                              />
                            ) : (
                              <video
                                src={media.mediaUrl}
                                controls
                                className="review-media-video"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError';
}
