'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Loader2, UploadCloud, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AddVehicle() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    vin: '',
    videoUrl: '',
    description: ''
  });
  
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    
    // Generate previews
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Upload Images to Supabase Storage
      const imageUrls = [];
      const bucketName = 'vehicle-images';
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file);

        if (uploadError) throw new Error(`Upload failed for ${file.name}`);

        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);
          
        imageUrls.push(publicUrl);
      }

      // 2. Insert into Supabase DB
      const { error: dbError } = await supabase.from('vehicles').insert([
        {
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          price: parseInt(formData.price),
          mileage: parseInt(formData.mileage),
          vin: formData.vin,
          description: formData.description,
          videoUrl: formData.videoUrl,
          images: imageUrls,
        }
      ]);

      if (dbError) throw dbError;

      // 3. Navigate back to dashboard
      router.push('/admin');
      router.refresh();
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while saving the vehicle.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">List New Vehicle</h1>
          <p className="text-zinc-400">Fill in the details to publish a new car to your premium lineup.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
              Vehicle Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Make</label>
                <input name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. Porsche" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Model</label>
                <input name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. 911 GT3" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Year</label>
                <input name="year" type="number" value={formData.year} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="2024" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Price ($)</label>
                <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="185000" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Mileage</label>
                <input name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12500" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">VIN (Optional)</label>
                <input name="vin" value={formData.vin} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="WPOAC2..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Video URL (YouTube, Vimeo, or MP4)</label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://youtu.be/..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Description</label>
                <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Provide a detailed description of the vehicle condition, options, and history..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="bg-purple-500/20 text-purple-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
              Gallery Images
            </h2>
            
            <div className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 transition-colors bg-zinc-950 rounded-2xl p-10 text-center relative group">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <UploadCloud className="w-12 h-12 text-zinc-600 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
              <p className="text-zinc-300 font-medium text-lg">Drag & Drop images or click to browse</p>
              <p className="text-zinc-500 text-sm mt-2">Upload high-resolution images. The first image will be the primary thumbnail.</p>
            </div>

            {previews.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {previews.map((preview, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden bg-zinc-950 aspect-[4/3]">
                    <Image 
                      src={preview} 
                      alt={`Preview ${idx}`} 
                      fill
                      unoptimized
                      className="object-cover" 
                    />
                    <button 
                      type="button" 
                      onClick={() => removeFile(idx)}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {idx === 0 && (
                      <div className="absolute top-2 left-2 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">Cover</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black hover:bg-zinc-200 font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing Listing...
                </>
              ) : (
                'Publish Vehicle Listng'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
