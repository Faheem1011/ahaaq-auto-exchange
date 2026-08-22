'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Loader2, UploadCloud, X, Trash2, CheckCircle, Flame, Tag, Save, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditVehicle({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    async function loadVehicle() {
      try {
        const { data: v, error: fetchErr } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchErr || !v) {
          throw new Error(fetchErr?.message || 'Vehicle not found');
        }

        setFormData({
          make: v.make || '',
          model: v.model || '',
          year: v.year || new Date().getFullYear(),
          price: v.price || '',
          mileage: v.mileage || '',
          vin: v.vin || '',
          status: v.status || 'available',
          slug: v.slug || '',
          tagsString: Array.isArray(v.tags) ? v.tags.join(', ') : '',
          seo_title: v.seo_title || '',
          seo_description: v.seo_description || '',
          body_type: v.body_type || 'Sedan',
          transmission: v.transmission || 'Automatic',
          fuel_type: v.fuel_type || 'Gasoline',
          videoUrl: v.videoUrl || '',
          description: v.description || ''
        });

        setExistingImages(v.images || []);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadVehicle();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles(prev => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setNewPreviews(prev => [...prev, ...previews]);
  };

  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsFeatured = (index) => {
    if (index === 0) return;
    setExistingImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      return [item, ...copy];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Upload any new images to Supabase storage
      const uploadedUrls = [];
      const bucketName = 'vehicle-images';

      for (const file of newFiles) {
        const fileExt = file.name.split('.').pop();
        const safeSlug = (formData.slug || `${formData.year}-${formData.make}-${formData.model}`)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-');
        const fileName = `${safeSlug}/${Math.random().toString(36).substring(2, 10)}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file, { contentType: file.type });

        if (uploadError) {
          console.error(`Upload error for ${file.name}:`, uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);
          uploadedUrls.push(publicUrl);
        }
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      // Parse tags
      const tags = formData.tagsString
        ? formData.tagsString.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      // Auto generate slug if empty
      const finalSlug = formData.slug.trim() || 
        `${formData.year}-${formData.make.toLowerCase()}-${formData.model.toLowerCase()}`.replace(/[^a-z0-9]/g, '-');

      // 2. Update Supabase record
      const updatePayload = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year) || new Date().getFullYear(),
        price: parseInt(formData.price) || 0,
        mileage: parseInt(formData.mileage) || 0,
        vin: formData.vin.trim(),
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
        images: finalImages,
      };

      const { error: updateError } = await supabase
        .from('vehicles')
        .update(updatePayload)
        .eq('id', id);

      if (updateError) throw updateError;

      setSuccess('Vehicle successfully updated!');
      setExistingImages(finalImages);
      setNewFiles([]);
      setNewPreviews([]);
      
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1200);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Error updating vehicle.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete this ${formData.year} ${formData.make} ${formData.model}? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const { error: delError } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (delError) throw delError;

      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error deleting vehicle.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
          <span className="font-bold">Loading vehicle details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Live Link */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Command Center
          </Link>

          <Link 
            href={`/inventory/${formData.slug || id}`} 
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-bold transition-all"
          >
            <ExternalLink size={14} /> View Live Listing
          </Link>
        </div>

        {/* Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1">
              Edit Listing: {formData.year} {formData.make} {formData.model}
            </h1>
            <p className="text-zinc-400 text-sm">
              Full control over pricing, sold status, photo gallery, tags, and search engine optimization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Delete Vehicle
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium mb-8">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-bold mb-8 flex items-center gap-2">
            <CheckCircle size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* 1. STATUS & QUICK TAGS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
              Listing Status &amp; Visibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Listing Status *</label>
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
                <p className="text-xs text-zinc-500">
                  Setting this to <strong>SOLD</strong> will trigger the luxury red SOLD ribbon on the card and detail page.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Custom URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="e.g. 2006-acura-tl"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-mono text-sm"
                />
                <p className="text-xs text-zinc-500">
                  URL: <code className="text-zinc-400">/inventory/{formData.slug || id}</code>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
                <Tag size={16} /> Vehicle Feature Tags (Comma Separated)
              </label>
              <input
                type="text"
                name="tagsString"
                value={formData.tagsString}
                onChange={handleInputChange}
                placeholder="Luxury, Leather Seats, Sunroof, V6 Power, Clean Title, Low Miles"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              <p className="text-xs text-zinc-500">Tags appear as stylish pills on vehicle cards and specification sheet.</p>
            </div>
          </div>

          {/* 2. CORE VEHICLE SPECIFICATIONS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              Core Specifications &amp; Pricing
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
                  placeholder="e.g. Acura"
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
                  placeholder="e.g. TL"
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
                  placeholder="4500"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white font-bold text-lg text-emerald-400"
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
                  placeholder="164819"
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
                  placeholder="19UUA66266A..."
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
              <label className="text-sm font-bold text-zinc-300">Vehicle Description</label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed vehicle features, mechanical condition, and driving experience..."
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* 3. MEDIA & GALLERY MANAGEMENT */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
              <span>Photo Gallery ({existingImages.length + newPreviews.length} Photos)</span>
              <span className="text-xs font-normal text-zinc-400">First image is the primary featured thumbnail</span>
            </h2>

            {/* Current Images */}
            {existingImages.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Live Photos</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingImages.map((url, index) => (
                    <div key={index} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                      <Image src={url} alt={`Photo ${index + 1}`} fill className="object-cover" />
                      
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                          Featured
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsFeatured(index)}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-black text-[10px] font-bold transition-all"
                            title="Set as Featured Photo"
                          >
                            Make 1st
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-all"
                          title="Remove Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Additional Images */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Add More Photos</p>
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-2xl cursor-pointer bg-zinc-950 transition-colors">
                <UploadCloud className="w-10 h-10 text-zinc-400 mb-3" />
                <span className="text-sm font-bold text-white mb-1">Click to select additional photos</span>
                <span className="text-xs text-zinc-500">Supports JPG, PNG, WEBP — direct upload to Supabase CDN</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {newPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {newPreviews.map((url, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-emerald-500/30">
                      <Image src={url} alt="New upload" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-red-600 rounded-full text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. SEO & SEARCH ENGINE OPTIMIZATION */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              SEO &amp; Jacksonville Search Engine Optimization
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">Custom SEO Meta Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleInputChange}
                  placeholder={`e.g. ${formData.year} ${formData.make} ${formData.model} for Sale in Jacksonville FL | Ahaaq Auto`}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300">SEO Meta Description</label>
                <textarea
                  name="seo_description"
                  rows={3}
                  value={formData.seo_description}
                  onChange={handleInputChange}
                  placeholder="Compelling description for Google search results targeting Jacksonville car shoppers..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
            <Link
              href="/admin"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-bold text-center transition-all text-sm"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || deleting}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/10 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save &amp; Update Listing
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
