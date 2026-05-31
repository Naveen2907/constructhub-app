import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function AddAppliance() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [saving, setSaving] = useState(false)
  const [active, setActive] = useState(true)

  const onSubmit = () => {
    setSaving(true)
    setTimeout(() => { setSaving(false); navigate('/luxe-home/appliances') }, 1200)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/luxe-home/appliances')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-gray-500">arrow_back</span>
        </button>
        <div>
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-0.5">Device Onboarding</p>
          <h1 className="text-3xl font-black font-headline text-gray-900">Integrate a new appliance</h1>
          <p className="text-gray-500 text-sm mt-1">Connect your appliance to the Luxe Home ecosystem for real-time monitoring.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-3xl shadow-ambient overflow-hidden">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5">Appliance Name *</label>
                <input {...register('name',{required:true})} className={`input-field ${errors.name?'ring-2 ring-red-400':''}`} placeholder="e.g. Smart Refrigerator 500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5">Category *</label>
                <select {...register('category',{required:true})} className="input-field">
                  <option value="">Select category</option>
                  {['Kitchen','Cooling','Laundry','Living Room','Bathroom','Security'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1.5">Brand</label>
                  <input {...register('brand')} className="input-field" placeholder="LuxeLine" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1.5">Model Number</label>
                  <input {...register('model')} className="input-field" placeholder="LL-789-Q" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1.5">Purchase Date</label>
                  <input type="date" {...register('purchase_date')} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1.5">Warranty Expiry</label>
                  <input type="date" {...register('warranty_expiry')} className="input-field" />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5">Location (Room)</label>
                <select {...register('room')} className="input-field">
                  {['Kitchen','Living Room','Master Bedroom','Bedroom 2','Laundry Room','Bathroom','Garage'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Device Status</p>
                  <p className="text-xs text-gray-500">Enable monitoring immediately</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="sr-only peer" />
                  <div className={`w-12 h-6 rounded-full transition-colors ${active ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${active ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="ml-3 text-sm font-semibold text-gray-700">{active ? 'Active' : 'Inactive'}</span>
                </label>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5">Appliance Image</label>
                <div className="w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-400">PNG, JPG or HEIC (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-end gap-3">
            <button type="button" onClick={() => navigate('/luxe-home/appliances')} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-indigo flex items-center gap-2">
              {saving ? <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...</> : <><span className="material-symbols-outlined text-sm">save</span> Save Appliance</>}
            </button>
          </div>
        </div>
      </form>

      {/* Hints */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {icon:'verified',color:'bg-green-100 text-green-600',title:'Smart Connect',desc:'Auto-detect IoT features for compatible brands.'},
          {icon:'energy_savings_leaf',color:'bg-indigo-100 text-indigo-600',title:'Energy Profile',desc:'Luxe Home calculates estimated annual operating costs.'},
          {icon:'notification_important',color:'bg-amber-100 text-amber-600',title:'Maintenance Alerts',desc:'Get notified 30 days before warranty expires.'},
        ].map(h => (
          <div key={h.title} className="flex items-start gap-4">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${h.color}`}>
              <span className="material-symbols-outlined text-sm">{h.icon}</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{h.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
