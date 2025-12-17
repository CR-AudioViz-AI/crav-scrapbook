'use client';

import { useState } from 'react';
import { QrCode, Download, Copy, Check, Loader2, Link, Mail, Phone, Wifi, MapPin } from 'lucide-react';

interface QRCodeGeneratorProps {
  onInsertQRCode: (qrCode: { url: string; data: string }) => void;
}

type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'location';

const QR_TYPES: { id: QRType; name: string; icon: any; placeholder: string }[] = [
  { id: 'url', name: 'URL', icon: Link, placeholder: 'https://example.com' },
  { id: 'text', name: 'Text', icon: QrCode, placeholder: 'Your text here...' },
  { id: 'email', name: 'Email', icon: Mail, placeholder: 'email@example.com' },
  { id: 'phone', name: 'Phone', icon: Phone, placeholder: '+1234567890' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, placeholder: 'Network Name' },
  { id: 'location', name: 'Location', icon: MapPin, placeholder: '40.7128,-74.0060' },
];

export default function QRCodeGenerator({ onInsertQRCode }: QRCodeGeneratorProps) {
  const [type, setType] = useState<QRType>('url');
  const [data, setData] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiType, setWifiType] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [size, setSize] = useState(200);
  const [color, setColor] = useState('000000');
  const [bgColor, setBgColor] = useState('ffffff');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateQRData = () => {
    switch (type) {
      case 'email':
        return `mailto:${data}`;
      case 'phone':
        return `tel:${data}`;
      case 'wifi':
        return `WIFI:T:${wifiType};S:${data};P:${wifiPassword};;`;
      case 'location':
        const [lat, lng] = data.split(',');
        return `geo:${lat},${lng}`;
      default:
        return data;
    }
  };

  const generateQRCode = async () => {
    if (!data.trim()) return;
    
    setLoading(true);
    try {
      const qrData = generateQRData();
      const params = new URLSearchParams({
        data: qrData,
        size: size.toString(),
        color,
        bgcolor: bgColor,
      });
      
      const res = await fetch(`/api/qrcode?${params}`);
      const result = await res.json();
      
      if (result.qrCode) {
        setQrUrl(result.qrCode.url);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
    setLoading(false);
  };

  const handleInsert = () => {
    if (qrUrl) {
      onInsertQRCode({
        url: qrUrl,
        data: generateQRData()
      });
    }
  };

  const handleCopy = async () => {
    if (qrUrl) {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (qrUrl) {
      const a = document.createElement('a');
      a.href = qrUrl;
      a.download = `qrcode-${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          QR Code Generator
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="grid grid-cols-3 gap-2">
            {QR_TYPES.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setType(id); setData(''); setQrUrl(''); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition ${
                  type === id
                    ? 'border-purple-600 bg-purple-50 text-purple-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {QR_TYPES.find(t => t.id === type)?.name} Data
          </label>
          <input
            type={type === 'email' ? 'email' : type === 'phone' ? 'tel' : 'text'}
            value={data}
            onChange={(e) => { setData(e.target.value); setQrUrl(''); }}
            placeholder={QR_TYPES.find(t => t.id === type)?.placeholder}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* WiFi-specific fields */}
        {type === 'wifi' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => { setWifiPassword(e.target.value); setQrUrl(''); }}
                placeholder="Network password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security</label>
              <select
                value={wifiType}
                onChange={(e) => setWifiType(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </>
        )}

        {/* Customization */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => { setSize(Number(e.target.value)); setQrUrl(''); }}
              className="w-full px-2 py-1.5 text-sm border rounded"
            >
              <option value={150}>Small</option>
              <option value={200}>Medium</option>
              <option value={300}>Large</option>
              <option value={500}>XL</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
            <input
              type="color"
              value={`#${color}`}
              onChange={(e) => { setColor(e.target.value.replace('#', '')); setQrUrl(''); }}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Background</label>
            <input
              type="color"
              value={`#${bgColor}`}
              onChange={(e) => { setBgColor(e.target.value.replace('#', '')); setQrUrl(''); }}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQRCode}
          disabled={!data.trim() || loading}
          className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4" />
              Generate QR Code
            </>
          )}
        </button>

        {/* Preview */}
        {qrUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="aspect-square max-w-[200px] mx-auto bg-white rounded-lg shadow-sm p-2 mb-4">
              <img
                src={qrUrl}
                alt="Generated QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInsert}
                className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center justify-center gap-1"
              >
                Add to Canvas
              </button>
              <button
                onClick={handleCopy}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
