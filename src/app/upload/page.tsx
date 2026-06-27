"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FoodItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
  icon: string;
}

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [image, setImage] = useState<string | null>(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI & Review Screen State
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("Dinner");
  const [mealTime, setMealTime] = useState("19:30");
  const [overallConfidence, setOverallConfidence] = useState<number | null>(null);
  const [detectedItems, setDetectedItems] = useState<FoodItem[]>([]);
  const [originalAIResponse, setOriginalAIResponse] = useState<any>(null);

  // Inline editing state index (-1 means not editing)
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editName, setEditName] = useState("");
  const [editPortion, setEditPortion] = useState("");
  const [editCalories, setEditCalories] = useState<number | string>("");
  const [editProtein, setEditProtein] = useState<number | string>("");
  const [editCarbs, setEditCarbs] = useState<number | string>("");
  const [editFats, setEditFats] = useState<number | string>("");

  // New item form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPortion, setNewPortion] = useState("1 portion");
  const [newCalories, setNewCalories] = useState<number | string>("");
  const [newProtein, setNewProtein] = useState<number | string>("");
  const [newCarbs, setNewCarbs] = useState<number | string>("");
  const [newFats, setNewFats] = useState<number | string>("");

  // Derived totals
  const totalCalories = detectedItems.reduce((acc, item) => acc + Number(item.calories || 0), 0);
  const totalProtein = detectedItems.reduce((acc, item) => acc + Number(item.protein || 0), 0);
  const totalCarbs = detectedItems.reduce((acc, item) => acc + Number(item.carbs || 0), 0);
  const totalFats = detectedItems.reduce((acc, item) => acc + Number(item.fats || 0), 0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAndUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 1. Canvas-based image compression
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else resolve(file);
            },
            "image/jpeg",
            0.75
          );
        };
      };
    });
  };

  // 2. Client-side Cloudinary upload
  const uploadToCloudinary = async (blob: Blob): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary. Verify presets.");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const processAndUpload = async (file: File) => {
    setIsUploading(true);
    setErrorState("");

    try {
      // Local preview
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      // Compress and upload
      const compressedBlob = await compressImage(file);
      const secureUrl = await uploadToCloudinary(compressedBlob);
      setCloudinaryUrl(secureUrl);

      // Analyze image URL
      await runAnalysis(secureUrl);
    } catch (err: any) {
      console.error(err);
      setErrorState(err.message || "Failed to upload and scan image.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Trigger Gemini generative AI analysis
  const runAnalysis = async (urlToAnalyze: string) => {
    setIsAnalyzing(true);
    setErrorState("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: urlToAnalyze }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process image nutrients.");
      }

      const result = await response.json();
      setOriginalAIResponse(result);
      setMealName(result.name || "Logged Meal");
      setMealType(result.mealType || "Dinner");
      setOverallConfidence(result.confidence || 0.9);
      setDetectedItems(result.detectedItems || []);

      // Auto-set current local time
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setMealTime(timeStr);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setErrorState(err.message || "Gemini generative analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAgain = async () => {
    if (!cloudinaryUrl) return;
    await runAnalysis(cloudinaryUrl);
  };

  const [errorState, setErrorState] = useState("");

  // Edit Handlers
  const startEdit = (index: number) => {
    const item = detectedItems[index];
    setEditingIndex(index);
    setEditName(item.name);
    setEditPortion(item.portion);
    setEditCalories(item.calories);
    setEditProtein(item.protein);
    setEditCarbs(item.carbs);
    setEditFats(item.fats);
  };

  const saveEdit = (index: number) => {
    const updated = [...detectedItems];
    updated[index] = {
      ...updated[index],
      name: editName,
      portion: editPortion,
      calories: Number(editCalories),
      protein: Number(editProtein),
      carbs: Number(editCarbs),
      fats: Number(editFats),
    };
    setDetectedItems(updated);
    setEditingIndex(-1);
  };

  const removeItem = (index: number) => {
    setDetectedItems(detectedItems.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(-1);
    }
  };

  const addNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newItem: FoodItem = {
      name: newName,
      portion: newPortion,
      calories: Number(newCalories || 0),
      protein: Number(newProtein || 0),
      carbs: Number(newCarbs || 0),
      fats: Number(newFats || 0),
      confidence: 1.0, // manually added items have 100% confidence
      icon: "dinner_dining",
    };

    setDetectedItems([...detectedItems, newItem]);
    setNewName("");
    setNewPortion("1 portion");
    setNewCalories("");
    setNewProtein("");
    setNewCarbs("");
    setNewFats("");
    setShowAddForm(false);
  };

  const handleConfirm = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const localDateStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

    try {
      // Save meal to Firestore users/{uid}/meals
      await addDoc(collection(db, "users", user.uid, "meals"), {
        // Confirmed Data
        name: mealName || detectedItems.map((item) => item.name).join(", "),
        mealType: mealType,
        mealTime: mealTime,
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fats: totalFats,
        date: localDateStr,
        imageUrl: cloudinaryUrl || "",

        // Original AI Payload & Confidence Scores
        originalAIResponse: originalAIResponse,
        overallConfidence: overallConfidence,
        detectedItems: detectedItems, // containing individual item confidence scores

        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Saved meal to journal!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("Failed to save meal to journal.");
    }
  };

  return (
    <main className="flex-1 py-8 md:py-12 px-6 md:px-16 w-full max-w-7xl mx-auto page-transition">
      {/* Header Section */}
      <div className="w-full mb-8 flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Log Meal</p>
          <h2 className="text-3xl font-display font-semibold text-on-surface">Analyze Your Plate</h2>
        </div>
        <button
          onClick={() => router.push("/meals")}
          className="text-sm font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            history
          </span>
          Meal History
        </button>
      </div>

      {errorState && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700 font-medium">
          {errorState}
        </div>
      )}

      {/* Split Layout Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-low-contrast rounded-xl overflow-hidden shadow-sm min-h-[600px]">
        {/* Left Side: Upload Area */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-low-contrast bg-canvas relative justify-between">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-on-surface">Capture Image</h3>
            <p className="text-sm text-on-surface-variant mt-1">Upload a clear photo of your meal for AI macro estimation.</p>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`flex-grow flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors cursor-pointer p-8 min-h-[300px] text-center relative ${
              isDragActive ? "border-primary bg-surface-container" : "border-low-contrast bg-white hover:bg-zinc-50"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-sm font-semibold text-on-surface">Uploading to Cloudinary...</p>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D9A066] mb-4"></div>
                <p className="text-sm font-semibold text-on-surface">Analyzing nutrients with Gemini...</p>
              </div>
            ) : image ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img src={image} alt="Meal Preview" className="max-h-64 object-cover rounded border border-low-contrast mb-4" />
                <p className="text-sm text-primary font-semibold">Click or drag to swap photo</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>
                    add_a_photo
                  </span>
                </div>
                <p className="text-lg font-medium text-on-surface mb-1">Click to upload or drag image</p>
                <p className="text-xs text-on-surface-variant">JPEG, PNG, HEIC up to 10MB</p>
              </div>
            )}
            <input ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" type="file" />
          </div>

          <div className="mt-6 flex items-start gap-2 bg-surface-container p-3 rounded-lg border border-low-contrast">
            <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: "18px" }}>
              lightbulb
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              For best results, ensure your meal is well-lit and all items are visible. Avoid extreme close-ups or angles.
            </p>
          </div>
        </div>

        {/* Right Side: AI Analysis & Details */}
        <div className="lg:col-span-7 flex flex-col bg-white relative">
          {!image && !isUploading && !isAnalyzing ? (
            /* Empty State */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white z-10 text-center">
              <span className="material-symbols-outlined text-slate-400 mb-4" style={{ fontSize: "48px" }}>
                analytics
              </span>
              <h3 className="text-lg font-medium text-on-surface mb-2">Awaiting Image</h3>
              <p className="text-sm text-on-surface-variant max-w-sm">
                Upload a meal photo to see AI-detected ingredients, estimated portions, and nutritional breakdown.
              </p>
            </div>
          ) : isAnalyzing || isUploading ? (
            /* Loading State */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white z-10 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-medium text-on-surface mb-2">Processing Meal</h3>
              <p className="text-sm text-on-surface-variant max-w-sm">
                Evaluating food items and aggregating estimated caloric and macronutrient metrics.
              </p>
            </div>
          ) : (
            /* Analysis Content */
            <div className="flex-grow flex flex-col transition-opacity duration-300">
              {/* Header */}
              <div className="px-6 md:px-8 py-5 border-b border-low-contrast flex justify-between items-center bg-zinc-50 sticky top-0 z-10">
                <div>
                  <input
                    type="text"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    className="text-xl font-display font-bold text-on-surface border-b border-transparent focus:border-primary focus:outline-none"
                    placeholder="Meal Name"
                  />
                  {overallConfidence !== null && (
                    <p className="text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      AI Confidence: {Math.round(overallConfidence * 100)}%
                    </p>
                  )}
                </div>
                <button
                  onClick={handleAnalyzeAgain}
                  className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 border border-low-contrast px-3 py-1.5 rounded bg-white cursor-pointer"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    autorenew
                  </span>
                  Analyze Again
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 max-h-[500px]">
                {/* Macro Summary Cards */}
                <section>
                  <h4 className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
                    Estimated Macros
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Calorie Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between">
                      <span className="text-xs text-on-surface-variant">Calories</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-primary font-bold">{totalCalories}</span>
                        <span className="text-xs text-on-surface-variant">kcal</span>
                      </div>
                    </div>
                    {/* Protein Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-[#D9A066]"></div>
                      <span className="text-xs text-on-surface-variant">Protein</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalProtein}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                    {/* Carbs Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-[#C2CBB5]"></div>
                      <span className="text-xs text-on-surface-variant">Carbs</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalCarbs}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                    {/* Fats Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-[#fdad67]"></div>
                      <span className="text-xs text-on-surface-variant">Fats</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalFats}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Detected Items & Editor */}
                <section>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Detected Food Components
                    </h4>
                    <span className="text-xs text-on-surface-variant font-semibold">Click items to edit</span>
                  </div>
                  <div className="space-y-3">
                    {detectedItems.map((item, index) => (
                      <div key={index} className="bg-canvas border border-low-contrast rounded-lg p-4 transition-colors">
                        {editingIndex === index ? (
                          /* Item Editor Form */
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border border-low-contrast p-2 rounded text-sm bg-white"
                                placeholder="Food Name"
                              />
                              <input
                                type="text"
                                value={editPortion}
                                onChange={(e) => setEditPortion(e.target.value)}
                                className="border border-low-contrast p-2 rounded text-sm bg-white"
                                placeholder="Portion"
                              />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="flex flex-col">
                                <label className="text-[10px] font-semibold text-slate-muted">Calories (kcal)</label>
                                <input
                                  type="number"
                                  value={editCalories}
                                  onChange={(e) => setEditCalories(e.target.value)}
                                  className="border border-low-contrast p-1.5 rounded text-xs bg-white"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-semibold text-slate-muted">Protein (g)</label>
                                <input
                                  type="number"
                                  value={editProtein}
                                  onChange={(e) => setEditProtein(e.target.value)}
                                  className="border border-low-contrast p-1.5 rounded text-xs bg-white"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-semibold text-slate-muted">Carbs (g)</label>
                                <input
                                  type="number"
                                  value={editCarbs}
                                  onChange={(e) => setEditCarbs(e.target.value)}
                                  className="border border-low-contrast p-1.5 rounded text-xs bg-white"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-semibold text-slate-muted">Fats (g)</label>
                                <input
                                  type="number"
                                  value={editFats}
                                  onChange={(e) => setEditFats(e.target.value)}
                                  className="border border-low-contrast p-1.5 rounded text-xs bg-white"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => removeItem(index)}
                                className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setEditingIndex(-1)}
                                className="px-3 py-1 text-on-surface-variant rounded text-xs font-semibold hover:bg-slate-200 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => saveEdit(index)}
                                className="px-4 py-1 bg-primary text-white rounded text-xs font-semibold hover:opacity-90"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* View Mode */
                          <div onClick={() => startEdit(index)} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white flex items-center justify-center border border-low-contrast">
                                <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>
                                  {item.icon || "dinner_dining"}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-on-surface">{item.name}</p>
                                <p className="text-xs text-on-surface-variant flex items-center gap-1">
                                  <span>{item.portion}</span>
                                  <span className="text-[10px] bg-slate-100 text-slate-muted px-1.5 py-0.5 rounded">
                                    Conf: {Math.round(item.confidence * 100)}%
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-on-surface font-semibold">{item.calories} kcal</p>
                                <p className="text-xs text-slate-muted font-semibold">
                                  P: {item.protein}g • C: {item.carbs}g • F: {item.fats}g
                                </p>
                              </div>
                              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                                edit
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Missing Item Button / Form */}
                    {showAddForm ? (
                      <form onSubmit={addNewItem} className="border border-dashed border-low-contrast rounded-lg p-4 space-y-3 bg-zinc-50">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-sm bg-white"
                            placeholder="Food Name (e.g. Apple)"
                          />
                          <input
                            type="text"
                            value={newPortion}
                            onChange={(e) => setNewPortion(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-sm bg-white"
                            placeholder="Portion (e.g. 1 medium)"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <input
                            type="number"
                            placeholder="Calories"
                            value={newCalories}
                            onChange={(e) => setNewCalories(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-xs bg-white"
                          />
                          <input
                            type="number"
                            placeholder="Protein (g)"
                            value={newProtein}
                            onChange={(e) => setNewProtein(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-xs bg-white"
                          />
                          <input
                            type="number"
                            placeholder="Carbs (g)"
                            value={newCarbs}
                            onChange={(e) => setNewCarbs(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-xs bg-white"
                          />
                          <input
                            type="number"
                            placeholder="Fats (g)"
                            value={newFats}
                            onChange={(e) => setNewFats(e.target.value)}
                            className="border border-low-contrast p-2 rounded text-xs bg-white"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-3 py-1.5 text-xs text-on-surface-variant rounded hover:bg-slate-200 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-primary text-white rounded text-xs font-semibold hover:opacity-90"
                          >
                            Add Component
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full py-3 border border-dashed border-low-contrast text-on-surface-variant rounded-lg hover:border-primary hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                          add
                        </span>
                        Add Missing Item
                      </button>
                    )}
                  </div>
                </section>

                {/* Contextual Settings */}
                <section>
                  <h4 className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
                    Meal Context
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">Meal Type</label>
                      <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full bg-canvas border border-low-contrast rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-8 pointer-events-none text-on-surface-variant">
                        expand_more
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">Time Logged</label>
                      <input
                        value={mealTime}
                        onChange={(e) => setMealTime(e.target.value)}
                        className="w-full bg-canvas border border-low-contrast rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        type="time"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer Action */}
              <div className="p-6 md:p-8 border-t border-low-contrast bg-canvas mt-auto">
                <button
                  onClick={handleConfirm}
                  className="w-full bg-primary text-white rounded-lg py-3 text-sm font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    bookmark_check
                  </span>
                  Confirm and Log Meal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
