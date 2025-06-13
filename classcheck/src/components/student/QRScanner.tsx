import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { postRequesttwo } from "../../utils/api";

const QRScanner = () => {
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);
  const [retryScanner, setRetryScanner] = useState(0);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current && !scanned) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: 250,
          aspectRatio: 1.333334,
          videoConstraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment", // better quality for rear camera
          },
        },
        false
      );

      scanner.render(
        async (decodedText) => {
          if (!scanned) {
            setScanned(true);
            await scanner.clear();

            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                alert(`Latitude: ${latitude}, Longitude: ${longitude}`);

                try {
                  await postRequesttwo("student/attendance/scan", {
                    code: decodedText,
                    latitude,
                    longitude,
                  });
                  setMessage("✅ Attendance recorded!");
                } catch (err: unknown) {
                  setMessage(
                    `❌ ${
                      err instanceof Error
                        ? err.message
                        : "Failed to record attendance"
                    }`
                  );
                }
              },
              (error) => {
                console.error("Geolocation error:", error);
                setMessage(
                  "❌ Failed to get location. Please enable location services."
                );
              }
            );
          }
        },
        (error) => {
          console.warn("QR Scan error:", error);
        }
      );

      return () => {
        void scanner.clear();
      };
    }
  }, [scanned, retryScanner]);

  const handleRetry = () => {
    setMessage("");
    setScanned(false);
    setRetryScanner((prev) => prev + 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div id="qr-reader" ref={scannerRef} />
      {message && <p className="mt-3">{message}</p>}

      {scanned && message.startsWith("❌") && (
        <>
          <button
            onClick={handleRetry}
            className="mt-2 mr-4 px-5 py-2.5 bg-slate-700 text-white rounded-xl shadow-sm hover:bg-slate-800 transition"
          >
            Retry
          </button>

          <button
            onClick={handleRefresh}
            className="mt-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition"
          >
            Refresh Page
          </button>
        </>
      )}

      {scanned && message.startsWith("✅") && (
        <button
          onClick={handleRefresh}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Refresh Page
        </button>
      )}
    </div>
  );
};

export default QRScanner;
