export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-400">
          Loading Pokémon...
        </p>
      </div>
    </div>
  );
}