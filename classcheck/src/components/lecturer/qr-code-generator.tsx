import { useEffect, useRef, useState } from "react";
import { generateQr } from "../../utils/api";
import { QRCodeCanvas } from "qrcode.react";
import socket from "../../utils/socket";

const REFRESH_INTERVAL = 3 * 60 * 1000;
const REFRESH_SECONDS = REFRESH_INTERVAL / 1000;

export function QrCodeGenerator() {
  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState<number>(REFRESH_SECONDS);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const generateAndSetQr = async () => {
    try {
      const { code, expiresAt } = await generateQr(title, program);
      const now = new Date();
      setQrCode(code);
      setGeneratedAt(now.toLocaleTimeString());
      setExpiresAt(new Date(expiresAt).toLocaleTimeString());
      setCountdown(REFRESH_SECONDS);
      socket.emit("attendance_opened", {
        program,
        title,
        code,
        generatedAt: now.toISOString(),
        expiresAt,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to generate QR code"
      );
    }
  };

  const handleGenerateQr = async () => {
    if (!title) return setError("Please enter a QR title");
    setError("");
    setIsGenerating(true);
    await generateAndSetQr();

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    intervalRef.current = setInterval(() => {
      generateAndSetQr();
    }, REFRESH_INTERVAL);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : REFRESH_SECONDS));
    }, 1000);
  };

  const stopGeneration = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setIsGenerating(false);
    setCountdown(REFRESH_SECONDS);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* <h2 className="text-2xl font-semibold text-center mb-1">
        Lecturer Dashboard
      </h2> */}
      <h4 className="text-lg text-center text-gray-600 mb-6">
        Generate a QR code for your class
      </h4>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter session title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isGenerating}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          disabled={isGenerating}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">Select Program/Class</option>
          <option value="Computer Science L100">Computer Science L100</option>
          <option value="Computer Science L200">Computer Science L200</option>
          <option value="Computer Science L300">Computer Science L300</option>
          <option value="Computer Science L400">Computer Science L400</option>
          <option value="AI/ML L100">AI/ML L100</option>
          <option value="AI/ML L200">AI/ML L200</option>
          <option value="AI/ML L300">AI/ML L300</option>
          <option value="AI/ML L400">AI/ML L400</option>
        </select>

        <div className="text-center">
          {!isGenerating ? (
            <button
              onClick={handleGenerateQr}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              Generate & Auto-Refresh QR
            </button>
          ) : (
            <button
              onClick={stopGeneration}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Stop Auto-Generate
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {qrCode && (
        <div className="mt-8 text-center space-y-2">
          <h5 className="text-lg font-medium">QR Code for: {title}</h5>
          <div className="flex justify-center">
            <QRCodeCanvas value={qrCode} size={256} />
          </div>
          <p className="text-sm">Generated at: {generatedAt}</p>
          <p className="text-sm">Expires at: {expiresAt}</p>
          <p className="text-sm text-gray-500">
            Auto refreshes every 3 mins 🔁 — Next in: {countdown}s
          </p>
        </div>
      )}
    </div>
  );
}
