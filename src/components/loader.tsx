export const Loader = ({ isLoading } : { isLoading : boolean }) => (isLoading ? <div className="loader w-full" suppressHydrationWarning /> : null);
