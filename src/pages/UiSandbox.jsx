import { useState } from 'react';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';

export default function UiSandbox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 space-y-12 text-left bg-white my-8 rounded-xl border border-slate-200 shadow-xs">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">UI Component Library Sandbox</h1>
        <p className="text-xs text-slate-500 mt-1">Live preview environment for verified design system elements.</p>
      </div>

      <hr className="border-slate-100" />

      {/* 1. BUTTONS */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">1. Button Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="danger">Danger Protocol</Button>
          <Button variant="primary" isLoading={true}>Loading State</Button>
        </div>
      </div>

      {/* 2. INPUT FIELDS */}
      <div className="space-y-3 max-w-md">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">2. Input Fields</h3>
        <Input 
          label="Standard Text Endpoint" 
          placeholder="Enter log hash parameters..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="Standard clean alpha-numeric user input field entry."
        />
        <Input 
          label="System Alert Error State" 
          placeholder="Faulty input context..." 
          error="The system token configuration format is invalid."
        />
      </div>

      {/* 3. INTERACTIVE MODAL & TOAST TRIGGERS */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">3. Dialogs & Toast Notifications</h3>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>✨ Open UI Modal Window</Button>
          <Button variant="outline" onClick={() => setShowToast(true)}>💥 Trigger Toast Banner</Button>
        </div>
      </div>

      {/* 4. PROGRESS LOADERS */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">4. Progress Loaders</h3>
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
          <Loader size="md" />
        </div>
      </div>

      {/* MODAL MOUNTED PORTAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Operational Frame Live">
        <p className="text-xs text-slate-600 font-sans leading-relaxed">
          This is your decoupled Modal component rendering cleanly inside an isolated portal viewport frame. Click the backdrop mesh or close trigger to safely dismiss this window instance.
        </p>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>Confirm & Dismiss</Button>
        </div>
      </Modal>

      {/* TOAST MOUNTED ALERT */}
      {showToast && (
        <Toast 
          message="Telemetry payload compiled and dispatched securely." 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}