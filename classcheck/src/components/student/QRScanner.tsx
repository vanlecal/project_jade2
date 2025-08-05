// src/components/student/QRScanner.tsx
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result, NotFoundException } from "@zxing/library";
import { postRequesttwo } from "../../utils/api";

// Extend the standard capabilities/constraints to include zoom
interface ZoomCapabilities extends MediaTrackCapabilities {
  zoom?: { min: number; max: number; step?: number };
}

interface ZoomConstraint extends MediaTrackConstraintSet {
  zoom?: number;
}

const QRScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [scanned, setScanned] = useState<boolean>(false);
  const [retryScanner, setRetryScanner] = useState<number>(0);

  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [zoomCap, setZoomCap] = useState<{ min: number; max: number } | null>(
    null
  );
  const [zoomVal, setZoomVal] = useState<number>(1);

  useEffect(() => {
    if (scanned) return;

    const start = async () => {
      if (!videoRef.current) return;
      readerRef.current = new BrowserMultiFormatReader();

      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCam =
          devices.find((d) => /back|rear/i.test(d.label)) || devices[0];

        const constraints: MediaStreamConstraints = {
          video: {
            deviceId: { exact: backCam.deviceId },
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        };

        controlsRef.current = await readerRef.current.decodeFromConstraints(
          constraints,
          videoRef.current,
          async (result: Result | undefined, error: unknown) => {
            if (result) {
              setScanned(true);
              controlsRef.current?.stop();

              navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                  const { latitude, longitude } = coords;
                  try {
                    await postRequesttwo("student/attendance/scan", {
                      code: result.getText(),
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
                () => {
                  setMessage(
                    "❌ Failed to get location. Please enable location services."
                  );
                }
              );
            } else if (error && !(error instanceof NotFoundException)) {
              console.warn("QR scan error:", error);
            }
          }
        );

        // inspect track for zoom capability
        const stream = videoRef.current.srcObject as MediaStream;
        const [track] = stream.getVideoTracks();
        const caps = track.getCapabilities() as ZoomCapabilities;
        if (caps.zoom) {
          setZoomCap({ min: caps.zoom.min, max: caps.zoom.max });
          setZoomVal(caps.zoom.min);
        }
      } catch (err) {
        console.error("Camera error:", err);
        setMessage("❌ Failed to access camera");
      }
    };

    start();
    return () => {
      controlsRef.current?.stop();
    };
  }, [scanned, retryScanner]);

  const onZoomChange = (value: number) => {
    setZoomVal(value);
    const stream = videoRef.current?.srcObject as MediaStream;
    if (!stream) return;
    const [track] = stream.getVideoTracks();
    const constraint: ZoomConstraint = { zoom: value };
    track.applyConstraints({ advanced: [constraint] }).catch(console.warn);
  };

  const handleRetry = () => {
    setMessage("");
    setScanned(false);
    setRetryScanner((prev) => prev + 1);
  };

  const handleRefresh = () => window.location.reload();

  return (
    <div className="flex flex-col items-center">
      {zoomCap && (
        <div className="mb-2 flex items-center space-x-2">
          <label htmlFor="zoomSlider" className="text-sm">
            Zoom
          </label>
          <input
            id="zoomSlider"
            type="range"
            min={zoomCap.min}
            max={zoomCap.max}
            step={(zoomCap.max - zoomCap.min) / 20}
            value={zoomVal}
            onChange={(e) => onZoomChange(Number(e.target.value))}
          />
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full max-w-md border rounded-lg shadow-md"
        muted
        autoPlay
        playsInline
      />

      {message && <p className="mt-3">{message}</p>}

      {scanned && message.startsWith("❌") && (
        <div className="mt-2 flex space-x-4">
          <button
            onClick={handleRetry}
            className="px-5 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-800"
          >
            Retry
          </button>
          <button
            onClick={handleRefresh}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Refresh Page
          </button>
        </div>
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
