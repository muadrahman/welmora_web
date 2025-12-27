import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const WELMORA_STORE_URL = "https://play.google.com/store/apps/details?id=com.example.welmora";

const QRCodeWidget: React.FC = () => {
    return (
        <div className="hidden md:flex flex-col items-center justify-center fixed bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-xs font-semibold text-gray-800 tracking-wide text-center max-w-[120px]">
                Scan to Download Welmora
            </span>
            <div className="bg-white p-1 rounded-lg">
                <QRCodeSVG
                    value={WELMORA_STORE_URL}
                    size={100}
                    level="H"
                    fgColor="#0B2C2C" // trust-teal
                />
            </div>
        </div>
    );
};

export default QRCodeWidget;
