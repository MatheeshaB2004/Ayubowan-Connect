"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Trash2,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  uploadEventGalleryImage,
  deleteEventGalleryImage,
} from "../lib/api/events";
import { EventGalleryImage } from "../types/events";

interface Props {
  eventId: number;
  images: EventGalleryImage[];
  isEventCreator: boolean;
  token: string;
  userId?: string;
  onImageAdded: (image: EventGalleryImage) => void;
  onImageDeleted: (imageId: number) => void;
}

export function EventGallery({
  eventId,
  images,
  isEventCreator,
  token,
  userId,
  onImageAdded,
  onImageDeleted,
}: Props) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);
  const [pendingDeleteImageId, setPendingDeleteImageId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only show gallery if there are images or if vendor is trying to add
  if (images.length === 0 && !isEventCreator) {
    return null;
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const image = await uploadEventGalleryImage(
        token,
        eventId,
        file,
        userId
      );
      onImageAdded(image);
      setGalleryIndex(images.length);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    setDeleteError(null);
    setDeletingImageId(imageId);
    try {
      await deleteEventGalleryImage(token, eventId, imageId, userId);
      onImageDeleted(imageId);
      setPendingDeleteImageId(null);

      // Adjust gallery index if needed
      if (galleryIndex >= images.length - 1) {
        setGalleryIndex(Math.max(0, images.length - 2));
      }
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete image"
      );
    } finally {
      setDeletingImageId(null);
    }
  };

  if (images.length === 0) {
    // Show upload placeholder for event creator
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Event Gallery</h2>
          {isEventCreator && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
              0/5 images
            </span>
          )}
        </div>

        {isEventCreator ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative rounded-xl overflow-hidden mb-3 h-56 sm:h-72 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#0d9488] hover:bg-[#f0fdf9] cursor-pointer transition-colors flex items-center justify-center group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              disabled={uploading || !isEventCreator}
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-[#0d9488]" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {uploading ? "Uploading..." : "Click to upload images"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, WebP, or GIF (Max 5 images)
              </p>
            </div>

            {uploadError && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                <div className="bg-white rounded-lg p-3 max-w-xs">
                  <p className="text-xs text-red-600">{uploadError}</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  const pendingImage = images.find((img) => img.id === pendingDeleteImageId) || null;

  // Display gallery with images
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Event Gallery</h2>
          {isEventCreator && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                {images.length}/5 images
              </span>
              {images.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  title="Add more images"
                  className="w-8 h-8 rounded-full bg-[#0d9488] hover:bg-[#0b7a70] text-white flex items-center justify-center transition-colors disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          disabled={uploading || !isEventCreator || images.length >= 5}
          className="hidden"
        />

        {/* Main image display */}
        <div className="relative rounded-xl overflow-hidden mb-3 h-56 sm:h-72 bg-gray-100">
          <Image
            src={images[galleryIndex].imageUrl}
            alt={`Event gallery ${galleryIndex + 1}`}
            className="w-full h-full object-cover"
            width={1200}
            height={320}
            priority
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setGalleryIndex((i) => (i - 1 + images.length) % images.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() =>
                  setGalleryIndex((i) => (i + 1) % images.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Delete button for vendor */}
          {isEventCreator && (
            <button
              onClick={() => {
                setDeleteError(null);
                setPendingDeleteImageId(images[galleryIndex].id);
              }}
              disabled={deletingImageId === images[galleryIndex].id}
              title="Delete image"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow transition-colors disabled:opacity-60"
            >
              {deletingImageId === images[galleryIndex].id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-3">
          {images.map((img, index) => (
            <div key={img.id} className="relative group w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2">
              <Image 
                src={img.imageUrl} 
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setGalleryIndex(index)}
                width={80}
                height={56}
              />

              {isEventCreator && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteError(null);
                    setPendingDeleteImageId(img.id);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Trash2 className="text-white w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {uploadError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600">{uploadError}</p>
          </div>
        )}
      </div>

      {pendingDeleteImageId != null && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            if (deletingImageId) return;
            setPendingDeleteImageId(null);
            setDeleteError(null);
          }}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">Delete Image</h3>
                <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (deletingImageId) return;
                  setPendingDeleteImageId(null);
                  setDeleteError(null);
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-gray-700">Are you sure you want to delete this image?</p>

              {pendingImage && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={pendingImage.imageUrl}
                    alt="Image to delete"
                    width={480}
                    height={240}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}

              {deleteError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {deleteError}
                </p>
              )}
            </div>

            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (deletingImageId) return;
                  setPendingDeleteImageId(null);
                  setDeleteError(null);
                }}
                className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={Boolean(deletingImageId)}
                onClick={() => handleDeleteImage(pendingDeleteImageId)}
                className="flex-1 h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deletingImageId ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Image"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
