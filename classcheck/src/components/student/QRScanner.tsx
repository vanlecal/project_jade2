// // components/QRScanner.tsx
// import { useEffect, useRef, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { postRequesttwo } from "../utils/api";

// const QRScanner = () => {
//   const [message, setMessage] = useState("");
//   const [scanned, setScanned] = useState(false);
//   const scannerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scannerRef.current && !scanned) {
//       const scanner = new Html5QrcodeScanner(
//         "qr-reader",
//         { fps: 10, qrbox: 250 },
//         false
//       );

//       scanner.render(
//         async (decodedText) => {
//           if (!scanned) {
//             setScanned(true);
//             scanner.clear(); // stop scanning

//             try {
//               await postRequesttwo("student/attendance/scan", {
//                 code: decodedText,
//               });
//               setMessage("✅ Attendance recorded!");
//             } catch (err: unknown) {
//               setMessage(
//                 `❌ ${
//                   err instanceof Error
//                     ? err.message
//                     : "Failed to record attendance"
//                 }`
//               );
//             }
//           }
//         },
//         (error) => {
//           console.warn("QR Scan error:", error);
//         }
//       );
//     }
//   }, [scanned]);

//   return (
//     <div className="text-center">
//       <h3>Scan QR Code</h3>
//       <div
//         id="qr-reader"
//         ref={scannerRef}
//         style={{ width: "300px", margin: "auto" }}
//       />
//       {message && <p className="mt-3">{message}</p>}
//     </div>
//   );
// };

// export default QRScanner;

// 2  QRScanner + GPS
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { postRequesttwo } from "../../utils/api";

const QRScanner = () => {
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);
  const [retryScanner, setRetryScanner] = useState(0); // trigger re-render
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current && !scanned) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
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
    setRetryScanner((prev) => prev + 1); // trigger scanner re-render
  };

  return (
    <div className="text-center">
      <h3>Scan QR Code</h3>
      <div
        id="qr-reader"
        ref={scannerRef}
        style={{ width: "300px", margin: "auto" }}
      />
      {message && <p className="mt-3">{message}</p>}
      {scanned && message.startsWith("❌") && (
        <button
          onClick={handleRetry}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default QRScanner;
