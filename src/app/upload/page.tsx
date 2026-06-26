"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface FoodItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  icon: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated AI result values
  const [mealType, setMealType] = useState("Dinner");
  const [mealTime, setMealTime] = useState("19:30");
  const [detectedItems, setDetectedItems] = useState<FoodItem[]>([
    { name: "Grilled Salmon", portion: "1 fillet (approx 6oz)", calories: 350, protein: 34, carbs: 0, fats: 22, icon: "set_meal" },
    { name: "Roasted Asparagus", portion: "1 cup (approx 134g)", calories: 40, protein: 3, carbs: 7, fats: 2, icon: "eco" },
    { name: "Quinoa Base", portion: "1/2 cup (approx 92g)", calories: 111, protein: 5, carbs: 20, fats: 2, icon: "rice_bowl" },
  ]);

  // Derived totals
  const totalCalories = detectedItems.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = detectedItems.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = detectedItems.reduce((acc, item) => acc + item.carbs, 0);
  const totalFats = detectedItems.reduce((acc, item) => acc + item.fats, 0);

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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        setImage(event.target?.result as string);
        setIsUploading(false);
      }, 1500); // Simulate network & AI scan latency
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    alert("Saved meal to journal!");
    router.push("/dashboard");
  };

  return (
    <main className="flex-1 py-8 md:py-12 px-6 md:px-16 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="w-full mb-8 flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Log Meal</p>
          <h2 className="text-3xl font-display font-semibold text-on-surface">Analyze Your Plate</h2>
        </div>
        <button className="text-sm font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>history</span>
          Recent Uploads
        </button>
      </div>

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
              isDragActive
                ? "border-primary bg-surface-container"
                : "border-low-contrast bg-white hover:bg-zinc-50"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-sm font-semibold text-on-surface">Analyzing plate nutrients...</p>
              </div>
            ) : image ? (
              <div className="w-full h-full flex flex-col items-center">
                <img
                  src={image}
                  alt="Meal Preview"
                  className="max-h-64 object-cover rounded border border-low-contrast mb-4"
                />
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
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              type="file"
            />
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
          {!image && !isUploading ? (
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
          ) : (
            /* Analysis Content */
            <div className="flex-grow flex flex-col transition-opacity duration-300">
              {/* Header */}
              <div className="px-6 md:px-8 py-5 border-b border-low-contrast flex justify-between items-center bg-zinc-50 sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-display font-bold text-on-surface">Analysis Results</h3>
                  <p className="text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    High confidence scan
                  </p>
                </div>
                <button className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 border border-low-contrast px-3 py-1.5 rounded bg-white cursor-pointer">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
                  Manual Entry
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
                      <div className="absolute top-0 right-0 w-1 h-full bg-clay-light"></div>
                      <span className="text-xs text-on-surface-variant">Protein</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalProtein}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                    {/* Carbs Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-sage-light"></div>
                      <span className="text-xs text-on-surface-variant">Carbs</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalCarbs}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                    {/* Fats Card */}
                    <div className="bg-canvas border border-low-contrast p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-secondary-fixed"></div>
                      <span className="text-xs text-on-surface-variant">Fats</span>
                      <div className="mt-2 flex items-baseline gap-0.5">
                        <span className="text-2xl font-display text-on-surface font-bold">{totalFats}</span>
                        <span className="text-xs text-on-surface-variant">g</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Detected Items List */}
                <section>
                  <div className="flex justify-between items-end mb-3">
                    <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Detected Items
                    </h4>
                    <span className="text-xs text-on-surface-variant font-semibold">Tap to edit portions</span>
                  </div>
                  <div className="space-y-3">
                    {detectedItems.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-canvas border border-low-contrast hover:border-primary transition-colors rounded-lg p-4 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-white flex items-center justify-center border border-low-contrast">
                            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>
                              {item.icon}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{item.name}</p>
                            <p className="text-xs text-on-surface-variant">{item.portion}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-on-surface font-semibold">{item.calories} kcal</p>
                            <p className="text-xs text-clay-light font-semibold">{item.protein}g Protein</p>
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 border border-dashed border-low-contrast text-on-surface-variant rounded-lg hover:border-primary hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
                      Add Missing Item
                    </button>
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
                        <option>Dinner</option>
                        <option>Lunch</option>
                        <option>Breakfast</option>
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
                  Confirm to Journal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
