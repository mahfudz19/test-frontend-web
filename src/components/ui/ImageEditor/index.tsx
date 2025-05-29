"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import IconClose from "../Icon/IconClose";
import IconRotateCcw from "../Icon/IconRotateCcw";
import IconRotateCw from "../Icon/IconRotateCw";
import IconSave from "../Icon/IconSave";
import IconUpload from "../Icon/IconUpload";
import IconZoomIn from "../Icon/IconZoomIn";
import IconZoomOut from "../Icon/IconZoomOut";
import IconButton from "../IconButton";
import Slider from "../Slider";
import Image from "next/image";

interface ImageEditorModalProps {
  width?: number;
  height?: number;
  shape?: "circle" | "square" | "rounded";
  image: string | null;
  onSave?: (dataUrl: string) => void;
  onCancel?: () => void;
  showControls?: boolean;
}

export function ImageEditorModal({
  width = 256,
  height = 256,
  shape = "circle",
  image,
  onSave,
  onCancel,
  showControls = true,
}: ImageEditorModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [naturalDimensions, setNaturalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate minimum scale to fit image width to container width
  const getMinScale = () => {
    if (!naturalDimensions.width || !naturalDimensions.height) return 0.5;

    // Minimum scale when image width fits container width
    return Math.min(width / naturalDimensions.width, 1);
  };

  // Constrain position to keep image within reasonable bounds
  const constrainPosition = (
    newPosition: { x: number; y: number },
    currentScale: number
  ) => {
    if (!naturalDimensions.width || !naturalDimensions.height)
      return newPosition;

    // Calculate scaled dimensions
    const scaledWidth = naturalDimensions.width * currentScale;
    const scaledHeight = naturalDimensions.height * currentScale;

    // Calculate maximum allowed offset (allow some movement but keep image visible)
    const maxOffsetX = Math.max(0, (scaledWidth - width) / 2);
    const maxOffsetY = Math.max(0, (scaledHeight - height) / 2);

    return {
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newPosition.x)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newPosition.y)),
    };
  };

  // Reset transformations when image changes
  useEffect(() => {
    if (image) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [image]);

  // Handle image dragging for positioning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !image) return;
    const newPosition = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    setPosition(constrainPosition(newPosition, scale));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!image) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !image) return;
    const newPosition = {
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    };
    setPosition(constrainPosition(newPosition, scale));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Rotation handlers
  const rotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  // Zoom handlers
  const zoomIn = () => {
    const newScale = Math.min(scale + 0.1, 3);
    setScale(newScale);
    // Constrain position when scale changes
    setPosition(constrainPosition(position, newScale));
  };

  const zoomOut = () => {
    const minScale = getMinScale();
    const newScale = Math.max(scale - 0.1, minScale);
    setScale(newScale);
    // Constrain position when scale changes
    setPosition(constrainPosition(position, newScale));
  };

  // Load image and get natural dimensions
  useEffect(() => {
    if (image && imageRef.current) {
      const img = imageRef.current;

      const handleLoad = () => {
        setNaturalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      // If already loaded
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
      }
    }
  }, [image]);

  // Generate final avatar
  const generateAvatar = () => {
    if (
      !image ||
      !canvasRef.current ||
      !imageRef.current ||
      !naturalDimensions.width
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Create clipping path for shape
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();
    } else if (shape === "rounded") {
      ctx.beginPath();
      const radius = 20;
      ctx.moveTo(radius, 0);
      ctx.lineTo(canvas.width - radius, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
      ctx.lineTo(canvas.width, canvas.height - radius);
      ctx.quadraticCurveTo(
        canvas.width,
        canvas.height,
        canvas.width - radius,
        canvas.height
      );
      ctx.lineTo(radius, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.clip();
    }

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate
    ctx.rotate((rotation * Math.PI) / 180);

    // Scale
    ctx.scale(scale, scale);

    // Calculate dimensions to maintain aspect ratio (cover)
    const img = imageRef.current;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
    }

    // Draw image with position offset and proper dimensions
    ctx.drawImage(
      img,
      -drawWidth / 2 + position.x / scale,
      -drawHeight / 2 + position.y / scale,
      drawWidth,
      drawHeight
    );

    // Restore context state
    ctx.restore();
  };

  // Update canvas when image or transformations change
  useEffect(() => {
    if (
      image &&
      imageRef.current &&
      canvasRef.current &&
      naturalDimensions.width > 0
    ) {
      generateAvatar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, scale, rotation, position, naturalDimensions, shape]);

  // Constrain position when image dimensions are loaded
  useEffect(() => {
    if (naturalDimensions.width > 0) {
      const minScale = getMinScale();
      if (scale < minScale) {
        setScale(minScale);
      }
      setPosition(constrainPosition(position, scale));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naturalDimensions]);

  // Handle save button click
  const handleSave = () => {
    if (!canvasRef.current) return;

    const dataUrl = canvasRef.current.toDataURL("image/png");
    if (onSave) {
      onSave(dataUrl);
    }
  };

  if (!image) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Preview area */}
      <div
        className={`relative overflow-hidden border-2 border-gray-300 mb-4 ${
          shape === "circle"
            ? "rounded-full"
            : shape === "rounded"
              ? "rounded-lg"
              : ""
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          ref={imageRef}
          width={width}
          height={height}
          src={image || "/placeholder.svg"}
          alt="Avatar preview"
          className="hidden"
          crossOrigin="anonymous"
        />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-full"
        />
        <div
          className={`absolute inset-0 border-4 border-white pointer-events-none ${
            shape === "circle"
              ? "rounded-full"
              : shape === "rounded"
                ? "rounded-lg"
                : ""
          }`}
        ></div>
      </div>

      {showControls && (
        <div className="w-full space-y-4">
          {/* Zoom controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zoom</span>
              <div className="flex space-x-2">
                <IconButton
                  variant="text"
                  onClick={zoomOut}
                  disabled={scale <= getMinScale()}
                >
                  <IconZoomOut />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={zoomIn}
                  disabled={scale >= 3}
                >
                  <IconZoomIn />
                </IconButton>
              </div>
            </div>
            <Slider
              value={[scale * 100]}
              min={getMinScale() * 100}
              max={300}
              step={1}
              onChange={(value) => {
                const arr = Array.isArray(value) ? value : [value];
                const newScale = arr[0] / 100;
                setScale(newScale);
                setPosition(constrainPosition(position, newScale));
              }}
            />
          </div>

          {/* Rotation controls */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rotasi</span>
            <div className="flex space-x-2">
              <IconButton variant="text" onClick={rotateLeft}>
                <IconRotateCcw />
              </IconButton>
              <IconButton variant="text" onClick={rotateRight}>
                <IconRotateCw />
              </IconButton>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2">
            Geser gambar untuk mengatur posisi
          </p>

          {/* Action buttons */}
          <div className="flex justify-center gap-2 pt-4">
            {onCancel && (
              <Button
                variant="text"
                startIcon={<IconClose />}
                onClick={onCancel}
                color="error"
              >
                Batal
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<IconSave />}
              onClick={handleSave}
            >
              Simpan Avatar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface AvatarUploaderProps {
  width?: number;
  height?: number;
  shape?: "circle" | "square" | "rounded";
  onImageSelect?: (imageData: string) => void;
}

export default function AvatarUploader(props: AvatarUploaderProps) {
  const { width = 256, height = 256, shape = "circle", onImageSelect } = props;
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (onImageSelect) onImageSelect(imageData);
      };
      reader.readAsDataURL(file);

      // Reset file input value to allow selecting the same file again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (onImageSelect) onImageSelect(imageData);
      };
      reader.readAsDataURL(file);

      // Reset file input value
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Avatar Editor</h2>

      {/* Upload area */}
      <div
        className={`relative overflow-hidden border-2 p-4 ${
          isDragOver
            ? "border-primary-main bg-secondary-main/25"
            : "border-divider"
        } mb-4 ${shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-lg" : ""} cursor-pointer hover:border-primary-main transition-colors`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <IconUpload className="w-10 h-10 mb-2" />
          <p className="text-sm text-center">
            Drag & drop gambar atau klik untuk upload
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
