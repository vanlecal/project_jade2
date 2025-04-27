//1
// src/components/LoadingScreen.tsx

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;


//2
// src/components/LoadingScreen.tsx

// import React from 'react';

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="flex space-x-2">
//         <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//         <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//         <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;


//3
// src/components/LoadingScreen.tsx

// import React from 'react';

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="relative w-16 h-16">
//         <div className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
//         <div className="absolute inset-0 rounded-full bg-blue-500"></div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;


//4
// src/components/LoadingScreen.tsx

// import React from 'react';

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="relative w-20 h-20 animate-spin">
//         <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
//         <div className="absolute left-0 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
//         <div className="absolute right-0 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;
