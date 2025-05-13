export const VerticalLoader = ({ isLoading } : { isLoading : boolean }) => (
    isLoading ?
  <div className="w-1.5 h-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-500 animate-vertical-loader-fill"
      style={{
        animation: 'vertical-loader-fill 2s infinite linear',
      }}
      role="progressbar"
      aria-label="Loading..."
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  </div>
  : null
);
