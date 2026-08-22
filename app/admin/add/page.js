'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Loader2, UploadCloud, X, Plus, Tag } from 'lucide-react';
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
    status: 'available',
    slug: '',
    tagsString: '',
    seo_title: '',
    seo_description: '',
    body_type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    videoUrl: '',
    description: ''
  });
  
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
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
      const safeSlug = (formData.slug || `${formData.year}-${formData.make}-${formData.model}`)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${safeSlug}/${Math.random().toString(36).substring(2, 10)}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file, { contentType: file.type });

        if (uploadError) {
          console.error(`Upload failed for ${file.name}:`, uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);
            
          imageUrls.push(publicUrl);
        }
      }

      // Parse tags
      const tags = formData.tagsString
        ? formData.tagsString.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      // Auto slug if empty
      const finalSlug = formData.slug.trim() || 
        `${formData.year}-${formData.make.toLowerCase()}-${formData.model.toLowerCase()}`.replace(/[^a-z0-9]/g, '-');

      // 2. Insert into Supabase DB
      const { error: dbError } = await supabase.from('vehicles').insert([
        {
          make: formData.make.trim(),
          model: formData.model.trim(),
          year: parseInt(formData.year) || new Date().getFullYear(),
          price: parseInt(formData.price) || 0,
          mileage: parseInt(formData.mileage) || 0,
          vin: formData.vin.trim() || 'Contact Dealer',
          status: formData.status,
          slug: finalSlug,
          tags: tags,
          seo_title: formData.seo_title.trim() || null,
          seo_description: formData.seo_description.trim() || null,
          body_type: formData.body_type,
          transmission: formData.transmission,
          fuel_type: formData.fuel_type,
          description: formData.description.trim(),
          videoUrl: formData.videoUrl.trim() || null,
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
        
        <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Command Center
        </Link>
        
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Publish New Vehicle</h1>
          <p className="text-zinc-400 text-sm">Add a vehicle with photos, custom slug, tags, and SEO tags to your live Jacksonville inventory.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. STATUS & SLUG */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              Listing Status &amp; Slug
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Initial Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-bold"
                >
                  <option value="available">🟢 Available for Sale</option>
                  <option value="sold">🔴 SOLD (Renders Fancy Sold Badge)</option>
                  <option value="pending">🟡 Sale Pending</option>
                  <option value="price_drop">🔥 Price Drop Deal</option>
                  <option value="featured">⭐ Featured Inventory</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Custom URL Slug (Optional)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="e.g. 2015-lexus-is250"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
                <Tag size={16} /> Feature Tags (Comma Separated)
              </label>
              <input
                type="text"
                name="tagsString"
                value={formData.tagsString}
                onChange={handleInputChange}
                placeholder="Luxury, Leather, Sunroof, V6, Clean Title, Low Miles"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
            </div>
          </div>

          {/* 2. SPECIFICATIONS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              Vehicle Details &amp; Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Make *</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Lexus"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. RX 350"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Price ($ USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="12900"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-bold text-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Mileage (mi) *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                  placeholder="85000"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">VIN (17 characters)</label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="ENTER VIN"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-mono uppercase text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Body Type</label>
                <select
                  name="body_type"
                  value={formData.body_type}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Truck">Truck</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Van">Van / Minivan</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Dual-Clutch">Dual-Clutch</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Fuel Type</label>
                <select
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-300">Walkaround Video URL (Optional)</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://...mp4 or YouTube / Vimeo link"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-300">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Key highlights, warranty coverage, inspection notes..."
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* 3. IMAGES */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              Photo Uploads
            </h2>

            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-2xl cursor-pointer bg-zinc-950 transition-colors">
              <UploadCloud className="w-10 h-10 text-zinc-400 mb-3" />
              <span className="text-sm font-bold text-white mb-1">Select vehicle photos</span>
              <span className="text-xs text-zinc-500">First image will be the primary featured image</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {previews.map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                    <Image src={url} alt="Upload preview" fill className="object-cover" />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-white text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Featured
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-red-600 rounded-full text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. SEO */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              SEO Optimization (Optional)
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Custom SEO Meta Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleInputChange}
                  placeholder="e.g. 2015 Lexus RX 350 For Sale Jacksonville FL | Ahaaq Auto"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">SEO Meta Description</label>
                <textarea
                  name="seo_description"
                  rows={2}
                  value={formData.seo_description}
                  onChange={handleInputChange}
                  placeholder="Brief description for Google search snippet..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              href="/admin"
              className="px-8 py-4 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-bold text-sm"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/10 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing Vehicle...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Publish Vehicle
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
